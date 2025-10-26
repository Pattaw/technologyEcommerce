let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let form = document.querySelector("#signUpForm");

userName?.focus();

form.addEventListener("submit", handleSignUp);

function handleSignUp(e) {
  e.preventDefault();
  if (!userName.value || !password.value || !email.value) {
    alert("please Fill The Empty");
  } else {
    saveAccountDetails();
    window.location.href = "login.html";
  }
}
function saveAccountDetails() {
  localStorage.setItem("userName", userName.value);
  localStorage.setItem("password", password.value);
  localStorage.setItem("email", email.value);
}
