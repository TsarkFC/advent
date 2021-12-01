export { };

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

interface Move {
    right: number;
    down: number;
}

function ex3(moves: Move[]) {
    let read = readFile();

    let total = 1;
    let xOffset: number, yOffset: number, totalTrees = 0;
    let xLimit = read[0].length;
    for (const move of moves) {
        xOffset = 0;
        yOffset = move.down;
        totalTrees = 0;
        for (let index in read) {
            if (parseInt(index) % yOffset == 0) {
                if (read[index][xOffset] == '#') totalTrees++;
                xOffset = (xOffset + move.right) % xLimit;
            }
        }
        total *= totalTrees;
    }
    return total;
}

console.log('Result1:', ex3([{ right: 3, down: 1 }]));
console.log('Result2:', ex3([{ right: 1, down: 1 },
{ right: 3, down: 1 },
{ right: 5, down: 1 },
{ right: 7, down: 1 },
{ right: 1, down: 2 }]));