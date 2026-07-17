/*
 * CloudFront viewer-request function.
 *
 * Behaviour:
 *   - On root requests ("/" or empty), look at Accept-Language and 302
 *     to "/ja" if the visitor's preferred language begins with "ja".
 *     A `lang` query parameter (the site's language switch links to
 *     "/?lang=en") is an explicit human choice and skips negotiation.
 *   - Strip a trailing slash from any other path (Astro builds with
 *     `trailingSlash: 'never'`; canonical URLs have no trailing slash).
 *   - Rewrite extensionless paths to their directory index object
 *     ("/ja" -> "/ja/index.html"). Astro emits directory-format output,
 *     and an OAC REST origin has no directory-index concept — the
 *     distribution's default root object only covers "/".
 *   - Redirects preserve the query string.
 *
 * Runtime: cloudfront-js-2.0. The code deliberately sticks to plain ES5
 * constructs so it stays trivially portable and reviewable.
 * Deploy with `aws cloudfront create-function ... --function-config Comment=...,Runtime=cloudfront-js-2.0`
 * and attach to the default cache behaviour as viewer-request.
 */
function serializeQuery(querystring) {
  var keys = Object.keys(querystring || {});
  var parts = [];
  var i;
  var key;
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    // multiValue entries carry extra values; the first value is enough here.
    parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(querystring[key].value));
  }
  return parts.length ? '?' + parts.join('&') : '';
}

function redirect(code, description, location) {
  return {
    statusCode: code,
    statusDescription: description,
    headers: { location: { value: location } },
  };
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;
  var headers = request.headers;
  var qs = serializeQuery(request.querystring);
  var raw;

  // Locale negotiation on the root only. An explicit `lang` parameter wins.
  if ((uri === '/' || uri === '') && !(request.querystring && request.querystring.lang)) {
    raw = (headers['accept-language'] && headers['accept-language'].value) || '';
    if (/^\s*ja\b/i.test(raw)) {
      return redirect(302, 'Found', '/ja' + qs);
    }
  }

  // Normalize trailing slash on non-root paths.
  if (uri.length > 1 && uri.charAt(uri.length - 1) === '/') {
    return redirect(301, 'Moved Permanently', uri.slice(0, -1) + qs);
  }

  // Clean URL -> directory index object.
  if (uri !== '/' && uri !== '' && uri.split('/').pop().indexOf('.') === -1) {
    request.uri = uri + '/index.html';
  }

  return request;
}
