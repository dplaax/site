# Deployment — S3 + CloudFront

Reference notes for setting up production hosting at `https://www.dplaax.dev`.
**Nothing in this directory is executed automatically** — it documents the target topology.

## ⚠️ The apex is not ours

`https://dplaax.dev` (the apex) is the **protocol namespace publish root**, owned by
[`dplaax/spec`](https://github.com/dplaax/spec) (`site/` directory there). It hosts frozen
namespace documents at wire-identifier URIs (`/oauth/...`, `/vc/...`, `/schemas/...`).

- This repository deploys to **`www.dplaax.dev` only**.
- Never point the apex DNS at this site's distribution, and never sync this site's
  artifacts into whatever bucket serves the apex — `aws s3 sync --delete` against a
  shared bucket would erase wire-live identifier documents.
- If the apex ever serves a human-facing redirect (`/` → `https://www.dplaax.dev`),
  that lives in the apex's own infrastructure and must never apply to identifier paths.

## Topology

```text
Route 53                    CloudFront                     S3
─────────                   ──────────                     ──
www.dplaax.dev  ──ALIAS──▶  Distribution  ──OAC──▶  s3://www.dplaax.dev
                                │                    (private bucket)
                                └─ viewer-request ─▶ cloudfront-function.js
                                    (/ → Accept-Language → /ja 302)

dplaax.dev (apex) ─────────▶  NOT this distribution (see above)
```

## S3 bucket

- Name: `www.dplaax.dev`
- Public access: **blocked** (CloudFront accesses via OAC)
- Static website hosting: **off** (we use CloudFront, not the S3 site endpoint)
- Versioning: **on** (recovery from accidental sync deletes)
- Object Lock: optional

Deploy artifacts are the contents of `./dist` after `npm run build`.

## CloudFront distribution

- Origin: the S3 bucket above, accessed via Origin Access Control (OAC)
- Default root object: `index.html`
- Behaviours:
  - Default (`*`): cache by URL only, GET/HEAD; viewer-request → `cloudfront-function.js`
  - Compress objects: on
  - HTTP/2 + HTTP/3
- Custom error responses:
  - `403`/`404` → `/404.html` (Astro emits this from the build)
- TLS: ACM certificate in `us-east-1` for `www.dplaax.dev`
- Alternate domain names (CNAMEs): `www.dplaax.dev` only — the apex is intentionally absent

## Route 53

| Name             | Type      | Target                  |
| ---------------- | --------- | ----------------------- |
| `www.dplaax.dev` | A (alias) | CloudFront distribution |

The apex record belongs to the namespace publishing setup (`dplaax/spec`), not here.

## CI deployment

`.github/workflows/deploy.yml` ships disabled (`if: false`). To enable:

1. Create an AWS IAM role trusted by GitHub OIDC (`token.actions.githubusercontent.com`)
   with permissions for S3 sync + CloudFront `create-invalidation` on this bucket / distribution only.
2. Add repo secrets: `AWS_ROLE_TO_ASSUME`, `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`.
3. Change `if: false` to `if: github.ref == 'refs/heads/main'`.

## Manual deploy fallback

```bash
npm run build
aws s3 sync ./dist s3://www.dplaax.dev --delete
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

## CloudFront Function deploy

```bash
aws cloudfront create-function \
  --name dplaax-locale-redirect \
  --function-config Comment="Redirect / to /ja when Accept-Language is ja",Runtime=cloudfront-js-2.0 \
  --function-code fileb://infra/cloudfront-function.js
# Then publish + attach to the default cache behaviour as viewer-request.
```
