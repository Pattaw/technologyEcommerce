const userNameInput = document.querySelector("#userName");
const passwordInput = document.querySelector("#password");
const form = document.querySelector("#loginForm");

userNameInput?.focus();

form.addEventListener("submit", handleLogin);
function handleLogin(e) {
  const getUserName = localStorage.getItem("userName")?.trim();
  const getPassword = localStorage.getItem("password")?.trim();

  e.preventDefault();

  if (!userNameInput?.value || !passwordInput?.value) {
    alert("please Fill Your Data");
  } else {
    if (
      getUserName === userNameInput.value.trim() &&
      getPassword === passwordInput.value.trim()
    ) {
      window.location.href = "index.html";
    } else {
      alert("not valid");
    }
  }
}
