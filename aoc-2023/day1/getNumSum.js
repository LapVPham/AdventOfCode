const fs = require('fs');

function findValue(file) {
    const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');

    const values = lines.map((line) => {
        let first = line.split('').find((v) => !Number.isNaN(Number(v)));
        let last = line.split('').findLast((v) => !Number.isNaN(Number(v)));
        return Number(first + last);
    });
    return values.reduce((s, v) => s + v);
}
//console.log(findValue('./input.txt'));

function findValuePart2(file) {
    const firstNumRegExp = new RegExp(
        ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join('|'),
    );
    const lastNumRegExp = new RegExp(
        ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
            .join('|')
            .split('')
            .reverse()
            .join(''),
    );

    const wordToNum = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
    };

    const lines = fs.readFileSync(file, 'utf-8').trim().split('\n');

    const values = lines.map((line) => {
        let firstNumberIndex = line.split('').findIndex((v) => !Number.isNaN(Number(v)));
        let firstWordMatch = line.match(firstNumRegExp);
        let firstWordIndex = firstWordMatch?.index;
        let firstNumber =
            firstNumberIndex != -1
                ? firstWordMatch
                    ? firstNumberIndex < firstWordIndex
                        ? line[firstNumberIndex]
                        : wordToNum[firstWordMatch[0]]
                    : line[firstNumberIndex]
                : wordToNum[firstWordMatch[0]];

        let lastNumberIndex = line.split('').findLastIndex((v) => !Number.isNaN(Number(v)));
        let lastWordMatch = line.split('').reverse().join('').match(lastNumRegExp);
        let lastWordIndex = lastWordMatch ? line.length - 1 - lastWordMatch.index : null;
        let lastNumber =
            lastNumberIndex != -1
                ? lastWordMatch
                    ? lastNumberIndex > lastWordIndex
                        ? line[lastNumberIndex]
                        : wordToNum[lastWordMatch[0].split('').reverse().join('')]
                    : line[lastNumberIndex]
                : wordToNum[lastWordMatch[0].split('').reverse().join('')];

        console.log(firstNumber,lastNumber);
        return Number(firstNumber + lastNumber);
    });
    return values.reduce((s, v) => s + v);
}
console.log(findValuePart2('./input2.txt'));
