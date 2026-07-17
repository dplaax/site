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

- `vite` is a **deliberate** direct devDependency: `@tailwindcss/vite`'s peer range spans vite majors, so a fresh install without the pin can resolve a different vite major than the one `astro` bundles (7 vs 8) — `astro check` then fails with plugin type mismatches. When upgrading astro, keep the pin aligned with astro's own vite major.

### Constraints

- Do not introduce React, Vue, Svelte, or any UI framework. Astro components are sufficient.
- Do not add analytics, trackers, or third-party scripts without explicit approval.
- Do not make claims about certification, compliance, or guarantees beyond what the spec's own README/concept states. The "promises / does not promise" section mirrors spec language deliberately.

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
