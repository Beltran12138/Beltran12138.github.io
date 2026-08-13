#!/usr/bin/env bash
# 向 IndexNow 提交本站 URL（Bing / Yandex / Naver / Seznam 共用这一个端点）。
#
# 用法：bash scripts/indexnow.sh
#
# 前提：public/<KEY>.txt 必须已部署且可访问 —— IndexNow 靠它验证你确实拥有这个域名。
# Google 不参与 IndexNow，必须走 Search Console。
set -euo pipefail

KEY="e81d15a884c181aede110c40922ea86a"
HOST="beltran12138.github.io"

# 直接从线上 sitemap 取 URL 列表，避免手工维护第二份清单而漂移
URLS=$(curl -s "https://$HOST/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed 's|</\?loc>||g')
COUNT=$(echo "$URLS" | wc -l)
echo "提交 $COUNT 条 URL..."

JSON=$(python -c "
import sys, json
urls = [u.strip() for u in sys.stdin.read().splitlines() if u.strip()]
print(json.dumps({
    'host': '$HOST',
    'key': '$KEY',
    'keyLocation': 'https://$HOST/$KEY.txt',
    'urlList': urls,
}))
" <<< "$URLS")

curl -s -w '\nHTTP %{http_code}\n' -X POST 'https://api.indexnow.org/IndexNow' \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "$JSON"

# 200 = 已接受；202 = 已接受但 key 还在验证中；两者都算成功。
