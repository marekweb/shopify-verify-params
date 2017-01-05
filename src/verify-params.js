'use strict';

var _ = require('lodash');
var verifyPayload = require('./verify-payload');

module.exports = function verifyParams(signingKey, payload) {
  if (!payload) {
    return false;
  }

  var providedSignature = payload.hmac;

  if (!providedSignature) {
    return false;
  }

  // Make a copy of the payload, and remove the hmac and signature params.
  var payloadWithoutSignature = _.omit(payload, ['hmac', 'signature']);

  return verifyPayload(providedSignature, signingKey, payloadWithoutSignature);
};
