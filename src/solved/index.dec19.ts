"use strict";
// tslint:disable
import fs = require('fs');
import { indexOf } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_19_pt1());
    console.log(solve_dec_19_pt2());
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
        let parts = rulesEngine[entry].parts.filter(o => settled(o));
        let settledParts = rulesEngine[entry].parts.filter(o => !settled(o)).map(o => o.split(' ').join(''));
        settledParts.forEach(o => flat[o] = true);
        rulesEngine[entry].parts = parts;
        // console.log("Settling: " + parts.length);
        // console.log("Settled: " + settledParts.length);
    }
}

const settled = (input) => {
    return input.split(' ').filter(o => o !== 'a' && o !== 'b' && o !== '8' && o !== '11').length > 0;
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

// Copy paste to care about strings of length 8, 16
const solve_dec_19_pt2 = () => {
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

        // Initial setup:  0: 8 11 
        let snapshot = JSON.stringify(rulesEngine);

        // 8:42 ===> 8: 42 | 42 8  (8*)
        let rulesEngine8 = JSON.parse(snapshot);
        console.log(rulesEngine[8]);
        rulesEngine8[0].parts = ['8'];
        let flat8 = {};
        flatten(rulesEngine8, 0, flat8);
        let keys8 = Object.keys(flat8);
        console.log('8 keys: ' + keys8.length + ', length: ' + keys8[0].length);
        console.log(keys8);


        //11: 42 31 | 42 11 31          a a | aa aa | ab ba | ac ca | abc cba | bca acb  but NOT abc cab
        let rulesEngine11 = JSON.parse(snapshot);
        console.log(rulesEngine[11]);
        rulesEngine11[0].parts = ['11'];
        // 256 results, breaking the ability to process
        let flat11 = {};
        flatten(rulesEngine11, 0, flat11);
        let keys11 = Object.keys(flat11);
        console.log('11 keys: ' + keys11.length + ', length: ' + keys11[0].length);

        let filtered = {};
        for(let i = 0; i < inputs.length; i++) {
            // Process rule 8 -- chunks of 8 characters
            let input = inputs[i];
            filtered[i] = { original: input, matches: [] };
            while(input.length >= 0){
                let slice = input.substring(0, 8);
                if (keys8.indexOf(slice) >= 0) {
                    input = input.substring(8);
                    filtered[i].matches.push(input);
                } else break;
            }
            // Only entries that are multiples of 16 characters can match Rule11
            filtered[i].matches = filtered[i].matches.filter(o => o.length > 0 && o.length % 16 === 0);
            if(filtered[i].matches.length === 0) delete filtered[i]; 
        }
        console.log("Rule 8 Candidates: " + Object.keys(filtered).length);
        
        let matches = [];
        let count = 0;
        for(let key of Object.keys(filtered)) {
            // Process rule 8 -- chunks of 16 characters abccba --> aabbcc
            let matches = filtered[key].matches;
            let unwrapped = [];
            for(let match of matches){
                let newMatch = '';
                while(match.length > 16){
                    console.log("IN: " + match);
                    let pre = match.substring(0, 8);
                    let post = match.substring(match.length - 8);
                    newMatch += pre + post;
                    match = match.substring(8, match.length - 8);
                    console.log("OUT: " + match);
                }
                newMatch += match;
                unwrapped.push(newMatch);
            }
            filtered[key].unwrapped = unwrapped;

            for(let i = 0; i < unwrapped.length; i++){
                let input = unwrapped[i];
                while(input.length >= 0){
                    let slice = input.substring(0, 16);
                    if (keys11.indexOf(slice) >= 0){
                        input = input.substring(16);
                    } else break;
                }
                if (input.length === 0) {
                    console.log("Fully processed " + filtered[key].original);
                    count += 1;
                    break;
                }
            }
        }

        console.log(JSON.stringify(filtered));

        // 426 -- too high
        // 425 -- too high
        // 418 -- too high
        console.log(inputs.length);
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


// Save off the sample tester which cares about strings of lengths 5, 10
const solve_dec_19_pt2_sample = () => {
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

        // Initial setup:  0: 8 11 
        let snapshot = JSON.stringify(rulesEngine);

        // 8:42 ===> 8: 42 | 42 8  (8*)
        let rulesEngine8 = JSON.parse(snapshot);
        console.log(rulesEngine[8]);
        rulesEngine8[0].parts = ['8'];
        let flat8 = {};
        flatten(rulesEngine8, 0, flat8);
        let keys8 = Object.keys(flat8);
        console.log('8 keys: ' + keys8.length + ', length: ' + keys8[0].length);
        console.log(keys8);


        //11: 42 31 | 42 11 31          a a | aa aa | ab ba | ac ca | abc cba | bca acb  but NOT abc cab
        let rulesEngine11 = JSON.parse(snapshot);
        console.log(rulesEngine[11]);
        rulesEngine11[0].parts = ['11'];
        // 256 results, breaking the ability to process
        let flat11 = {};
        flatten(rulesEngine11, 0, flat11);
        let keys11 = Object.keys(flat11);
        console.log('11 keys: ' + keys11.length + ', length: ' + keys11[0].length);

        let filtered = {};
        for(let i = 0; i < inputs.length; i++) {
            // Process rule 8 -- chunks of 5 characters
            let input = inputs[i];
            filtered[i] = { original: input, matches: [] };
            while(input.length >= 0){
                let slice = input.substring(0, 5);
                if (keys8.indexOf(slice) >= 0) {
                    input = input.substring(5);
                    filtered[i].matches.push(input);
                } else break;
            }
            // Only entries that are multiples of 10 characters can match Rule11
            filtered[i].matches = filtered[i].matches.filter(o => o.length > 0 && o.length % 10 === 0);
            if(filtered[i].matches.length === 0) delete filtered[i]; 
        }
        console.log("Rule 8 Candidates: " + Object.keys(filtered).length);
        
        let matches = [];
        let count = 0;
        for(let key of Object.keys(filtered)) {
            // Process rule 8 -- chunks of 10 characters abccba --> aabbcc
            let matches = filtered[key].matches;
            let unwrapped = [];
            for(let match of matches){
                let newMatch = '';
                while(match.length > 10){
                    console.log("IN: " + match);
                    let pre = match.substring(0, 5);
                    let post = match.substring(match.length - 5);
                    newMatch += pre + post;
                    match = match.substring(5, match.length - 5);
                    console.log("OUT: " + match);
                }
                newMatch += match;
                unwrapped.push(newMatch);
            }
            filtered[key].unwrapped = unwrapped;

            for(let i = 0; i < unwrapped.length; i++){
                let input = unwrapped[i];
                while(input.length >= 0){
                    let slice = input.substring(0, 10);
                    if (keys11.indexOf(slice) >= 0){
                        input = input.substring(10);
                    } else break;
                }
                if (input.length === 0) {
                    console.log("Fully processed " + filtered[key].original);
                    count += 1;
                    break;
                }
            }
        }

        console.log(JSON.stringify(filtered));

        // 426 -- too high
        // 425 -- too high
        // 418 -- too high
        console.log(inputs.length);
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



/*
[
  'babbb', 'baabb', 'abbbb',
  'aabbb', 'aaaba', 'ababa',
  'bbbba', 'bbaaa', 'bbaab',
  'bbbab', 'bbabb', 'bbbbb',
  'aaaab', 'aaabb', 'aaaaa',
  'baaaa'
]
        // abbbbbabbbaaaab
        // aabbbbbaabbbaaaaaabbbbbab
        // aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba

*/



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
