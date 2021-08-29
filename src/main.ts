import axios from 'axios';

import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });



// 4BT board id:
let boardId = '5f622509e65281827b2e2e59'

function getBoard() {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/members/me/boards?key=${process.env.key}&token=${process.env.token}`)
            .then((response: any) => {
                let board = response.data.find((object: any) => object.name === '4BT');
                resolve(board);
            })
            .catch((error: string) => {
                console.log(error);
                reject(error);
            });
    });
}

function getMembers(): any {
    return new Promise((resolve, reject) => {
        getBoard()
        .then((board: any) => {
            resolve(board.memberships);
        });
    });
}

function getCardsMemberIsOn(memberId: number) {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/members/${memberId}/cards?key=${process.env.key}&token=${process.env.token}&filter=all`)
            .then((response: any) => {
                resolve(response.data)
            })
            .catch((error: string) => {
                console.log(error);
                reject(error);
            });
    });
}

function getMemberInfo(memberId: number): any {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/members/${memberId}?key=${process.env.key}&token=${process.env.token}`)
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error: string) => {
                console.log(error);
                reject(error);
            })
    });
}

function output(memberId: number): any {
    return new Promise(async (resolve, reject) => {
        let name = (await getMemberInfo(memberId)).username;
        let cards: any = await getCardsMemberIsOn(memberId);
        cards = cards.filter((obj: any) => obj.idBoard === boardId);
        resolve([name, cards.length]);
    });
}

( async () => {

    let members: any[] = await getMembers();


    let promiseArray = [];
    for(let i = 0; i < members.length; i++) {
        promiseArray.push(output(members[i].idMember));
    }

    let results = Promise.all(promiseArray)
        .then((info) => {
            console.log( info.sort((a: any , b: any): number => +!(a[1] > b[1])) );
        });

})();

module.exports = getBoard;