document.addEventListener("DOMContentLoaded", () => {
  // ===== HEADER & FOOTER LOADING =====
  if (document.getElementById("header-placeholder")) {
    fetch("header.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
      });
  }

  if (document.getElementById("footer-placeholder")) {
    fetch("footer.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
      });
  }

  // ===== HOME IMAGE SLIDER =====
  if (document.querySelectorAll(".image-slider img").length) {
    document.querySelectorAll(".image-slider img").forEach(images => {
      images.onclick = () => {
        var src = images.getAttribute("src");
        document.querySelector(".main-home-image").src = src;
      };
    });
  }

  // ===== REVIEW SLIDER =====
  if (document.querySelector(".review-slider")) {
    var swiper = new Swiper(".review-slider", {
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
      },
    });
  }


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
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.classList.add("cart-item");
      li.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}">
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-price">$${item.price.toFixed(2)} × ${item.quantity}</span>
        </div>
        <div class="cart-controls">
          <button class="decrease-btn" data-index="${index}">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
          <button class="remove-btn" data-index="${index}">✖</button>
        </div>
      `;
      cartItemsList.appendChild(li);
    });

    cartTotalElement.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Hook buttons
    document.querySelectorAll(".increase-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart[index].quantity++;
        renderCart();
      });
    });

    document.querySelectorAll(".decrease-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        } else {
          cart.splice(index, 1);
        }
        renderCart();
      });
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        renderCart();
      });
    });
  }

  // Add to cart
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const imgSrc = button.closest(".box").querySelector("img").src;

      // Check if already in cart
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, imgSrc, quantity: 1 });
      }

      renderCart();
    });
  });

  // Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        alert("Thanks for your order! Total: $" + total.toFixed(2));
        cart = [];
        renderCart();
      }
    });
  }

  // Initial load
  renderCart();
}
});