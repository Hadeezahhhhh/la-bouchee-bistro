let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} × ${item.quantity}</span>
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;
    });

    cartTotal.textContent = "₦" + total.toLocaleString();
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}document.querySelectorAll(".menu-card").forEach(card => {
    const name = card.querySelector("h3").textContent;
    const priceText = card.querySelector(".price").textContent;
    const price = Number(priceText.replace(/[^\d]/g, ""));

    const button = document.createElement("button");
    button.textContent = "Add to Cart 🛒";

    button.onclick = function () {
        addToCart(name, price);
    };

    card.appendChild(button);
});const orderType = document.getElementById("order-type");
const deliveryAddress = document.getElementById("delivery-address");

orderType.addEventListener("change", function () {
    if (orderType.value === "Delivery") {
        deliveryAddress.style.display = "block";
        deliveryAddress.required = true;
    } else {
        deliveryAddress.style.display = "none";
        deliveryAddress.required = false;
        deliveryAddress.value = "";
    }
});