// Імпорт бібліотек
import axios from "axios"; // для здійснення HTTP запитів 
import { Notify } from 'notiflix/build/notiflix-notify-aio'; // для відображення повідомлень

// Оголошення констант
const API_KEY = "36502661-e8ee83efff2e99e0261d33261";
const URL = "https://pixabay.com/api/";
const quantityPage = 40;


// Створюю параметри запиту
const options = new URLSearchParams({
    per_page: quantityPage,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
}).toString() 



// Цей код оголошує клас API, який має конструктор, що встановлює початкові значення для сторінки
export default class API {
    constructor() {
       this.page = 1;
       this.dataForAPI = "";
    }


    async getRequest() {
        // Здійснюємо GET-запит за допомогою Axios і отримуємо дані 
        const {data} = await axios.get(`${URL}?key=${API_KEY}&q=${this.dataForAPI}&page=${this.page}&${options}`);
       
        this.messageInfoRecvest(data.totalHits)  // Викликаємо метод messageInfoRecvest для відображення повідомлення про загальну кількість знайдених зображень

        if (data.totalHits === 0) {
            this.emptyMessage()
            return
        }
        if (data.hits.length >= quantityPage) {
            this.incrementPage();
        } else {
            this.messageEndRevest();
            this.page = 1;
        }
        return data.hits
    }




    getPage(){
        return this.page;
    }

    resetPage() {
        this.page = 1;
    }
    
    incrementPage() {
        this.page += 1;
    }

    emptyMessage() {
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        }
    
    messageEndRevest() {
        Notify.info("We're sorry, but you've reached the end of search results.");
        }

        
    // інформаційне повідомлення про кількість знайдених зображень
    messageInfoRecvest(totalHits) {
        if (this.page === 1 && totalHits!== 0) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        } return
        }
    
};