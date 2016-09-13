const crypto = require('crypto');

module.exports = function calculateHmacSignature(key, text, encoding = 'hex') {
  if (!key) {
    throw new Error('calculateHmacSignature: missing parameter "key"');
  }

  if (!text) {
    throw new Error('calculateHmacSignature: missing parameter "text"');
  }

  const hmac = crypto.createHmac('sha256', key);
  hmac.update(text);
  return hmac.digest(encoding);
};
