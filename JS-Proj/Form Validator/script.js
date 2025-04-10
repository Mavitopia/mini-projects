// ************* VARS ***************
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const termOfServiceLink = document.querySelectorAll(".term-link");
const termOfService = document.querySelector("#term-of-service");
const closeTerm = document.querySelector("#close-term");
const usernameMsg = document.querySelector(".username-msg");
const emailMsg = document.querySelector(".email-msg");
const passMsg = document.querySelector(".password-msg");
const passMsg2 = document.querySelector(".password2-msg");
const submitBtn = document.querySelector("#button-submit");

termOfServiceLink.forEach((link) => {
  link.addEventListener("click", () => {
    termOfService.classList.remove("hidden");
  });
});

closeTerm.addEventListener("click", () => {
  termOfService.classList.add("hidden");
});

// ************* VALIDATION ***************
const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let usernameRight = false;
let emailRight = false;
let passwordRight = false;
let password2Right = false;

username.addEventListener("change", () => {
  const value = username.value.trim();

  if (value.length < 3) {
    usernameRight = false;
    showMessage(
      username,
      usernameMsg,
      "Username must be at least 3 characters",
      false
    );
  } else if (!validUsernameRegex.test(value)) {
    usernameRight = false;
    showMessage(
      username,
      usernameMsg,
      "Only letters, numbers, and _ allowed",
      false
    );
  } else {
    usernameRight = true;
    showMessage(username, usernameMsg, "Username is valid!", true);
  }
});

email.addEventListener("change", () => {
  const value = email.value.trim();

  if (!validEmailRegex.test(value)) {
    emailRight = false;
    showMessage(email, emailMsg, "Please enter a valid email address", false);
  } else {
    emailRight = true;
    showMessage(email, emailMsg, "Email looks good!", true);
  }
});

password.addEventListener("change", () => {
  const value = password.value;

  if (value.length < 6) {
    passwordRight = false;
    showMessage(
      password,
      passMsg,
      "Password must be at least 6 characters",
      false
    );
  } else {
    passwordRight = true;
    showMessage(password, passMsg, "Password is strong enough!", true);
  }
});

password2.addEventListener("change", () => {
  const value = password2.value;

  if (value !== password.value) {
    password2Right = false;
    showMessage(password2, passMsg2, "Passwords do not match", false);
  } else {
    password2Right = true;
    showMessage(password2, passMsg2, "Passwords match!", true);
  }
});

submitBtn.addEventListener("click", () => {
  if (usernameRight && emailRight && passwordRight && password2Right) {
    username.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";

    username.style.border = "1px solid #ccc";
    email.style.border = "1px solid #ccc";
    password.style.border = "1px solid #ccc";
    password2.style.border = "1px solid #ccc";

    usernameMsg.textContent = "";
    emailMsg.textContent = "";
    passMsg.textContent = "";
    passMsg2.textContent = "";

    usernameRight = false;
    emailRight = false;
    passwordRight = false;
    password2Right = false;
  }
});

// ************* HELPERS ***************
function showMessage(input, msgElement, message, isValid) {
  input.style.border = `2px solid ${isValid ? "#2ecc71" : "#e74c3c"}`;
  msgElement.textContent = message;
  msgElement.style.color = isValid ? "#2ecc71" : "#e74c3c";
}
