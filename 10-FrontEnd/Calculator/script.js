// === VARIABLES ===
const clearBtn = document.getElementById("clear");
const lessBtn = document.getElementById("greater");
const slashBtn = document.getElementById("slash");
const xBtn = document.getElementById("letter-x");
const sevenBtn = document.getElementById("seven");
const eightBtn = document.getElementById("eight");
const nineBtn = document.getElementById("nine");
const minusBtn = document.getElementById("minus");
const fourBtn = document.getElementById("four");
const fiveBtn = document.getElementById("five");
const sixBtn = document.getElementById("six");
const addBtn = document.getElementById("plus");
const oneBtn = document.getElementById("one");
const twoBtn = document.getElementById("two");
const threeBtn = document.getElementById("three");
const equalBtn = document.getElementById("equal")
const zeroBtn = document.getElementById("zero")
const dotBtn = document.getElementById("dot")
const displayOperation = document.getElementById("operation");
const displayAmount = document.getElementById("amount");

const listOfBtns = [clearBtn,lessBtn,slashBtn,xBtn,sevenBtn,eightBtn,nineBtn,minusBtn,fourBtn,fiveBtn,sixBtn,addBtn,oneBtn,twoBtn,threeBtn,equalBtn,zeroBtn,dotBtn];
const operators = [lessBtn,slashBtn,xBtn,minusBtn,addBtn,equalBtn, clearBtn];
let numberOfClicks = 0;

const formatter = new Intl.NumberFormat('en-US'); //formats numbers with commas

let num1 = null;
let num2 = null;
let currentOperation = null;

let editOption = true; // true = edit, false = no edit
let withOutEqual = false; // got final num without equal sign

// === FUNCTIONS ===
function setNumber(finalNum) {
    let raw = finalNum.toString();

    const isMobile = checkWindowsWidthMobile();

    if (isMobile) {
        if (raw.length > 13) raw = raw.slice(0, 13);
    } else {
        if (raw.length > 16) raw = raw.slice(0, 16);
    }


    const cappedNum = Number(raw);
    let formatted = formatter.format(cappedNum);

    if (formatted.length === 10) {
        displayAmount.style.fontSize = "2.5rem";
    } else if (formatted.length >= 12) {
        displayAmount.style.fontSize = "2rem";
    }

    displayAmount.innerText = formatted;
}

function checkWindowsWidthMobile() {
    let isDeviceMobile;

    if (window.innerWidth <= 450) {
        isDeviceMobile = true;
    } else {
        isDeviceMobile = false;
    }
    return isDeviceMobile;
}

function setOperation(operation) {
    currentOperation = operation;

    switch (operation) {
        case "divide":
            operation = "/"
            break;
        case "multiply":
            operation = "x"
            break;
        case "minus":
            operation = "-"
            break;
        case "add":
            operation = "+"
            break;
        case "equal":
            operation = "="
            break;
        default:
            return;
    }

    displayOperation.innerText = operation;
}

function calculate(num1, num2, currentOperation) {
    let finalNum;
    switch (currentOperation) {
    case "divide":
        finalNum = num1 / num2;
        finalNum = Number(finalNum.toFixed(2));
        break;
    case "multiply":
        finalNum = num1 * num2; break;
    case "minus":
        finalNum = num1 - num2; break;
    case "add":
        finalNum = num1 + num2; break;
    default:
        return;
    }

    return finalNum;
}

function getUserInput() {
    const current = displayAmount.innerText.replaceAll(',', '');
    const number = parseFloat(current);
    return number;
}


// === EVENT LISTENERS ===
listOfBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        if (numberOfClicks === 0) {
            displayAmount.innerText = "";
            numberOfClicks++;
        }

        let current = displayAmount.innerText.replaceAll(',','') + btn.innerText;

        const isMobile = checkWindowsWidthMobile();
        if (isMobile) {
            if (current.length === 13) return;
        } else {
            if (current.length === 16) return;
        }
                
        if (current.length === 10) {
            displayAmount.style.fontSize = "2.5rem";
        } else if (current.length === 12) {
            displayAmount.style.fontSize = "2rem";
        }
        if (editOption) {

            if (!operators.includes(btn)) {
            displayAmount.innerText += btn.innerText;
            }

        }
        if (current.length % 3 === 0 && displayAmount.innerText.length > 0) {
            if (displayAmount.innerText.includes(".")) {
                return;
            } else if (current.length === 15) {
                return;
            }

            const number = parseInt(current);
            const formatted = formatter.format(number);

            displayAmount.innerText = formatted;

        }

    })
})

operators.forEach((btn) => {
    btn.addEventListener('click', (e) => {

        if (btn === clearBtn) {
            displayAmount.innerText = "0";
            numberOfClicks = 0;
            displayAmount.style.fontSize = "3rem";
            num1 = null;
            num2 = null;
            currentOperation = null;
            displayOperation.innerText = "";
            editOption = true;
            displayAmount.style.color = 'rgb(240, 233, 233)';
        }

        if (btn === lessBtn) {
            if (editOption) {
            displayAmount.innerText = displayAmount.innerText.slice(0, -1);

            if (displayAmount.innerText.length === 0) {
                displayAmount.innerText = "0";
                numberOfClicks = 0;
                displayAmount.style.fontSize = "3rem";
            }
        }
        }
        if (btn === slashBtn) {
            if ( !(editOption === false) ) { 
                const number = getUserInput();
            if (!(num1 === null) && currentOperation === 'divide') {
                num1 /= number;
                setNumber(num1);
                finalNum = num1;
                editOption = true;
                numberOfClicks = 0;
                withOutEqual = true;
            }  else if ( !(currentOperation === 'divide') && !(num1 === null) ) {
                num1 = calculate(num1, number, currentOperation);
                setNumber(num1);
                setOperation('divide');
                numberOfClicks = 0;
                withOutEqual = true;
                editOption = true
            } else {
                num1 = number;
                displayAmount.innerText = "0";
                numberOfClicks = 0;
                displayAmount.style.fontSize = "3rem";
                setOperation("divide");
                editOption = true;
                withOutEqual = false;
            }
        }
        }
        if (btn === xBtn) {
            if ( !(editOption === false) ) { 
                const number = getUserInput();
            if (!(num1 === null) && currentOperation === 'multiply') {
                num1 *= number;
                setNumber(num1);
                finalNum = num1;
                editOption = true;
                numberOfClicks = 0;
                withOutEqual = true;
            } else if ( !(currentOperation === 'multiply') && !(num1 === null) ) {
                num1 = calculate(num1, number, currentOperation);
                setNumber(num1);
                setOperation('multiply');
                numberOfClicks = 0;
                withOutEqual = true;
                editOption = true
            } else {
                num1 = number;
                displayAmount.innerText = "0";
                numberOfClicks = 0;
                displayAmount.style.fontSize = "3rem";
                setOperation("multiply");
                editOption = true;
                withOutEqual = false;
            }
        }
        }
        if (btn === minusBtn) {
            if ( !(editOption === false) ) { 
                const number = getUserInput();
            if (!(num1 === null) && currentOperation === 'minus') {
                num1 -= number;
                setNumber(num1);
                finalNum = num1;
                editOption = true;
                numberOfClicks = 0;
                withOutEqual = true;
            } else if ( !(currentOperation === 'minus') && !(num1 === null) ) {
                num1 = calculate(num1, number, currentOperation);
                setNumber(num1);
                setOperation('minus');
                numberOfClicks = 0;
                withOutEqual = true;
                editOption = true
            } else {
                num1 = number;
                displayAmount.innerText = "0";
                numberOfClicks = 0;
                displayAmount.style.fontSize = "3rem";
                setOperation("minus");
                editOption = true;
                withOutEqual = false;
            }
        }
        }
        if (btn === addBtn) {
            if ( !(editOption === false) ) { 
                const number = getUserInput();
            if (!(num1 === null) && currentOperation === 'add') {
                num1 += number;
                setNumber(num1);
                finalNum = num1;
                editOption = true;
                numberOfClicks = 0;
                withOutEqual = true;
            } else if ( !(currentOperation === 'add') && !(num1 === null) ) {
                num1 = calculate(num1, number, currentOperation);
                setNumber(num1);
                setOperation('add');
                numberOfClicks = 0;
                withOutEqual = true;
                editOption = true
            } else {
                num1 = number;
                displayAmount.innerText = "0";
                numberOfClicks = 0;
                displayAmount.style.fontSize = "3rem";
                setOperation("add");
                editOption = true;
                withOutEqual = false;
            }
        }
        }
        if (btn === equalBtn) {
            if (withOutEqual) {
                if (!(displayAmount.innerText == "0")) {
                    const number = getUserInput();
                    let finalNum = calculate(num1, number, currentOperation)
                    setNumber(finalNum)
                    editOption = false;
                    displayAmount.style.color = 'green';
                    setOperation("equal");
                }
            } else {
            const current = displayAmount.innerText.replaceAll(',', '');
            num2 = parseFloat(current);
            let finalNum = calculate(num1, num2, currentOperation);
            setNumber(finalNum);
            editOption = false;
            displayAmount.style.color = 'green';
            setOperation("equal");
          }
        }
        })
 })

