var NodeRSA = require('node-rsa');

// usage in code: (nodeRsa is a variable of this)
// nodeRsa.encrypt(plainData) or nodeRsa.encrypt(plainData, rsaPublicKey)
const encrypt = function(key) {
    switch (arguments.length) {
        case 1:
            return key.encrypt(arguments[0], 'base64');

        case 2:
            tempKey = new NodeRSA();
            tempKey.importKey(arguments[1], 'pkcs8-public-pem');

            return tempKey.encrypt(arguments[0], 'base64');

        default:
            return null;
    }
};

const decrypt = function(key, cipherText) {
    return key.decrypt(cipherText, 'utf8');
};

const getPublicKey = function(key) {
    return key.exportKey('pkcs8-public-pem');
};

module.exports = NodeRSA;
module.exports = {
  'encrypt': encrypt,
  'decrypt': decrypt,
  'getPublicKey': getPublicKey
};
