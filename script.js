let currentInput = '';
let previousInput = '';
let operator = '';

function updateDisplay() {
  document.getElementById('display').value = currentInput || '0';
}

function appendNumber(number) {
  if (number === '0' && currentInput === '0') return;
  currentInput += number;
  updateDisplay();
}

function appendDot() {
  if (!currentInput.includes('.')) {
    currentInput += currentInput === '' ? '0.' : '.';
    updateDisplay();
  }
}

function appendOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  if (previousInput && currentInput) calculate();
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
}

function calculate() {
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

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// ✅ Event binding após o DOM carregar
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-number]').forEach(button =>
    button.addEventListener('click', () => appendNumber(button.dataset.number))
  );

  document.querySelector('[data-dot]').addEventListener('click', appendDot);

  document.querySelectorAll('[data-operator]').forEach(button =>
    button.addEventListener('click', () => appendOperator(button.dataset.operator))
  );

  document.querySelector('[data-equals]').addEventListener('click', calculate);
  document.querySelector('[data-clear]').addEventListener('click', clearDisplay);
  document.querySelector('[data-backspace]').addEventListener('click', backspace);
});
