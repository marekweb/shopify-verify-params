'use strict';

var calculatePayloadHmacSignature = require('./calculate-payload-hmac-signature');

module.exports = function verifyPayload(providedSignature, signingKey, payload) {
  var calculatedSignature = calculatePayloadHmacSignature(signingKey, payload);
  return calculatedSignature && calculatedSignature === providedSignature;
};
