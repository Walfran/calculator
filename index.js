// Basic math functions
function add(a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		alert('Both arguments must be numbers');
	}
	return a + b;
}

function subtract(a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		alert('Both arguments must be numbers');
	}
	return a - b;
}

function sum(arr) {
	if (!Array.isArray(arr)) {
		alert('Argument must be an array');
	}
	if (arr.length === 0) return 0;
	return arr.reduce((acc, curr) => {
		if (typeof curr !== 'number') {
			alert('All array elements must be numbers');
		}
		return acc + curr;
	}, 0);
}

function multiply(arr) {
	if (!Array.isArray(arr)) {
		alert('Argument must be an array');
	}
	if (arr.length === 0) return 1;
	return arr.reduce((acc, curr) => {
		if (typeof curr !== 'number') {
			alert('All array elements must be numbers');
		}
		return acc * curr;
	}, 1);
}

// Calculator variables
let currentNumber = '0';
let previousNumber = '';
let currentOperation = null;
let needToClearScreen = false;

// Get display elements
const currentDisplay = document.querySelector('.current-operand');
const previousDisplay = document.querySelector('.previous-operand');

// Update what's shown on calculator screen
function updateScreen() {
	currentDisplay.textContent = currentNumber;
	previousDisplay.textContent = previousNumber;
}

// Handle when a number button is clicked
function handleNumber(number) {
	if (needToClearScreen) {
		currentNumber = number;
		needToClearScreen = false;
	} else {
		currentNumber = currentNumber === '0' ? number : currentNumber + number;
	}
	updateScreen();
}

// Handle when an operation button is clicked
function handleOperator(operator) {
	if (currentOperation !== null) {
		calculate();
	}
	previousNumber = currentNumber;
	currentOperation = operator;
	needToClearScreen = true;
	updateScreen();
}

// Do the actual calculation
function calculate() {
	let result = 0;
	const num1 = parseFloat(previousNumber);
	const num2 = parseFloat(currentNumber);

	switch (currentOperation) {
		case '+':
			result = add(num1, num2);
			break;
		case '-':
			result = subtract(num1, num2);
			break;
		case '*':
			result = multiply(num1, num2);
			break;
		case '/':
			result = divide(num1, num2);
			break;
	}

	currentNumber = result.toString();
	currentOperation = null;
	previousNumber = '';
	updateScreen();
}

// Clear everything
function clearCalculator() {
	currentNumber = '0';
	previousNumber = '';
	currentOperation = null;
	updateScreen();
}

// Delete last number
function deleteNumber() {
	if (currentNumber.length === 1) {
		currentNumber = '0';
	} else {
		currentNumber = currentNumber.slice(0, -1);
	}
	updateScreen();
}


// Add click handlers when page loads
document.addEventListener('DOMContentLoaded', () => {
	// Add handlers for number buttons
	document.querySelectorAll('button').forEach(button => {
		if (!isNaN(button.textContent)) {
			button.addEventListener('click', () => handleNumber(button.textContent));
		}
	});

	// Add handlers for operator buttons
	document.getElementById('addition').addEventListener('click', () => handleOperator('+'));
	document.getElementById('subtraction').addEventListener('click', () => handleOperator('-'));
	document.getElementById('multiplication').addEventListener('click', () => handleOperator('*'));
	document.getElementById('division').addEventListener('click', () => handleOperator('/'));

	// Add handlers for special buttons
	document.getElementById('reset').addEventListener('click', clearCalculator);
	document.getElementById('correction').addEventListener('click', deleteNumber);
	document.getElementById('equal').addEventListener('click', calculate)
});