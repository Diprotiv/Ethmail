pragma solidity ^0.4.23;

contract MessageBoard {
    string[] public messages;
    uint public count;
    
    function writeMessage(string memory message) public {
      messages.push(message);
      count += 1;
    }


    function clearChats() public {
      delete messages;
    }
}
