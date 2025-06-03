// Error Handling
function errorNote(a, b){
	if (typeof a !== 'number' || typeof b !== 'number') {
		alert('Both arguments must be numbers');
	}
	return a, b;  
}

function errorNoteOneDigit(a){
	if (typeof a !== 'number') {
		alert('The argument must be a number');
	}
	return a;  
}

// Basic math functions
function add(a, b) {
	errorNote(a, b);
	return a + b;
}

function subtract(a, b) {
	errorNote(a, b);
	return a - b;
}

function divide(a, b) {
	errorNote(a, b);
	if (b === 0) return 'Error';
	return a / b;
}

function multiply(a, b) {
	errorNote(a, b);
	return a * b;
}

function root(a){
	errorNoteOneDigit(a);
	return Math.sqrt(a);
}

function powerOf(a, b){
	errorNote(a, b);
	return Math.pow(a, b);
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

	if (currentOperation !== null && previousNumber !== '') {
		previousDisplay.textContent = `${previousNumber} ${currentOperation}`;
	} else {
		previousDisplay.textContent = previousNumber;
	}
}

// Handle when a number button is clicked
function handleNumber(number) {
	if (needToClearScreen) {
		currentNumber = number;
		needToClearScreen = false;
	} else {
		if (currentNumber === '0') {
		currentNumber = number; // Replace the 0 with the new number
		} else {
		currentNumber += number; // Add the new digit to the end
		}
	}
	updateScreen();
}

function handleDecimal() {
	if (needToClearScreen) {
		currentNumber = '0.';
		needToClearScreen = false;
	} else if (!currentNumber.includes('.')) { //adds . and block the user from adding more
		currentNumber += '.'; 
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
		case '√':
			result = root(num1)
			break;
		case '^':
			result = powerOf(num1, num2);
			break;
	}

	// adding decimals for better clarity
	if (typeof result === 'number' && !isNaN(result)){
		currentNumber = parseFloat(result.toFixed(3)).toString();
	} else {
		currentNumber = 'Not a number'
	}
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
	document.getElementById('root').addEventListener('click', () => handleOperator('√'));
	document.getElementById('powerOf').addEventListener('click', () => handleOperator('^'));

 
	// Add handlers for special buttons
	document.getElementById('reset').addEventListener('click', clearCalculator);
	document.getElementById('correction').addEventListener('click', deleteNumber);
	document.getElementById('equal').addEventListener('click', calculate)
	document.getElementById('decimal').addEventListener('click', handleDecimal);
});