document.addEventListener('DOMContentLoaded', () => {
    const paymentContainer = document.querySelector('.payment-popup__container');

    if (!paymentContainer) {
        console.warn('DOM: payment-popup__container not found');
        return;
    }

    const paymentStage1 = paymentContainer.querySelector('.payment-popup_stage1');
    const paymentStage2 = paymentContainer.querySelector('.payment-popup_stage2');
    const buttonClose = paymentContainer.querySelector('.menu-mobile__close');
    const body = document.querySelector('body');

    if (!paymentStage1 || !paymentStage2) {
        console.warn('DOM: payment-popup stages not found');
        return;
    }

    const paymentStage1Button = paymentStage1.querySelector('.form__button');

    if (!paymentStage1Button) {
        console.warn('DOM: payment-popup stage 1 button not found');
        return;
    }

    paymentStage1Button.addEventListener('click', (e) => {
        e.preventDefault();

        paymentStage1.classList.add('hidden');
        paymentStage2.classList.remove('hidden');
    });

    paginationItems = paymentStage2.querySelectorAll('.pagination-slider__items');

    if (paginationItems[0]) {
        paginationItems[0].addEventListener('click', () => {
            paymentStage1.classList.remove('hidden');
            paymentStage2.classList.add('hidden');
        })
    }

    if (buttonClose) {
        buttonClose.addEventListener('click', closePopup);
    }

    paymentContainer.addEventListener('click', (e) => {
        if (e.target === paymentContainer) closePopup()
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    })

    function closePopup () {
        paymentContainer.classList.add('hidden');
        body.style.overflow = 'auto';
    };
})

