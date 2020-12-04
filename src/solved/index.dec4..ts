"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    console.log(solve_dec_4_pt1());
    // console.log(solve_dec_4_pt2());
};

module.exports = {
    start
};


const solve_dec_4_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec4.txt', 'utf8');
        const lines = data.split('\n');
        let passports = [];
        let current = {};
        for(let line of lines) {
            console.log(line);
            if (line === ""){
                passports.push(current);
                current = {};
                continue;
            }
            line.split(" ").forEach(o => {
                let vals = o.split(':');
                current[vals[0]] = vals[1];
            });
        }
        passports.push(current);
        console.log(passports.length);
        let valid = 0;
        for (let passport of passports){
            let validated = validate(passport);
            if (validated) valid += 1;
        }
        console.log(passports.length);
        return valid;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const validate  = (passport) => {
    /*  Part 1
    byr (Birth Year)
    iyr (Issue Year)
    eyr (Expiration Year)
    hgt (Height)
    hcl (Hair Color)
    ecl (Eye Color)
    pid (Passport ID)
    cid (Country ID)
    */
   let present = (passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.pid);
   if (!present) return false;
   /* Part 2
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    cid (Country ID) - ignored, missing or not.
    */

    try {
        let byr = parseInt(passport.byr);
        if (byr < 1920 || byr > 2002) return false;
        let iyr = parseInt(passport.iyr);
        if (iyr < 2010 || iyr > 2020) return false;
        let eyr = parseInt(passport.eyr);
        if (eyr < 2020 || eyr > 2030) return false;
        if(passport.hgt.replace('cm').length !== passport.hgt.length) {
            let hgt = parseInt(passport.hgt.replace('cm', ''));    
            if (hgt  < 150 || hgt > 193) return false;
        } else if (passport.hgt.replace('in').length !== passport.hgt.length) {
            let hgt = parseInt(passport.hgt.replace('in', ''));
            if (hgt  < 59 || hgt > 76) return false;
        } else {
            return false;
        }
        let hclTest: RegExp = /^#[0-9a-f]{6}$/;
        if (!hclTest.test(passport.hcl)) return false;
        if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(passport.ecl) < 0) return false;
        let pidTest: RegExp = /^[0-9]{9}$/;
        if (!pidTest.test(passport.pid)) return false;
        // 141 failed 
        // --> ECL check was busto, fixed it
    } catch( err) {
        return false;
    }
    return true;
}

const solve_dec_4_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec4.txt', 'utf8');
        const lines = data.split('\n');

        return 0;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



