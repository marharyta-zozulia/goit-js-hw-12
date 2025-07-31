import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query.' });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);
    const { hits } = data;

    if (hits.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createGallery(hits);
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again later.' });
  } finally {
    hideLoader();
  }
});



loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();
    try {
        const { hits } = await getImagesByQuery(query, page);
        createGallery(hits);
        const totalPages = Math.ceil(totalHits / perPage);
        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        }
        hideLoader();

        const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
    } catch (error) {
        hideLoader();
    iziToast.error({
      message: 'Error',
      position: 'topRight',
    });
  }
});