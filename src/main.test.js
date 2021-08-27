const getBoard = require('./main');

test('Getting 4BT Board', async () => {
    let boardId = '5f622509e65281827b2e2e59'
    expect( (await getBoard()).id).toBe(boardId);
})