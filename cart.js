document.addEventListener("DOMContentLoaded", function () {
  const cart = [];
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  let promoApplied = false; // Prevent multiple promo code uses

  function updateCartUI() {
      cartItemsContainer.innerHTML = "";
      let subtotal = 0;

      cart.forEach((item, index) => {
          subtotal += item.price * item.quantity;
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");

          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <span>${item.name} - Tk ${item.price} × ${item.quantity}</span>
              <div class="cart-buttons">
                  <button onclick="decreaseQuantity(${index})">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="increaseQuantity(${index})">+</button>
                  <button onclick="removeItem(${index})">Remove</button>
              </div>
          `;

          cartItemsContainer.appendChild(cartItem);
      });

      document.getElementById("subtotal").innerText = subtotal.toFixed(2);

      applyPromoCode(); // Apply promo discount when cart updates

      cartCount.innerText = cart.length; // Update cart count
  }

  window.addToCart = function (name, price, image) {
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ name, price, image, quantity: 1 });
      }
      updateCartUI();
  };

  window.increaseQuantity = function (index) {
      cart[index].quantity++;
      updateCartUI();
  };

  window.decreaseQuantity = function (index) {
      if (cart[index].quantity > 1) {
          cart[index].quantity--;
      } else {
          cart.splice(index, 1);
      }
      updateCartUI();
  };

  window.removeItem = function (index) {
      cart.splice(index, 1);
      updateCartUI();
  };

  document.getElementById("close-cart").addEventListener("click", function () {
      document.getElementById("cart-sidebar").style.display = "none";
  });

  // Apply promo code functionality
  document.getElementById("apply-promo").addEventListener("click", function () {
      applyPromoCode();
  });

  function applyPromoCode() {
      let promoInput = document.getElementById("promo-code").value.trim().toLowerCase();
      let subtotal = parseFloat(document.getElementById("subtotal").textContent);
      let discount = 0;

      if (promoApplied) {
          return; // Prevent multiple promo applications
      }

      if (promoInput === "ostad10") {
          discount = subtotal * 0.10;
          promoApplied = true;
      } else if (promoInput === "ostad5") {
          discount = subtotal * 0.05;
          promoApplied = true;
      } else if (promoInput !== "") {
          alert("Invalid promo code!");
          return;
      }

      document.getElementById("discount").textContent = discount.toFixed(2);
      let total = subtotal - discount;
      document.getElementById("total").textContent = total.toFixed(2);
  }
});
