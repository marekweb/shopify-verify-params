/**
 * @jsdom-environment node
 */

const calculateHmacSignature = require('./src/calculate-hmac-signature');
const calculatePayloadHmacSignature = require('./src/calculate-payload-hmac-signature');
const verifyPayload = require('./src/verify-payload');
const verifyParams = require('./src/verify-params');

test('calculateHmacSignature should match Shopify docs example', () => {
  const text =
    'code=0907a61c0c8d55e99db179b68161bc00&shop=some-shop.myshopify.com&timestamp=1337178173';
  const key = 'hush';
  const hmac = calculateHmacSignature(key, text);
  expect(hmac).toBe(
    '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20'
  );
});

test('calculatePayloadHmacSignature should match Shopify docs example', () => {
  const payload = {
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  const key = 'hush';

  const hmac = calculatePayloadHmacSignature(key, payload);

  expect(hmac).toBe(
    '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20'
  );
});

test('verifyPayload should work with the Shopify docs example', () => {
  const payload = {
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  const hmac =
    '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20';

  expect(verifyPayload(hmac, 'hush', payload)).toBeTruthy();
  expect(verifyPayload(hmac, 'mush', payload)).toBeFalsy();
  expect(verifyPayload(hmac, 'mush', null)).toBeFalsy();
  expect(verifyPayload(hmac, 'mush', {})).toBeFalsy();
  expect(verifyPayload('asdf', 'hush', payload)).toBeFalsy();
  expect(verifyPayload('asdf', 'hush', payload)).toBeFalsy();
  expect(verifyPayload('null', 'hush', payload)).toBeFalsy();
});

test('verifyParams should work with the Shopify docs example', () => {
  const payload = {
    hmac: '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20',
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  expect(verifyParams('hush', payload)).toBeTruthy();

  expect(verifyParams('hosh', payload)).toBeFalsy();
  expect(verifyParams('hush', null)).toBeFalsy();
  expect(verifyParams('hush', {})).toBeFalsy();
});

test('verifyParams should ignore signature parameter', () => {
  const payload = {
    hmac: '4712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20',
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173,
    signature: '4d20a2730c82baf2'
  };

  expect(verifyParams('hush', payload)).toBeTruthy();
});

test('verifyParams should reject the Shopify docs example with incorrect signature', () => {
  const payload = {
    hmac: 'x712bf92ffc2917d15a2f5a273e39f0116667419aa4b6ac0b3baaf26fa3c4d20',
    code: '0907a61c0c8d55e99db179b68161bc00',
    shop: 'some-shop.myshopify.com',
    timestamp: 1337178173
  };

  expect(verifyParams('hush', payload)).toBeFalsy();
  expect(verifyParams('hosh', payload)).toBeFalsy();
  expect(verifyParams('hush', null)).toBeFalsy();
  expect(verifyParams('hush', {})).toBeFalsy();
});
