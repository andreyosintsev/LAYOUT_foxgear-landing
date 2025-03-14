document.addEventListener('DOMContentLoaded', () => {
    const menuMobile = document.querySelector('.menu-mobile');

    if (!menuMobile) {
        return console.warn('DOM: element ".menu-mobile" not found');
    }

    const menuMobileButton = document.querySelector('.menu-mobile-button');

    if (!menuMobileButton) {
        return console.warn('DOM: element ".menu-mobile-button" not found');
    }

    const body = document.querySelector('body');

    menuMobileButton.addEventListener('click', () => {
        if (menuMobile.classList.contains('hidden')) {
            showMenuMobile();
        } else {
            hideMenuMobile();
        }
    });

    menuLinks = menuMobile.querySelectorAll('.menu-mobile__link');

    menuLinks.forEach(link => link.addEventListener('click', hideMenuMobile));

    function showMenuMobile() {
        menuMobileButton.classList.add('menu-mobile-button_close');
        menuMobile.classList.remove('hidden');
        body.classList.add('noscroll');
    }

    function hideMenuMobile() {
        menuMobileButton.classList.remove('menu-mobile-button_close');
        menuMobile.classList.add('hidden');
        body.classList.remove('noscroll');
    }

});