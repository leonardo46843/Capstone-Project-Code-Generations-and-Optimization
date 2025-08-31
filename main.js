const display = document.getElementById('display');

function appendToDisplay(value) {
  display.value += value;
}

function clearAll() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // Sanitize input and replace × with *
    let expression = display.value.replace(/×/g, '*');

    // Validate expression for security
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
      throw new Error('Invalid characters');
    }

    // Evaluate the expression
    const result = Function('"use strict"; return (' + expression + ')')();

    // Check if result is finite
    if (!isFinite(result)) {
      throw new Error('Invalid calculation');
    }

    // Format the result to avoid too many decimal places
    let formattedResult = result;
    if (typeof result === 'number') {
      formattedResult = parseFloat(result.toPrecision(12));
    }

    display.value = formattedResult;
  } catch (error) {
    display.value = 'Error';
    setTimeout(() => {
      display.value = '';
    }, 1500);
  }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  if (event.key >= '0' && event.key <= '9') {
    appendToDisplay(event.key);
  } else if (['+', '-', '*', '/', '.', '(', ')'].includes(event.key)) {
    appendToDisplay(event.key);
  } else if (event.key === 'Enter') {
    calculate();
  } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
    clearAll();
  } else if (event.key === 'Backspace') {
    backspace();
  }
});
