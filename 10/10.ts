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

}

console.log('Result1:', part1());
console.log('Result2:', part2());