// ===== NAVBAR TOGGLE =====
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

if (menu && navbar) {
  menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  };

  window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
  };
}

// ===== HOME IMAGE SLIDER =====
if (document.querySelectorAll('.image-slider img').length) {
  document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
      var src = images.getAttribute('src');
      document.querySelector('.main-home-image').src = src;
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
      768: { slidesPerView: 2 }
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

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const imgSrc = button.closest(".box").querySelector("img").src;

      cart.push({ name, price, imgSrc });
      total += price;

      const li = document.createElement("li");
      li.classList.add("cart-item");
      li.innerHTML = `
        <img src="${imgSrc}" alt="${name}">
        <div class="item-info">
          <span class="item-name">${name}</span>
          <span class="item-price">$${price.toFixed(2)}</span>
        </div>`;
      cartItemsList.appendChild(li);

      cartTotalElement.textContent = total.toFixed(2);
    });
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
      } else {
        alert("Thanks for your order! Total: $" + total.toFixed(2));
        cart = [];
        total = 0;
        cartItemsList.innerHTML = "";
        cartTotalElement.textContent = "0.00";
      }
    });
  }
}
