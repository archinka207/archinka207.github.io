"use strict";

const key = "?api_key=d6d50fc0-628f-4069-b854-bf25968b4cad";
const address = "http://api.std-900.ist.mospolytech.ru";

let itemsData = []; // Массив для хранения данных о товарах
let cart = []; // Массив для хранения товаров в корзине

// Функция для сохранения корзины в localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Функция для загрузки корзины из localStorage
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Функция для добавления товара в корзину
function addToCart(item) {
    cart.push(item);
    saveCart();
    alert(`Товар "${item.name}" добавлен в корзину!`);
}

async function fetchData() {
    const URL = `${address}/exam-2024-1/api/goods${key}`;

    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Данные получены:", data);
        return data;
    } catch (err) {
        console.error("Не удалось получить товары:", err);
        throw err;
    }
}

function createItemCard(data) {
    const card = document.createElement("div");
    card.className = "itemCard";
    card.dataset.id = data.id;
    card.dataset.category = data.main_category;
    const { actual_price, discount_price } = data;
    const hasDiscount = discount_price && discount_price < actual_price;
    const discount = hasDiscount
        ? `${Math.round(((actual_price - discount_price) * 100) / actual_price)}%`
        : "";
    const price = hasDiscount ? `${discount_price}₽` : `${actual_price}₽`;
    const oldPrice = hasDiscount ? `${actual_price}₽` : "";

    card.innerHTML = `
        <figure class="itemImg">
            <img src="${data.image_url}" alt="${data.name}" />
        </figure>
        <div class="itemAttributes">
            <p class="itemName">${data.name}</p>
            <div class="itemRating">
                <span class="ratingValue">${data.rating}</span>
                <span>${renderStars(data.rating)}</span>
            </div>
            <div class="itemPriceAndDiscount">
                <p class="price">${price}</p>
                ${oldPrice ? `<p class="oldPrice">${oldPrice}</p>` : ""}
                ${discount ? `<p class="discount">${discount}</p>` : ""}
            </div>
            <button class="add-to-cart">Добавить</button>
        </div>
    `;

    // Добавляем обработчик события для кнопки "Добавить"
    const addButton = card.querySelector(".add-to-cart");
    addButton.addEventListener("click", () => addToCart(data));

    return card;
}

function renderStars(rating) {
    const fullStars = Math.round(rating);
    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {
        const isActive = i <= fullStars ? "active" : "";
        starsHTML += `<span class="star ${isActive}" data-value="${i}">&#9733;</span>`;
    }

    return starsHTML;
}

async function renderCards() {
    const itemsContainer = document.querySelector(".items");
    itemsData = await fetchData(); // Сохраняем данные в глобальную переменную

    if (itemsData.length === 0) {
        itemsContainer.innerHTML = "<p>Товары не найдены.</p>";
        return;
    }

    updateItemsDisplay(itemsData); // Отображаем карточки
}

function updateItemsDisplay(items) {
    const itemsContainer = document.querySelector(".items");
    itemsContainer.innerHTML = ""; // Очищаем контейнер

    items.forEach(item => {
        const card = createItemCard(item);
        itemsContainer.appendChild(card);
    });
}

function sortItems(sortType) {
    let sortedItems = [...itemsData]; // Используем глобальную переменную itemsData

    switch (sortType) {
        case "ratingDesc":
            sortedItems.sort((a, b) => b.rating - a.rating);
            break;
        case "ratingAsc":
            sortedItems.sort((a, b) => a.rating - b.rating);
            break;
        case "priceDesc":
            sortedItems.sort((a, b) => b.actual_price - a.actual_price);
            break;
        case "priceAsc":
            sortedItems.sort((a, b) => a.actual_price - b.actual_price);
            break;
        default:
            break;
    }

    updateItemsDisplay(sortedItems); // Обновляем отображение
}

// Загружаем корзину при загрузке страницы
loadCart();

// Добавляем обработчик события для сортировки
document.getElementById("sort").addEventListener("change", (event) => {
    const sortType = event.target.value;
    sortItems(sortType);
});

// Инициализация
renderCards();