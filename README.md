# Check Shopify Params (HMAC verification)

The `shopify-verify-params` verifies the HMAC signature of a set of Shopify parameters.

## Why?

When the Shopify API passes parameters to a Shopify app, it uses a cryptographic signature (using the HMAC algorithm) for security, to prove that the data came from Shopify and not from a malicious impostor.

When a payload is signed in this way, it contains a special parameter called `hmac` which is the HMAC signature of the payload. The authenticity of the payload can then be determined by verifying this HMAC signature, using a secret key that is shared only between Shopify and the Shopify app. This secret key is also known as the Shared Secret and it also plays a role in the OAuth process.

If you're building a Shopify app and you don't verify the parameters that you receive from Shopify, then your app may be vulnerable to attacks that could potentially compromise its security.

## When to use it?

Shopify provides HMAC-signed parameters in these cases:

- **The OAuth callback.** When a user completes the OAuth authorization screen (by accepting to install a Shopify app to their store) the subsequent redirect contains HMAC-signed parameters which prove that the request is authentic.
- **The EASDK frame request.** When an EASDK-enabled Shopify app is loaded in an iframe in the admin interface, the parameters are HMAC-signed to prove that the app is actually being loaded in the Shopify interface.

## Usage

Call the verification function on the query parameters object. The function returns true if the params are signed and valid, or false otherwise.

The following is an hypothetical (and incomplete) example in an Express handler.

```js
var verifyParams = require('shopify-verify-params');

app.get('/oauth/callback',function(req, res, next) {
  // Inside of an Express handler.
  // Verify the query parameters contained in req.query
  var isVerified = verifyParams(req.query);

  // If the params can't be verified, then abort.
  if (!isVerified) {
    res.send('Cannot verify the params!');
    return;
  }
  
  // Otherwise, continue to handle the request.
  // ...
});
```
