const fs = require('fs');
const file = './input1.txt';

const hasSymbol = (str) => {
    if (str?.length && str.split('').find(x => isNaN(x) && x !== '.')) return true;
    return false;
};

fs.readFile(file, 'utf-8', (err, lines) => {
    const data = lines.split('\n').filter((n) => n);
    let rows = data.length;
    let cols = data[0].length;
    let found = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const n = data[i][j];
            if (isNaN(n)) continue;

            let num = n;
            while (++j < cols) {
                if (Number.isInteger(parseInt(data[i][j]))) {
                    num += data[i][j];
                } else break;
            }
            const top = i === 0 ? '' : data[i - 1].substring(j - num.length - 1, j + 1);
            const btm = i === rows - 1 ? '' : data[i + 1].substring(j - num.length - 1, j + 1);
            const lft = data[i][j - num.length - 1] || '';
            const rgt = data[i][j] || '';
            if (hasSymbol(top) || hasSymbol(btm) || hasSymbol(rgt) || hasSymbol(lft)) {
                found.push(Number(num));
            }

            console.log(num, top, rgt, btm, lft);
        }
    }
    console.log(found.reduce((a, c) => a + c, 0));
});
