// Add imports above this line
import SimpleLightbox from "simplelightbox";
console.log(SimpleLightbox);

import { galleryItems } from './gallery-items';
// Change code below this line


const refs = {
    gallery: document.querySelector('.gallery'),
};

const galleryTemplate = ( {preview, original, description} ) => 
    `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
        </a>
    </div>`;
    
let instance = {};
    
const render = () => {
    const galleryList = galleryItems.map((galleryItem) => galleryTemplate(galleryItem)).join('');

    refs.gallery.insertAdjacentHTML('beforeend', galleryList);
};

render();


refs.gallery.addEventListener('click', onGalaryItemClick);

function onGalaryItemClick (evt) {
    evt.preventDefault();
    
    const isGalleryImage = evt.target.classList.contains('gallery__image');
    const currentGalleryItemIsActive = document.querySelector('.gallery__item.modal');
    const galleryImageEl = evt.target; 
    const parentGalleryImage = galleryImageEl.closest('.gallery__item');

    if (!isGalleryImage) {
        return;
    }

    if (currentGalleryItemIsActive) {
        currentGalleryItemIsActive.classList.remove('basicLightbox--img')
    }

    parentGalleryImage.classList.add('basicLightbox--img');
    
    instance = basicLightbox.create(
        `
        <img src="${evt.target.dataset.source}" width="800" height="600">
        `
    );

    instance.show();

};

refs.gallery.addEventListener('keydown', onCloseModalKeydown)

function onCloseModalKeydown(evt) {
    evt.preventDefault();
    if (evt.code === "Escape") {
        instance.close()

    }
    console.log(evt);
};


console.log(galleryItems);
