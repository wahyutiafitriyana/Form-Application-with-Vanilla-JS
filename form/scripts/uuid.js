!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = t || self).uuidv4 = e());
})(this, function () {
  'use strict';
  var t =
      ('undefined' != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      ('undefined' != typeof msCrypto &&
        'function' == typeof msCrypto.getRandomValues &&
        msCrypto.getRandomValues.bind(msCrypto)),
    e = new Uint8Array(16);
  function n() {
    if (!t)
      throw new Error(
        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
      );
    return t(e);
  }
  for (var o = [], r = 0; r < 256; ++r) o[r] = (r + 256).toString(16).substr(1);
  return function (t, e, r) {
    var u = (e && r) || 0;
    'string' == typeof t &&
      ((e = 'binary' === t ? new Array(16) : null), (t = null));
    var i = (t = t || {}).random || (t.rng || n)();
    if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), e))
      for (var d = 0; d < 16; ++d) e[u + d] = i[d];
    return (
      e ||
      (function (t, e) {
        var n = e || 0,
          r = o;
        return [
          r[t[n++]],
          r[t[n++]],
          r[t[n++]],
          r[t[n++]],
          '-',
          r[t[n++]],
          r[t[n++]],
          '-',
          r[t[n++]],
          r[t[n++]],
          '-',
          r[t[n++]],
          r[t[n++]],
          '-',
          r[t[n++]],
          r[t[n++]],
          r[t[n++]],
          r[t[n++]],
          r[t[n++]],
          r[t[n++]],
        ].join('');
      })(i)
    );
  };
});
