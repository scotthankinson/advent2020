"use strict";
// tslint:disable
import fs = require('fs');
import { indexOf } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_7_pt1());
    console.log(solve_dec_7_pt2());
};

module.exports = {
    start
};


const solve_dec_7_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec7.txt', 'utf8');
        const lines = data.split('\n');

        let associations = {};
        for (let line of lines){
            let ruleParts = line.split(' contain ');
            let container = ruleParts[0].replace(' bags', '').replace(' bag', '');
            let contained = ruleParts[1].split(',').map(o => o.replace(' bags', '').replace(' bag', '').replace('.', '').trim().substring(2).replace(' other', 'no other'));
            if (associations[container]) contained.map(o => associations[container].push(o));
            else associations[container] = contained;
        }
        console.log(associations);

        let queue = ['shiny gold'];
        let finalHolders = new Set();
        while (queue.length > 0){
            let valid = canHazBag(associations, queue.shift(), new Set<string>());
            Array.from(valid.values()).forEach(o => queue.push(o));
            Array.from(valid.values()).forEach(o => finalHolders.add(o));
        }    
        
        console.log(finalHolders);
        return finalHolders.size;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const canHazBag = (rules, color, options) : Set<string> => {    
    for(let rule in rules){
        if (rule === color) continue;
        for (let canContain of rules[rule]){   
            if (canContain === color) {
                options.add(rule);
                break;
            }
        }
    }
    return options;
}

const solve_dec_7_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec7.txt', 'utf8');
        const lines = data.split('\n');

        let associations = {};
        for (let line of lines){
            let ruleParts = line.split(' contain ');
            let container = ruleParts[0].replace(' bags', '').replace(' bag', '');
            let contained = ruleParts[1].split(',').map(o => o.replace(' bags', '').replace(' bag', '').replace('.', '').trim());
            if (associations[container]) contained.map(o => associations[container].push(o));
            else associations[container] = contained;
        }
        console.log(associations);

        let queue = ['shiny gold'];
        let count = 0;
        while (queue.length > 0){
            console.log(queue.length);
            let entry = associations[queue.shift()];
            count += 1;
            for(let oneEntry of entry){
                if (oneEntry === "no other") continue;
                // Assuming all counts are 1-9
                let num = parseInt(oneEntry.substring(0,2).trim());
                let color = oneEntry.substring(2);
                for(let i = 0; i < num; i++) queue.push(color);
            }
        }    

        // -1 because we don't count our starting bag
        return count - 1;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



