"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_21_pt1());
    console.log(solve_dec_21_pt2());
};

module.exports = {
    start
};


const solve_dec_21_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec21.txt', 'utf8');
        const lines = data.split('\n');
        let food = {};
        let allIngredients = {};
        let allAllergens = {};
        for(let i = 0; i < lines.length; i++){
            let sides = lines[i].split('(contains')
            let ingredients = sides[0].split(' ').map(o => o.trim()).filter(o => o.length > 0);
            let allergens = sides[1].split(',').map(o => o.replace(')', '').trim());
            food[i] = {allergens, ingredients};
            for(let allergen of allergens){
                if(!allAllergens[allergen]) allAllergens[allergen] = {};
                for(let ingredient of ingredients){
                    if (!allAllergens[allergen][ingredient]) allAllergens[allergen][ingredient] = 0;
                    allAllergens[allergen][ingredient] += 1;
                }
            }
            for(let ingredient of ingredients){
                if(!allIngredients[ingredient]) allIngredients[ingredient] = {};
                for(let allergen of allergens){
                    if (!allIngredients[ingredient][allergen]) allIngredients[ingredient][allergen] = 0;
                    allIngredients[ingredient][allergen] += 1;
                }
            }
        }
        // kfcds, nhms, sbzzf (2), or trh
        console.log(allIngredients);
        console.log(allAllergens);
        console.log(food);
        let valid = [];
        for(let innerIngredient of Object.keys(allIngredients)){
            for(let innerAllergen of Object.keys(allIngredients[innerIngredient]))
            valid.push({
                    ingredient: innerIngredient, 
                    allergen: innerAllergen, 
                    possible: canBe({ ingredient: innerIngredient, allergen: innerAllergen }, JSON.parse(JSON.stringify(food)))});
        }
        console.log(valid);
        let possible = {};
        for(let i = 0; i < valid.length; i++){
            console.log(valid[i]);
            if (valid[i].possible){
                if (!possible[valid[i].ingredient]) possible[valid[i].ingredient] = [];
                possible[valid[i].ingredient].push(valid[i].allergen);
            }
        }
        console.log("Possible");
        console.log(possible);
        console.log("Impossible");
        let impossible = Object.keys(allIngredients).filter(o => !Object.keys(possible).includes(o))
        console.log(impossible);
        let count = 0;
        for(let key of Object.keys(food)) {
            for(let value of impossible){
                if (food[key].ingredients.includes(value)) count += 1;
            }
        }
        return count;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const canBe = (combo, food) => {
    for(let key of Object.keys(food)){
        if (food[key].allergens.indexOf(combo.allergen) >= 0) {
            if (!(food[key].ingredients.indexOf(combo.ingredient) >= 0)) return false;
        }
    }
    return true;
}

const solve_dec_21_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec21.txt', 'utf8');
        const lines = data.split('\n');
        let food = {};
        let allIngredients = {};
        let allAllergens = {};
        for(let i = 0; i < lines.length; i++){
            let sides = lines[i].split('(contains')
            let ingredients = sides[0].split(' ').map(o => o.trim()).filter(o => o.length > 0);
            let allergens = sides[1].split(',').map(o => o.replace(')', '').trim());
            food[i] = {allergens, ingredients};
            for(let allergen of allergens){
                if(!allAllergens[allergen]) allAllergens[allergen] = {};
                for(let ingredient of ingredients){
                    if (!allAllergens[allergen][ingredient]) allAllergens[allergen][ingredient] = 0;
                    allAllergens[allergen][ingredient] += 1;
                }
            }
            for(let ingredient of ingredients){
                if(!allIngredients[ingredient]) allIngredients[ingredient] = {};
                for(let allergen of allergens){
                    if (!allIngredients[ingredient][allergen]) allIngredients[ingredient][allergen] = 0;
                    allIngredients[ingredient][allergen] += 1;
                }
            }
        }
        // kfcds, nhms, sbzzf (2), or trh
        console.log(allIngredients);
        console.log(allAllergens);
        console.log(food);
        let valid = [];
        for(let innerIngredient of Object.keys(allIngredients)){
            for(let innerAllergen of Object.keys(allIngredients[innerIngredient]))
            valid.push({
                    ingredient: innerIngredient, 
                    allergen: innerAllergen, 
                    possible: canBe({ ingredient: innerIngredient, allergen: innerAllergen }, JSON.parse(JSON.stringify(food)))});
        }
        let possible = {};
        for(let i = 0; i < valid.length; i++){
            if (valid[i].possible){
                if (!possible[valid[i].ingredient]) possible[valid[i].ingredient] = [];
                possible[valid[i].ingredient].push(valid[i].allergen);
            }
        }
        console.log("Possible");
        console.log(possible);
        const startLength = Object.keys(possible).length;
        let solved = [];
        while(solved.length < startLength){
            for(let ingredient of Object.keys(possible)){
                if (possible[ingredient].length === 1){
                    let allergen = possible[ingredient][0];
                    solved.push({ingredient, allergen});
                    delete possible[ingredient];
                    
                    for(let key of Object.keys(possible)){
                        possible[key] = possible[key].filter(o => o !== allergen);
                    }
                    break;
                }
            }
        }
        console.log("Solved");
        solved = solved.sort((a, b) => {
            if(a.allergen < b.allergen) { return -1; }
            if(a.allergen > b.allergen) { return 1; }
            return 0;
        });
        console.log(solved);
        let solution = '';
        for(let key of solved)
            solution += key.ingredient + ",";
        
        return solution.substring(0, solution.length - 1);
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}



start();



