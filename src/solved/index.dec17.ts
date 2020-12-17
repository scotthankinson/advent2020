"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_17_pt1());
    console.log(solve_dec_17_pt2());
};

module.exports = {
    start
};


const solve_dec_17_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec17.txt', 'utf8');
        const lines = data.split('\n');
        let map = {maxZ: 0, minZ: 0, maxY: 0, minY: 0, maxX: 0, minX: 0};
        for(let y = 0; y < lines.length; y++){
            let row = lines[y].split('');
            for(let x = 0; x < row.length; x++){
                map[x + ',' + y + ',0'] = row[x];
            }
        }   
        wipe(map);
        for(let i = 0; i < 6; i++){
            step(map);
        }
        let count = 0;
        for(let key of Object.keys(map)){
            if (key.startsWith('max') || key.startsWith('min')) continue;
            count += 1;
        }
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const step = (map) => {
    map.maxZ += 1;
    map.minZ -= 1;
    map.maxX += 1;
    map.minX -= 1;
    map.maxY += 1;
    map.minY -= 1;
    let updates = [];
    // Go through each coordinate in space
    for(let z = map.minZ; z <= map.maxZ; z++){
        for(let y = map.minY; y <= map.maxY; y++){
            for(let x = map.minX; x <= map.maxX; x++) {
                // console.log("Evaluate " + x + "," + y + "," + z);
                let count = 0;
                let state = false;
                if (map[x + ',' + y + ',' + z]) state = true;
                for(let a = z - 1; a <= z + 1; a++){
                    for(let b = y - 1; b <= y + 1; b++){
                        for(let c = x -1; c <= x + 1; c++){
                            if (a === z && b === y && c === x) continue;
                            if (map[c + ',' + b + ',' + a]) count += 1;   
                        }
                    }
                }
                // console.log({position: x + ',' + y + ',' + z, state, count});
                updates.push({position: x + ',' + y + ',' + z, state, count});
            }                
        }    
    }
    
    for(let i = 0; i < updates.length; i++){
        if (updates[i].state === false && updates[i].count === 3) {
            updates[i]['flipped'] = true;
            map[updates[i].position] = '#';
            continue;
        }
        if (updates[i].state === true && updates[i].count === 2) continue;
        if (updates[i].state === true && updates[i].count === 3) continue;
        if (updates[i].state === true) {
            updates[i]['flipped'] = true;
            map[updates[i].position] = '.';
        }
    }
    // console.log(updates);
    wipe(map);
}

const draw = (map) => {
    for(let z = map.minZ; z <= map.maxZ; z++){
        console.log("------------ z" + z + " --------------");
        for(let y = map.minY; y <= map.maxY; y++){
            let line = "";
            for(let x = map.minX; x <= map.maxX; x++) {
                if (map[x + ',' + y + ',' + z]) line += "#";
                else line += ".";
            }                
            console.log(line);
        }    
    }
}
const wipe = (map) => {
    let minX = null;
    let minY = null;
    let minZ = null;
    let maxX = null;
    let maxY = null;
    let maxZ = null;
    for(let key of Object.keys(map)){
        if (key.startsWith('max') || key.startsWith('min')) continue;
        if (map[key] === '.') {
            delete map[key];
            continue;
        }
        const coords = key.split(',').map(o => parseInt(o));
        if (minX === null) {
            minX = coords[0];
            maxX = coords[0];
            minY = coords[1];
            maxY = coords[1];
            minZ = coords[2];
            maxZ = coords[2];
        }
        if (maxX < coords[0]) maxX = coords[0];
        if (maxY < coords[1]) maxY = coords[1];
        if (maxZ < coords[2]) maxZ = coords[2];
        if (coords[0] < minX) minX = coords[0];
        if (coords[1] < minY) minY = coords[1];
        if (coords[2] < minZ) minZ = coords[2];
    }
    map.minX = minX;
    map.minY = minY;
    map.minZ = minZ;
    map.maxX = maxX;
    map.maxY = maxY;
    map.maxZ = maxZ;
}

const solve_dec_17_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec17.txt', 'utf8');
        const lines = data.split('\n');
        let map = {maxZ: 0, minZ: 0, maxY: 0, minY: 0, maxX: 0, minX: 0, minW: 0, maxW: 0};
        for(let y = 0; y < lines.length; y++){
            let row = lines[y].split('');
            for(let x = 0; x < row.length; x++){
                map[x + ',' + y + ',0,0'] = row[x];
            }
        }   
        wipe2(map);
        for(let i = 0; i < 6; i++){
            step2(map);
        }
        let count = 0;
        for(let key of Object.keys(map)){
            if (key.startsWith('max') || key.startsWith('min')) continue;
            count += 1;
        }
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



const step2 = (map) => {
    map.maxZ += 1;
    map.minZ -= 1;
    map.maxX += 1;
    map.minX -= 1;
    map.maxY += 1;
    map.minY -= 1;
    map.maxW += 1;
    map.minW -= 1;
    let updates = [];
    // Go through each coordinate in space
    for(let w = map.minW; w <= map.maxW; w++){
        for(let z = map.minZ; z <= map.maxZ; z++){
            for(let y = map.minY; y <= map.maxY; y++){
                for(let x = map.minX; x <= map.maxX; x++) {
                    // console.log("Evaluate " + x + "," + y + "," + z);
                    let count = 0;
                    let state = false;
                    if (map[x + ',' + y + ',' + z + ',' + w]) state = true;
                    for(let d = w - 1; d <= w + 1; d++){
                        for(let a = z - 1; a <= z + 1; a++){
                            for(let b = y - 1; b <= y + 1; b++){
                                for(let c = x -1; c <= x + 1; c++){
                                    if (a === z && b === y && c === x && d === w) continue;
                                    if (map[c + ',' + b + ',' + a + ',' + d]) count += 1;   
                                }
                            }
                        }
                    }
                    // console.log({position: x + ',' + y + ',' + z, state, count});
                    updates.push({position: x + ',' + y + ',' + z + ',' + w, state, count});
                }                
            }    
        }
    }
    
    for(let i = 0; i < updates.length; i++){
        if (updates[i].state === false && updates[i].count === 3) {
            updates[i]['flipped'] = true;
            map[updates[i].position] = '#';
            continue;
        }
        if (updates[i].state === true && updates[i].count === 2) continue;
        if (updates[i].state === true && updates[i].count === 3) continue;
        if (updates[i].state === true) {
            updates[i]['flipped'] = true;
            map[updates[i].position] = '.';
        }
    }
    // console.log(updates);
    wipe(map);
}

const draw2 = (map) => {
    for(let w = map.minW; w <= map.maxW; w++){
        console.log("------------ w" + w + " --------------");
        for(let z = map.minZ; z <= map.maxZ; z++){
            console.log("------------ z" + z + " --------------");
            for(let y = map.minY; y <= map.maxY; y++){
                let line = "";
                for(let x = map.minX; x <= map.maxX; x++) {
                    if (map[x + ',' + y + ',' + z  + ',' + w]) line += "#";
                    else line += ".";
                }                
                console.log(line);
            }    
        }
    }
}
const wipe2 = (map) => {
    let minX = null;
    let minY = null;
    let minZ = null;
    let minW = null;
    let maxX = null;
    let maxY = null;
    let maxZ = null;
    let maxW = null;
    for(let key of Object.keys(map)){
        if (key.startsWith('max') || key.startsWith('min')) continue;
        if (map[key] === '.') {
            delete map[key];
            continue;
        }
        const coords = key.split(',').map(o => parseInt(o));
        if (minX === null) {
            minX = coords[0];
            maxX = coords[0];
            minY = coords[1];
            maxY = coords[1];
            minZ = coords[2];
            maxZ = coords[2];
            minW = coords[3];
            maxW = coords[3];
        }
        if (maxX < coords[0]) maxX = coords[0];
        if (maxY < coords[1]) maxY = coords[1];
        if (maxZ < coords[2]) maxZ = coords[2];
        if (maxW < coords[3]) maxW = coords[3];
        if (coords[0] < minX) minX = coords[0];
        if (coords[1] < minY) minY = coords[1];
        if (coords[2] < minZ) minZ = coords[2];
        if (coords[3] < minW) minW = coords[3];
    }
    map.minX = minX;
    map.minY = minY;
    map.minZ = minZ;
    map.minW = minW;
    map.maxX = maxX;
    map.maxY = maxY;
    map.maxZ = maxZ;
    map.maxW = maxW;
}


start();



