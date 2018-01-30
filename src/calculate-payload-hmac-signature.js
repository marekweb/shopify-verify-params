const calculateHmacSignature = require('./calculate-hmac-signature');

module.exports = function calculatePayloadHmacSignature(key, payload) {
  if (!key) {
    throw new Error('calculatePayloadHmacSignature: missing key parameter');
  }

  if (!payload) {
    return '';
  }

  const keys = Object.keys(payload).sort();
  const text = keys.map(key =>
    `${key}=${payload[key]}`
  ).join('&');

  return calculateHmacSignature(key, text);
};
