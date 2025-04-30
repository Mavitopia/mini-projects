// Variables
const navbarButtons = document.querySelectorAll('p');
const inputFields = document.querySelectorAll('.inputs');
const amountInput = document.querySelector('#amount-input');
const priceInput = document.querySelector('#price-input');
const coinTypeSelect = document.querySelector('#type-select');

// Generate random prices for testing purposes
const bitcoinPrice = Math.random() * (20000 - 10000) + 10000;
const tetherPrice = Math.random() * (15000 - 10000) + 10000;

const buySection = document.querySelector('.first-p');
const sellSection = document.querySelector('.second-p');
const transferSection = document.querySelector('.third-p');

const mainButton = document.querySelector('#purchase-btn');

const contentDiv = document.querySelector('.content');

// Functions
navbarButtons.forEach((button) => {
    button.addEventListener("click", () => {
        navbarButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});

function calculateBitcoinPrice(amount) {
    const finalPrice = amount * bitcoinPrice;
    priceInput.value = finalPrice.toFixed(2);
}

function calculateTetherPrice(amount) {
    const finalPrice = amount * tetherPrice;
    priceInput.value = finalPrice.toFixed(2);
}

amountInput.addEventListener('input', () => {
    const amount = amountInput.value;
    calculateBitcoinPrice(amount);
});

function updatePriceBasedOnCoinType() {
    if (coinTypeSelect.value === 'bitcoin') {
        calculateBitcoinPrice(amountInput.value);
    } else if (coinTypeSelect.value === 'tether') {
        calculateTetherPrice(amountInput.value);
    }
}

coinTypeSelect.addEventListener('change', () => {
    updatePriceBasedOnCoinType();
});

let page = 'buy';

// Listen for page navigation changes
buySection.addEventListener('click', () => {
    mainButton.textContent = 'PURCHASE';
    mainButton.style.padding = '5px 5px';
    page = 'buy';
});

sellSection.addEventListener('click', () => {
    mainButton.textContent = 'SELL';
    mainButton.style.padding = '5px 25.2px';
    page = 'sell';
});

transferSection.addEventListener('click', () => {
    mainButton.textContent = 'TRANSFER';
    mainButton.style.padding = '5px 6.07px';
    page = 'transfer';
});

mainButton.addEventListener('click', () => {
    if (page === 'buy') {
        alert(`You are buying ${amountInput.value} of ${coinTypeSelect.value} for ${priceInput.value}`);
    } else if (page === 'sell') {
        alert(`You are selling ${amountInput.value} of ${coinTypeSelect.value} for ${priceInput.value}`);
    } else if (page === 'transfer') {
        const destId = prompt("Enter the destination ID:");
        alert(`You are transferring ${amountInput.value} of ${coinTypeSelect.value} to ID: ${destId}`);
    }
})


// Call functions
updatePriceBasedOnCoinType();
