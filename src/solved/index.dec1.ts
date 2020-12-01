"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_1_pt1());
    console.log(solve_dec_1_pt2());
};

module.exports = {
    start
};


const solve_dec_1_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec1.txt', 'utf8');
        const lines = data.split('\n');
        const numbers= lines.map(o => parseInt(o));
        let current = 0;
        while (current < numbers.length){
            for(let i = 0; i < numbers.length; i++){
                if (i === current) continue;
                if (numbers[i] + numbers[current] === 2020){
                    console.log("Found it!");
                    console.log(numbers[i] * numbers[current])
                    break;
                }
        
            }
            current += 1;
        }
        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_1_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec1.txt', 'utf8');
        const lines = data.split('\n');
        const numbers= lines.map(o => parseInt(o));
        let done = false;
        for(let i = 0; i < numbers.length; i++){
            if (done) break;
            for(let j = 0; j < numbers.length; j++){
                if (done) break;
                if (j == i) continue;
                for (let k = 0; k < numbers.length; k++){
                    if (k === j || k === i) continue;
                    if (numbers[i] + numbers[j] + numbers[k] === 2020){
                        console.log(i);
                        console.log(j);
                        console.log(k);
                        console.log(numbers[i] * numbers[j] * numbers[k]);
                        done = true;
                        break;
                    }
                }
            }
        }

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



