export { }

function readFile() {
    let lines: string[] = require('fs').readFileSync('input.txt', 'utf8').split('\n');
    return lines.map(e => parseInt(e));
}

function updateCombinations(combinations: number[][], previousNumber: number, number: number) {
    for (let pair of combinations) {
        if (pair[0] == previousNumber)
            pair[0] = number;
        else if (pair[1] == previousNumber)
            pair[1] = number;
    }
}

function checkSum(combinations: number[][], value: number) {
    for (const pair of combinations)
        if (pair[0] + pair[1] == value) return true;
    return false;
}

function part1(preambleSize: number, lines: number[]) {
    let combinations: number[][] = [];

    for (let i = 0; i < preambleSize; i++)
        for (let j = 0; j < i; j++)
            combinations.push([lines[i], lines[j]]);

    for (let i = preambleSize; i < lines.length; i++) {
        if (!checkSum(combinations, lines[i]))
            return lines[i];
        updateCombinations(combinations, lines[i - preambleSize], lines[i]);
    }
    return 0;
}

function part2(preambleSize: number) {
    let lines = readFile();
    let targetNum = part1(preambleSize, lines);

    let listSum: number[] = [lines[0]];
    let tryNum = 1;
    for (let i = 1; i < lines.length; i++) {
        let sum = listSum.reduce((a, b) => { return a + b });
        if (sum == targetNum) {
            return Math.max(...listSum) + Math.min(...listSum);
        }
        else if (sum < targetNum)
            listSum.push(lines[i]);
        else if (sum > targetNum) {
            i = tryNum++;
            listSum = [lines[i]];
        } 
    }
    return 0;
}

console.log('Result1:', part1(25, readFile()));
console.log('Result2:', part2(25));