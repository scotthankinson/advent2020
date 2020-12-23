"use strict";
// tslint:disable
import fs = require('fs');
import { slice } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_22_pt1());
    console.log(solve_dec_22_pt2());
};

module.exports = {
    start
};


const solve_dec_22_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec22.txt', 'utf8');
        const lines = data.split('\n');
        let player1 = [];
        let player2 = [];
        let loading1 = false;
        for(let line of lines){
            if (line === 'Player 1:'){
                loading1 = true;
                continue;
            } 
            if (line === 'Player 2:') {
                loading1 = false;
                continue;
            }
            if (line.trim().length === 0) continue;
            if (loading1) player1.push(parseInt(line));
            else player2.push(parseInt(line));
        }
        console.log(player1);
        console.log(player2);

        while(player1.length > 0 && player2.length > 0){
            const card1 = player1.shift();
            const card2 = player2.shift();
            if (card1 > card2) {
                player1.push(card1);
                player1.push(card2);
            } else {
                player2.push(card2);
                player2.push(card1);
            }
        }

        let winner = player1.length > 0 ? player1.reverse() : player2.reverse();
        let score = 0;
        for(let i = 0; i < winner.length; i++){
            score += (i + 1) * winner[i];
        }
        
        return score;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_22_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec22.txt', 'utf8');
        const lines = data.split('\n');
        let player1 = [];
        let player2 = [];
        let loading1 = false;
        for(let line of lines){
            if (line === 'Player 1:'){
                loading1 = true;
                continue;
            } 
            if (line === 'Player 2:') {
                loading1 = false;
                continue;
            }
            if (line.trim().length === 0) continue;
            if (loading1) player1.push(parseInt(line));
            else player2.push(parseInt(line));
        }
        console.log(player1);
        console.log(player2);

        let result = playGame(player1, player2);
        console.log("@@@@@@@@@@@@@@@@@@@@@@");
        if (result.result) console.log("Player 1 Victorious!");
        else console.log("Player 2 Victorious!");

        let winner = result.winner.reverse();
        let score = 0;
        for(let i = 0; i < winner.length; i++){
            score += (i + 1) * winner[i];
        }
        
        return score;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const playGame = (player1, player2) => {
    let state = new Set();
    let repeatState = false;
    // let ticks = 0;
    while(player1.length > 0 && player2.length > 0){
        if (state.has(JSON.stringify({player1, player2}))){
            console.log("Player 1 wins by repetition!");
            repeatState = true;
            break;
        }
        state.add(JSON.stringify({player1, player2}));
        playHand(player1, player2);
        // ticks +=1;
        // if (ticks === 9) break;
    }

    if (repeatState || player2.length === 0) return {winner: player1, result: true };
    return {winner: player2, result: false };;
}
const playHand = (player1, player2) => {
    // console.log(player1);
    // console.log(player2);
    const card1 = player1.shift();
    const card2 = player2.shift();
    if (card1 <= player1.length && card2 <= player2.length) {
        console.log("Recursive Combat! " + card1 + " vs " + card2);
        let newPlayer1 = JSON.parse(JSON.stringify(player1)).slice(0, card1);
        let newPlayer2 = JSON.parse(JSON.stringify(player2)).slice(0, card2);
        let subgame = playGame(newPlayer1, newPlayer2);
        if (subgame.result) {
            console.log("Player 1 Wins!");
            player1.push(card1);
            player1.push(card2);
            return true;
        } else {
            console.log("Player 2 Wins!");
            player2.push(card2);
            player2.push(card1);
            return false;
        }
    }
    else {   
        console.log("Regular Combat! " + card1 + " vs " + card2);
        if (card1 > card2) {
            console.log("Player 1 Wins!");
            player1.push(card1);
            player1.push(card2);
            return true;
        } else {
            console.log("Player 2 Wins!");
            player2.push(card2);
            player2.push(card1);
            return false;
        }
    }
}



start();



