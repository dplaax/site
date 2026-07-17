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
                                    (/ → Accept-Language → /ja 302,
                                     trailing-slash 301,
                                     clean URL → /index.html rewrite)

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
- Default root object: `index.html` — note this covers **only** `/`; every other
  clean URL (`/ja`) relies on the viewer-request function's `/index.html` rewrite.
  Without the function attached, all subpaths 403 → 404.
- Behaviours:
  - Default (`*`): GET/HEAD; viewer-request → `cloudfront-function.js`
  - Cache policy: cache by URL path, **query strings excluded from the cache key**
    (the `lang` parameter is a viewer-request signal for the locale redirect only;
    with query strings excluded, `/?lang=en` serves the cached `/` object)
  - Compress objects: on
  - HTTP/2 + HTTP/3
- Custom error responses:
  - `403`/`404` → `/404.html` **with response code 404** (Astro emits the page
    from the build; returning 200 here would turn every missing URL into a
    soft-404 with a live canonical tag)
- Recommended (optional): response headers policy with HSTS; long
  `Cache-Control` for `/_astro/*` (content-hashed → `public, max-age=31536000, immutable`),
  short for HTML — set via S3 object metadata at sync time or a CloudFront policy
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

## Manual deploy

Use the repo Makefile — it builds, syncs with the split cache-control policy
described above, and invalidates:

```bash
AWS_PROFILE=<profile> make deploy CLOUDFRONT_DISTRIBUTION_ID=<DIST_ID>
AWS_PROFILE=<profile> make deploy DRY=1   # dry-run first
```

Raw equivalent:

```bash
npm run build
aws s3 sync ./dist s3://www.dplaax.dev --delete --exclude "_astro/*" \
  --cache-control "public, max-age=300, must-revalidate"
aws s3 sync ./dist/_astro s3://www.dplaax.dev/_astro --delete \
  --cache-control "public, max-age=31536000, immutable"
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

## CloudFront Function deploy

```bash
aws cloudfront create-function \
  --name dplaax-locale-redirect \
  --function-config Comment="Locale redirect + trailing-slash normalize + clean-URL index rewrite",Runtime=cloudfront-js-2.0 \
  --function-code fileb://infra/cloudfront-function.js
# Then publish + attach to the default cache behaviour as viewer-request.
```
