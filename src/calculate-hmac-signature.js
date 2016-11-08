'use strict';

var crypto = require('crypto');

module.exports = function calculateHmacSignature(key, text, encoding) {
  encoding = encoding || 'hex';

  if (!key) {
    throw new Error('calculateHmacSignature: missing parameter "key"');
  }

  if (text == null) {
    throw new Error('calculateHmacSignature: missing parameter "text"');
  }

  var hmac = crypto.createHmac('sha256', key);
  hmac.update(text);
  return hmac.digest(encoding);
};
