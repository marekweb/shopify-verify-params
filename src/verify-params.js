const verifyPayload = require('./verify-payload');

module.exports = function verifyParams(signingKey, payload) {
  if (!payload) {
    return false;
  }

  const { hmac, signature, ...payloadWithoutHmac } = payload;

  if (!hmac) {
    return false;
  }

  return verifyPayload(hmac, signingKey, payloadWithoutHmac);
};
