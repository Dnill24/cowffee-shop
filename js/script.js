// ===== SHOPPING CART =====
if (document.getElementById("cart-items")) {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render cart items
  function renderCart() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      const li = document.createElement("li");
      li.classList.add("cart-item");
      li.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$${item.price.toFixed(2)}</span>
        </div>
        <button class="remove-btn" data-index="${index}">✖</button>
      `;
      cartItemsList.appendChild(li);
    });

    cartTotalElement.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Hook remove buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1); // remove item
        renderCart(); // refresh cart
      });
    });
  }

  // Add to cart
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const imgSrc = button.closest(".box").querySelector("img").src;

      cart.push({ name, price, imgSrc });
      renderCart();
    });
  });

  // Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        alert("Thanks for your order! Total: $" + cart.reduce((sum, item) => sum + item.price, 0).toFixed(2));
        cart = [];
        renderCart();
      }
    });
  }

  // Initial load
  renderCart();
}
