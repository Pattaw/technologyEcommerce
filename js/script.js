import { handleInternet } from "./utils/internetState.js";
import { updateFavourite } from "./utils/updateFavourite.js";
import { updateQuantity } from "./utils/updateQuantity.js";

const allProducts = document.querySelector(".products");
const AddToCartBtn = document.querySelector(".AddToCartBtn");
const RemoveFromCartBtn = document.querySelector(".RemoveFromCartBtn");
const badge = document.querySelector(".badge");
const buyProudect = document.querySelector(".buyProudect");
const totalPrice = document.querySelector(".total .totalPrice");
const shoppingCartIcon = document.querySelector(".shoppingCart");
const cartsProudect = document.querySelector(".cartsProudect");
const search = document.getElementById("search");
const searchOption = document.getElementById("searchOption");

let total = localStorage.getItem("totalPrice")
  ? +localStorage.getItem("totalPrice")
  : 0;

let addItemStorage = localStorage.getItem("proudectInCart")
  ? JSON.parse(localStorage.getItem("proudectInCart"))
  : [];

let modeSearch = "title";

window.addTOCartEvent = addTOCartEvent;
window.removeFromCart = removeFromCart;
window.addFav = addFav;
window.updateQuantity = updateQuantity; // because it is become module ... so window can't find functions
window.searchData = searchData;

handleInternet(); //check internet connection

//get all data from json
async function getData() {
  try {
    // Force GitHub Pages to use correct repo name path
    const response = await fetch("/technologyEcommerce/data/data.json");

    if (!response.ok) {
      throw new Error(`Failed to load data.json: ${response.status}`);
    }

    const { products } = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}



function loadData(item, heightImage, heartIconClass) {
  return `
            <div class="product-item col-4 mb-4 p-4">
                <div class="card border border-info pt-3">
                    <img class="product-item-img card-img-top m-auto" src="${item.imageURL}" alt="Card image" style="width:80%; height:${heightImage};">
                    <div class="product-itm-desc card-body pb-0 pl-4">
                        <p class="card-title">Product: ${item.title}.</p>
                        <p class="card-text">Category :${item.category}.</p>
                        <p class="color">Color: ${item.color}.</p>
                        <p class="card-price">Price: <span> <del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
                    </div>
                    <div class="product-item-action d-flex justify-content-between pr-4 pl-4">
                    <button id="add-btn-${item.id}" class="AddToCartBtn btn btn-primary mb-2" onClick="addTOCartEvent(${item.id})">Add To Cart</button>
                    <button id="remove-btn-${item.id}" class="RemoveFromCartBtn btn btn-primary mb-2" onClick="removeFromCart(${item.id})">Remove From Cart</button>
                        <i id="fav-${item.id}" class="${heartIconClass} fa-heart" onClick="addFav(${item.id})"></i>
                    </div>
                </div>
            </div>
        `;
}

async function drawData() {
  let products = await getData();

  let pro = products.map((item) => handleImage(item));

  allProducts.innerHTML = pro.join("");
}

async function searchData(value) {
  let products = await getData();
  let filteredProducts = products.filter((item) => {
    if (modeSearch === "title") {
      return item.title.toLowerCase().includes(value.toLowerCase());
    } else if (modeSearch === "category") {
      return item.category.toLowerCase().includes(value.toLowerCase());
    }
  });
  let pro = filteredProducts.map((item) => handleImage(item));

  allProducts.innerHTML = pro.join("");
}

function handleImage(item) {
  let isFavorite = checkFavorite(item.id);

  let heartIconClass = isFavorite ? "fas" : "far";
  let heightImage;
  switch (item.category) {
    case "phone":
      heightImage = "330px";
      break;

    case "smart watch":
      heightImage = "240px";
      break;
    default:
      heightImage = "200px";
      break;
  }

  return loadData(item, heightImage, heartIconClass);
}

// -------------------------------------------------------------------------------------------------------------

if (addItemStorage) {
  addItemStorage?.map((item) => {
    drawBuyProudect(item);
    let addBtn = document.getElementById(`add-btn`);
    let removeBtn = document.getElementById(`remove-btn`);
    if (addBtn) {
      addBtn.style.display = "none";
    }
    if (removeBtn) {
      removeBtn.style.d = "inline-block";
    }

    total += +item.salePrice * +localStorage.getItem(`quantity-${item.id}`);
  });
  totalPrice.innerHTML = total / 2 + " EGP";

  if (addItemStorage.length != 0) {
    badge.style.display = "block";
    badge.innerHTML = addItemStorage.length;
  } else {
    badge.style.display = "none";
  }
}

function removeFromCart(id) {
  let itemIndex = addItemStorage.findIndex((item) => item.id === id);
  let quantityElement = document.getElementById(`quantity-${id}`);
  let quantity = +quantityElement.innerHTML;

  if (itemIndex !== -1) {
    addItemStorage.splice(itemIndex, 1);
    localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

    total = 0;
    document.getElementById(`add-btn-${id}`).style.display = "inline-block";
    document.getElementById(`remove-btn-${id}`).style.display = "none";

    let buyProudectItem = document.getElementById(`buyProudectItem-${id}`);
    if (buyProudectItem) {
      buyProudectItem.remove();
    }

    addItemStorage.forEach((item) => {
      drawBuyProudect(item);
      // total += +item.salePrice * quantity;
      total +=
        +item.salePrice * +localStorage.getItem(`quantity-${item.id}`) ?? 1;
    });

    totalPrice.innerHTML = total + " EGP";
    localStorage.setItem("totalPrice", JSON.stringify(total));

    if (addItemStorage.length !== 0) {
      badge.style.display = "block";
      badge.innerHTML = addItemStorage.length;
    } else {
      badge.style.display = "none";
    }
  }
}
async function addTOCartEvent(id) {
  let products = await getData();
  if (localStorage.getItem("userName")) {
    let choosenItem = products.find((item) => item.id === id);
    let itemIndex = addItemStorage.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      drawBuyProudect(choosenItem);

      addItemStorage = [...addItemStorage, choosenItem];
      localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

      let quantity = localStorage.getItem(`quantity-${choosenItem.id}`)
        ? +localStorage.getItem(`quantity-${choosenItem.id}`)
        : 1;

      total += +choosenItem.salePrice * quantity;
      totalPrice.innerHTML = total + " EGP";
      localStorage.setItem("totalPrice", JSON.stringify(total));

      document.getElementById(`add-btn-${id}`).style.display = "none";
      document.getElementById(`remove-btn-${id}`).style.display =
        "inline-block";

      if (addItemStorage.length != 0) {
        badge.style.display = "block";
        badge.innerHTML = addItemStorage.length;
      }
    } else {
      badge.style.display = "none";
    }
  } else {
    window.location = "login.html";
  }
}
function drawBuyProudect(item) {
  if (!document.getElementById(`buyProudectItem-${item.id}`)) {
    let quantity = +localStorage.getItem(`quantity-${item.id}`) || 1;

    buyProudect.innerHTML += `<div id="buyProudectItem-${item.id}" class="row my-2 pr-2">
        <span class="col-6">${item.title}</span>
        <span class="col-2" id="quantity-${item.id}">${quantity}</span>
        <span class="text-danger mins col-2" onClick="updateQuantity(${item.id},${item.salePrice},'decrease')">-</span>
        <span class="text-success pls col-2" onClick="updateQuantity(${item.id},${item.salePrice},'increase')">+</span>
      </div>`;
  }
}

// --------------------------------------------------------------------------
function checkFavorite(itemId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  // console.log(favorites);
  let isFavorite = favorites.includes(itemId);
  // console.log(isFavorite);

  return isFavorite;
  // return false;
}

function addFav(id) {
  if (localStorage.getItem("userName")) {
    const heartIcon = document.getElementById(`fav-${id}`);
    if (heartIcon.classList.contains("far")) {
      heartIcon.classList.remove("far");
      heartIcon.classList.add("fas");
    } else {
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far");
    }
    updateFavourite(id);
  } else {
    window.location = "login.html";
  }
}

//----------------------------------------------------------------

shoppingCartIcon.addEventListener("click", openCart);

function openCart() {
  if (buyProudect.innerHTML != "") {
    if (cartsProudect.style.display == "block") {
      cartsProudect.style.display = "none";
    } else {
      cartsProudect.style.display = "block";
    }
  }
}

// --------------------------------------------------------------------------------------

// search

searchOption.addEventListener("change", function () {
  let selectedValue = this.value;

  if (selectedValue === "searchTittle") {
    modeSearch = "title";
    console.log(searchOption.value);
  } else if (selectedValue === "searchCategory") {
    modeSearch = "category";
    console.log(searchOption.value);
  }

  search.placeholder = `search by ${modeSearch}`;
  search.focus();
  search.value = "";
  drawData();
});

// -----

drawData();
