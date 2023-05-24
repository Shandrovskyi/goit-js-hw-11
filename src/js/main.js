import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import API from './API';
import Markup from './markup';

// Створення екземплярів класів API і Markup:
const newAPI = new API();
const newMarkup = new Markup();


// Отримання посилань на елементи DOM
const form = document.getElementById("search-form");
const dataInput = form.elements.searchQuery;
const loadMoreButton = document.querySelector(".load-more");

// Вішаємо слухачі
form.addEventListener("submit", clickSearch);
loadMoreButton.addEventListener("click", loadMore);

function clickSearch(event) {
    event.preventDefault();
    const value = dataInput.value.trim(); //отримання значення, введеного в поле вводу dataInput
    
    value === "" ? (clear(), newAPI.messageEmptyRecvest()) : startSearch();
  }

// Функція викликається при початку пошуку
async function startSearch(){
    clear();
    await newAPI.getRequest()
        .then(data => markupCallFunction(data))
        .catch(Error);
};


// При натисканні кнопки завантажити ще
async function loadMore() {
    await newAPI.getRequest()
        .then(data => markupCallFunction(data))
        .catch(Error);
};


function markupCallFunction (data) {
    newMarkup.dataMarkup = data;  // Присвоюємо отримані дані властивості `dataMarkup` об'єкта `newMarkup`
    newMarkup.getNewsList();  // Викликаємо метод `getNewsList()` об'єкта `newMarkup`, який створює розмітку для відображення даних
    checkLoadMoreButton();

    // Використовує бібліотеку для відображення при натисканні на картинку
    new SimpleLightbox('.gallery a', { 
        /* options */ 
        captionsData:'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
    const gallery = $('.gallery a').SimpleLightbox();
    gallery.refresh();
}

// Наявність та стан кнопки завантажити ще
function checkLoadMoreButton() {
    const shouldShowButton = newAPI.getPage() !== 1; 
    loadMoreButton.classList.toggle("hidden", !shouldShowButton);
}

//  очищення та підготовка до наступного запитy
function clear() {
    newMarkup.clearNewsList();
    newAPI.resetPage();
    newAPI.dataForAPI = dataInput.value;
    checkLoadMoreButton();
}



