// in work
const balance = document.querySelector("#balance");
const moneyPlus = document.querySelector("#money-plus");
const moneyMinus = document.querySelector("#money-minus");
const transactionList = document.querySelector("#transaction-list");
const description = document.querySelector("#text");
const amount = document.querySelector("#amount");
const addTransactionBtn = document.querySelector(".add-transaction-btn");

function addTransaction() {
  const text = description.value.trim();
  const amount = parseFloat(amount.value);
}

addTransactionBtn.addEventListener("click", addTransaction);
