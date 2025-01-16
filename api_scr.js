"use strict"
const key = "?ebd4e0e2-52dc-4128-876f-5f8cd15720bf"; // Убрал "?", так как это, скорее всего, часть пути
const address = "http://api.std-900.ist.mospolytech.ru";

export async function getData() {
    const URL = `${address}/exam-2024-1/api/goods/${key}`; // Используем шаблонные строки

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

// Пример вызова функции
console.log("fafdafsa");
getData()
    .then(data => {
        console.log("Товары:", data); // Обработка данных
    })
    .catch(err => {
        console.error("Ошибка при получении данных:", err); // Обработка ошибок
    });

console.log("fafdafsa");

getData()