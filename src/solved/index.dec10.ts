"use strict";
// tslint:disable
import fs = require('fs');
import { indexOf } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_10_pt1());
    console.log(solve_dec_10_pt2());
};

module.exports = {
    start
};


const solve_dec_10_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec10.txt', 'utf8');
        const lines = data.split('\n').map(o => parseInt(o));

        let diff1 = 0;
        let diff3 = 0;
        let sorted = lines.sort((n1,n2) => n1 - n2);
        sorted.unshift(0);
        sorted.push(sorted[sorted.length - 1] + 3);
        for(let i = 1; i < sorted.length; i++){
            if (sorted[i] - sorted[i-1] === 1) diff1 += 1;
            if (sorted[i] - sorted[i-1] === 3) diff3 += 1;
        }
        console.log("1's: " + diff1 + ", 3's: " + diff3);

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_10_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec10.txt', 'utf8');
        const lines = data.split('\n').map(o => parseInt(o));
        

        let sorted = lines.sort((n1,n2) => n1 - n2);
        sorted.unshift(0);
        sorted.push(sorted[sorted.length - 1] + 3);
        
        // Input 1 -- 11 #'s:  7 1-hops, 5 3-hops, ALL Paths start with 0, 1, 4 and end with 16, 19, 22, 3-hops are fixed but so are some 1-hops?
        // Input 2: 22 1's, 10 3's
        // Puzzle Input: 65 1's, 39 3's
        let fixed = [0];
        for(let i = 1; i < sorted.length; i++){
            if (sorted[i] - sorted[i-1] === 3) {
                if (fixed.indexOf(sorted[i-1]) === -1)
                    fixed.push(sorted[i - 1]);
                fixed.push(sorted[i]);
            }
        }
        let free = sorted.filter(o => fixed.indexOf(o) < 0);
        // Input 2: 19208 expected
        // Fixed: [ 0,  4,  7, 11, 14, 17, 20, 23, 25, 28, 31, 35, 38, 39, 42, 45, 49, 52] -- 18 
        // Free FLoaters:  [ 1,  2,  3,  8,  9, 10, 18, 19, 24, 32, 33, 34, 46, 47, 48] -- 15 
        // 0..1,2,3...4 ==> 7 combintions,  
        // 0,1 ==> 014 | 0124 | 0134 | 01234
        // 0,2 ==> 024 | 0234
        // 0,3 ==> 034
        // 17...18,19...20
        // 17,20 | 17,18,20 | 17,19,20 | 17,18,19,20 => 4 combinations
        // 23...24...25 
        // 23,25 | 23, 24, 25 ==> 2 combinations

        // 0-4[7], 4-7[1], 7-11[7], 11-14[1], 14-17[1], 17-20[4], 20-23[1], 23-25[2], 25-28[1], 28-31[1], 31-35[7], 35-38[1], 38-39[1], 39-42[1], 42-45[1], 45-49[7], 49-52[1]
        // 7*7*4*2*7*7 --> 19208 
        let count = 1;
        for(let i = 1; i < fixed.length; i++){
            // Get the list of numbers between i and i-1
            let perms = free.filter(o => o < fixed[i] && o > fixed[i-1]);
            if (perms.length === 3) count *= 7;
            if (perms.length === 2) count *= 4;
            if (perms.length === 1) count *= 2;
            // console.log(perms);
        }


        // console.log(sorted);
        // console.log(fixed);
        // console.log(free);
        return count ;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


start();



