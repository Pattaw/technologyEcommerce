export function handleInternet() {
  let noInternet = document.querySelector(".noInternet");

  window.onload = function () {
    if (window.navigator.onLine) {
      noInternet.classList.add("d-none");
    } else {
      // noInternet.style.display = "block";
      noInternet.classList.remove("d-none");
    }
  };

  window.addEventListener("online", function () {
    noInternet.classList.add("d-none");
  });

  window.addEventListener("offline", function () {
    noInternet.classList.remove("d-none");
  });
}
