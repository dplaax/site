# dPLaaX Site

Source for the public-facing site of **dPLaaX** (proving the line, not the points) at <https://www.dplaax.dev>.

The normative dPLaaX specification lives at <https://github.com/dplaax/spec>. This repository is presentation only — nothing here is normative.

Built with Astro 6 and Tailwind v4. Static output, deployed to S3 + CloudFront.

## Quick Start

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # outputs ./dist
npm run preview      # serve ./dist locally
```

## i18n

- Default locale: `en` (no URL prefix → `/`)
- Secondary locale: `ja` (prefixed → `/ja`)
- All copy for both locales lives in [src/i18n/ui.ts](src/i18n/ui.ts); locale helpers in [src/i18n/utils.ts](src/i18n/utils.ts)

## Project Structure

```text
src/
├── components/        # Landing sections, Header/Footer, inline-SVG diagrams
├── layouts/           # BaseLayout
├── pages/             # en routes at root, ja routes under /ja
├── i18n/              # ui.ts (all copy + links) + utils.ts (locale helpers)
└── styles/global.css  # Tailwind v4 + CSS tokens (dark theme)

infra/                 # CloudFront / S3 deployment notes (non-executable)
```

## Deploy

Deployment configuration lives in [infra/deploy.md](infra/deploy.md). This site deploys to `www.dplaax.dev` **only** — the apex `dplaax.dev` is the protocol namespace publish root owned by [`dplaax/spec`](https://github.com/dplaax/spec); see the warning in the deploy notes.

The CI workflow at `.github/workflows/ci.yml` runs format check + build on every push.

## License

Apache-2.0. See [LICENSE](LICENSE).
