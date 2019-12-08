import EmbarkJS from 'Embark/EmbarkJS';
import MessageBoard from 'Embark/contracts/MessageBoard';
import $ from 'jquery';
// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';


EmbarkJS.onReady((err) => {
  // You can execute contract calls after the connection
  $(document).ready(() => {
    $('#writeMessage button').click(() => {
      console.log('[INFO]Getting a message...');
      MessageBoard.methods.writeMessage(
        $('#writeMessage input').val()
      ).send();
    });

    $('#readMessages button').click(() => {
      readMessages();
    });

    $('#clearChats button').click(() => {
      clearChats();
    });
  });
});

const readMessages = () => {
  for(var i = 0; i < 10; i++) {
    readMessage(i);
  }
}

const readMessage = (messageIndex) => {
  $('#message').empty();
  MessageBoard.methods.messages(messageIndex).call().then((message) => {
    console.log('[INFO] fetching the message body...');
    console.log('[INFO] data: ' + message);
    $('#message').append('<div>' + message + '</div>');
  });
}

const clearChats = () => {
  $('#message').empty();
  MessageBoard.methods.clearChats().call().then(() => {
    console.log('[INFO] deleted previous messages...');
  });
}
