import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader,showLoadMoreButton,
    hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
const loaderWrapper = document.querySelector('.loader-wrapper');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = form.elements['search-text'].value.trim();
    if (!query) return;

    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader(loaderWrapper);


    try {
        const { hits, totalHits: total } = await getImagesByQuery(query, page);

        await new Promise(res => setTimeout(res, 1500));
        hideLoader();
        if (hits.length === 0) {
            iziToast.warning({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return;
        }
        totalHits = total;
        createGallery(hits);
        showLoadMoreButton();
        const totalPages = Math.ceil(totalHits / perPage);
        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
            message: "The end of search results.",
            position: 'topRight',
  });
}
    } catch (error) {  
        await new Promise(res => setTimeout(res, 1500));
        hideLoader(loaderWrapper);
        iziToast.error({
      message: 'We are sorry, but you have reached the end of search results.',
      position: 'topRight',
    });
    }
});


loadMoreBtn.addEventListener('click', async () => {
    page += 1;

    

    loadMoreBtn.classList.add('is-hidden');
    
 const loadingText = document.querySelector('.loader-text');
    loadingText.classList.remove('is-hidden');
    

    loadMoreBtn.parentElement.appendChild(loadingText);

    showLoader(loaderWrapper);
    try {
        const { hits } = await getImagesByQuery(query, page);
        await new Promise(res => setTimeout(res, 1500));

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


        loadingText.classList.add('is-hidden');  
    loadMoreBtn.classList.remove('is-hidden');  


        const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
    } catch (error) {
        await new Promise(res => setTimeout(res, 1500));

        hideLoader();
    iziToast.error({
      message: 'Error',
      position: 'topRight',
    });
  }
});