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
  let current = parseFloat(currentInput);

  if (isNaN(current)) return;

  // ✅ Aplica a porcentagem corretamente de acordo com o operador
  if (currentInput.includes('%')) {
    current = parseFloat(currentInput.replace('%', ''));
    if (operator === '+' || operator === '-') {
      current = (prev * current) / 100;
    } else if (operator === '*' || operator === '/') {
      current = current / 100;
    }
  }

  if (isNaN(prev)) return;

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

  // ✅ botão de porcentagem (insere o símbolo % no currentInput)
  document.querySelector('[data-percent]')?.addEventListener('click', () => {
    if (!currentInput.includes('%')) {
      currentInput += '%';
      updateDisplay();
    }
  });
});
