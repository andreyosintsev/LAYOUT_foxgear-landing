document.addEventListener('DOMContentLoaded', () => {
    const menuMobile = document.querySelector('.menu-mobile');

    if (!menuMobile) {
        return console.warn('DOM: element ".menu-mobile" not found');
    }

    const menuMobileButton = document.querySelector('.menu-mobile-button');

    if (!menuMobileButton) {
        return console.warn('DOM: element ".menu-mobile-button" not found');
    }

    menuMobileButton.addEventListener('click', () => {
        if (menuMobile.classList.contains('hidden')) {
            menuMobileButton.classList.add('menu-mobile-button_close');
            menuMobile.classList.remove('hidden');
        } else {
            menuMobileButton.classList.remove('menu-mobile-button_close');
            menuMobile.classList.add('hidden');
        }
    })
})
