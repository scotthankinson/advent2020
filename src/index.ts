"use strict";
// tslint:disable
import fs = require('fs');
import { flip } from 'lodash';

const start = (): void => {
    // console.log(solve_dec_20_pt1());
    console.log(solve_dec_20_pt2());
};

module.exports = {
    start
};


const solve_dec_20_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec20.txt', 'utf8');
        const lines = data.split('\n');
        let tile = -1;
        let image = {};
        for(let line of lines){
            if(line.trim() === ''){
                tile = -1;
                continue;
            }
            if (tile === -1){
                tile = parseInt(line.replace(':', '').replace('Tile ', ''));
                image[tile] = [];
                continue;
            } else {
                image[tile].push(line);
            }
        }

        // Sample is 9 tiles
        // 8 / 9 tiles have exactly 1 unmatched edge
        // 4 / 9 tiles have exactly 2 unmatched edges   --> find these and they are the corners
        // 1 tile has NO unmatched edges (center)
        let unmatchedSides = {};
        for(let value of Object.keys(image)){
            let key = parseInt(value);
            let unmatched = 0;
            let test = checkSidePt1(image, key, image[key][0]);
            if (test.matches === 0) unmatched += 1;
            rotate(image, key);
            test = checkSidePt1(image, key, image[key][0]);
            if (test.matches === 0) unmatched += 1;
            rotate(image, key);
            test = checkSidePt1(image, key, image[key][0]);
            if (test.matches === 0) unmatched += 1;
            rotate(image, key);
            test = checkSidePt1(image, key, image[key][0]);
            if (test.matches === 0) unmatched += 1;
            rotate(image, key);
            console.log(key + ": " + unmatched);
            unmatchedSides[key] = unmatched;
        }
        console.log(unmatchedSides);
        let corners = 1;
        for(let key of Object.keys(unmatchedSides)){
            if (unmatchedSides[key] === 2) corners *= parseInt(key);
        }


        return corners;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

// return the number of possible matches
const checkSidePt1 = (image, tile, side) => {
    let localImage = JSON.parse(JSON.stringify(image));
    let matches = 0;
    for(let oneTile of Object.keys(localImage)){
        if (parseInt(oneTile) === tile) continue;
        // Initial orientation
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
        
        // Opposite orientation
        flipY(localImage, oneTile);
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) matches += 1;
        rotate(localImage, oneTile);
    }
    return {source: tile, side, matches};
}

const checkSide = (image, tile, side) => {
    let localImage = JSON.parse(JSON.stringify(image));
    let matches = {};
    let matchCount = 0;
    let faces = 0;
    for(let oneTile of Object.keys(localImage)){
        let localMatches = 0;
        if (parseInt(oneTile) === tile) continue;
        // Initial orientation
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        
        // Opposite orientation
        flipY(localImage, oneTile);
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        if (side === localImage[oneTile][0]) localMatches += 1;
        rotate(localImage, oneTile);
        matches[oneTile] = localMatches;
        matchCount += localMatches;
        if (localMatches > 0) faces = parseInt(oneTile);
    }
    return {source: tile, side, edge: faces === 0, faces};
}

const draw = (tile) => {
    for(let line of tile){
        console.log(line.trim());
    }
}


// flip around the Y axis
const flipY = (image, tile) => {
    let flipped = [];
    for(let row of image[tile]){
        flipped.push(row.split('').reverse().join(''));
    }
    image[tile] = flipped;
}

// flip around the X axis
const flipX = (image, tile) => {
    image[tile] = image[tile].reverse();
}

// rotate 90 degrees
const rotate = (image, tile) => {
    let rotated = [];
    for(let i = 0; i < image[tile].length; i++){
        let row = '';
        for(let j = image[tile].length - 1; j >= 0; j--){
            row += image[tile][j][i];
        }    
        rotated.push(row);
    }
    image[tile] = rotated;
}

const solve_dec_20_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec20.txt', 'utf8');
        const lines = data.split('\n');
        let tile = -1;
        let image = {};
        for(let line of lines){
            if(line.trim() === ''){
                tile = -1;
                continue;
            }
            if (tile === -1){
                tile = parseInt(line.replace(':', '').replace('Tile ', ''));
                image[tile] = [];
                continue;
            } else {
                image[tile].push(line);
            }
        }
        // Actual puzzle is 12x12, input is 3x3

        let matchData = [];
        // Find the edges and corners
        for(let value of Object.keys(image)){
            matchData.push(getFacings(image, parseInt(value)));
        }
        
        // Lay down the first corner of the puzzle
        let puzzle = {};
        let puzzleHeight = 3;
        let puzzleWidth = 3;
        let currentTile = matchData.filter(o => o.type === 'corner')[0];
        while(!(currentTile.sides.top.edge && currentTile.sides.left.edge)) {
            rotate(image, currentTile.tile);
            currentTile = getFacings(image, currentTile.tile);
        }
        puzzle['0,0'] = currentTile.tile;
        console.log(currentTile.sides.right.faces);

        // Follow the row
        // Top Row -- next piece's LEFT should match firstCorner RIGHT and TOP should be EDGE
        let row = 0;
        while(row < puzzleHeight){
            console.log("Row " + row + " of " + puzzleHeight);
            let rowStarter = JSON.parse(JSON.stringify(currentTile));
            for(let x = 1; x < puzzleWidth; x++){
                let lastTile = currentTile.tile;
                // console.log("Next Piece: " + currentTile.sides.right.faces);
                currentTile = getFacings(image, currentTile.sides.right.faces);
                if (row === 0) {
                    while(!(currentTile.sides.top.edge)){
                        rotate(image, currentTile.tile);
                        currentTile = getFacings(image, currentTile.tile);
                    }
                } else {
                    while(!(currentTile.sides.top.faces === puzzle[x + ',' + (row - 1)])) {
                        rotate(image, currentTile.tile);
                        currentTile = getFacings(image, currentTile.tile);
                    }
                }
                if(currentTile.sides.right.facing === lastTile) flipY(image, currentTile.tile);
                puzzle[x + ',' + row] = currentTile.tile;
            }
            // Get the next piece down and move down a row
            row += 1;
            if (row === puzzleHeight) break;
            currentTile = getFacings(image, rowStarter.sides.bottom.faces);
            while(currentTile.sides.top.faces !== rowStarter.tile) {
                rotate(image, currentTile.tile);
                currentTile = getFacings(image, currentTile.tile);
            }
            if (!currentTile.sides.left.edge){
                flipY(image, currentTile.tile);
                currentTile = getFacings(image, currentTile.tile);
            }
            puzzle['0,' + row] = currentTile.tile;
            console.log(currentTile);
        }
        
        // TODO: trim and combine the images, rotate until we can verify our map is correct
        console.log(puzzle);
        for(let y = 0; y < puzzleHeight; y++){
            for(let x = 0; x < puzzleWidth; x++){
                let coord = x  + ',' + y;
                console.log("-----------" + coord + "------------");
                draw(image[parseInt(puzzle[coord])]);

            }
        }

        // TODO: find sea monsters

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const getFacings = (image, tile) => {
    let sides = {};
    let edgeCount = 0;
    let test = checkSide(image, tile, image[tile][0]);
    if (test.edge) edgeCount += 1;
    sides["top"] = test;
    // console.log(test);
    rotate(image, tile);
    test = checkSide(image, tile, image[tile][0]);
    if (test.edge) edgeCount += 1;
    sides["left"] = test;
    // console.log(test);
    rotate(image, tile);
    test = checkSide(image, tile, image[tile][0]);
    if (test.edge) edgeCount += 1;
    sides["bottom"] = test;
    // console.log(test);
    rotate(image, tile);
    test = checkSide(image, tile, image[tile][0]);
    if (test.edge) edgeCount += 1;
    sides["right"] = test;
    // console.log(test);
    rotate(image, tile);

    let type = '';
    // console.log(edgeCount);
    if (edgeCount === 1) type = 'edge';
    else if (edgeCount === 2) type = 'corner';
    else type = ''
    // console.log({tile, type, sides});
    return {tile, type, sides};
}

start();



