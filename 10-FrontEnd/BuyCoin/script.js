// Variables
const navbarbtns = document.querySelectorAll('p');

//Functions
navbarbtns.forEach((btn) => {
    btn.addEventListener("click", () => {

        navbarbtns.forEach((btn) => {
            btn.classList.remove('active');
        })
        
        btn.classList.add('active');
    })
})