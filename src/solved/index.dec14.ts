"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_14_pt1());
    console.log(solve_dec_14_pt2());
};

module.exports = {
    start
};


const solve_dec_14_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec14.txt', 'utf8');
        const lines = data.split('\n');
        let mask = '';
        let cpu = {};
        for (let line of lines) {
            console.log('-----');
            if (line.startsWith('mask')) mask = line.split(' ')[2];
            else {
                let val = parseInt(line.split(' ')[2]);
                let dest = parseInt(line.split(' ')[0].replace("mem[", '').replace(']', ''));
                cpu[dest] = {'inMask': mask, 'inDec': val, 'innBin': val.toString(2).padStart(36, '0')};
                let outBin = val.toString(2).padStart(36, '0').split('');
                for(let i = 0; i < 36; i++){
                    if (mask[i] === 'X') continue;
                    else {
                        outBin[i] = mask[i];
                    }
                }
                cpu[dest]['outBin'] = outBin.join('');
                cpu[dest]['outDec'] = parseInt(cpu[dest]['outBin'], 2);
                console.log(cpu[dest]);
            }
        }
        console.log(mask);
        console.log(cpu);
        let sum = 0;
        for(let key of Object.keys(cpu)){
            sum += cpu[key].outDec;
        }
        return sum;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_14_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec14.txt', 'utf8');
        const lines = data.split('\n');
        let mask = '';
        let instructions = [];
        for (let line of lines) {
            if (line.startsWith('mask')) mask = line.split(' ')[2];
            else {
                let val = parseInt(line.split(' ')[2]);
                let dest = parseInt(line.split(' ')[0].replace("mem[", '').replace(']', ''));
                let outDest =dest.toString(2).padStart(36, '0').split('');
                for(let i = 0; i < 36; i++){
                    if (mask[i] === '0') continue;
                    else {
                        outDest[i] = mask[i];
                    }
                }
                instructions.push({val, dest: outDest.join('')});
            }
        }
        let fullInstructions = expand(instructions);
        let cpu = {};
        for (let i = 0; i < fullInstructions.length; i++){
            cpu[fullInstructions[i].dest] = fullInstructions[i].val;
        }
        
        let sum = 0;
        for(let key of Object.keys(cpu)){
            sum += cpu[key];
        }
        
        return sum;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const expand = (instructions) => {
    let expanded = [];
    while(instructions.length > 0){
        let entry = instructions.shift();
        if (entry.dest.indexOf('X') === -1){
            expanded.push(entry);
            continue;
        }
        let zero = JSON.parse(JSON.stringify(entry));
        zero.dest = zero.dest.replace('X', '0');
        let one = JSON.parse(JSON.stringify(entry));
        one.dest = one.dest.replace('X', '1');
        instructions.unshift(one);
        instructions.unshift(zero);
    }
    return expanded;
}



start();



