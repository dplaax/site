// The Google tag for this site. PUBLIC_GTM_ID is read here and nowhere
// else: the tag, the consent banner and the privacy copy all follow it.

// The Google tag ID; empty when PUBLIC_GTM_ID is unset or empty.
export const gtmId: string = import.meta.env.PUBLIC_GTM_ID ?? '';

// Whether a page loads the Google tag and shows the consent banner: only a
// production-mode build with a tag ID, so `astro dev` and
// `astro build --mode <other>` never load gtm.js or send hits.
export const analyticsEnabled: boolean =
  import.meta.env.PROD && import.meta.env.MODE === 'production' && gtmId !== '';

// The only host this site's pages load the tag on: the hostname of `site` in
// astro.config.mjs.
// A page served from any other host (localhost, a preview) does not load
// gtm.js, and the Google tag keeps its cookies on this host instead of the
// parent domain. Without `site`, Astro leaves SITE undefined, and every page
// fails here with a message that says so.
const site: string | undefined = import.meta.env.SITE;
if (!site) throw new Error('astro.config.mjs must set `site`: analyticsHost is its hostname');
export const analyticsHost: string = new URL(site).hostname;
