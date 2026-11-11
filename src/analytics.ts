// Google Tag Manager for this site. PUBLIC_GTM_ID is read here and nowhere
// else: the tag, the consent banner and the privacy copy all follow it.

// The container ID; empty when PUBLIC_GTM_ID is unset or empty.
export const gtmId: string = import.meta.env.PUBLIC_GTM_ID ?? '';

// Whether a page loads the container and shows the consent banner: only a
// production-mode build with a container ID, so `astro dev` and
// `astro build --mode <other>` never load gtm.js or send hits.
export const analyticsEnabled: boolean =
  import.meta.env.PROD && import.meta.env.MODE === 'production' && gtmId !== '';
