import { defaultLocale, locales, type Locale } from './ui';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];
  return isLocale(first) ? first : defaultLocale;
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return clean;
  }
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ja' : 'en';
}

/**
 * Translate a path on the current locale into the equivalent path on the other locale.
 * `/` (en) <-> `/ja` (ja).
 */
export function alternatePath(currentLocale: Locale, currentPath: string): string {
  const target = otherLocale(currentLocale);
  const segments = currentPath.split('/').filter(Boolean);
  const stripped = isLocale(segments[0]) ? segments.slice(1) : segments;
  const basePath = stripped.length === 0 ? '/' : `/${stripped.join('/')}`;
  return localizedPath(target, basePath);
}
