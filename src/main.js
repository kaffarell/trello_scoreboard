require('dotenv').config();
const axios = require('axios');

console.log(process.env.key);
console.log(process.env.token);

// 4BT board id:
let boardId = '5f622509e65281827b2e2e59'

axios.get(`https://api.trello.com/1/members/me/boards?key=${process.env.key}&token=${process.env.token}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });