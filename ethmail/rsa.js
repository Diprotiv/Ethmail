const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

console.log('Private Key: ', key.exportKey(['private']));
console.log('Public Key: ', key.exportKey(['public']));
const text = 'Hello RSA!';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);
