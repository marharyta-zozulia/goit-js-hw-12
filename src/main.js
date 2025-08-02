import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader,showLoadMoreButton,
    hideLoadMoreButton } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');


let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = form.elements['search-text'].value.trim();
  if (!query) {
    hideLoader(); 
    return;
  }

    page = 1;
    showLoader();
    clearGallery();
    hideLoadMoreButton();
   

   
    try {
        const { hits, totalHits: total } = await getImagesByQuery(query, page);
        await delay(800);
        
        if (hits.length === 0) {
            iziToast.warning({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });

            hideLoader();
            return;
        }
        
        totalHits = total;
        createGallery(hits);
        hideLoader();
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
        await delay(800);
        hideLoader();
        iziToast.error({
      message: 'We are sorry, but you have reached the end of search results.',
      position: 'topRight',
    });
    }
});


document.querySelector('.load-more').addEventListener('click', async () => {
    page += 1;

    hideLoadMoreButton();
    showLoader();
    showLoaderText();


    try {
        const { hits } = await getImagesByQuery(query, page);
        await delay(800);

        createGallery(hits);

        const totalPages = Math.ceil(totalHits / perPage);
        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });

        } else {
            showLoadMoreButton();

        }
        hideLoader();
        hideLoaderText();



        const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
    } catch (error) {
        await delay(800);
        hideLoader();
    hideLoaderText();
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
  }
});
function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
  