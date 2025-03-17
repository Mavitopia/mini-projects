const API = 'https://open.exchangerate-api.com/v6/latest';

const convertBtn = document.querySelector(".convert-button");

convertBtn.addEventListener('click', async function () {
    const response = await fetch(API);
    console.log(response);
})