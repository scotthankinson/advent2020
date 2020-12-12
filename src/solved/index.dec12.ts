"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_12_pt1());
    console.log(solve_dec_12_pt2());
};

module.exports = {
    start
};


const solve_dec_12_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec12.txt', 'utf8');
        const lines = data.split('\n');

        let position = {x: 0, y: 0, heading: 'E'};
        for(let line of lines){
            let dir = line[0];
            let dist = parseInt(line.substring(1));
            console.log("Execute " + dir + " for " + dist + ", Heading " + position.heading);
            if (dir === 'F') dir = position.heading;
            switch(dir){
                case 'N': {
                    position['y'] -= dist;
                    break;
                }
                case 'E': {
                    position['x'] += dist;
                    break;
                }
                case 'S': {
                    position['y'] += dist;
                    break;
                }
                case 'W': {
                    position['x'] -= dist;
                    break;
                }
                case 'L': {
                    while (dist > 0){
                        switch(position.heading){
                            case 'N': position.heading = 'W'; break;
                            case 'E': position.heading = 'N'; break;
                            case 'S': position.heading = 'E'; break;
                            case 'W': position.heading = 'S'; break;
                        }
                        dist -= 90;
                    }
                    break;
                }
                case 'R': {
                    while (dist > 0){
                        switch(position.heading){
                            case 'N': position.heading = 'E'; break;
                            case 'E': position.heading = 'S'; break;
                            case 'S': position.heading = 'W'; break;
                            case 'W': position.heading = 'N'; break;
                        }
                        dist -= 90;
                    }
                    break;
                }
            }
            // 4192 -- Too High, added Breaks to my swtiches
            // 1148
            console.log(position);
        }
        return Math.abs(position.x) + Math.abs(position.y);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_12_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec12.txt', 'utf8');
        const lines = data.split('\n');

        let position = {x: 0, y: 0, wpX: 10, wpY: -1};
        for(let line of lines){
            let dir = line[0];
            let dist = parseInt(line.substring(1));
            console.log("Execute " + dir + " for " + dist);
            if (dir === 'L') {
                dir = 'R';
                dist = (360 - dist) % 360;
                console.log("Convert " + line + " to R" + dist);
            }
            switch(dir){
                case 'F': {
                    for(let i = 0; i < dist; i++){
                        position.x += position.wpX;
                        position.y += position.wpY;
                    }
                    break;
                }
                case 'N': {
                    position.wpY -= dist;
                    break;
                }
                case 'E': {
                    position.wpX += dist;
                    break;
                }
                case 'S': {
                    position.wpY += dist;
                    break;
                }
                case 'W': {
                    position.wpX -= dist;
                    break;
                }
                case 'R': {
                    let startX = position.wpX;
                    let startY = position.wpY;
                    // 0:   10, -4
                    // 90:  4, 10
                    // 180: -10, 4
                    // 270: -4, -10
                    switch (dist) {
                        case 90:{
                            position.wpX = -1 * startY;
                            position.wpY = startX;
                            break;
                        }
                        case 180: {
                            position.wpX = -1 * startX;
                            position.wpY = -1 * startY;
                            break;
                        }
                        case 270: {
                            position.wpX = startY;
                            position.wpY = -1 * startX;
                            break;
                        }
                    }
                    break;
                }
            }
            console.log(position);
        }
        return Math.abs(position.x) + Math.abs(position.y);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



