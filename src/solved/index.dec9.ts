"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_9_pt1());
    console.log(solve_dec_9_pt2());
};

module.exports = {
    start
};


const solve_dec_9_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec9.txt', 'utf8');
        const lines = data.split('\n');

        let cipher = {preamble : [], valid: new Set()};
        for(let line of lines){
            let valid = checkLine(cipher, parseInt(line));
            if (!valid) {
                console.log(cipher);
                console.log("Found it! " + line);
                break;
            }
        }
        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const checkLine = (cipher: any, line: number) => {
    if (cipher.preamble.length < 25) {
        cipher.preamble.push(line);
    } else {
        if (!cipher.valid.has(line)) return false;
        cipher.preamble.shift();
        cipher.preamble.push(line);
    }
    cipher.valid = assembleValidList(cipher.preamble);
    return true;
}

const assembleValidList = (preamble: []) => {
    let valid = new Set();
    for(let i = 0; i < preamble.length; i++){
        for(let j = 0; j < preamble.length; j++){
            if (i === j) continue;
            valid.add(preamble[i] + preamble[j]);
        }
    }
    return valid;
}

const solve_dec_9_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec9.txt', 'utf8');
        const lines = data.split('\n').map(o => parseInt(o));

        let target = 22406676;
        // let target = 127;
        for(let i = 0; i < lines.length; i++){
            let sum = 0;
            let pos = i;
            while (sum < target){
                sum += lines[pos];
                pos += 1;
            }
            if (sum === target) {
                pos -= 1;
                console.log("@@@@@@ Found it!");
                console.log(i + " to " + pos);
                let min = target;
                let max = 0;
                for(let j = i; j <= pos; j++){
                    if (lines[j] > max) max = lines[j];
                    if (lines[j] < min) min = lines[j];
                }
                console.log(min + ", " + max);
                return min + max;
                break;
            }
        }

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



