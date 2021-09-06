import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();



// 4BT board id:
let boardId = '5f622509e65281827b2e2e59'

function getBoard(): any {
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

function getListsOnBoard(boardId: number): any {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${process.env.key}&token=${process.env.token}`)
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error: string) => {
                console.log(error);
                reject(error);
            })
    })
}

function getCardsOnList(listId: string): any {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${process.env.key}&token=${process.env.token}`)
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error: string) => {
                console.log(error);
                reject(error);
            })
    })
}

function updateCard(cardId: string, description: string): any {
    return new Promise((resolve, reject) => {
        axios.put(`https://api.trello.com/1/cards/${cardId}?key=${process.env.key}&token=${process.env.token}`, {desc: description})
            .then((response: any) => {
                resolve(response.data);
            })
            .catch((error: string) => {
                console.log(error);
                reject(error);
            })
    })
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

    // Print all lists with ids
    //let boardId = (await getBoard()).id;
    //console.log(await getListsOnBoard(boardId));

    // List id for the last list (info list)
    //let listId = '5f62492f4609835edf8246a0';
    // List all cards for the list
    //console.log(await getCardsOnList(listId));

    // Trello punkte card id
    let cardId = '612bf2f72bddfb5b332069ab';

    let promiseArray = [];
    for(let i = 0; i < members.length; i++) {
        promiseArray.push(output(members[i].idMember));
    }

    let resultString: string = '';
    Promise.all(promiseArray)
        .then( async (info) => {
            resultString = (info.sort((a: any , b: any): number => +!(a[1] > b[1]))).join('\n').toString();
            // Make string more readable
            resultString = resultString.replace(/\,/g, ' ');
            console.log(resultString);
            await updateCard(cardId, resultString);
        });

})();

module.exports = getBoard;