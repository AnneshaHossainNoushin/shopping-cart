document.addEventListener("DOMContentLoaded", function () {
  const cart = [];
  const cartCount = document.getElementById("cart-count");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartItemsContainer = document.getElementById("cart-items");
  const closeCartBtn = document.getElementById("close-cart");

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
      cartCount.innerText = cart.length; // Update cart icon count
  }

  window.addToCart = function (name, price, image) {
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          cart.push({ name, price, image, quantity: 1 });
      }
      updateCartUI();
      cartSidebar.style.display = "block"; // Open cart when item added
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

  closeCartBtn.addEventListener("click", function () {
      cartSidebar.style.display = "none"; // Close cart
  });
});
