const calculatePayloadHmacSignature = require('./calculate-payload-hmac-signature');

module.exports = function verifyPayload(providedSignature, signingKey, payload) {
  const calculatedSignature = calculatePayloadHmacSignature(signingKey, payload);
  return calculatedSignature && calculatedSignature === providedSignature;
};
