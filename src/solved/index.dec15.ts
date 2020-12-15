"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    console.log(solve_dec_15_pt1());
    // console.log(solve_dec_15_pt2());
};

module.exports = {
    start
};


const solve_dec_15_pt1 = () => {
    try {
        // let data = fs.readFileSync('src/test.dec15.txt', 'utf8');
        // const lines = data.split('\n');
        let input = '2,20,0,4,1,17'.split(',');
        let time = input.length + 1;
        let last = input[input.length - 1];
        let history = new Map();
        for(let i = 0; i < input.length; i++){
            history[input[i]] = [i + 1];
        }

        while(time < 30000001){
            if (time % 1000000 === 0) console.log("@@@@ " + time + " last " + last);
            if (history[last] && history[last].length > 1) {
                let val = history[last];
                let diff = val[val.length - 1] - val[val.length - 2];
                if (history[diff]) history[diff].push(time);
                else history[diff] = [time];
                last = diff.toString();
            } else {
                if (history['0']) history['0'].push(time);
                else history['0'] = [time];
                last = '0';
            }
            time += 1;
            while(history[last].length > 2) {
                history[last].shift();
            }
            // console.log(last);
        }
        // console.log(history);

        return last;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_15_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec15.txt', 'utf8');
        const lines = data.split('\n');

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



