const URL = 'https://pixabay.com/api/';
const API_KEY = '45767028-18ffee8ca72084a8354af7c89';

export default function searchImagesByQuery(query) {
  return fetch(
    `${URL}?key=${API_KEY}&q=${encodeURIComponent(
      query
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: `Failed to fetch images: ${error.message}`,
      });
    });
}
