"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_13_pt1());
    console.log(solve_dec_13_pt2());
};

module.exports = {
    start
};


const solve_dec_13_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec13.txt', 'utf8');
        const lines = data.split('\n');
        let startTime = parseInt(lines[0]);
        let buses = lines[1].split(',').filter(o => o !== 'x').map(o => parseInt(o));
        let schedule = {};
        for(let i = 0; i < buses.length; i++){
             let departure = Math.floor(startTime / buses[i]) * buses[i]; 
             if (departure !== startTime) departure += buses[i];
             schedule[buses[i]] = departure;
        }
        let minWait = 10000;
        let minBus = '';
        for (let key of Object.keys(schedule)){
            if ((schedule[key] - startTime) < minWait){
                minWait = schedule[key] - startTime;
                minBus = key;
            }
        }
        return parseInt(minBus) * minWait;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_13_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec13.txt', 'utf8');
        const lines = data.split('\n');
        let startTime = 100000479985183;
        let buses = lines[1].split(',');
        let schedule = {};
        for(let i = 0; i < buses.length; i++){
             if (buses[i] === 'x') continue;
             const bus = parseInt(buses[i]);
             let departure = Math.floor(startTime / bus) * bus; 
             if (departure !== startTime) departure += bus;
             schedule[buses[i]] = departure;

             schedule[buses[i]] = { 'id': bus, 'offset': i, departure};
        }
        // 17,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,739,x,29,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,x,x,x,x,x,23,x,x,x,x,x,x,x,971,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,19
        // START =   100,000,000,000,000           
        // LCM   = 3,048,743,993,142,809
        // PROG  =        66,128,000,377
        // First 17 === 100000000000128
        // Find period of 17, 37 ==> 629 = 17*37               cross @ 100000000000111, 100000000000740, 100000000001369  
        // Find period of 17, 19 ==> 323 = 17*19               cross @ 100000000011773, 100000000012096, 100000000012419
        // Find period of 971, 739 ==> 717,569                 cross @ 100000000649091, 100000001366660, 100000002084229
        // Find period of 971, 739, 41 ==> 29,420,329          cross @ 100000009259919, 100000038680248, 100000068100577
        // Find period of 971, 739, 41, 17 ==> 500,145,593     cross @ 100000479985183, 100000980130776, 100001480276369
        // Find everything periods of 500,145,593              cross @ 535296695251210
        console.log(schedule);
        let ticks = 0;
        while (!evaluate(schedule, startTime)){
            if (ticks % 100000 === 0) console.log(startTime);
            ticks += 1;
            startTime += 500145593;
        }
        return startTime;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const evaluate = (schedule, time) => {
    for(let key of Object.keys(schedule)){
        let valid = (time + schedule[key].offset) % schedule[key].id === 0;
        if (!valid) return false;
    }
    return true;
}



start();



