import EmbarkJS from 'Embark/EmbarkJS';
import AccountBoard from 'Embark/contracts/AccountBoard';
import MessageBoard from 'Embark/contracts/MessageBoard';
import $ from 'jquery';
const NodeRSA = require('node-rsa');
const rsa = require('./rsa');
// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';


EmbarkJS.onReady((err) => {
  // You can execute contract calls after the connection
  $(document).ready(() => {
    $('#signupForm button').click(() => {
      console.log('[INFO]Getting details for a new account...')

      var key = generateKey();
      var account = {
        'address': $('#ethAddress').val(),
        'name': $('#name').val(),
        'publicKey': rsa.getPublicKey(key),
        'config': key,
      };

      console.log(account.address);
      $('#ethAddress').empty();
      $('#name').empty();
      AccountBoard.methods.setAccount(account.address, account.publicKey, account.name).send();
      alert('Your account has successfully been created!\n\n' + account.config.exportKey());
    });


    $('#sendMessage button').click(() => {
      MessageBoard.methods.writeMessage("Testing the writing part").send();
      console.log(MessageBoard);
      /*
      console.log('[INFO]Getting a message...');
      var sendEthAddress = $('#sendEthAddress').val();
      var sendData = $('#sendData').val();
      $('#sendEthAddress').empty();
      $('#sendData').empty();
      getReceiver(sendEthAddress);

      MessageBoard.methods.writeMessage(encrypt(getReceiver(sendEthAddress), sendData)
        $('#writeMessage input').val()
      ).send();
      */

    });

    $('#readMessages').click(() => {
      readMessages();
      /*
      console.log('[INFO]Reading user...');
      getReceiver('0x1aA53C1C86bE20EE239eF1dC8Ac9eB4219F6a590');
      */
    });

  });
});

const generateKey = () => {
  return new NodeRSA( { b: 2048 } );
}

const readMessages = () => {
  for(var i = 0; i < 10; i++) {
    readMessage(i);
  }
}

const getReceiver = (address) => {
  AccountBoard.methods.getAccount(address).call().then((publicKey, firstName, lastName) => {
    console.log(publicKey);
    console.log(firstName);
    console.log(lastName);
  });
  console.log('[INFO]Fetching completed...')
}
const readMessage = (messageIndex) => {

  MessageBoard.methods.messages(messageIndex).call().then((message) => {
    console.log('[INFO] fetching the message body...');
    console.log('[INFO] data: ' + message);
  });
}
