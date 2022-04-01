const crypto = require('crypto');

// https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
function randomToken() {
    const cryptoToken = crypto.randomBytes(8).toString('hex');
    return cryptoToken;
}

module.exports = { randomToken };