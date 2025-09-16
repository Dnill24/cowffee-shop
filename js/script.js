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

    let cart = [];
    let total = 0;

    // Load from localStorage
    function loadCart() {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const savedTotal = parseFloat(localStorage.getItem("total")) || 0;
      cart = savedCart;
      total = savedTotal;
      renderCart();
    }

    // Save to localStorage
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("total", total);
    }

    // Render cart
    function renderCart() {
      cartItemsList.innerHTML = "";
      cart.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
          <img src="${item.imgSrc}" alt="${item.name}">
          <div class="item-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">$${item.price.toFixed(2)} x ${item.qty}</span>
          </div>`;
        cartItemsList.appendChild(li);
      });
      cartTotalElement.textContent = total.toFixed(2);
    }

    // Add to cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const imgSrc = button.closest(".box").querySelector("img").src;

        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
          existingItem.qty++;
        } else {
          cart.push({ name, price, imgSrc, qty: 1 });
        }

        total += price;
        saveCart();
        renderCart();
      });
    });

    // Checkout
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
          alert("Your cart is empty!");
        } else {
          alert("Thanks for your order! Total: $" + total.toFixed(2));
          cart = [];
          total = 0;
          saveCart();
          renderCart();
        }
      });
    }

    // Initialize
    loadCart();
  }
});
