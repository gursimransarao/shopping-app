document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 24.99 },
    { id: 2, name: "Product 2", price: 39.99 },
    { id: 3, name: "Product 3", price: 44.99 },
  ];

  const cart = [];

  const productList = document.querySelector("#product-list");
  const cartItems = document.querySelector("#cart-items");
  const emptyCartMessage = document.querySelector("#empty-cart");
  const cartTotalMessage = document.querySelector("#cart-total");
  const totalPriceDisplay = document.querySelector("#total-price");
  const checkOutBtn = document.querySelector("#checkout-btn");

  products.forEach((product) => {
    newEl = document.createElement("div");
    newEl.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)} </span>
    <button data-id="${product.id}"> Add to Cart </button>
    `;
    newEl.classList.add("product");
    productList.appendChild(newEl);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      console.log(product);
      addToCart(product);
    }
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      console.log(product);
      removeFromCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
  }

  function removeFromCart(product) {
    cart.pop(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    console.log(cart);
    if (cart.length) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.style.display = "flex";
        cartItem.style.justifyContent = "space-between";

        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(
          2
        )} <button class="remove"data-id="${item.id}">\u00d7 </button>
        `;

        cartItem.classList.add("spacing");
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `0.00`;
    }
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("checkout successfully");
    renderCart();
  });
});
