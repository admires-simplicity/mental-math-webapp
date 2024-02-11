add = (a, b) => a + b;
sub = (a, b) => a - b;
mult = (a, b) => a * b;
divide = (a, b) => a / b;
ops = {
    '+': add,
    '-': sub,
    '*': mult,
    '/': divide
};
// opRanges = {
//     '+': [0, 100],
//     '-': [0, 100],
//     '*': [0, 12],
//     '/': [0, 12]
// };
opRand = {
    '+': () => [randint(0, 100), randint(0, 100)],
    '-': () => [randint(0, 100), randint(0, 100)],
    '*': () => [randint(0, 12), randint(0, 12)],
    '/': () => function(){
        let a = randint(0, 12);
        let b = randint(1, 12);
        return [a * b, b];
        // i would like to modify this so that sometimes we get denominators that are not factors of the numerator, but still easy to divide
    }()
};

class BinExp {
    constructor(op, left, right){
        this.op = op;
        this.left = left;
        this.right = right;
    }
    toString(){
        return `${this.left} ${this.op} ${this.right}`;
    }
}

function evalBinExp(exp){
    return ops[exp.op](exp.left, exp.right);
}

function randint(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randExp() {
    const op = ['+', '-', '*', '/'][randint(0, 3)];
    const [left, right] = opRand[op]();
    return new BinExp(op, left, right);
}

function displayQuestion(div, exp) {
    div.textContent = exp.toString();
}

const div = document.createElement('div');
div.style.width = '200px';
div.style.height = '50px';
const errorDiv = document.createElement('div');
errorDiv.style.width = '200px';
errorDiv.style.height = '50px';

question = randExp();
answer = evalBinExp(question);
displayQuestion(div, question);
document.body.appendChild(div);
document.body.appendChild(errorDiv);

const input = document.createElement('input');
document.body.appendChild(input);

input.addEventListener('keydown', function(event){
    if(event.key == "Enter"){
        const response = parseFloat(input.value);
        input.value = '';
        if(isNaN(response)){
            errorDiv.textContent = 'Invalid input';
            return;
        }
        if(response == answer){
            errorDiv.textContent = '';
            question = randExp();
            answer = evalBinExp(question);
            displayQuestion(div, question);
        } else {
            errorDiv.textContent = 'Incorrect';
        }   
    }
});