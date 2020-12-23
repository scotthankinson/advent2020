"use strict";
// tslint:disable
import fs = require('fs');
import { cpus } from 'os';

const start = (): void => {
    // console.log(solve_dec_4_pt1());
    console.log(solve_dec_4_pt2());
};

module.exports = {
    start
};


const solve_dec_4_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec4.txt', 'utf8');
        // const lines = data.split('\n');
        let cups = '952438716'.split('').map(o => parseInt(o));

        let moves = 1;
        while (moves < 101) {
            // console.log("Beginning Move " + moves);
            let currentCup = cups.shift();
            // console.log("Orient to cup " + currentCup);
            cups.push(currentCup);
            let pickup = cups.splice(0, 3);
            let destinationTargets = cups.filter(o => o < currentCup).sort((a, b) => b - a);
            if (destinationTargets.length === 0) {
                destinationTargets = cups.filter(o => o > currentCup).sort((a, b) => b - a);
            }
            // console.log("Move pickups " + pickup + " to " + destinationTargets[0]);
            while (cups[0] !== destinationTargets[0]) {
                cups.push(cups.shift());
            }
            for (let oneCup of pickup.reverse()) {
                cups.splice(1, 0, oneCup);
            }
            // Move currentCup back to the front
            while (cups[0] !== currentCup) {
                cups.push(cups.shift());
            }
            // And then move to the next cup
            cups.push(cups.shift());

            // console.log(cups);
            console.log(moves + ": " + cups.join(' '));
            moves += 1;
        }

        while (cups[0] !== 1) {
            cups.push(cups.shift());
        }
        cups.shift();

        return cups.join('');
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_4_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec4.txt', 'utf8');
        // const lines = data.split('\n');
        let cups = '952438716'.split('').map(o => parseInt(o));
        let maxNumber = 1000000;
        for (let i = 10; i <= maxNumber; i++) {
            cups.push(i);
        }

        let nodes = {};
        for (let i = 0; i < cups.length; i++) {
            nodes[cups[i]] = { 'next': cups[(i + 1) % cups.length] };
        }

        let moves = 1;
        let currentCup = cups[0];
        while (moves < 10000001) {
            if (moves % 10000 === 0) console.log("Beginning Move " + moves + " oriented to " + currentCup);
            let next1 = nodes[currentCup].next;
            let next2 = nodes[next1].next;
            let next3 = nodes[next2].next;
            if (moves % 10000 === 0) console.log("Setting " + nodes[currentCup].next + " to " + nodes[next3].next);
            nodes[currentCup].next = nodes[next3].next;
            let destination = currentCup - 1;
            if (moves % 10000 === 0) console.log("Picked up " + next1 + "," + next2 + "," + next3);
            while (!nodes[destination] || [next1, next2, next3].includes(destination)) {
                destination -= 1;
                if (destination <= 0) destination = maxNumber;
            }
            if (moves % 10000 === 0) console.log("Move to " + destination);
            nodes[next3].next = nodes[destination].next;
            nodes[destination].next = next1;
            // print(nodes, currentCup);
            currentCup = nodes[currentCup].next;
            // console.log(nodes);
            moves += 1;
        }
        console.log(nodes[1].next + " * " + nodes[nodes[1].next].next);
        // 250859495100 too low -- forgot to change the starting number
        return nodes[1].next * nodes[nodes[1].next].next;

    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const print = (nodes, currentCup) => {
    let start = currentCup;
    let printer = '';
    while (true) {
        printer += nodes[start].next + ' ';
        start = nodes[start].next
        if (start === currentCup) break;
    }
    console.log(printer);
    return printer;
}



start();



