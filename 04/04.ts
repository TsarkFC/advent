export { };

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n\n');
}

function initialValidCondition(titles: string[]) {
    return (titles.length == 8) || (titles.length == 7 && titles.find(elem => elem == 'cid') == undefined);
}

function ex4() {
    let read = readFile();

    let validPassports = 0;
    for (const passport of read) {
        let fields: string[] = passport.split('\n').join(' ').split(' ');
        let titles = fields.map(elem => elem.substring(0, 3));
        
        if (initialValidCondition(titles)) validPassports++; 
    }
    return validPassports;
}

console.log('Result1:', ex4());