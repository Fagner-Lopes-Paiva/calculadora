let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay () {
    document.getElementById('display').value = currentInput || '0';
}

function appendNumber (number) {
    if (number === '0' && currentInput === '0') return;
    currentInput += number;
    updateDisplay();
}

function appendDot () {
    if (!currentInput.includes('.')) {
        currentInput += currentInput === '' ? '0.' : '.';
        updateDisplay();
    }
}

function appendOperator (op) {
    if (currentInput === '' && previousInput === '') return;
    if (previousInput && currentInput) calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay () {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function calculate () {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

function backspace () {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}