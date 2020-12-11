"use strict";
// tslint:disable
import fs = require('fs');
import { DATE } from 'sequelize';

const start = (): void => {
    // console.log(solve_dec_11_pt1());
    let start = new Date().getTime();
    console.log(solve_dec_11_pt2());
    console.log(new Date().getTime() - start);
};

module.exports = {
    start
};


const solve_dec_11_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec11.txt', 'utf8');
        let before = data.split('\n').map(o => o.split(''));
        print(before);
        let after = [];
        let time = 0;
        while (true){
            after = passTime1(before);
            time += 1;
            print(after);
            if (JSON.stringify(before) === JSON.stringify(after)) break;
            before = after;
        }
        let seats = 0;
        for(let y = 0; y < before.length; y++){
            for(let x = 0; x < before[0].length; x++){
                if (before[y][x] === '#') seats += 1;
            }
        }    
        return seats;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const passTime1 = (before) => {
    let after = JSON.parse(JSON.stringify(before));
    for(let y = 0; y < before.length; y++){
        for(let x = 0; x < before[0].length; x++){
            if (before[y][x] === '.') continue;
            let open = [];
            // Top Left, Top, Top Right, Left, Right, Bottom Left, Bottom, Bottom Right
            if (x > 0 && y > 0) open.push(before[y-1][x-1] === '#'); // Top Left
            if (y > 0) open.push(before[y-1][x] === '#'); // Top
            if (x < before[0].length - 1 && y > 0) open.push(before[y-1][x+1] === '#'); // Top Right
            if (x > 0) open.push(before[y][x-1] === '#'); // Left
            if (x < before[0].length - 1) open.push(before[y][x+1] === '#'); // Right
            if (x > 0 && y < before.length - 1) open.push(before[y+1][x-1] === '#'); // Bottom Left
            if (y < before.length - 1) open.push(before[y+1][x] === '#'); // Bottom
            if (x < before[0].length - 1 && y < before.length - 1) open.push(before[y+1][x+1] === '#'); // Bottom Right
            if (open.every(val => !val) && before[y][x] === 'L') after[y][x] = '#';
            if (open.filter(o => o).length >= 4 && before[y][x] === '#') after[y][x] = 'L';
        }
    }
    return after;
}

const print = (lines) => {
    let spacer = "";
    for(let y = 0; y < lines[0].length; y++){
        spacer += "-";
    }
    console.log(spacer);
    for(let y = 0; y < lines.length; y++){
        let line = "";
        for(let x = 0; x < lines[0].length; x++){
            line += lines[y][x];
        }
        console.log(line);
    }
}
const solve_dec_11_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec11.txt', 'utf8');
        let before = data.split('\n').map(o => o.split(''));
        // print(before);
        let after = [];
        let time = 0;
        
        while (true){
            after = passTime2(before);
            time += 1;
            // print(after);
            if (JSON.stringify(before) === JSON.stringify(after)) break;
            before = JSON.parse(JSON.stringify(after));
        }


        let seats = 0;
        for(let y = 0; y < before.length; y++){
            for(let x = 0; x < before[0].length; x++){
                if (before[y][x] === '#') seats += 1;
            }
        }    
        return seats;    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const passTime2 = (before) => {
    let after = JSON.parse(JSON.stringify(before));
    for(let y = 0; y < before.length; y++){
        for(let x = 0; x < before[0].length; x++){
            if (before[y][x] === '.') continue;
            let open = [];
            // Top Left, Top, Top Right, Left, Right, Bottom Left, Bottom, Bottom Right
            let found = false; // Top Left
            let stepY = y - 1;
            let stepX = x - 1;
            while (!found && stepY >= 0 && stepX >= 0){
                if (before[stepY][stepX] !== '.'){
                    open.push(before[stepY][stepX] === '#');
                    found = true;
                }
                stepY -= 1;
                stepX -= 1;
            }
            
            stepY = y - 1;
            stepX = x;
            found = false; // Top
            while(!found && stepY >= 0){
                if (before[stepY][x] !== '.') {
                    open.push(before[stepY][x] === '#');
                    found = true;
                }
                stepY -= 1;
            }
        
            stepY = y - 1;
            stepX = x + 1;
            found = false; // Top Right
            while(!found && stepY >= 0 && stepX < before[0].length){
                if (before[stepY][stepX] !== '.') {
                    open.push(before[stepY][stepX] === '#');
                    found = true;                
                }
                stepY -= 1;
                stepX += 1;
            }
            
            stepY = y;
            stepX = x - 1;
            found = false; // Left
            while(!found && stepX >= 0 && !found){
                if (before[y][stepX] !== '.') {
                    open.push(before[y][stepX] === '#');
                    found = true;
                }
                stepX -= 1;
            }

            stepY = y;
            stepX = x + 1;
            found = false; // Right
            while(!found && stepX < before[0].length){
                if (before[y][stepX] !== '.') {
                    open.push(before[y][stepX] === '#');
                    found = true;
                }
                stepX += 1;
            }

            stepY = y + 1;
            stepX = x - 1;
            found = false; // Bottom Left
            while(!found && stepY < before.length && stepX >= 0){
                if (before[stepY][stepX] !== '.') {
                    open.push(before[stepY][stepX] === '#');
                    found = true;     
                }           
                stepX -= 1;
                stepY += 1;
            }

            stepY = y + 1;
            stepX = x;
            found = false; // Bottom
            while(!found && stepY < before.length){
                if (before[stepY][x] !== '.') {
                    open.push(before[stepY][x] === '#');
                    found = true;
                }
                stepY += 1;
            }
        
            stepY = y + 1;
            stepX = x + 1;
            found = false; // Bottom Right
            while(!found && stepY < before.length && stepX < before[0].length){
                if (before[stepY][stepX] !== '.') {
                    open.push(before[stepY][stepX] === '#');
                    found = true;
                }
                stepX += 1;
                stepY += 1;
            }

            if (open.every(val => !val) && before[y][x] === 'L') after[y][x] = '#';
            if (open.filter(o => o).length >= 5 && before[y][x] === '#') after[y][x] = 'L';
        }
    }
    return after;
}

start();



