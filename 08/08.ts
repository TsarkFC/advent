export { }

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

function part1(lines: String[]) {
    let acc = 0;
    let indexes: Number[] = [];
    let index = 0;

    while (true) {
        let divided = lines[index].split(' ');
        let instruction = { instruction: divided[0], value: parseInt(divided[1]) };

        if (index == lines.length - 1)
            return {result: acc, finished: true};
        else if (indexes.find(e => e == index) == null)
            indexes.push(index);
        else
            return {result: acc, finished: false};

        if (instruction.instruction == 'acc') {
            acc += instruction.value;
            index++;
        }
        else if (instruction.instruction == 'jmp')
            index += instruction.value;
        else index++;
    }
}

function part2() {
    let lines = readFile();

    for (let i = 0; i < lines.length; i++) {
        let lines_copy = [...lines];

        let divided = lines[i].split(' ');
        if (divided[0] == 'jmp')
            lines_copy[i] = 'nop ' + divided[1];
        else if (divided[0] == 'nop')
            lines_copy[i] = 'jmp ' + divided[1];
        else continue;

        let res = part1(lines_copy);
        if (res.finished) return res.result;
    }

}

console.log('Result1:', part1(readFile()).result);
console.log('Result2:', part2());