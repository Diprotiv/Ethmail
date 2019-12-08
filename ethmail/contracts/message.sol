pragma solidity ^0.4.23;

contract MessageBoard {
    string[] public messages;

    function writeMessage(string memory message) public {
      messages.push(message);
    }

    function clearChats() public {
      delete messages;
    }
}
