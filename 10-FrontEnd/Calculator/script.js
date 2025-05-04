//VARS

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

const displayAmount = document.getElementById("amount");

const listOfBtns = [clearBtn,lessBtn,slashBtn,xBtn,sevenBtn,eightBtn,nineBtn,minusBtn,fourBtn,fiveBtn,sixBtn,addBtn,oneBtn,twoBtn,threeBtn,equalBtn,zeroBtn,dotBtn];

const operators = [lessBtn,slashBtn,xBtn,minusBtn,addBtn,equalBtn, clearBtn];

let numberOfClicks = 0;

const formatter = new Intl.NumberFormat('en-US');

let num1 = 0;
let num2 = 0;

let currentOperation = null;


//FUNCS


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
        
        if (!operators.includes(btn)) {
            displayAmount.innerText += btn.innerText;
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
        }
        if (btn === lessBtn) {

            displayAmount.innerText = displayAmount.innerText.slice(0, -1);

            if (displayAmount.innerText.length === 0) {
                displayAmount.innerText = "0";
                numberOfClicks = 0;
                displayAmount.style.fontSize = "3rem";
            }
        }
        if (btn === slashBtn) {
            const current = displayAmount.innerText.replaceAll(',','');
            const number = parseFloat(current);
            num1 = number;
            displayAmount.innerText = "0";
            numberOfClicks = 0;
            displayAmount.style.fontSize = "3rem";

            currentOperation = "divide";
        }
        if (btn === xBtn) {
            const current = displayAmount.innerText.replaceAll(',','');
            const number = parseFloat(current);
            num1 = number;
            displayAmount.innerText = "0";
            numberOfClicks = 0;
            displayAmount.style.fontSize = "3rem";

            currentOperation = "multiply";
        }

        if (btn === minusBtn) {
            const current = displayAmount.innerText.replaceAll(',','');
            const number = parseFloat(current);
            num1 = number;
            displayAmount.innerText = "0";
            numberOfClicks = 0;
            displayAmount.style.fontSize = "3rem";

            currentOperation = "minus";
        }

        if (btn === addBtn) {
            const current = displayAmount.innerText.replaceAll(',','');
            const number = parseFloat(current);
            num1 = number;
            displayAmount.innerText = "0";
            numberOfClicks = 0;
            displayAmount.style.fontSize = "3rem";

            currentOperation = "add";
        }

        if (btn === equalBtn) {
            const current = displayAmount.innerText.replaceAll(',', '');
            num2 = parseFloat(current);
          
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
          
        })
 })

// IFS
function checkWindowsWidthMobile() {
    let isDeviceMobile;

    if (window.innerWidth <= 450) {
        isDeviceMobile = true;
    } else {
        isDeviceMobile = false;
    }
    return isDeviceMobile;
}