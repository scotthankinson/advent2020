"use strict";
// tslint:disable
import fs = require('fs');
import { uniq } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_24_pt1());
    console.log(solve_dec_24_pt2());
};

module.exports = {
    start
};


const solve_dec_24_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec24.txt', 'utf8');
        const lines = data.split('\n');
        let instructions = [];
        console.log(lines.length);
        for(let line of lines){
            let rawInstructions = [];
            while(line.length > 0){
                if(line.startsWith("e") || line.startsWith("w")) {
                    rawInstructions.push(line.substring(0,1));
                    line = line.substring(1);
                } else {
                    rawInstructions.push(line.substring(0,2));
                    line = line.substring(2);
                }
            }
            instructions.push(rawInstructions);
        }
        
        // console.log(instructions);
        let coords = [];
        for(let instruction of instructions) {
            let point = {x: 0, y: 0, z: 0};
            instruction.forEach(o => {
                switch(o){
                    case 'e': {
                        point.x += 1;
                        point.y += 1;
                        break;
                    }
                    case 'w': {
                        point.x -= 1;
                        point.y -= 1;
                        break;
                    }
                    case 'ne': {
                        point.y += 1;
                        point.z += 1;
                        break;
                    }
                    case 'nw': {
                        point.x -= 1;
                        point.z += 1;
                        break;
                    }
                    case 'se': {
                        point.x += 1;
                        point.z -= 1;
                        break;
                    }
                    case 'sw': {
                        point.y -=1;
                        point.z -=1;
                        break;
                    }
                }
            });
            coords.push(point);
        }
        
        console.log(coords);
        let visits = {};
        coords.forEach(o => {
            if (visits[o.x + ',' + o.y + ',' + o.z])
                delete visits[o.x + ',' + o.y + ',' + o.z];
            else
                visits[o.x + ',' + o.y + ',' + o.z] = true;
        });

        console.log(visits);
        return Object.keys(visits).length;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_24_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec24.txt', 'utf8');
        const lines = data.split('\n');
        let instructions = [];
        console.log(lines.length);
        for(let line of lines){
            let rawInstructions = [];
            while(line.length > 0){
                if(line.startsWith("e") || line.startsWith("w")) {
                    rawInstructions.push(line.substring(0,1));
                    line = line.substring(1);
                } else {
                    rawInstructions.push(line.substring(0,2));
                    line = line.substring(2);
                }
            }
            instructions.push(rawInstructions);
        }
        
        // console.log(instructions);
        let coords = [];
        for(let instruction of instructions) {
            let point = {x: 0, y: 0, z: 0};
            instruction.forEach(o => {
                switch(o){
                    case 'e': {
                        point.x += 1;
                        point.y += 1;
                        break;
                    }
                    case 'w': {
                        point.x -= 1;
                        point.y -= 1;
                        break;
                    }
                    case 'ne': {
                        point.y += 1;
                        point.z += 1;
                        break;
                    }
                    case 'nw': {
                        point.x -= 1;
                        point.z += 1;
                        break;
                    }
                    case 'se': {
                        point.x += 1;
                        point.z -= 1;
                        break;
                    }
                    case 'sw': {
                        point.y -=1;
                        point.z -=1;
                        break;
                    }
                }
            });
            coords.push(point);
        }
        
        let blackTiles = {};
        coords.forEach(o => {
            if (blackTiles[o.x + ',' + o.y + ',' + o.z])
                delete blackTiles[o.x + ',' + o.y + ',' + o.z];
            else
                blackTiles[o.x + ',' + o.y + ',' + o.z] = true;
        });

        console.log("Day 0 " + Object.keys(blackTiles).length + " Black Tiles");
        for(let i = 1; i <= 100; i++) {
            blackTiles = passDay(blackTiles);
            console.log("Day " + i + ": " + Object.keys(blackTiles).length + " Black Tiles");
        }
        
        return Object.keys(blackTiles).length;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const passDay = (startTiles) => {
    let coords = Object.keys(startTiles);
    let result = {};
    let minX = coords.map(o => parseInt(o.split(',')[0])).sort((a, b) => a - b)[0] - 1;
    let maxX = coords.map(o => parseInt(o.split(',')[0])).sort((a, b) => b - a)[0] + 1;
    let minY = coords.map(o => parseInt(o.split(',')[1])).sort((a, b) => a - b)[0] - 1;
    let maxY = coords.map(o => parseInt(o.split(',')[1])).sort((a, b) => b - a)[0] + 1;
    let minZ = coords.map(o => parseInt(o.split(',')[2])).sort((a, b) => a - b)[0] - 1;
    let maxZ = coords.map(o => parseInt(o.split(',')[2])).sort((a, b) => b - a)[0] + 1;    
    // console.log("Mapping " + JSON.stringify({minX, minY, minZ}) + " to " + JSON.stringify({maxX, maxY, maxZ}));
    for(let z = minZ; z <= maxZ; z++){  
        for(let y = minY; y <= maxY; y++){
            for(let x = minX; x <= maxX; x++){
                // console.log("Checking Coordinate " + x + ',' + y + ',' + z);
                let blackTile = startTiles[x + ',' + y + ',' + z];
                let neighbors = 0;
                let east = (x + 1) + ',' + (y + 1) + ',' + z;
                if (startTiles[east]) neighbors += 1;
                let west = (x - 1) + ',' + (y - 1) + ',' + z;
                if (startTiles[west]) neighbors += 1;
                let northeast = x + ',' + (y + 1) + ',' + (z + 1);
                if (startTiles[northeast]) neighbors += 1;
                let northwest = (x - 1) + ',' + y + ',' + (z + 1);
                if (startTiles[northwest]) neighbors += 1;
                let southeast = (x + 1) + ',' + y + ',' + (z - 1);
                if (startTiles[southeast]) neighbors += 1;
                let southwest = x + ',' + (y - 1) + ',' + (z - 1);
                if (startTiles[southwest]) neighbors += 1;
                
                // Black flips if it has no neighbors or >2 neighbors
                if (blackTile && neighbors > 0 && neighbors < 3)
                    result[x + ',' + y + ',' + z] = true;
                // White flips if it has exactly 2 neighbors
                if (!blackTile && neighbors === 2)
                    result[x + ',' + y + ',' + z] = true;
            }
        }
    }

    return result;
}

start();



