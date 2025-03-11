document.addEventListener('DOMContentLoaded', () => {
    const paymentContainer = document.querySelector('.payment-popup__container');

    if (!paymentContainer) {
        console.warn('DOM: payment-popup__container not found');
        return;
    }

    const buttonClose = paymentContainer.querySelector('.menu-mobile__close');
    const body = document.querySelector('body');

    if (buttonClose) {
        buttonClose.addEventListener('click', closePopup);
    }

    paymentContainer.addEventListener('click', (e) => {
        if (e.target === paymentContainer) closePopup();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });

    function closePopup () {
        paymentContainer.classList.add('hidden');
        body.style.overflow = 'auto';
    }

    const buyButtons = document.querySelectorAll('.button_buy');

    buyButtons.forEach(buyButton => {
        buyButton.addEventListener('click', () => {
            console.log('Buy button clicked');
            paymentContainer.classList.remove('hidden');
            body.style.overflow = 'hidden';
        });
    });
});

