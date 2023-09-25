describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    submitServerInfo();
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    // submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should create tr element and pass to appendTd() with updateServerTable()', function () {
    // submitServerInfo();
    updateServerTable();

    //get the child of the table body to get the table rows
    const table = serverTbody.firstChild;
    expect(table.children[0].innerHTML).toEqual('Alice');
    expect(table.children[1].innerHTML).toEqual('$0.00');
  });

  it('should add a delete "X" tr element with appendDeleteBtn(tr) on updateServerTable()', function () {
    const table = serverTbody.firstChild;
    expect(table.children[2].innerHTML).toEqual('X');
  });

  afterEach(function() {
    // teardown logic
    serverId = 0; //reset server unique ID
    serverTbody.innerHTML = ''; //reset server table
    allServers = {}; //reset list of all servers
  });
});
