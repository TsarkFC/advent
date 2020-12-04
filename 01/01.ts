function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

function part1() {
    let read = readFile();

    let int1: number, int2: number;
    for (let num1 of read) {
        int1 = parseInt(num1);
        for (let num2 of read) {
            int2 = parseInt(num2);
            if (int1 + int2 == 2020) return int1 * int2;
        }
    }
}

function part2() {
    let read = readFile();

    let int1: number, int2: number, int3: number;
    for (let num1 of read) {
        int1 = parseInt(num1);
        for (let num2 of read) {
            int2 = parseInt(num2);
            for (let num3 of read){
                int3 = parseInt(num3);
                if (int1 + int2 + int3 == 2020) return int1 * int2 * int3;
            }
        }
    }    
}


console.log('Result1:', part1());
console.log('Result2:', part2());