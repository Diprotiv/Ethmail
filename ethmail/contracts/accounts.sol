pragma solidity ^0.4.23;

contract AccountBoard {
    struct Account {
      string publicKey;
      string name;
    }
    mapping (address => Account) public accounts;
    address[] public userAccounts;
    function setAccount(address _address, string _publicKey, string _name) {
      Account storage account;
      account.publicKey = _publicKey;
      account.name = _name;
      accounts[_address] = account;
      userAccounts.push(_address);
    }
    function getAccounts() public returns (address[]) {
      return userAccounts;
    }
    function getAccount(address acc) public returns (string) {
      return accounts[acc].publicKey;
    }
}
