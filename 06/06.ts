export { }

function readFile() {
    return require('fs').readFileSync('input.txt', 'utf8').split('\n\n');
}

function part1() {
    let groupAnswers = readFile();

    let answers = "";
    let sum = 0;

    for (const groupAnswer of groupAnswers) {
        for (const question of groupAnswer) {
            if (question == '\n') continue;
            if (answers.indexOf(question) == -1)
                answers += question;
        }
        sum += answers.length;
        answers = "";
    }
    return sum;
}

function part2() {
    let groupAnswers = readFile();

    let answers = "";
    let newAnswers = "";
    let firstAnswer = true;
    let sum = 0;

    for (const groupAnswer of groupAnswers) {
        const personAnswers = groupAnswer.split('\n');
        if (personAnswers.length == 1) {
            sum += personAnswers[0].length;
            continue;
        }
        for (const personAnswer of personAnswers) {
            for (const question of personAnswer) {
                if (firstAnswer) {
                    newAnswers += question;
                }
                if (answers.indexOf(question) != -1) {
                    newAnswers += question;
                }
            }
            firstAnswer = false;
            answers = newAnswers;
            newAnswers = "";
        }
        firstAnswer = true;
        sum += answers.length;
        answers = "";
    }
    return sum;
}

console.log('Result1:', part1());
console.log('Result2:', part2());