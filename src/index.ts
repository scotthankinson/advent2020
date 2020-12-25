"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    console.log(solve_dec_25_pt1());
    // console.log(solve_dec_25_pt2());
};

module.exports = {
    start
};


const solve_dec_25_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec25.txt', 'utf8');
        const lines = data.split('\n');
        let card = parseInt(lines[0]);
        let door = parseInt(lines[1]);
        let SUBJECT_NUMBER = 7;

        console.log("Processing for " + card + ": " + door);
        let test = 1;
        let cardLoop = 0;
        for(let i = 1; i < 100000000; i++){
            test = test * SUBJECT_NUMBER % 20201227;
            // console.log(test);
            if (test === card){
                console.log(i + " is the card LOOP NUMBER!");
                cardLoop = i;
                break;
            }
        }
        test = 1;
        let doorLoop = 0;
        for(let i = 1; i < 100000000; i++){
            test = test * SUBJECT_NUMBER % 20201227;
            // console.log(test);
            if (test === door){
                console.log(i + " is the door LOOP NUMBER!");
                doorLoop = i;
                break;
            }
        }
        console.log("--------------------");

        // 14775052 is the card LOOP NUMBER!
        // 12413864 is the door LOOP NUMBER!

        let cardResult = 1;
        for(let i = 1; i <= cardLoop; i++){
            cardResult = door * cardResult % 20201227;
        }
        console.log("Card Result: " + cardResult);
        let doorResult = 1;
        for(let i = 1; i <= doorLoop; i++){
            doorResult = card * doorResult % 20201227;
        }
        console.log("Door Result: " + doorResult);

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_25_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec25.txt', 'utf8');
        const lines = data.split('\n');

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



