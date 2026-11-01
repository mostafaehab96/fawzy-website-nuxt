#!/usr/bin/env bash
# ==============================================================================
# Configure Cloudflare 301 Bulk Redirect: fawzy-website-nuxt.pages.dev -> Custom Domain
# ==============================================================================
# Why Bulk Redirects?
#   Cloudflare Pages `_redirects` only matches relative URL paths (`/old /new`),
#   not hostnames. Cloudflare's official way to 301-redirect `*.pages.dev` to a
#   canonical custom domain at the edge (with zero Worker invocations) is an
#   Account-level Bulk Redirect list + `http_request_redirect` entrypoint rule.
#
# IMPORTANT: Run this ONLY AFTER your custom domain is added and active under:
#   Cloudflare Dashboard -> Workers & Pages -> fawzy-website-nuxt -> Custom domains
#
# Required environment variables:
#   export CF_ACCOUNT_ID="your_cloudflare_account_id"
#   export CF_API_TOKEN="your_api_token_with_Account_Rulesets_Write_and_Account_Filter_Lists_Write"
#   export CANONICAL_DOMAIN="https://yourdomain.com"   # no trailing slash
#
# Usage:
#   bash scripts/setup-cloudflare-bulk-redirect.sh
# ==============================================================================

set -euo pipefail

: "${CF_ACCOUNT_ID:?Error: Set CF_ACCOUNT_ID to your Cloudflare Account ID}"
: "${CF_API_TOKEN:?Error: Set CF_API_TOKEN to an API token with Account Rulesets + Lists Write permissions}"
: "${CANONICAL_DOMAIN:?Error: Set CANONICAL_DOMAIN (e.g. https://mahmoudfawzy.com)}"

TARGET_ORIGIN="${CANONICAL_DOMAIN%/}"
PAGES_HOST="fawzy-website-nuxt.pages.dev"
LIST_NAME="fawzy_pages_dev_redirect"
API_BASE="https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}"

echo "1/3 Creating Bulk Redirect list '${LIST_NAME}' (${PAGES_HOST}/* -> ${TARGET_ORIGIN}/*)..."
LIST_RESPONSE=$(curl -sS -X POST "${API_BASE}/rules/lists" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{
    \"name\": \"${LIST_NAME}\",
    \"description\": \"301 redirect ${PAGES_HOST} to canonical domain ${TARGET_ORIGIN}\",
    \"kind\": \"redirect\"
  }")

LIST_ID=$(printf '%s' "${LIST_RESPONSE}" | python3 -c "import sys, json; r=json.load(sys.stdin); assert r.get('success'), r; print(r['result']['id'])")
echo "   Created list ID: ${LIST_ID}"

echo "2/3 Populating 301 redirect item (preserving path & query string)..."
ITEM_RESPONSE=$(curl -sS -X POST "${API_BASE}/rules/lists/${LIST_ID}/items" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "[
    {
      \"redirect\": {
        \"source_url\": \"${PAGES_HOST}/\",
        \"target_url\": \"${TARGET_ORIGIN}/\",
        \"status_code\": 301,
        \"include_subdomains\": true,
        \"subpath_matching\": true,
        \"preserve_path_suffix\": true,
        \"preserve_query_string\": true
      }
    }
  ]")

printf '%s' "${ITEM_RESPONSE}" | python3 -c "import sys, json; r=json.load(sys.stdin); assert r.get('success'), r"
echo "   Redirect item added."

echo "3/3 Enabling Bulk Redirect rule in account http_request_redirect phase..."
RULE_RESPONSE=$(curl -sS -X POST "${API_BASE}/rulesets/phases/http_request_redirect/entrypoint/rules" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{
    \"expression\": \"http.request.full_uri in \$${LIST_NAME}\",
    \"description\": \"Redirect ${PAGES_HOST} to ${TARGET_ORIGIN}\",
    \"action\": \"redirect\",
    \"action_parameters\": {
      \"from_list\": {
        \"name\": \"${LIST_NAME}\",
        \"key\": \"http.request.full_uri\"
      }
    },
    \"enabled\": true
  }")

printf '%s' "${RULE_RESPONSE}" | python3 -c "import sys, json; r=json.load(sys.stdin); assert r.get('success'), r"
echo "Done! All requests to https://${PAGES_HOST}/* now 301-redirect to ${TARGET_ORIGIN}/*."
