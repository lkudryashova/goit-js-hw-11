import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createImages(data) {
  const lightbox = new SimpleLightbox('.gallery-list a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  const list = document.querySelector('.gallery-list');
  let images = data.hits
    .map(
      hit =>
        `<div class="gallery-item"><a href="${hit.largeImageURL}"><img class="image" src="${hit.webformatURL}" alt="${hit.tags}" /></a><div class ="text-wraper"><div class="text-block"><h2>Likes</h2><p>${hit.likes}</p></div><div class="text-block"><h2>Views</h2><p>${hit.views}</p></div><div class="text-block"><h2>Comments</h2><p>${hit.comments}</p></div><div class="text-block"><h2>Downloads</h2><p>${hit.downloads}</p></div></div></div>`
    )
    .join('');
  list.insertAdjacentHTML('afterbegin', images);
  lightbox.refresh();
}

export function clearImages() {
  const list = document.querySelector('.gallery-list');
  list.innerHTML = '';
}
