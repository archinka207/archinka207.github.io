"use strict"

const key = "?api_key=d6d50fc0-628f-4069-b854-bf25968b4cad"; // Убрал "?", так как это, скорее всего, часть пути
const address = "http://api.std-900.ist.mospolytech.ru";

async function fetchData() {
    const URL = `${address}/exam-2024-1/api/goods${key}`; // Используем шаблонные строки

    try {
        const response = await fetch(URL);

        // Проверяем, что ответ успешный
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        // Парсим JSON
        const data = await response.json();
        console.log("Данные получены:", data); // Выводим данные в консоль
        return data; // Возвращаем данные
    } catch (err) {
        console.error("Не удалось получить товары:", err); // Логируем ошибку
        throw err; // Пробрасываем ошибку дальше, если нужно
    }
}

function createItemCard(data) {
    // Создаем карточку
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
            <button>Добавить</button>
        </div>
    `;
    return card;
}

// Функция для отображения звезд рейтинга
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
    const data = await fetchData();

    if (data.length === 0) {
        itemsContainer.innerHTML = "<p>Товары не найдены.</p>";
        return;
    }

    data.forEach(item => {
        console.log(data.length);
        console.log("hi hi hi hi")
        const card = createItemCard(item);
        itemsContainer.appendChild(card);
    });
}

renderCards();