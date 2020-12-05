export { };

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n\n');
}

function initialValidCondition(fields: string[]) {
    let titles = fields.map(elem => elem.substring(0, 3));
    return (titles.length == 8) || (titles.length == 7 && titles.find(elem => elem == 'cid') == undefined);
}

function getDigitFromTag(fields: string[], regexp: RegExp) {
    let Tag = fields.find(elem => elem.match(regexp));
    if (Tag == undefined) return false;
    return parseInt(Tag.split(':')[1]);
}

function getValidHCL(fields: string[]) {
    return fields.find(elem => elem.match(/^hcl:#([0-9]|[a-f]){6}$/)) != undefined;
}

function getValidECL(fields: string[]) {
    return fields.find(elem => elem.match(/^ecl:(amb|blu|brn|gry|grn|hzl|oth)$/)) != undefined;
}

function getValidHGT(fields: string[]) {
    let inches = fields.find(elem => elem.match(/^hgt:[0-9]*in$/));
    let cm = fields.find(elem => elem.match(/^hgt:[0-9]*cm$/));

    if (inches == undefined && cm == undefined) return false;
    else if (inches != undefined) {
        let in_num = parseInt(inches.slice(4, -2));
        return in_num <= 76 && in_num >= 59;
    } else if (cm != undefined) {
        let cm_num = parseInt(cm.slice(4, -2));
        return cm_num <= 193 && cm_num >= 150;
    } return false;
}

function getValidPID(fields: string[]) {
    return fields.find(elem => elem.match(/^pid:[0-9]{9}$/)) != undefined;
}

function secondValidCondition(fields: string[]) {
    let byr = getDigitFromTag(fields, /^byr/);
    if (byr == false) return false;
    let iyr = getDigitFromTag(fields, /^iyr/);
    if (iyr == false) return false;
    let eyr = getDigitFromTag(fields, /^eyr/);
    if (eyr == false) return false;
    return (
        byr >= 1920 && byr <= 2002 &&
        iyr >= 2010 && iyr <= 2020 &&
        eyr >= 2020 && eyr <= 2030 &&
        getValidPID(fields) &&
        getValidECL(fields) &&
        getValidHCL(fields) &&
        getValidHGT(fields)
    );
}

function ex4(validCondition: Function) {
    let read = readFile();

    let validPassports = 0;
    for (const passport of read) {
        let fields: string[] = passport.replace(/\n/g, ' ').split(' ');
        if (validCondition(fields)) validPassports++;
    }
    return validPassports;
}

console.log('Result1:', ex4(initialValidCondition));
console.log('Result2:', ex4(secondValidCondition));