"use strict";
// tslint:disable
import fs = require('fs');
import { indexOf } from 'lodash';

const start = (): void => {
    console.log(solve_dec_19_pt1());
    // console.log(solve_dec_19_pt2());
};

module.exports = {
    start
};

const solve_dec_19_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec19.txt', 'utf8');
        const lines = data.split('\n');
        let rules = [];
        let inputs = [];
        let inRules = true;
        for (let line of lines) {
            if (line === '') {
                inRules = false;
                continue;
            }
            if (inRules) rules.push(line.replace('"', '').replace('"', ''));
            else inputs.push(line);
        }
        let rulesEngine = {};
        for (let i = 0; i < rules.length; i++) {
            let input = rules[i];
            let rule = input.split(':')[0];
            let parts = input.split(':')[1].split('|');

            // Flat Rules
            if (parts[0].trim() === 'a' || parts[0].trim() === 'b') {
                rulesEngine[rule] = { 'flat': true, 'parts': parts.map(o => o.trim()) };
                continue;
            }
            rulesEngine[rule] = { 'flat': false, 'parts': parts.map(o => o.trim()) };
        }
        let flat = new Set();
        flatten(rulesEngine, 0, flat);
        
        let found = 0;
        for (let input of inputs) {
            if (flat.has(input)) found += 1;
        }
        return found;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const flatten = (rulesEngine, entry, flat) => {

    while (rulesEngine[entry].parts.length > 0) {
        expand(rulesEngine, entry);
        let parts = [];
        for (let i = 0; i < rulesEngine[entry].parts.length; i++) {
            if (rulesEngine[entry].parts[i].split(' ').filter(o => o !== 'a' && o !== 'b').length > 0) {
                parts.push(rulesEngine[entry].parts[i]);
            } else {
                flat.add(rulesEngine[entry].parts[i].split(' ').join(''));
            }
        }
        rulesEngine[entry].parts = parts;
        console.log(parts.length);
        console.log(flat.size);
    }
}

const expand = (rulesEngine, rule) => {
    let parts = rulesEngine[rule].parts;
    let flat = true;
    for (let i = 0; i < parts.length; i++) {
        let outParts = [''];
        let oneRule = parts[i].split(' ');

        for (let j = 0; j < oneRule.length; j++) {
            if (oneRule[j] === 'a' || oneRule[j] === 'b') {
                for (let x = 0; x < outParts.length; x++) {
                    outParts[x] += ' ' + oneRule[j];
                }
            } else if (rulesEngine[oneRule[j]].flat) {
                let base = JSON.stringify(outParts);
                outParts = [];
                for (let x = 0; x < rulesEngine[oneRule[j]].parts.length; x++) {
                    let step = JSON.parse(base);
                    step.forEach(o => outParts.push(o += ' ' + rulesEngine[oneRule[j]].parts[x]));
                }
            } else {
                flat = false;
                let base = JSON.stringify(outParts);
                outParts = [];
                for (let x = 0; x < rulesEngine[oneRule[j]].parts.length; x++) {
                    let step = JSON.parse(base);
                    step.forEach(o => outParts.push(o += ' ' + rulesEngine[oneRule[j]].parts[x]));
                }
            }
        }
        rulesEngine[rule].parts[i] = outParts.map(o => o.trim().split(' ').filter(p => p != ' ').join(' '));
    }
    rulesEngine[rule].flat = flat;
    rulesEngine[rule].parts = rulesEngine[rule].parts.flat();
}

const solve_dec_19_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec19.txt', 'utf8');
        const lines = data.split('\n');

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();






/*
0: 8 11
0: 42 42 31
0: (7 92 | 86 5) (7 92 | 86 5) (92 114 | 5 87)
    7 b 7 b b 114
    7 b 7 b a 87
    7 b 86 a 92 114
    7 b 86 a a 87
    86 a 7 b b 114
    86 a 7 b a 87
    86 a 86 a b 114
    86 a 86 a a 87
0: (5 36 | 92 106) b (5 36 | 92 106) b b (79 92 | 26 5)

0: 8 11
92: "b"
5: "a"
8: 42
11: 42 31
42: 7 92 | 86 5
31: 92 114 | 5 87
7: 5 36 | 92 106
114: 79 92 | 26 5
*/
