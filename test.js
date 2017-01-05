var test = require('tape');

var calculateHmacSignature = require('./src/calculate-hmac-signature');
var calculatePayloadHmacSignature = require('./src/calculate-payload-hmac-signature');
var verifyPayload = require('./src/verify-payload');
var verifyParams = require('./src/verify-params');

test('calculateHmacSignature should match Shopify docs example', function (t) {
  var text = 'code=0907a61c0c8d55e99db179b68161bc00&shop=some-shop.myshopify.com&timestamp=1337178173';
  var key = 'hush';
  var hmac = calculateHmacSignature(key, text);
  t.equal(hmac, '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20');

  t.end();
});

test('calculatePayloadHmacSignature should match Shopify docs example', function (t) {
  var payload = {
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  var key = 'hush';

  var hmac = calculatePayloadHmacSignature(key, payload);

  t.equal(hmac, '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20');

  t.end();
});

test('verifyPayload should work with the Shopify docs example', function (t) {
  var payload = {
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  var hmac = '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20';

  t.ok(verifyPayload(hmac, 'hush', payload));
  t.notOk(verifyPayload(hmac, 'mush', payload));
  t.notOk(verifyPayload(hmac, 'mush', null));
  t.notOk(verifyPayload(hmac, 'mush', {}));
  t.notOk(verifyPayload('asdf', 'hush', payload));
  t.notOk(verifyPayload('asdf', 'hush', payload));
  t.notOk(verifyPayload('null', 'hush', payload));

  t.end();
});

test('verifyParams should work with the Shopify docs example', function (t) {
  var payload = {
    hmac: '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20',
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  t.ok(verifyParams('hush', payload));

  t.notOk(verifyParams('hosh', payload));
  t.notOk(verifyParams('hush', null));
  t.notOk(verifyParams('hush', {}));

  t.end();
});

test('verifyParams should ignore signature parameter', function (t) {
  var payload = {
    hmac: '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20',
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173,
    signature: '4d20a2730c82baf2'
  };

  t.ok(verifyParams('hush', payload));
  t.end();
});

test('verifyParams should reject the Shopify docs example with incorrect signature', function (t) {
  var payload = {
    hmac: 'x712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20',
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  t.notOk(verifyParams('hush', payload));
  t.notOk(verifyParams('hosh', payload));
  t.notOk(verifyParams('hush', null));
  t.notOk(verifyParams('hush', {}));

  t.end();
});
