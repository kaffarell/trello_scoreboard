require('dotenv').config();
const axios = require('axios');


// 4BT board id:
let boardId = '5f622509e65281827b2e2e59'

function getBoard() {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/members/me/boards?key=${process.env.key}&token=${process.env.token}`)
            .then(response => {
                let board = response.data.find(object => object.name === '4BT');
                resolve(board);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

function getMembers() {
    return new Promise((resolve, reject) => {
        getBoard()
        .then((board) => {
            resolve(board.memberships);
        });
    });
}

function getCardsMemberIsOn(memberId) {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/members/${memberId}/cards?key=${process.env.key}&token=${process.env.token}&filter=all`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

function getMemberInfo(memberId) {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/members/${memberId}?key=${process.env.key}&token=${process.env.token}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
    });
}

function output(memberId) {
    return new Promise(async (resolve, reject) => {
        let name = (await getMemberInfo(memberId)).username;
        let cards = await getCardsMemberIsOn(memberId);
        cards = cards.filter(obj => obj.idBoard === boardId);
        resolve([name, cards.length]);
    });
}

( async () => {

    let members = await getMembers();


    let promiseArray = [];
    for(let i = 0; i < members.length; i++) {
        promiseArray.push(output(members[i].idMember));
    }

    let results = Promise.all(promiseArray)
        .then((info) => {
            console.log( info.sort((a, b) => a[1] > b[1]) );
        });

})();

module.exports = getBoard;