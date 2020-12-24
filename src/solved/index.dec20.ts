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

let prune = (tile) => {
    let lines = [];
    for(let y = 1; y < tile.length - 1; y++){   // snip top and bottom
        lines.push(tile[y].substring(1, tile[y].length - 1));
    }
    return lines;
}


// flip around the Y axis
const flipY = (image, tile) => {
    let flipped = [];
    for(let row of image[tile]){
        flipped.push(row.split('').reverse().join(''));
    }
    image[tile] = flipped;
}

// flip around the Y axis
const flipTile = (tile) => {
    let flipped = [];
    for(let row of tile){
        flipped.push(row.split('').reverse().join(''));
    }
    return flipped;
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

// rotate 90 degrees
const rotateTile = (tile) => {
    let rotated = [];
    for(let i = 0; i < tile.length; i++){
        let row = '';
        for(let j = tile.length - 1; j >= 0; j--){
            row += tile[j][i];
        }    
        rotated.push(row);
    }
    return rotated;
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
        let puzzleHeight = 12;
        let puzzleWidth = 12;
        // Force 1951 to match up with the picture
        // let currentTile = matchData.filter(o => o.type === 'corner' && o.tile === 1951)[0];
        let currentTile = matchData.filter(o => o.type === 'corner')[0];
        while(!(currentTile.sides.top.edge && currentTile.sides.left.edge)) {
            rotate(image, currentTile.tile);
            currentTile = getFacings(image, currentTile.tile);
        }
        // console.log(currentTile);
        puzzle['0,0'] = currentTile.tile;
        // console.log(currentTile.sides.right.faces);

        // Follow the row
        // Top Row -- next piece's LEFT should match firstCorner RIGHT and TOP should be EDGE
        let row = 0;
        while(row < puzzleHeight){
            // console.log("Row " + row + " of " + puzzleHeight);
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
                    if (currentTile.sides.left.edge) {  // Opposite corner
                        console.log("@@@@@@@ Flipper corner");
                        rotate(image, currentTile.tile);
                        currentTile = getFacings(image, currentTile.tile);                                
                    }
                } else {
                    while(!(currentTile.sides.top.faces === puzzle[x + ',' + (row - 1)])) {
                        rotate(image, currentTile.tile);
                        currentTile = getFacings(image, currentTile.tile);
                    }
                }
                if(currentTile.sides.right.faces === lastTile) {
                    flipY(image, currentTile.tile);
                    currentTile = getFacings(image, currentTile.tile);
                }
                // console.log(currentTile);
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
            // console.log(currentTile);
        }
        
        let superTile = [];
        for(let y = 0; y < puzzleHeight; y++){
            let lines = [];
            for(let x = 0; x < puzzleWidth; x++){                
                let coord = x  + ',' + y;
                if (x === 0) lines = lines.concat(prune(image[parseInt(puzzle[coord])]));
                else {
                    let tile = prune(image[parseInt(puzzle[coord])]);
                    for(let i = 0; i < tile.length; i++){
                        lines[i] += tile[i];
                    }
                }
            }
            superTile = superTile.concat(lines);
        }

        // Get into orientation of sample
        let flipped = flipTile(superTile);
        let rotated = rotateTile(rotateTile(rotateTile(flipped)));
        
        /*
        let test = [
            '.#.#..#.##...#.##..#####',
            '###....#.#....#..#......',
            '##.##.###.#.#..######...',
            '###.#####...#.#####.#..#',
            '##.#....#.##.####...#.##',
            '...########.#....#####.#',
            '....#..#...##..#.#.###..',
            '.####...#..#.....#......',
            '#..#.##..#..###.#.##....',
            '#.####..#.####.#.#.###..',
            '###.#.#...#.######.#..##',
            '#.####....##..########.#',
            '##..##.#...#...#.#.#.#..',
            '...#..#..#.#.##..###.###',
            '.#.#....#.##.#...###.##.',
            '###.#...#..#.##.######..',
            '.#.#.###.##.##.#..#.##..',
            '.####.###.#...###.#..#.#',
            '..#.#..#..#.#.#.####.###',
            '#..####...#.#.#.###.###.',
            '#####..#####...###....##',
            '#.##..#..#...#..####...#',
            '.#.###..##..##..####.##.',
            '...###...##...#...#..###'
        ];
        for(let i = 0; i < test.length; i++){
            console.log(test[i] === rotated[i]);
            console.log(test[i]);
            console.log(rotated[i]);
        }
        */
        
        // To solution = rotate + flip
        rotated = flipTile(rotateTile(rotated));
        draw(rotated);
        let count = countSeaMonsters(rotated);
        let tries = 0;
        while (count === 0){
            tries += 1;
            rotated = rotateTile(rotated);
            count = countSeaMonsters(rotated);
            if (tries % 4 === 0)
                rotated = flipTile(rotated);
        }
        console.log("Found " + count + " monsters after " + tries + " attempts");
        draw(rotated);

        return countWaves(rotated);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const countSeaMonsters = (tile) => {
    console.log("--------------------------------------");
    // TODO: find sea monsters -- 19x3 region matching below
    let seaMonster = [
        '                  # ',
        '#    ##    ##    ###', 
        ' #  #  #  #  #  #   '];
    
    let monsterCount = 0;
    for(let y = 0; y < tile.length - 2; y++){
        for(let x = 0; x < tile[0].length - 19; x++){
            // console.log("Checking " + x + "," + y + " for Sea Monsters!");
            let localTile = JSON.parse(JSON.stringify(tile));
            if (!checkForSeaMonster(localTile, y, x+18)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x + 5)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x + 6)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x + 11)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x + 12)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x + 17)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x + 18)) continue;
            if (!checkForSeaMonster(localTile, y + 1, x + 19)) continue;
            if (!checkForSeaMonster(localTile, y + 2, x + 1)) continue;
            if (!checkForSeaMonster(localTile, y + 2, x + 4)) continue;
            if (!checkForSeaMonster(localTile, y + 2, x + 7)) continue;
            if (!checkForSeaMonster(localTile, y + 2, x + 10)) continue;
            if (!checkForSeaMonster(localTile, y + 2, x + 13)) continue;
            if (!checkForSeaMonster(localTile, y + 2, x + 16)) continue;
            
            console.log("Found at " + x + "," + y + "!");
            draw(localTile);
            tile[y] = localTile[y];
            tile[y+1] = localTile[y+1];
            tile[y+2] = localTile[y+2];
            monsterCount +=1;
        }
    }
    console.log("--------------------------------------");
    return monsterCount;
};

const countWaves = (tile) => {
    let count = 0;
    for(let row of tile){
        count += row.split('').filter(o => o === '#').length;
    }
    return count;
}

const checkForSeaMonster = (tile, y, x) => {
    let start = tile[y][x] === '#';
    if (start){
        // console.log(tile[y]);
        tile[y] = tile[y].substring(0, x) + 'O' + tile[y].substring(x + 1);
        // console.log(tile[y]);
    }
    return start;
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



