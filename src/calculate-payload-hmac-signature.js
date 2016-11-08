'use strict';

var _ = require('lodash');
var calculateHmacSignature = require('./calculate-hmac-signature');

module.exports = function calculatePayloadHmacSignature(key, payload) {
  if (!key) {
    throw new Error('calculatePayloadHmacSignature: missing key parameter');
  }

  if (!payload) {
    return '';
  }

  var keys = _.keys(payload).sort();
  var text = keys.map(function (key) {
    return key + '=' + payload[key];
  }).join('&');

  return calculateHmacSignature(key, text, 'hex');
};
