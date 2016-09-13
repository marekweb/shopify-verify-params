const verifyPayload = require('./verify-payload');

module.exports = function verifyParams(signingKey, payload) {
  if (!payload) {
    return false;
  }

  const providedSignature = payload.hmac;

  if (!providedSignature) {
    return false;
  }

  // Make a copy of the payload, and remove the hmac and signature params.
  const payloadWithoutSignature = Object.assign({}, payload);

  delete payloadWithoutSignature.hmac;
  delete payloadWithoutSignature.signature;
  
  return verifyPayload(providedSignature, signingKey, payloadWithoutSignature);
};
