require('dotenv').config();
const axios = require('axios');


// 4BT board id:
// let boardId = '5f622509e65281827b2e2e59'

function getBoard() {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/members/me/boards?key=${process.env.key}&token=${process.env.token}`)
            .then(response => {
                let board = response.data.find(object => object.name === '4BT');
                resolve(board);
            })
            .catch(error => {
                console.log(error);
            });
    });
}

( async () => {

    console.log( await getBoard());

})();

module.exports = getBoard;