"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_6_pt1());
    console.log(solve_dec_6_pt2());
};

module.exports = {
    start
};


const solve_dec_6_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec6.txt', 'utf8');
        const lines = data.split('\n');
        let results = [];
        let current = new Set();
        for(let line of lines){
            if (line === "") {                
                results.push(current);
                current = new Set();
            } else {
                let answers = line.split('');
                answers.forEach(o => current.add(o));
            }
        }
        results.push(current);
        let count = 0;
        for(let line of results){
            count += line.size;
        }
        
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_6_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec6.txt', 'utf8');
        const lines = data.split('\n');
        let results = [];
        let current = {members: 0, valid: 0};
        for(let line of lines){
            if (line === "") {                
                results.push(current);
                current = {members: 0, valid: 0};
            } else {
                let answers = line.split('');
                current['members'] = current['members'] + 1
                answers.forEach(o => {
                    if (current[o]) current[o] = current[o] + 1;
                    else current[o] = 1;
                }
                );
            }
        }
        results.push(current);
        let count = 0;
        for(let line of results){
            for (let key in line){
                if (key === 'members') continue;
                if (line[key] === line['members']) line['valid'] = line['valid'] + 1
            }
        }
        results.forEach(o => count += o.valid);
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



