"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    console.log(solve_dec_3_pt1());
    // console.log(solve_dec_3_pt2());
};

module.exports = {
    start
};


const solve_dec_3_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec3.txt', 'utf8');
        const lines = data.split('\n');
        let posX = 0;
        let posY = 0;
        let trees = 0;
        while (posY < lines.length - 1){
            posX += 1;
            posY += 2;
            let line =  lines[posY];
            let spot = lines[posY].split('')[posX % line.length];
            let disposition = "O";
            if (spot === "#") {
                disposition = "X";
                trees +=1;
            }
            console.log("(" + posX + ", " + posY + ") : " + disposition);
        }
        // Right 3 Down 1 - 299
        // Right 1 Down 1 - 67
        // Right 5 Down 1 - 67
        // Right 7 Down 1 - 71
        // Right 1 Down 2 - 38
        // 3621285278
        return trees;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_3_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec3.txt', 'utf8');
        const lines = data.split('\n');

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



