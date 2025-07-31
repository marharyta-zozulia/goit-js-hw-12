import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {});

export function createGallery(images) {
    const gallery = document.querySelector('.gallery');
  
    const markup = images.map(img => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
       <div class="info">
      <p>Likes: ${img.likes}</p>
      <p>Views: ${img.views}</p>
      <p>Comments: ${img.comments}</p>
      <p>Downloads: ${img.downloads}</p>
    </div>

      </li>
    `).join('');
  
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

}
  
export function clearGallery() {
    gallery.innerHTML = '';
}
  
const loadMoreBtn = document.querySelector('.load-more');
const loaderWrapper = document.querySelector('.loader-wrapper');

export function showLoader() {
  loaderWrapper.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderWrapper.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}