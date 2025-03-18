document.addEventListener('DOMContentLoaded', () => {
    const singleImg = document.querySelector('.hero-single__image');

    if (!singleImg) {
        return console.error('DOM: no .hero-single__image element found');
    }

    const singlePhotos = document.querySelector('.hero-single__photos');
    
    if (!singlePhotos) {
        return console.error('DOM: no .hero-single__photos element found');
    }
    
    singlePhotos.addEventListener('click', (e) => {
        const currentPhoto = e.target;
        if (!currentPhoto) {
            return console.error('DOM: no .hero-single__photo element found');
        }

        if (!currentPhoto.hasAttribute('src')) return;
        
        const singlePhotos = document.querySelectorAll('.hero-single__photo');
        singlePhotos.forEach(photo => photo.classList.remove('hero-single__photo_active'));

        singleImg.src = currentPhoto.src;
        currentPhoto.classList.add('hero-single__photo_active');  
    });
});