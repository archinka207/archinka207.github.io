"use strict";

let orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderOrders() {
    const ordersTable = document.getElementById("orders-table");
    ordersTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Дата и время</th>
                    <th>Состав</th>
                    <th>Итоговая стоимость</th>
                    <th>Дата доставки</th>
                    <th>Время доставки</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map((order, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${order.date}</td>
                        <td>${order.items.map(item => item.name).join(", ")}</td>
                        <td>${order.total}₽</td>
                        <td>${order.deliveryDate}</td>
                        <td>${order.deliveryTime}</td>
                        <td>
                            <button onclick="viewOrder(${order.id})">Просмотр</button>
                            <button onclick="editOrder(${order.id})">Редактирование</button>
                            <button onclick="deleteOrder(${order.id})">Удаление</button>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}

function viewOrder(orderId) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        alert(`Просмотр заказа:\n\nСостав: ${order.items.map(item => item.name).join(", ")}\nИтоговая стоимость: ${order.total}₽\nДата доставки: ${order.deliveryDate}\nВремя доставки: ${order.deliveryTime}`);
    }
}

function editOrder(orderId) {
    const order = orders.find(order => order.id === orderId);
    if (order) {
        const newDeliveryDate = prompt("Введите новую дату доставки:", order.deliveryDate);
        const newDeliveryTime = prompt("Введите новое время доставки:", order.deliveryTime);

        if (newDeliveryDate && newDeliveryTime) {
            order.deliveryDate = newDeliveryDate;
            order.deliveryTime = newDeliveryTime;
            localStorage.setItem("orders", JSON.stringify(orders));
            renderOrders();
        }
    }
}

function deleteOrder(orderId) {
    orders = orders.filter(order => order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
}

// Инициализация
renderOrders();