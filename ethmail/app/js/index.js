import EmbarkJS from 'Embark/EmbarkJS';
import AccountBoard from 'Embark/contracts/AccountBoard';
import MessageBoard from 'Embark/contracts/MessageBoard';
import $ from 'jquery';
const JSEncrypt = require('jsencrypt');
// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';


EmbarkJS.onReady((err) => {
  // You can execute contract calls after the connection
  $(document).ready(() => {
    $('#messages').click(() =>{
      $('#messages').empty();
    });
    $('#signupForm button').click(() => {
      console.log('[INFO]Getting details for a new account...')

      var crypt = new JSEncrypt.JSEncrypt();
      var privateKey = crypt.getPrivateKey();
      var publicKey = crypt.getPublicKey();
      var account = {
        'address': $('#ethAddress').val(),
        'name': $('#name').val(),
        'publicKey': publicKey
      };
      $('#ethAddress').empty();
      $('#name').empty();

      AccountBoard.methods.setAccount(account.address, account.publicKey, account.name).send();
      console.log(account.publicKey);
      console.log('[INFO]Private key has been saved...');
      console.log(privateKey);
      $('#signupForm').hide();
      document.getElementById('signupSuccessful').hidden = false;
      document.getElementById('messageFeature').hidden = false;
    });



    $('#sendMessage button').click(() => {

      console.log('[INFO]Preparing a message...');
      var sendEthAddress = $('#sendEthAddress').val();
      var sendData = $('#sendData').val();
      $('#sendEthAddress').empty();
      $('#sendData').empty();

      /*
      const encrypt = new JSEncrypt.JSEncrypt();
      encrypt.setKey(sendEthAddress);
      var encrypted = encrypt.encrypt('Hello').toString();
      const decrypt = new JSEncrypt.JSEncrypt();
      decrypt.setKey(sendData);
      var decrypted = decrypt.decrypt(encrypted);
      console.log(sendEthAddress);
      console.log(sendData);
      console.log('Hello');
      console.log(encrypted);
      console.log(decrypted);
      */
      AccountBoard.methods.getAccount(sendEthAddress).call().then((publicKey) => {
        console.log('[INFO]Fetching receiver completed...')
        const encrypt = new JSEncrypt.JSEncrypt();
        encrypt.setKey(publicKey.toString());
        var encrypted = encrypt.encrypt(sendData).toString();
        MessageBoard.methods.writeMessage(encrypted).send();
        alert('Message sent successfully!');
      });
      //
    });

    $('#readMessages').click(() => {
      $('#messages').empty();
      console.log('[INFO]Getting the number of messages...');
      MessageBoard.methods.count().call().then((c) => {
        console.log(c);
        readMessages(c);
      });
    });

  });
});

const generateKey = () => {
  return new NodeRSA( { b: 2048 } );
}

const readMessages = (count) => {
  for(var i = 0; i < count; i++) {
    readMessage(i);
  }
  $('#privateKey').empty();
}

const readMessage = (messageIndex) => {

  MessageBoard.methods.messages(messageIndex).call().then((encrypted) => {
    console.log('[INFO]Fetching the message body...');
    const decrypt = new JSEncrypt.JSEncrypt();
    decrypt.setKey($('#privateKey').val());
    var decrypted = decrypt.decrypt(encrypted);
    console.log('[INFO]Decrypting the data: ' + decrypted);
    // display the messages
    var tempMessage = $('#message').clone()
    tempMessage.empty();
    tempMessage.append(decrypted);
    tempMessage.show();
    $('#messages').append(tempMessage);
  });
}
