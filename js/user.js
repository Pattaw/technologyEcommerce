const userInfo = document.querySelector("#userInfo");
const user = document.querySelector("#user");
const links = document.querySelector("#links");

// change header after login
if (localStorage.getItem("userName")) {
  links.remove();
  user.style.display = "block";
  userInfo.style.display = "flex";
  user.textContent = "Welcome " + localStorage.getItem("userName");
}

// log out after click on logutout btn
const logOutBtn = document.querySelector("#logOut");
logOutBtn.addEventListener("click", logOut);

function logOut() {
  localStorage.clear();
  window.location.href = "index.html";
}
