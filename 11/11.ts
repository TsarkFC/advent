export { }

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

function ex11(limit: number) {
    let seats: string[] = readFile();
    let nextSeats: string[] = [];
    let occupied = 0;

    while (true) {
        for (let row = 0; row < seats.length; row++) {
            let nextLine = "";
            for (let col = 0; col < seats[0].length; col++) {
                if (seats[row][col] == ".") nextLine += ".";

                let surroundings = getSurroundings(seats, row, col, limit);
                if (seats[row][col] == "L") {
                    if (!surroundings.includes("#")) {
                        nextLine += "#";
                        occupied++;
                    }
                    else nextLine += "L";
                } 
                else if (seats[row][col] == "#") {
                    if (surroundings.filter(elem => elem == "#").length >= limit)
                        nextLine += "L";
                    else {
                        nextLine += "#";
                        occupied++;
                    }
                }
            }
            nextSeats.push(nextLine);
            nextLine = "";
        }
        if (areEqual(seats, nextSeats)) return occupied;
        seats = []; 
        seats = seats.concat(nextSeats);
        nextSeats = [];
        occupied = 0;
    }
}

function areEqual(array1: string[], array2: string[]) {
    if (array1.length != array2.length) return false;

    for (let i = 0; i < array1.length; i++)
        if (array1[i] != array2[i]) return false;
    return true;
}

function getSurroundings(seats: string[], row: number, col: number, limit: number) {
    let surroundings: string[] = [];
    let rows: number[] = [];
    let cols: number[] = [];
    let upperRow = row - 1, lowerRow = row + 1;
    let leftCol = col - 1, rightCol = col + 1;

    rows.push(row);
    if (upperRow >= 0 && upperRow < seats.length) rows.push(upperRow);
    if (lowerRow >= 0 && lowerRow < seats.length) rows.push(lowerRow);

    cols.push(col);
    if (leftCol >= 0 && leftCol < seats[0].length) cols.push(leftCol);
    if (rightCol >= 0 && rightCol < seats[0].length) cols.push(rightCol);

    for (const newRow of rows)
        for (const newCol of cols)
            if (newRow != row || newCol != col) {
                let seat = (limit == 4) ? seats[newRow][newCol] : getContinuous(seats, row, col, newRow, newCol);
                surroundings.push(seat);
            }

    return surroundings;
}

function getContinuous(seats: string[], row: number, col: number, newRow: number, newCol: number) {
    if (seats[newRow][newCol] != ".") return seats[newRow][newCol];

    let step = 1;
    let rowCopy = newRow, colCopy = newCol;
    while (seats[rowCopy][colCopy] == ".") {
        rowCopy = newRow + (newRow - row) * step;
        colCopy = newCol + (newCol - col) * step;

        if (rowCopy < 0 || rowCopy >= seats.length) return ".";
        if (colCopy < 0 || colCopy >= seats[0].length) return ".";
        step++;
    }

    return seats[rowCopy][colCopy];
}

console.log('Result1:', ex11(4));
console.log('Result2:', ex11(5));