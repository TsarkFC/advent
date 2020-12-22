export { }

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

function move(letter: String, number: number, pos: Position) {
    if (letter == 'E') pos.lat += number;
    else if (letter == 'W') pos.lat -= number;
    else if (letter == 'N') pos.lon += number;
    else if (letter == 'S') pos.lon -= number;
}

interface Position {
    lat: number;
    lon: number;
}

function part1() {
    const directions: String[] = readFile();
    const coord = ['E', 'S', 'W', 'N'];

    let coordIndex = 0;
    let pos: Position = { lat: 0, lon: 0 };

    for (const direction of directions) {
        const letter = direction[0];
        const number = parseInt(direction.substring(1));

        move(letter, number, pos);
        if (letter == 'R')
            coordIndex = (coordIndex + Math.floor(number / 90) % 4) % 4;
        else if (letter == 'L')
            coordIndex = (coordIndex - Math.floor(number / 90) % 4) % 4;
        else if (letter == 'F')
            move(coord[coordIndex], number, pos);

        if (coordIndex < 0)
            coordIndex = coord.length + (coordIndex % 4)
    }

    return Math.abs(pos.lat) + Math.abs(pos.lon);
}

function rotation(pos:Position, angle:number) {
    let temp = {...pos};
    angle = angle * Math.PI / 180;

    pos.lat = Math.round(temp.lat * Math.cos(angle) - temp.lon * Math.sin(angle));
    pos.lon = Math.round(temp.lat * Math.sin(angle) + temp.lon * Math.cos(angle));
}

function part2() {
    const directions: String[] = readFile();
    let waypoint: Position = { lat: 10, lon: 1 };

    let pos: Position = { lat: 0, lon: 0 };
    for (const direction of directions) {
        const letter = direction[0];
        const number = parseInt(direction.substring(1));

        if (letter == 'E')
            waypoint.lat += number;
        else if (letter == 'W')
            waypoint.lat -= number;
        else if (letter == 'N')
            waypoint.lon += number;
        else if (letter == 'S') 
            waypoint.lon -= number;
        else if (letter == 'F') {
            pos.lat += waypoint.lat * number;
            pos.lon += waypoint.lon * number;
        }
        else if (letter == 'R') rotation(waypoint, -number);
        else if (letter == 'L') rotation(waypoint, number);
    }

    return Math.abs(pos.lat) + Math.abs(pos.lon);
}

console.log("Result1:", part1());
console.log("Result2:", part2());