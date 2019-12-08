
const MessageBoard = require('Embark/contracts/MessageBoard');

config({
  contracts: {
    "MessageBoard": {
    }
  }
});

contract("MessageBoard", function () {
  this.timeout(0);

  it("writes a message", async function () {
    await MessageBoard.methods.writeMessage("Testing the writing part").send();
    console.log(MessageBoard);
    let result = await MessageBoard.messages(0).call([]);
    assert.strictEqual(result, "Testing the writing part");
  });

});
