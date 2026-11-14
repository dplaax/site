# AGENTS — Working on the dPLaaX Site

Guide for AI agents and human contributors editing this site.

## What This Is

The public-facing site for the dPLaaX protocol, deployed at <https://www.dplaax.dev>. Two locales: `en` (default, served at `/`) and `ja` (served at `/ja`).

The normative dPLaaX specification lives at <https://github.com/dplaax/spec>. This repository is presentation only — **nothing here is normative**. When site copy and the spec disagree, the spec wins; fix the copy.

## The apex domain is not ours

`https://dplaax.dev` (the apex) is the protocol namespace publish root, owned by `dplaax/spec` (its `site/` directory). It serves frozen documents at wire-identifier URIs (`/oauth/...`, `/vc/...`, `/schemas/...`). This site deploys to `www.dplaax.dev` **only**. Never wire this repository's deploy pipeline to the apex — see [infra/deploy.md](infra/deploy.md).

## Editing Rules

### Copy

All copy — both locales — lives in [src/i18n/ui.ts](src/i18n/ui.ts) as typed string tables. There is no MDX / content-collection pipeline; edit the tables directly.

- Translation is **manual**. Keep `en` and `ja` entries in sync; `en` is the source language.
- Japanese terminology must follow the spec's own translations (`concept.ja.md`, `GLOSSARY.ja.md` in `dplaax/spec`): 来歴 (provenance), 境界の約束事 (boundary commitments), 記録の連なり / 来歴の線 (the line), 真正性と連続性 (authenticity and continuity).
- External links live in the `links` object in `ui.ts` — never hardcode URLs in components.

### Visual / styling

- The visual language is white-base and c2pa.org-inspired: near-black text (`#2c2c2c`, matching the logo) on white, flat surfaces, thin gray borders, no gradients. The footer is an inverse (dark) band.
- All styling goes through Tailwind v4 utilities backed by CSS tokens in `src/styles/global.css`.
- Color tokens: `bg-base`, `bg-elev-1`, `bg-elev-2`, `bg-inverse`, `fg-strong`, `fg-primary`, `fg-muted`, `fg-inverse`, `fg-inverse-muted`, `accent-blue`, `accent-violet`, `border-subtle`, `border-strong`.
- Logo files: `logo-dark.svg` on light surfaces (header), `logo-white.svg` on the inverse band (footer). The favicon keeps the mark on a dark tile so it reads on any browser theme.
- No CSS-in-JS. No Lottie. No Framer Motion. No GSAP. Animations are CSS + the Intersection Observer in `BaseLayout.astro` only.
- Diagrams are inline SVG components (e.g. `src/components/LineDiagram.astro`) — text-editable, no binary assets.

### Dependencies

- `vite` is a **deliberate** direct devDependency: `@tailwindcss/vite`'s peer range spans vite majors, so a fresh install without the pin can resolve a different vite major than the one `astro` bundles — `astro check` then fails with plugin type mismatches. When upgrading astro, keep the pin aligned with astro's own vite major.

### Constraints

- Do not introduce React, Vue, Svelte, or any UI framework. Astro components are sufficient.
- Do not add analytics, trackers, or third-party scripts without explicit approval.
- Do not make claims about certification, compliance, or guarantees beyond what the spec's own README/concept states. The "promises / does not promise" section mirrors spec language deliberately.

### Analytics

- The site loads one Google tag through `gtm.js`. Its ID is `PUBLIC_GTM_ID` in the committed `.env.production`. Only `src/analytics.ts` reads it. The tag, the consent banner and the privacy page all follow it. With the ID empty or unset, there is no tag and no banner, and the privacy page says the site loads no analytics.
- `GTM-K4X7SH7C` is the Google tag of Google Analytics 4, measurement ID `G-034LKCPDW9`. Its settings, such as enhanced measurement and user-provided data collection, are the Google tag settings in GA4, not settings in this repository. It may send only to `G-034LKCPDW9`. Any other destination or tag counts as an analytics or third-party script under the constraint above and needs the same approval. A change made in those settings does not pass through this repository's review.
- This site's pages load the tag only on the site's host, `www.dplaax.dev`: `analyticsHost` in `src/analytics.ts`, taken from `site` in `astro.config.mjs`. `Analytics.astro` loads `gtm.js` only when the page's hostname is that host, and sets `cookie_domain` to it, so the Google tag's cookies are set on `www.dplaax.dev`, not on `.dplaax.dev`.
- When the tag's settings change, update the privacy copy (`privacy.*` in `src/i18n/ui.ts`) and its last-updated date (`privacy.updated`) to match.
- Consent Mode v2: `Analytics.astro` sets all four consent types to denied before `gtm.js` loads. The banner grants `analytics_storage` only. The choice is kept in localStorage under the key in `src/consent.ts`.
- Local builds:
  - The tag loads only in a production-mode build with the ID set, on a page served from `www.dplaax.dev`. `npm run dev` never loads it.
  - `npm run build` reads `.env.production`, so its pages show the consent banner. Served from any other host, such as `npm run preview` on localhost, they do not load `gtm.js` and send no hits.
  - To read the privacy page with its analytics sections without loading the tag, run `PUBLIC_GTM_ID=GTM-K4X7SH7C npm run dev`.

## Commands Cheat Sheet

```bash
npm run dev           # dev server with HMR
npm run build         # astro check + astro build
npm run preview       # serve ./dist locally
npm run format        # prettier write
npm run format:check  # CI: prettier check
```

## Testing

This is a content site, not a system. We do not maintain a test suite for components or pages. The `astro check` step in `npm run build` is the type-safety gate. Visual / behavior regressions are caught by manual review on `npm run dev`.
