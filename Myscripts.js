"use strict"
import { dishes } from "./Mydb.js";

let selectedSoupFilter;
let selectedMainFilter;
let selectedDrinkFilter;
let selectedSaladFilter;
let selectedDessertFilter;

let isActive1 = false;
let isActive2 = false;
let isActive3 = false;
let isActive4 = false;
let isActive5 = false;

const soupFilters = document.getElementById("soupFilters");
const mainFilters = document.getElementById("mainFilters");
const drinkFilters = document.getElementById("drinkFilters");
const saladFilters = document.getElementById("saladFilters");
const dessertFilters = document.getElementById("dessertFilters");

const dishSoupsCards = document.getElementById("soupes");
const dishMainCards = document.getElementById("main");
const dishDrinksCards = document.getElementById("drinks");
const dishSaladsCards = document.getElementById("salads");
const dishDessertsCards = document.getElementById("desserts");

function fillDishCard(dishCard, dishData) {
    dishCard.querySelector(".dish_img img").src = dishData.image;
    dishCard.querySelector(".dish_img img").alt = dishData.name;
    dishCard.querySelector(".price").textContent = `${dishData.price}₽`;
    dishCard.querySelector(".dish_name").textContent = dishData.name;
    dishCard.querySelector(".weight").textContent = dishData.count;
}

function createDishCard() {
    let dishCard = document.createElement("div");
    let figure = document.createElement("div");
    let img = document.createElement("img");
    let weigth = document.createElement("p");
    let price = document.createElement("p");
    let dishName = document.createElement("p");
    let div = document.createElement("div");
    let button = document.createElement("button");
    
    dishCard.className = "dish";
    figure.className = "dish_img";
    button.textContent = "Добавить";
    button.className = "dish-buy-button";
    weigth.className = "weight";
    price.className = "price";
    dishName.className = "dish_name";


    figure.append(img);
    div.append(weigth);
    div.append(button);

    dishCard.append(figure);
    dishCard.append(price);
    dishCard.append(dishName);
    dishCard.append(div);

    return dishCard;
}

dishes.forEach((dish) => {
    let dishCard = createDishCard();

    switch (dish.category) {
    case "soups":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishSoupsCards.append(dishCard);
        break;

    case "mainCourse":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishMainCards.append(dishCard);
        break;
        
    case "salads":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishSaladsCards.append(dishCard);
        break;
    
    case "beverages":
        dishCard.setAttribute("data-dish", `${dish.keyword}`);
        fillDishCard(dishCard, dish);
        dishDrinksCards.append(dishCard);
        break;

    case "desserts":
            dishCard.setAttribute("data-dish", `${dish.keyword}`);
            fillDishCard(dishCard, dish);
            dishDessertsCards.append(dishCard);
            break;
    }
});

function toNumber(stringNumber) {
    let number = Number(stringNumber);
    if (!number) {
        number = 0;
    }
    return number;
};

function countPrice() {
    let chosenSoupPrice;
    let chosenDrinkPrice;
    let chosenMainPrice;
    let chosenSaladPrice;
    let chosenDessertPrice;

    let soupPrice, mainPrice, drkPrice, dsrtPrice, sldPrice;

    let price1stPart, price2ndPart, price;


    let soupPriceContent;
    let mainPriceContent;
    let drkPriceContent;
    let sldPriceContent;
    let dsrtPriceContent;
    
    if (selectedSoup) {
        chosenSoupPrice = Number(soupPrice);
        soupPriceContent = (selectedSoup.querySelector(".price").textContent);
        soupPrice = soupPriceContent.slice(0, -1);
    }
    
    if (selectedMain) {
        chosenMainPrice = Number(mainPrice);
        mainPriceContent = (selectedMain.querySelector(".price").textContent);
        mainPrice = mainPriceContent.slice(0, -1);
    }
    
    if (selectedDrink) {
        chosenDrinkPrice = Number(drkPrice);
        drkPriceContent = (selectedDrink.querySelector(".price").textContent);
        drkPrice = drkPriceContent.slice(0, -1);
    }
    
    if (selectedDsrt) {
        chosenDessertPrice = Number(dsrtPrice);
        dsrtPriceContent = (selectedDsrt.querySelector(".price").textContent);
        dsrtPrice = dsrtPriceContent.slice(0, -1);
    }
    
    if (selectedSalad) {
        chosenSaladPrice = Number(sldPrice);
        sldPriceContent = (selectedSalad.querySelector(".price").textContent);
        sldPrice = sldPriceContent.slice(0, -1);
    }
    
    chosenSoupPrice = toNumber(soupPrice);
    chosenMainPrice = toNumber(mainPrice);
    chosenDrinkPrice = toNumber(drkPrice);
    chosenSaladPrice = toNumber(sldPrice);
    chosenDessertPrice = toNumber(dsrtPrice);

    price1stPart = chosenDrinkPrice + chosenSoupPrice + chosenMainPrice;
    price2ndPart = chosenSaladPrice + chosenDessertPrice;

    price = String(price1stPart) + "₽";

    document.querySelector(".fullPrice").textContent = price;
}

function showOrder(param) {
    if (param) {
        document.querySelector(".nothingChosenLabel").style.display = "none";
        const chosenDishes = document.querySelector(".chosenDishes");
        chosenDishes.style.display = "flex";
        return;
    }
    document.querySelector(".nothingChosenLabel").style.display = "inline";
    const chosenDishes = document.querySelector(".chosenDishes");
    chosenDishes.style.display = "none";    
}

function chooseDish(dish) {
    const dishName = dish.querySelector(".dish_name").textContent;
    const dishPrice = dish.querySelector(".price").textContent;
    
    const value = dishName + ` ${dishPrice}`;
    
    if (dish.parentElement.getAttribute("id") == "soupes") {
        document.getElementById("soupChoice").value = value;
    } else if (dish.parentElement.getAttribute("id") == "main") {
        document.getElementById("mainDishChoice").value = value;
    } else if (dish.parentElement.getAttribute("id") == "drinks") {
        document.getElementById("drinkChoice").value = value;
    } else if (dish.parentElement.getAttribute("id") == "salads") {
        document.getElementById("saladChoice").value = value;
    } else if (dish.parentElement.getAttribute("id") == "desserts") {
        document.getElementById("dessertChoice").value = value;
    }
}

function highlight(target, selected) {
    if (selected) {
        selected.style.border = "none";
    }
    target.style.border = "2px solid rgb(140, 0, 147)";
}

dishSoupsCards.onclick = function(event) {
    let target = event.target;
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement;
    highlight(dishCard, selectedSoup);
    selectedSoup = dishCard;

    showOrder();
    chooseDish(dishCard);
    countPrice();
};

function highlightFilter(target, selected) {
    if (selected) {
        selected.style.backgroundColor = '#76417f4c';
    }
    target.style.backgroundColor = "lightblue";
}

dishSoupsCards.onclick = function(event) {
    let target = event.target;
  
    if (target.tagName != "BUTTON") return;
  
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedSoup);
    selectedSoup = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishMainCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedMain);
    selectedMain = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishDrinksCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedDrink);
    selectedDrink = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishSaladsCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedSalad);
    selectedSalad = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

dishDessertsCards.onclick = function(event) {
    let target = event.target;
    
    if (target.tagName != "BUTTON") return;
    
    const dishCard = target.parentElement.parentElement;
    highlightCard(dishCard, selectedDsrt);
    selectedDsrt = dishCard;
    
    showOrder(true);
    chooseDish(dishCard);
    countPrice();
};

const dishCards = document.querySelectorAll(".dish-card");
const dishFilters = document.querySelectorAll(".filterButton");

function resetFilter(selectedFilter, cards, target) {
    selectedFilter = undefined;
    cards.forEach(dishCard => {
        dishCard.style.display = "flex";
    });
    target.style.backgroundColor = "white";
}

//Фильтрация блюд
function filterDishes(cards, selectedFilter) {
    cards.forEach(dishCard => {
        const keyword = dishCard.dataset.dish;
        const dishData = dishes.find(dish => dish.keyword == keyword);

        if (dishData.kind == selectedFilter.dataset.kind) {
            dishCard.style.display = "flex";
        } else {
            dishCard.style.display = "none";
        }
    });
}

soupFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishSoupsCards.querySelectorAll(".dish");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive1 && (target === selectedSoupFilter)) {
        isActive1 = false;
        resetFilter(selectedSoupFilter, cards, target);
        return;
    }

    isActive1 = true;
    highlightFilter(target, selectedSoupFilter);
    selectedSoupFilter = target;
    filterDishes(cards, selectedSoupFilter);
};

mainFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishMainCards.querySelectorAll(".dish");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive2 && (target === selectedMainFilter)) {
        isActive2 = false;
        resetFilter(selectedMainFilter, cards, target);
        return;
    }

    isActive2 = true;
    highlightFilter(target, selectedMainFilter);
    selectedMainFilter = target;
    filterDishes(cards, selectedMainFilter);
};

drinkFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishDrinksCards.querySelectorAll(".dish");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive3 && (target === selectedDrinkFilter)) {
        isActive3 = false;
        resetFilter(selectedDrinkFilter, cards, target);
        return;
    }

    isActive3 = true;
    highlightFilter(target, selectedDrinkFilter);
    selectedDrinkFilter = target;
    filterDishes(cards, selectedDrinkFilter);
};

saladFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishSaladsCards.querySelectorAll(".dish");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive4 && (target === selectedSaladFilter)) {
        isActive4 = false;
        resetFilter(selectedSaladFilter, cards, target);
        return;
    }

    isActive4 = true;
    highlightFilter(target, selectedSaladFilter);
    selectedSaladFilter = target;
    filterDishes(cards, selectedSaladFilter);
};

dessertFilters.onclick = function(event) {
    let target = event.target;
    let cards = dishDessertsCards.querySelectorAll(".dish");
    
    if (target.tagName != "BUTTON") return;
    
    if (isActive5 && (target === selectedDessertFilter)) {
        isActive5 = false;
        resetFilter(selectedDessertFilter, cards, target);
        return;
    }

    isActive5 = true;
    highlightFilter(target, selectedDessertFilter);
    selectedDessertFilter = target;
    filterDishes(cards, selectedDessertFilter);
};