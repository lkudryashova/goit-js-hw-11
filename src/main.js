import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImagesByQuery from './js/pixabay-api';
import { createImages, clearImages } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  clearImages();
  event.preventDefault();
  loader.classList.remove('hidden');
  let wordForSearch = input.value.trim();
  const page = 1;
  if (wordForSearch === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Please fill the input',
    });
    loader.classList.add('hidden');
    return;
  }
  searchImagesByQuery(wordForSearch, page)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          position: 'topRight',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        loader.classList.add('hidden');
      } else {
        createImages(data);
        loader.classList.add('hidden');
      }
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: 'Failed to fetch images. Please try again later.',
      });
      loader.classList.add('hidden');
    })
    .finally(() => {
      form.reset();
    });
}

setTimeout(() => {
  loader.classList.add('hidden');
}, 100);
