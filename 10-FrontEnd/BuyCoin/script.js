// Variables
const navbarbtns = document.querySelectorAll('p');
const inputs = document.querySelectorAll('.inputs');
const amount_input = document.querySelector('#amount-input');
const price_input = document.querySelector('#price-input');
const type_select = document.querySelector('#type-select');
// We generate some random prices for the coins for testing purposes
const bitcoin_price = Math.random() * (20000 - 10000) + 10000;
const thether_price = Math.random() * (15000 - 10000) + 10000;

//Functions
navbarbtns.forEach((btn) => {
    btn.addEventListener("click", () => {

        navbarbtns.forEach((btn) => {
            btn.classList.remove('active');
        })

        btn.classList.add('active');
    })
})

function getPrice_bitcoin(amount) {
    const final_price = amount * bitcoin_price;
    price_input.value = final_price.toFixed(2);
}
function getPrice_thether(amount) {
    const final_price = amount * thether_price;
    price_input.value = final_price.toFixed(2);
}

amount_input.addEventListener('input', () => {
    const amount = amount_input.value;
    getPrice_bitcoin(amount);
});

function check_which_coin() {
    if (type_select.value == 'bitcoin') {
        getPrice_bitcoin(amount_input.value);
    } else if (type_select.value == 'thether') {
        getPrice_thether(amount_input.value);
    }

}


type_select.addEventListener('change', () => {
    check_which_coin();
})


//Call functions
check_which_coin();