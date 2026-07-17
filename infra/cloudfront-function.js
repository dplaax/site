/*
 * CloudFront viewer-request function.
 *
 * Behaviour:
 *   - On root requests ("/" or empty), look at Accept-Language and 302
 *     to "/ja" if the visitor's preferred language begins with "ja"
 *     and not "en".
 *   - Strip a trailing slash from any other path (Astro builds with
 *     `trailingSlash: 'never'`; canonical URLs have no trailing slash).
 *   - All other paths pass through unchanged so deep links keep their
 *     locale (e.g. / stays English, /ja stays Japanese).
 *
 * Runtime: cloudfront-js-2.0 (a strict ES5.1 subset — no optional chaining,
 * no let/const, var declarations are hoisted to the top of the function).
 * Deploy with `aws cloudfront create-function ... --function-config Comment=...,Runtime=cloudfront-js-2.0`
 * and attach to the default cache behaviour as viewer-request.
 */
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var headers = request.headers;
  var raw;
  var startsEn;
  var startsJa;

  if (uri === '/' || uri === '') {
    raw = (headers['accept-language'] && headers['accept-language'].value) || '';
    startsEn = /^\s*en\b/i.test(raw);
    startsJa = /^\s*ja\b/i.test(raw);
    if (startsJa && !startsEn) {
      return {
        statusCode: 302,
        statusDescription: 'Found',
        headers: { location: { value: '/ja' } },
      };
    }
  }

  // Normalize trailing slash on non-root paths.
  if (uri.length > 1 && uri.charAt(uri.length - 1) === '/') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: uri.slice(0, -1) } },
    };
  }

  return request;
}
