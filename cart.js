"use strict";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "";
        emptyCartMessage.style.display = "block";
        return;
    }

    emptyCartMessage.style.display = "none";
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Цена: ${item.discount_price ? item.discount_price : item.actual_price}₽</p>
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
}

function saveOrder(order) {
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

document.getElementById("checkout-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const deliveryDate = document.getElementById("delivery-date").value;
    const deliveryTime = document.getElementById("delivery-time").value;
    const comment = document.getElementById("comment").value;
    const newsletter = document.getElementById("newsletter").checked;

    const order = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.discount_price || item.actual_price), 0),
        deliveryDate,
        deliveryTime,
        customer: { name, email, phone, address },
        comment,
        newsletter,
    };

    saveOrder(order);
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Заказ успешно оформлен!");
    window.location.href = "profile.html";
});

// Инициализация
renderCartItems();