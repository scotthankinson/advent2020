"use strict";
import Bluebird = require('bluebird');
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_16_pt1());
    console.log(solve_dec_16_pt2());
};

module.exports = {
    start
};


const solve_dec_16_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec16.txt', 'utf8');
        const lines = data.split('\n');
        let scanFields = true;
        let scanYourTicket = false;
        let scanNearbyTickets = false;
        let fields = {};
        let yourTicket = [];
        let nearByTickets = [];
        for(let line of lines) {
            if (line === ''){
                scanFields = false;
                scanYourTicket = false;
                scanNearbyTickets = false;
                continue;
            }
            if (line === "your ticket:") {
                scanYourTicket = true;
                continue;
            }
            if (line === "nearby tickets:") {
                scanNearbyTickets = true;
                continue;
            }

            if (scanFields) {
                let values = line.split(':').map(o => o.trim());
                fields[values[0]] = values[1].split(' or ');
            } else if (scanYourTicket){
                yourTicket = line.split(',').map(o => parseInt(o));
            } else if (scanNearbyTickets) {
                nearByTickets.push(line.split(',').map(o => parseInt(o)));
            }
        }
        console.log(yourTicket);
        console.log(fields);
        console.log(nearByTickets);
        let errorRate = 0;
        for(let i = 0; i < nearByTickets.length; i++){
            errorRate += checkTicket(fields, nearByTickets[i]);
        }

        return errorRate;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const checkTicket = (rules, ticket) => {
    for(let value of ticket){
        let match = false;
        for(let key of Object.keys(rules)){
            rules[key].forEach((range) => {
                let vals = range.split('-').map(o => parseInt(o));
                if (value >= vals[0] && value <= vals[1]) match = true;
            });
        }
        if (!match) {
            return value;
        };
    }
    return 0;
}

const checkTicketConfidence = (rules, ticket) => {
    let possible = [];
    for(let key of Object.keys(rules)) {
        let count = 0;
        for(let value of ticket){
            rules[key].forEach((range) => {
                let vals = range.split('-').map(o => parseInt(o));
                if (value >= vals[0] && value <= vals[1]) count += 1;
            });            
        }
        possible.push({key, count});
    }
    return possible;
}

const solve_dec_16_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec16.txt', 'utf8');
        const lines = data.split('\n');
        let scanFields = true;
        let scanYourTicket = false;
        let scanNearbyTickets = false;
        let fields = {};
        let yourTicket = [];
        let nearByTickets = [];
        for(let line of lines) {
            if (line === ''){
                scanFields = false;
                scanYourTicket = false;
                scanNearbyTickets = false;
                continue;
            }
            if (line === "your ticket:") {
                scanYourTicket = true;
                continue;
            }
            if (line === "nearby tickets:") {
                scanNearbyTickets = true;
                continue;
            }

            if (scanFields) {
                let values = line.split(':').map(o => o.trim());
                fields[values[0]] = values[1].split(' or ');
            } else if (scanYourTicket){
                yourTicket = line.split(',').map(o => parseInt(o));
            } else if (scanNearbyTickets) {
                nearByTickets.push(line.split(',').map(o => parseInt(o)));
            }
        }
        let errorRate = 0;
        let validTickets = [yourTicket];
        for(let i = 0; i < nearByTickets.length; i++){
            let valid = checkTicket(fields, nearByTickets[i]);
            errorRate += valid;
            if (valid === 0) validTickets.push(nearByTickets[i]);
        }

        console.log(validTickets.length);
        let confidence = [];
        for(let position = 0; position < yourTicket.length; position++){
            let values = [];
            for(let i = 0; i < validTickets.length; i++){
                values.push(validTickets[i][position]);
            }
            confidence.push({position, values: checkTicketConfidence(fields, values)});
        }
        for(let i = 0; i < confidence.length; i++){
            let max = Math.max.apply(Math, confidence[i].values.map((o) => o.count));
            confidence[i].values = confidence[i].values.filter(o => o.count === max);
            confidence[i].options = confidence[i].values.length;
        }
        confidence = confidence.sort((a, b) => { return a.options - b.options;});
        
        let solution = [];
        let TBD = [];
        while (confidence.length > 0){
            let solver = confidence.shift();
            if (solver.options === 1){
                solution.push(solver);
                for(let i = 0; i < confidence.length; i++){
                    confidence[i].values = confidence[i].values.filter(o => o.key !== solver.values[0].key);
                    confidence[i].options = confidence[i].values.length;
                }
            } else {
                confidence.push(solver);
            }
        }

        solution = solution.sort((a, b) => { return a.position - b.position;});
        console.log(JSON.stringify(solution));
                
        // [ 109, 101, 79, 127, 71, 59, 67, 61, 173, 157, 163, 103, 83, 97, 73, 167,  53, 107, 89, 131 ]
        // [1, 2, 4, 6, 7, 9] === 101 * 79 * 71 * 67 * 61 * 157 = 363505598431 -- Too High -- mapping bug
        // [1, 2, 4, 6, 14, 19] ===  101 * 79 * 71 * 67 * 73 * 131 = 362974212989
        
        console.log(yourTicket);
        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

start();