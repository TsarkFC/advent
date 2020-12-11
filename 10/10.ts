export { }

function readFile() {
    let lines: string[] = require('fs').readFileSync('input.txt', 'utf8').split('\n');
    return lines.map(e => parseInt(e));
}

function part1() {
    let sortedValues = readFile().sort((a, b) => a - b);

    let previous = 0, threes = 1, ones = 0;
    for (const value of sortedValues) {
        if (value - previous == 1) ones++;
        else if (value - previous == 3) threes++;
        previous = value;
    }
    return ones * threes;
}

function part2() {
    let values = readFile();
    values.push(0);
    let sortedValues = values.sort((a, b) => a - b);

    return recursive(0, sortedValues, []);
}

function recursive(i: number, values: number[], dp: number[]) {
    if (i == values.length - 1) return 1;
    if (dp.includes(i)) return dp[i];

    let res = 0;

    for (let j = i + 1; j < values.length; j++) {
        if (values[j] - values[i] <= 3)
            res += recursive(j, values, dp);
    }

    dp[i] = res;
    return res;
}

console.log('Result1:', part1());
console.log('Result2:', part2());