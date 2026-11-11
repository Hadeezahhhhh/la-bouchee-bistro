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
});const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items first!");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const orderType = document.getElementById("order-type").value;
    const address = document.getElementById("delivery-address").value;

    if (orderType === "Delivery" && !address.trim()) {
        alert("Please enter your delivery address.");
        return;
    }

    let summary = `Thank you, ${name}!\n\nYour order:\n`;

    cart.forEach(item => {
        summary += `${item.name} x ${item.quantity} = ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });

    summary += `\nTotal: ${document.getElementById("cart-total").textContent}`;
    summary += `\nOrder type: ${orderType}`;

    if (orderType === "Delivery") {
        summary += `\nAddress: ${address}`;
    }

    summary += `\nPhone: ${phone}`;
    summary += "\n\nPAYMENT METHOD: Bank Transfer";
summary += "\nBank: To be confirmed";
summary += "\nAccount Name: To be confirmed";
summary += "\nAccount Number: To be confirmed";
summary += "\n\nPlease transfer the exact amount and await payment confirmation.";
    

    alert(summary);
}); // Switch between Sign Up and Log In

const signupSection = document.getElementById("signup");
const loginSection = document.getElementById("login");

loginSection.style.display = "none";

document.querySelectorAll('a[href="#login"]').forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        signupSection.style.display = "none";
        loginSection.style.display = "block";
    });
});

document.querySelectorAll('a[href="#signup"]').forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        loginSection.style.display = "none";
        signupSection.style.display = "block";
    });
});// Switch between Sign Up and Log In

const signupSection = document.getElementById("signup");
const loginSection = document.getElementById("login");

loginSection.style.display = "none";

document.querySelectorAll('a[href="#login"]').forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        signupSection.style.display = "none";
        loginSection.style.display = "block";
    });
});

document.querySelectorAll('a[href="#signup"]').forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        loginSection.style.display = "none";
        signupSection.style.display = "block";
    });
});
