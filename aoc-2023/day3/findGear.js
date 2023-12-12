const fs = require('fs');
const lines = fs
    .readFileSync('./input1.txt', 'utf-8')
    .split('\n')
    .filter((n) => n);
const isSymbol = (n) => {
    if (n?.length && n.split('').find((x) => isNaN(x) && x !== '.')) return true;
    return false;
};

let rows = lines.length;
let cols = lines[0].length;
let solution = [];
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const n = '' + lines[i][j];
        if (isNaN(n)) continue;
        let num = n;
        while (++j < cols) {
            if (Number.isInteger(parseInt(lines[i][j]))) num += lines[i][j];
            else break;
        }
        const top = i === 0 ? '' : lines[i - 1].substring(j - num.length - 1, j + 1);
        const bottom = i === rows - 1 ? '' : lines[i + 1].substring(j - num.length - 1, j + 1);
        const left = lines[i][j - num.length - 1] || '';
        const right = lines[i][j] || '';
        if (isSymbol(top) || isSymbol(bottom) || isSymbol(left) || isSymbol(right))
            solution.push(Number(num));

        console.log(num, { rows }, { cols });
    }
}
console.log(solution.reduce((a, b) => a + b, 0));
