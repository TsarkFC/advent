export { }

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

function parseRow(row: string) {
    let lower = 0;
    let upper = 127;

    for (const char of row) {
        if (char == 'B') {
            lower = Math.floor((upper - lower + 1) / 2) + lower;
        } else if (char == 'F') {
            upper = Math.floor((upper - lower + 1) / 2) + lower - 1;
        }
    }
    return lower;
}

function parseColumn(columns: string) {
    let lower = 0;
    let upper = 7;

    for (const char of columns) {
        if (char == 'R') {
            lower = Math.floor((upper - lower + 1) / 2) + lower;
        } else if (char == 'L') {
            upper = Math.floor((upper - lower + 1) / 2) + lower - 1;
        }
    }
    return lower;
}

interface Seats {
    max: number;
    seats: number[];
}

function seats(seats: string[]) {
    let max = 0;
    let allSeats = [];

    for (const seatChars of seats) {
        let col = parseColumn(seatChars.substring(7));
        let row = parseRow(seatChars.substring(0, 7));
        let seat = row * 8 + col;
        allSeats.push(seat);
        if (seat > max) max = seat;
    }
    return { max: max, seats: allSeats.sort((a, b) => a - b) };
}

function part1() {
    let read = readFile();
    return seats(read).max;
}

function part2() {
    let read = readFile();
    let s: Seats = seats(read);

    let index = 0;
    while (true) {
        if (s.seats[index] + 1 != s.seats[index+1])
            return s.seats[index] + 1;
        index++;
    }
}

console.log('Result1:', part1());
console.log('Result2:', part2());