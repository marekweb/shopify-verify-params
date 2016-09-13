const calculateHmacSignature = require('./calculate-hmac-signature');

module.exports = function calculatePayloadHmacSignature(key, payload) {
  if (!key) {
    throw new Error('calculatePayloadHmacSignature: missing key parameter');
  }

  if (!payload) {
    throw new Error('calculatePayloadHmacSignature: missing payload parameter');
  }

  var keys = Object.keys(payload).sort();
  var text = keys.map(key => `${key}=${payload[key]}`).join('&');

  return calculateHmacSignature(key, text, 'hex');
};
