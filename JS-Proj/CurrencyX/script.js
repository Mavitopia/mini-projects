const API_URL = 'https://open.exchangerate-api.com/v6/latest';

const currencyToDropdown = document.querySelector(".currency-to");
const currencyFromDropdown = document.querySelector(".currency-from");
const convertBtn = document.querySelector(".convert-button");
const userInput = document.querySelector(".number-amount");
const convertedAmountTxt = document.querySelector("#convertedAmount");

convertBtn.addEventListener("click", async function () {
    const fromCurrency = currencyFromDropdown.value;
    const toCurrency = currencyToDropdown.value;
    let data;
    try {
        const response = await fetch(`${API_URL}/${fromCurrency}`);
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates.');
        }
        data = await response.json();
    } catch (error) {
        convertedAmountTxt.innerHTML = "Error fetching data. Try again later.";
    }
    const exchangeRates = data['rates'];
    const rateTo = exchangeRates[toCurrency];

    if (!rateTo) {
        convertedAmountTxt.innerHTML = "Currency not supported.";
        return;
    }

    const userInputValue = parseFloat(userInput.value);
    if (isNaN(userInputValue)) {
        convertedAmountTxt.innerHTML = "Please enter a valid number.";
        return;
    }

    const convertedAmount = userInputValue * rateTo;

    convertedAmountTxt.innerHTML = convertedAmount.toFixed(2);
});


function checkSameCurrencyInSecondList() {
    const fromCurrency = currencyFromDropdown.value;
    const allOptions = currencyToDropdown.querySelectorAll('option');
    allOptions.forEach(option => {
        option.disabled = option.value === fromCurrency;
    });
}

currencyFromDropdown.addEventListener("change", checkSameCurrencyInSecondList);

checkSameCurrencyInSecondList();