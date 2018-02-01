const verifyPayload = require('./verify-payload');

module.exports = function verifyParams(signingKey, payload) {
  if (!payload) {
    return false;
  }

  const { hmac, signature, } = payload;
  const payloadWithoutHmac = omitted(payload, ['hmac', 'signature']);

  if (!hmac) {
    return false;
  }

  return verifyPayload(hmac, signingKey, payloadWithoutHmac);
};

function omitted(object, properties) {
  const copy = {};
  for (const key in object) {
    if (!properties.includes(key)) {
      copy[key] = object[key];
    }
  }
  return copy;
}
