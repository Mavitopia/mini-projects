const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('transaction-list');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const addBtn = document.querySelector('.add-transaction-btn');

const transactions = [];

function addTransaction() {
  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (text === '' || isNaN(amount)) {
    alert('Please enter a description and amount!');
    return;
  }

  const transaction = {
    amount: amount,
    text: text,
  };

  transactions.push(transaction);
  addTransactionToList(transaction);
  updateValues();

  textInput.value = '';
  amountInput.value = '';
}

function addTransactionToList(transaction) {
  const li = document.createElement('li');
  li.classList.add('transaction');
  li.classList.add(transaction.amount >= 0 ? 'plus' : 'minus');
  li.innerHTML = `
        <span class="transaction-text">${transaction.text}</span>
        <span class="transaction-amount">${transaction.amount >= 0 ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
    `;
  list.appendChild(li);
}

function updateValues() {
  let total = 0;
  let income = 0;
  let expense = 0;

  for (let transaction of transactions) {
    const amount = transaction.amount;
    total += amount;
    if (amount > 0) income += amount;
    if (amount < 0) expense += amount;
  }

  total = total.toFixed(2);
  income = income.toFixed(2);
  expense = Math.abs(expense).toFixed(2);

  balance.textContent = `$${total}`;
  moneyPlus.textContent = `$${income}`;
  moneyMinus.textContent = `$${expense}`;
}

addBtn.addEventListener('click', addTransaction);
