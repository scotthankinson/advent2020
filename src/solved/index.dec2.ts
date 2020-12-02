"use strict";
// tslint:disable
import fs = require('fs');
import { min } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_2_pt1());
    console.log(solve_dec_2_pt2());
};

module.exports = {
    start
};


const solve_dec_2_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec2.txt', 'utf8');
        const lines = data.split('\n');
        let valid = 0;
        for (let line of lines){
            console.log(line);
            let reqMin = parseInt(line.substring(0, line.indexOf("-")));
            let reqMax = parseInt(line.substring(line.indexOf("-") + 1, line.indexOf(" ")));
            let key = line.split(' ')[1].replace(':', '');
            let password = line.split(' ')[2];
            console.log("Input received: " + line);
            console.log("Requires " + reqMin + " - " + reqMax + " instances of " + key);
            console.log(password);
            if (testPassword(password, reqMin, reqMax, key)) valid += 1;
            console.log("Valid: " + testPassword(password, reqMin, reqMax, key));
        }
        
        
        return valid;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const testPassword = (password, min, max, key) : boolean => {
    let chars = password.split('');
    let count = 0;
    for(let oneChar of chars){
        if ( oneChar === key) count += 1;
    }
    if (count < min || count > max) return false;
    return true;
}


const solve_dec_2_pt2 = () => {
    let data = fs.readFileSync('src/test.dec2.txt', 'utf8');
    const lines = data.split('\n');
    let valid = 0;
    for (let line of lines){
        console.log(line);
        let reqMin = parseInt(line.substring(0, line.indexOf("-")));
        let reqMax = parseInt(line.substring(line.indexOf("-") + 1, line.indexOf(" ")));
        let key = line.split(' ')[1].replace(':', '');
        let password = line.split(' ')[2];
        console.log("Input received: " + line);
        console.log("Requires " + reqMin + " - " + reqMax + " instances of " + key);
        console.log(password);
        if (testPassword2(password, reqMin, reqMax, key)) valid += 1;
        console.log("Valid: " + testPassword2(password, reqMin, reqMax, key));
    }
    
    
    return valid;
}

const testPassword2 = (password, min, max, key) : boolean => {
    let chars = password.split('');
    console.log("********");
    console.log(key);
    console.log(chars[min - 1]);
    console.log(chars[max - 1]);
    console.log("********");
    if (chars[min-1] === key && chars[max-1] == key) {
        return false;
    }
    if (chars[min-1] === key || chars[max-1] == key) return true;
    return false;
}


start();



