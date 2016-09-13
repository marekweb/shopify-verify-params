const test = require('tape');

const calculateHmacSignature = require('./src/calculate-hmac-signature');
const calculatePayloadHmacSignature = require('./src/calculate-payload-hmac-signature');
const verifyPayload = require('./src/verify-payload');
const verifyParams = require('./src/verify-params');

test('calculateHmacSignature should match Shopify docs example', t => {
  const text = 'code=0907a61c0c8d55e99db179b68161bc00&shop=some-shop.myshopify.com&timestamp=1337178173';
  const key = 'hush';
  const hmac = calculateHmacSignature(key, text);
  console.log(hmac);
  t.equal(hmac, '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20');

  t.end();
});

test('calculatePayloadHmacSignature should match Shopify docs example', t => {
  const payload = {
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  const key = 'hush';

  const hmac = calculatePayloadHmacSignature(key, payload);

  t.equal(hmac, '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20');

  t.end();
});

test('verifyPayload should work with the Shopify docs example', t=> {
  const payload = {
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  const hmac = '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20';

  const key = 'hush';

  t.ok(verifyPayload(hmac, key, payload));

  t.end();
});

test('verifyParams should work with the Shopify docs example', t => {
  const payload = {
    hmac: '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20',
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  const key = 'hush';

  t.ok(verifyParams(key, payload));

  t.end();
});
