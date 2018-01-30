const crypto = require('crypto');

module.exports = function calculateHmacSignature(key, text = '') {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(text);
  return hmac.digest('hex');
};
