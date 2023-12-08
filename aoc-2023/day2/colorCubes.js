const fs = require('fs');

const maxCount = { red: 12, green: 13, blue: 14 };
function getColorCube(file) {
    let lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
    return lines
        .map((item) => {
            return item
                .split(': ')[1]
                .split('; ')
                .map((set) => {
                    const pulls = set.split(', ');
                    return pulls.every((pull) => {
                        const [count, color] = pull.split(' ');
                        return maxCount[color] >= Number(count);
                    });
                })
                .every((p) => p);
        })
        .reduce((s, result, i) => {
            return result ? s + (i + 1) : s;
        }, 0);
}
//console.log(getColorCube('./example.txt'));

function getColorCube2(file) {
    let lines = fs.readFileSync(file, 'utf-8').trim().split('\n');
    return lines
        .map((item) => {
            const possibleMax = { red: 0, green: 0, blue: 0 };
            item.split(': ')[1]
                .split('; ')
                .forEach((set) => {
                    const pulls = set.split(', ');
                    return pulls.forEach((pull) => {
                        const [count, color] = pull.split(' ');
                        if (Number(count) > possibleMax[color]) {
                            possibleMax[color] = Number(count);
                        }
                    });
                });
            return possibleMax.red * possibleMax.blue * possibleMax.green;
        })
        .reduce((s, v) => s + v);
}

console.log(getColorCube2('./example2.txt'));
