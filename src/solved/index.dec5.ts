"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_5_pt1());
    console.log(solve_dec_5_pt2());
};

module.exports = {
    start
};


const solve_dec_5_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec5.txt', 'utf8');
        const lines = data.split('\n');
        let highest = 0;
        for(let line of lines){
            let row = line.substring(0,7).replace('B', '1').replace('B', '1').replace('B', '1').replace('B', '1')
            .replace('B', '1').replace('B', '1').replace('B', '1').replace('B', '1').replace('B', '1')
            .replace('F', '0').replace('F', '0').replace('F', '0').replace('F', '0')
            .replace('F', '0').replace('F', '0').replace('F', '0').replace('F', '0');
            let col = line.substring(7).replace('R', '1').replace('R', '1').replace('R', '1').replace('L', '0').replace('L', '0').replace('L', '0').replace('L', '0');
            console.log("Row: " + row + "; " + parseInt(row, 2));
            console.log("Col: " + col + "; " + parseInt(col, 2));
            let seat = parseInt(row, 2) * 8 + parseInt(col, 2);
            console.log("Seat: " + seat);
            if (seat > highest) highest = seat;
        }
        return highest;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}


const solve_dec_5_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec5.txt', 'utf8');
        const lines = data.split('\n');
        let highest = 0;
        let maxRow = 0;
        let minRow = 10000;
        let maxCol = 0;
        let minCol = 10000;
        let coords = {};
        for(let line of lines){
            let row = line.substring(0,7).replace('B', '1').replace('B', '1').replace('B', '1').replace('B', '1')
            .replace('B', '1').replace('B', '1').replace('B', '1').replace('B', '1').replace('B', '1')
            .replace('F', '0').replace('F', '0').replace('F', '0').replace('F', '0')
            .replace('F', '0').replace('F', '0').replace('F', '0').replace('F', '0');
            let col = line.substring(7).replace('R', '1').replace('R', '1').replace('R', '1').replace('L', '0').replace('L', '0').replace('L', '0').replace('L', '0');
            // let seat = parseInt(row, 2) * 8 + parseInt(col, 2);
            let rowNum = parseInt(row, 2);
            let colNum = parseInt(col, 2);
            if (rowNum > maxRow) maxRow = rowNum;
            if (rowNum < minRow) minRow = rowNum;
            if (colNum > maxCol) maxCol = colNum;
            if (colNum < minCol) minCol = colNum;
            if (coords[rowNum]) coords[rowNum].push(colNum);
            else coords[rowNum] = [colNum];
        }
        for(let i = 7; i < 117; i++){
            if (coords[i]) coords[i] = coords[i].sort();
        }
        console.log(coords);
        for(let coord in coords){
            if (coords[coord].length < 8) console.log(coord + ", " + coords[coord]);

        }
        // Rows bounded by 7-116
        // Cols bounded by 0-7
        // Row missing a seat: 92, 0,1,2,3,4,5,6
        // 92 * 8 + 7 = 743
        console.log("Row: " + minRow + " - " + maxRow);
        console.log("Col: " + minCol + " - " + maxCol);
        return highest;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



