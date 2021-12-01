export { }

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n');
}

function containBag(line: string, bag: string) {
    let regexpContent = "^.+" + bag + ".+$";
    let regexp = new RegExp(regexpContent);
    return line.match(regexp);
}

function checkCountain(lines: string[], countained: string[]) {
    for (const bagType of countained) {
        let countainsBag = lines.filter(line => containBag(line, bagType)).map(elem => elem.split(' bags')[0]);
        for (const newBagType of countainsBag) {
            if (!countained.includes(newBagType)) countained.push(newBagType);
        }
    }
    return countained;
}

function part1() {
    let lines: string[] = readFile();
    let countainShinyGoldDirectly = lines.filter(line => containBag(line, 'shiny gold')).map(elem => elem.split(' bags')[0]);

    return checkCountain(lines, countainShinyGoldDirectly).length;
}

function getBag(line: string, bag: string) {
    let regexpContent = "^" + bag + ".+$";
    let regexp = new RegExp(regexpContent);
    return line.match(regexp);
}

interface Node {
    count: number;
    value: string;
    parentCount: number;
}

function getChildren(line: string, parent: Node) {
    let newBags: Node[] = [];

    let commaDivided = line.split(', ');
    for (const elem of commaDivided) {
        let spaceDivided = elem.split(' ');
        let newBag = spaceDivided[spaceDivided.length - 3] + " " + spaceDivided[spaceDivided.length - 2];

        if (newBag == 'no other') continue;
        let count = parseInt(spaceDivided[spaceDivided.length - 4]);
        newBags.push({ count: count * parent.count, value: newBag, parentCount: parent.count });
    }
    return newBags;
}

function checkGet(lines: string[], bags: Node[]) {
    let total = bags[0].count;
    for (const bag of bags) {
        let newBag = lines.find(elem => getBag(elem, bag.value));
        if (newBag == undefined) continue;

        let children = getChildren(newBag, bag);

        for (const child of children) {
            bags.push(child);
            total += child.count;
        }
    }
    return total;
}

function part2() {
    let lines: string[] = readFile();
    let shinyGoldBag = lines.find(elem => getBag(elem, 'shiny gold'));
    if (shinyGoldBag == undefined) return;

    let divided = shinyGoldBag.split(' ');
    let newBag = divided[divided.length - 3] + " " + divided[divided.length - 2];
    let childrenCount = parseInt(divided[divided.length - 4]);

    return checkGet(lines, [{ count: childrenCount, value: newBag, parentCount: 1 }]);
}

console.log('Result1:', part1());
console.log('Result2:', part2());