"use strict";
// tslint:disable
import fs = require('fs');

const start = (): void => {
    // console.log(solve_dec_18_pt1());
    console.log(solve_dec_18_pt2());
};

module.exports = {
    start
};


const solve_dec_18_pt1 = () => {
    try {
        let data = fs.readFileSync('src/test.dec18.txt', 'utf8');
        const lines = data.split('\n');
        let sum = 0;
        for(let line of lines){
            console.log(line);
            let parts = line.split('');
            let depth = 0;
            let stack = {0: ''}
            while(parts.length > 0){
                let val = parts.shift();
                if (val === " ") continue;
                if (val === "("){
                    depth += 1;
                    stack[depth] = '';
                    continue;
                }
                if (val === ")"){
                    let simplify = evaluate(stack[depth]);
                    depth -= 1;
                    stack[depth] += simplify.toString();
                    delete stack[depth + 1];
                    continue;
                }
                if (stack[depth]) stack[depth] += val;
                else stack[depth] = val;
            }
            console.log(stack);
            sum += parseInt(evaluate(stack[0]));
        }
        return sum;
    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const evaluate = (equation) => {
    console.log(equation);
    let parts = equation.split('');
    let a = '';
    let operand = '';
    while(parts.length > 0){
        let next = parts.shift();
        if (next === ' ') continue;
        if (next === '*') operand = '*';
        else if (next === '+') operand = '+';
        else if (a === '') {
            a += next;
            while(isNumeric(parts[0])) {
                next = parts.shift();
                a += next;
            }
        }
        else {
            let b = next;
            while(isNumeric(parts[0])) {
                next = parts.shift();
                b += next;
            }
            let result = eval(a + ' ' + operand + ' ' + b);
            a = result.toString();
        }
    }
    console.log(a.trim());
    return a.trim();
}

// rxjs isNumeric
function isNumeric(val: any): boolean {
    return !(val instanceof Array) && (val - parseFloat(val) + 1) >= 0;
 }

const solve_dec_18_pt2 = () => {
    try {
        let data = fs.readFileSync('src/test.dec18.txt', 'utf8');
        const lines = data.split('\n');
        let sum = 0;
        for(let line of lines){      
            console.log("@@@@@@ " + line);      
            let parts = line.split('');
            let depth = 0;
            let stack = {0: ''}
            while(parts.length > 0){
                let val = parts.shift();
                if (val === " ") continue;
                if (val === "("){
                    depth += 1;
                    stack[depth] = '';
                    continue;
                }
                if (val === ")"){
                    let simplify = orderedEval(stack[depth]);
                    depth -= 1;
                    stack[depth] += simplify.toString();
                    delete stack[depth + 1];
                    continue;
                }
                if (stack[depth]) stack[depth] += val;
                else stack[depth] = val;
            }
            sum += parseInt(orderedEval(stack[0]));
        }
        return sum;    } catch (e) {
        console.log('Error:', e.stack);
    }
    return -1;
}

const orderedEval = (equation) => {
    let parts = equation.split('');
    let a = '';
    let lastOperand = '';
    let operand = '';
    let output = '';
    while(parts.length > 0){
        let next = parts.shift();
        if (next === ' ') continue;
        if (next === '*') operand = '*';
        else if (next === '+') operand = '+';
        else if (a === '') {
            a += next;
            while(isNumeric(parts[0])) {
                next = parts.shift();
                a += next;
            }
        }
        else {
            let b = next;
            while(isNumeric(parts[0])) {
                next = parts.shift();
                b += next;
            }
            if (operand === '+'){
                if (lastOperand === '+')
                    output += ' ' + a + ' + ';
                else
                    output += ' ( ' + a + ' + ';
            } else {
                if (lastOperand === '+')
                    output += ' ' + a + ') * ';
                else
                    output += ' ' + a + ' * ';
            }
            a = b;
            lastOperand = operand;
        }
    }
    if (lastOperand === '+')
        output += a + ')';
    else 
        output += a;
    let result = eval(output);
    console.log(equation + " = " + result);
    return result.toString();
}

start();



