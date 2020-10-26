export function createClientKey () {
  let clientKey = {}
  return new Promise((resolve, reject) => {
    window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 1024, // can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: 'SHA-256' } // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, // whether the key is extractable (i.e. can be used in exportKey)
      ['encrypt', 'decrypt'] // must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
    ).then(function (key) {
      // returns a keypair object
      window.crypto.subtle
        .exportKey(
          'pkcs8', // can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
          key.privateKey // can be a publicKey or privateKey, as long as extractable was true
        )
        .then(function (keydata) {
          // returns the exported key data
          clientKey.private = bin2text(keydata)
          window.crypto.subtle
            .exportKey(
              'spki', // can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
              key.publicKey // can be a publicKey or privateKey, as long as extractable was true
            )
            .then(function (keydata) {
              // returns the exported key data
              clientKey.public = bin2text(keydata)
              resolve(clientKey)
            })
            .catch(function (err) {
              reject(err)
            })
        })
        .catch(function (err) {
          reject(err)
        })
    })
      .catch(function (err) {
        reject(err)
      })
  })
}

function bin2text (bin) {
  return btoa(String.fromCharCode(...new Uint8Array(bin)))
}
