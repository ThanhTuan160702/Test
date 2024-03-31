const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input: ', (input) => {
    let arr = input.split(" ").map(Number);
    let sum = arr.reduce((total, el) => total + el)
    let max = sum - Math.min(...arr)
    let min = sum - Math.max(...arr)
    console.log(min + ' ' + max)
});

