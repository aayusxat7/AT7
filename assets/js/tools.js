// Calculator
let calcDisplay = document.getElementById('calc-display');
let calcExpression = '';

function appendCalc(val) {
    calcExpression += val;
    calcDisplay.value = calcExpression;
}

function clearCalc() {
    calcExpression = '';
    calcDisplay.value = '';
}

function deleteCalc() {
    calcExpression = calcExpression.slice(0, -1);
    calcDisplay.value = calcExpression;
}

function calculate() {
    try {
        calcExpression = eval(calcExpression).toString();
        calcDisplay.value = calcExpression;
    } catch (e) {
        calcDisplay.value = 'Error';
        calcExpression = '';
    }
}

// Password Generator
function updatePassLength() {
    document.getElementById('pass-length-val').innerText = document.getElementById('pass-length').value;
}

function generatePass() {
    const length = document.getElementById('pass-length').value;
    const upper = document.getElementById('pass-upper').checked;
    const lower = document.getElementById('pass-lower').checked;
    const num = document.getElementById('pass-num').checked;
    const sym = document.getElementById('pass-sym').checked;

    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numChars = '0123456789';
    const symChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let chars = '';
    if (upper) chars += upperChars;
    if (lower) chars += lowerChars;
    if (num) chars += numChars;
    if (sym) chars += symChars;

    if (chars === '') {
        document.getElementById('pass-output').value = 'Select options';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('pass-output').value = password;
}

function copyPass() {
    const pass = document.getElementById('pass-output');
    pass.select();
    document.execCommand('copy');
    // Optional: Show tooltip
}

// Color Picker
function updateColor() {
    const color = document.getElementById('color-input').value;
    document.getElementById('color-preview').style.backgroundColor = color;
    document.getElementById('hex-val').value = color;

    // Hex to RGB
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    document.getElementById('rgb-val').value = `rgb(${r}, ${g}, ${b})`;
}

// Initialize Color Picker
updateColor();

// Unit Converter
function convert() {
    const val = parseFloat(document.getElementById('conv-input').value);
    const type = document.getElementById('conv-type').value;
    const resultSpan = document.getElementById('conv-result');

    if (isNaN(val)) {
        resultSpan.innerText = '0';
        return;
    }

    let result = 0;
    switch (type) {
        case 'm-ft': result = val * 3.28084; break;
        case 'ft-m': result = val / 3.28084; break;
        case 'kg-lb': result = val * 2.20462; break;
        case 'lb-kg': result = val / 2.20462; break;
        case 'c-f': result = (val * 9 / 5) + 32; break;
        case 'f-c': result = (val - 32) * 5 / 9; break;
    }

    resultSpan.innerText = result.toFixed(2);
}
