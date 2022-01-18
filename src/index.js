import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';

const KEY = '25287120-bf1334483d346d0412f62d231';
const BASE_URL = 'https://pixabay.com/api/?';
// https://pixabay.com/api/?key={ KEY }&q=yellow+flowers&image_type=photo
const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const imagesPerPage = 40;
let page = 1;
let inputValue = '';
let imageQuantity = 0;


const fetchImages = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${imagesPerPage}&page=${page}`,
    );
    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const getImages = async event => {
    
    console.log(imageQuantity);
    event.preventDefault();
    btnLoadMore.style.display = 'none';
  gallery.innerHTML = '';
  inputValue = input.value.trim();
  if (!inputValue) return;
  // console.log(inputValue);
    const data = await fetchImages(inputValue);
    imageQuantity = imagesPerPage;
  // console.log(data);
  createMarkup(data);
  console.log(data.hits.length);
  if (!data.hits.length) {
    console.log(data.hits.length);
    btnLoadMore.style.display = 'none';
    return;
  }
//   console.log('visible');
  btnLoadMore.style.display = 'block';
  btnLoadMore.style.margin = '10px auto';
};

form.addEventListener('submit', getImages);

const createMarkup = (data) => {
  // if (countries.length === null) {
  //     return;
    if (data.hits.length === 0) {
      gallery.innerHTML = '';
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    
    // return;
  }
  console.log(data);
  const markup = data.hits
    .map(card => {
    //   console.log(card);
      return `<div class="photo-card">
            <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes </b>${card.likes}
                </p>
                <p class="info-item">
                <b>Views </b>${card.views}
                </p>
                <p class="info-item">
                <b>Comments </b>${card.comments}
                </p>
                <p class="info-item">
                <b>Downloads </b>${card.downloads}
                </p>
            </div>
            </div>`;
    })
    .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}



const loadMoreImages = async event => {
    page += 1;
    const data = await fetchImages(inputValue, page);
    createMarkup(data);
    imageQuantity += imagesPerPage;
    console.log(imageQuantity);
    console.log(data.totalHits);
    if (imageQuantity >= data.totalHits) {
        btnLoadMore.style.display = "none";
        console.log('counted!');
        return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }
};

btnLoadMore.addEventListener('click', loadMoreImages);

