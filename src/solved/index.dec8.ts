"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_8_pt1());
    console.log(solve_dec_8_pt2());
};

module.exports = {
    start
};


const solve_dec_8_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec8.txt', 'utf8');
        const lines = data.split('\n');
        
        let accumulator = 0;
        let executed = new Set();
        let line = 0;
        while(true){
            if (executed.has(line)) {
                break;
            } else {
                executed.add(line);
            }
            console.log(line);
            console.log(lines[line]);
            let instructions = lines[line].split(' ');
            console.log(instructions);
            switch (instructions[0]){
                case 'nop':
                    line += 1;
                    continue;
                case 'acc':
                    accumulator += parseInt(instructions[1]);
                    line += 1;
                    continue;
                case 'jmp':
                    line += parseInt(instructions[1]);                    
                    continue;
            }
        }

        return accumulator;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_8_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec8.txt', 'utf8');
        const lines = data.split('\n');

        let accumulator = 0;
        for(let fix in lines){
            if (lines[fix].indexOf('acc') > -1) continue;
            console.log("Fixing " + fix + ": " + lines[fix]);
            lines[fix] = lines[fix].indexOf('nop') > -1 ? lines[fix].replace('nop', 'jmp') : lines[fix].replace('jmp', 'nop');
            let executed = new Set();
            let line = 0;
            let valid = true;
            while(valid){
                if (line === lines.length) break;
                if (executed.has(line)) {
                    valid = false;
                    break;
                } else {
                    executed.add(line);
                }
                console.log(line);
                console.log(lines[line]);
                let instructions = lines[line].split(' ');
                console.log(instructions);
                switch (instructions[0]){
                    case 'nop':
                        line += 1;
                        continue;
                    case 'acc':
                        accumulator += parseInt(instructions[1]);
                        line += 1;
                        continue;
                    case 'jmp':
                        line += parseInt(instructions[1]);                    
                        continue;
                }
            }
            if (valid) return accumulator;
            else {
                lines[fix] = lines[fix].indexOf('nop') > -1 ? lines[fix].replace('nop', 'jmp') : lines[fix].replace('jmp', 'nop');
                valid = true;
                accumulator = 0;
            }
        }

        return accumulator;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



