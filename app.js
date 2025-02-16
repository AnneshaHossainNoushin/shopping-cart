document.addEventListener("DOMContentLoaded", function() {
  fetch("products.json")
      .then(response => response.json())
      .then(products => {
          const productList = document.getElementById("product-list");
          products.forEach(product => {
              const productDiv = document.createElement("div");
              productDiv.classList.add("product");

              productDiv.innerHTML = `
                  <img src="${product.image}" alt="${product.name}" width="100">
                  <h3>${product.name}</h3>
                  <p>Price: Tk ${product.price}</p>
                  <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
              `;

              productList.appendChild(productDiv);
          });
      });
});
