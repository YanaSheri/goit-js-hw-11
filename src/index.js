import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

const KEY = '25287120-bf1334483d346d0412f62d231';
const BASE_URL = 'https://pixabay.com/api/?';
// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
const form = document.querySelector("#search-form");
const input = document.querySelector("input");
const gallery = document.querySelector(".gallery");

function fetchImages(query) {
    return fetch(`${BASE_URL}key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            // if (!response.ok) {
            //     throw new Error(response.status)
            // }
            return response.json()
        })
        .catch(error => console.log(error));
};

form.addEventListener('submit', getImages);

function getImages(event) {
    event.preventDefault();
    
    const inputValue = input.value.trim();
    if (!inputValue) return;
    // console.log(inputValue);
    fetchImages(inputValue)
         .then(data => {
            // console.log(data);
            createMarkup(data);
            return data;
        }) 
};

function createMarkup(data) {
    // if (countries.length === null) {
    //     return;
    console.log(data);
    const markup = data.hits.map(card => {
        console.log(card);
        return `<div class="photo-card">
            <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes ${card.likes}</b>
                </p>
                <p class="info-item">
                <b>Views ${card.views}</b>
                </p>
                <p class="info-item">
                <b>Comments ${card.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads ${card.downloads}</b>
                </p>
            </div>
            </div>`
        
    }).join('');
    gallery.innerHTML = markup;
}




