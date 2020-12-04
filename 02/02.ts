export { };

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

function parsePassword(password: string) {
    let space_separated: string[] = password.split(' ');

    let min_max: string[] = space_separated[0].split('-');
    let min: number = parseInt(min_max[0]);
    let max: number = parseInt(min_max[1]);

    let char: string = space_separated[1][0];
    let pass_content: string = space_separated[2];

    return {min: min, max: max, char: char, password: pass_content};
}

function isValid1(password: string) {
    let parsed = parsePassword(password);
    let occurences: number = parsed.password.split(parsed.char).length - 1;
    return occurences >= parsed.min && occurences <= parsed.max;
}

function isValid2(password: string) {
    let parsed = parsePassword(password);
    let char1 = parsed.password[parsed.min-1];
    let char2 = parsed.password[parsed.max-1];
    let char = parsed.char;
    return (char1 == char || char2 == char) && char1 != char2;
}

function ex2(isValid: Function) {
    let read = readFile();
    return read.filter(isValid).length;
}

console.log('Result1:', ex2(isValid1));
console.log('Result2:', ex2(isValid2));