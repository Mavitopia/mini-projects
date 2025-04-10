"use strict";

/*
 *               Variable Section         *
*/

const addUsersBtn = document.querySelector("#add-user");
const doubleMoneyBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show-millionaires");
const sortByRichestBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");
const mainSection = document.querySelector("#main");
let users = [];

/*
 *               Functions Section         *
*/

/**
 * Fetches a random user's first and last name from the randomuser.me API.
 * The function sends a request to the API, retrieves the user data, and
 * returns the full name (first + last name) as a single string.
 *
 * @async
 * @function
 * @returns {Promise<string>} The full name of a random user (first and last name concatenated).
 */

async function fetchUser() {
    try {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();

        const firstName = data.results[0].name.first.toString();
        const lastName = data.results[0].name.last.toString();
        console.log(firstName);
        console.log(lastName);
        return firstName + ' ' + lastName;
    } catch (error) {
        console.log(`Unexpected Error: ${error}`);
        return "Unknown User";
    }
}

function generateUserMoney() {
    const userMoneyInt = Math.trunc((Math.random() * 1_000_000) + 100_000);
    const userMoneyDec = (Math.random() * 100).toFixed(2);
    formatMoney(userMoneyInt);
    return parseFloat(`${userMoneyInt}.${userMoneyDec}`);
}


function doubleMoney() {
    function doubleTheMoney(e) {
        return {
            name: e.name,
            money: e.money * 2
        };
    }
    users = users.map(doubleTheMoney);
    updateUI();
}

function formatMoney(number) {
    return `$${number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function onlyShowMillionaires() {
    users = users.filter(user => user.money > 999_999)
    updateUI();
}

function sortByRichest() {
    users.sort((a,b) => b.money - a.money);
    updateUI();
}


function updateUI() {
    mainSection.innerHTML = "";

    users.forEach(user => {
        mainSection.innerHTML += `
            <div class="person">
                <strong>${user.name}</strong> ${formatMoney(user.money)}
            </div>
        `;
    });
}

function displayWealth() {
    const totalWealth = users.reduce((acc, cur) => acc + cur.money, 0);

    const existingWealthElement = document.querySelector(".total-wealth");
    if (existingWealthElement) {
        existingWealthElement.remove();
    }

    const formattedWealth = `$${totalWealth.toLocaleString()}`;

    const wealthElement = document.createElement("div");
    wealthElement.classList.add("total-wealth");
    wealthElement.innerHTML = `
        <h3>💰 Total Wealth: <strong>${formattedWealth}</strong></h3>
    `;

    mainSection.appendChild(wealthElement);
}


/*
 *               Click Section         *
*/

addUsersBtn.addEventListener("click", async function() {
    const fullName = await fetchUser();
    const userMoney = generateUserMoney();

    users.push({
        name: fullName,
        money: userMoney
    });
    updateUI();

});
doubleMoneyBtn.addEventListener("click", function() {
    doubleMoney();
})

showMillionairesBtn.addEventListener("click", function() {
    onlyShowMillionaires();
})

sortByRichestBtn.addEventListener("click", function() {
    sortByRichest();
})

calculateWealthBtn.addEventListener("click", function() {
    displayWealth();
})
