export function updateQuantity(id, price, action) {
  let quantityElement = document.getElementById(`quantity-${id}`);
  let quantity = +quantityElement.innerHTML;

  if (action === "increase") {
    quantity++;
  } else if (action === "decrease") {
    quantity--;
  }

  if (quantity < 1) {
    // شيل العنصر من localStorage
    let addItemStorage =
      JSON.parse(localStorage.getItem("proudectInCart")) || [];
    addItemStorage = addItemStorage.filter((item) => item.id !== id);
    localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

    const productElement = document.getElementById(`product-${id}`);
    if (productElement) productElement.remove();

    localStorage.removeItem(`quantity-${id}`);
  } else {
    quantityElement.innerHTML = quantity;
    localStorage.setItem(`quantity-${id}`, quantity);
  }

  // حساب الإجمالي الجديد بعد أي تغيير
  let addItemStorage = JSON.parse(localStorage.getItem("proudectInCart")) || [];
  let total = 0;

  addItemStorage.forEach((item) => {
    const q = +localStorage.getItem(`quantity-${item.id}`) || 1;
    total += item.salePrice * q;
  });

  // تحديث العنصر في الصفحة
  const totalPriceElement = document.querySelector(".total .totalPrice");
  if (totalPriceElement) {
    totalPriceElement.innerHTML = total;
  }

  localStorage.setItem("totalPrice", total);
}
