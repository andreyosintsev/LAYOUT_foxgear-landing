(function() {

    /*
        НАСТРОЙКИ ОТПРАВКИ ФОРМЫ ОБРАТНОЙ СВЯЗИ
    */
        //Публичный ключ API keys Public Key - https://dashboard.emailjs.com/admin/account
        const mailPublicKey = '';

        //Почтовый сервис - https://dashboard.emailjs.com/admin
        const mailServiceID = '';

        //Шаблон письма - https://dashboard.emailjs.com/admin/templates
        const mailTemplateID = '';


    const placeholders = {};

    document.addEventListener('DOMContentLoaded', () => {
        const body = document.querySelector('body');
        const popup = document.querySelector('#popup-order');
        const popupSuccess = document.querySelector('#popup-success');
        const popupFailed = document.querySelector('#popup-failed');
        const popupForm = document.querySelector('.popup__form');
        const closeButtons = document.querySelectorAll('.popup__close');
        const overlay = document.querySelector('.overlay');
        const loader = document.querySelector('.popup__loader');

    /*
        РАБОТА C POPUP
    */
        const buyButtons = document.querySelectorAll('.button_buy');

        if (!popup) {
            return console.error('DOM: element ".popup" not found');
        }

        buyButtons.forEach(
            button => button.addEventListener('click', (e) => {
                showPopup(body, popup, overlay);
                setProduct(e.target, popup);
            })
        );

        closeButtons.forEach(button => button.addEventListener('click', hidePopups));

        if (overlay) {
            overlay.addEventListener('click', hidePopups);
        }

        window.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') {
                hidePopups();
            }
        });

        function hidePopupAndResetForm() {
            console.log('hidePopupAndResetForm');
            hidePopup(body, popup, overlay);
            setProduct(undefined, popup);
            resetForm(popupForm);
            clearFormErrors(popupForm);
            hideLoader(loader);
        }

        function hidePopups() {
            console.log('hidePopups');
            hidePopupAndResetForm();
            hidePopup(body, popupSuccess, overlay);
            hidePopup(body, popupFailed, overlay);
        }

    /*
        РАБОТА С ФОРМОЙ
    */
        if (!popupForm) {
            console.error('Ошибка: в HTML отсутствует popup__form');
            return;
        }

        popupForm.addEventListener('submit', (e) => {
            console.log('submit formPopup');
            e.preventDefault();

            if (!checkFormErrors(e)) return;

            showLoader(loader);

            /*
                Отправка при помощи emailjs
            */

            // emailjs.sendForm(mailServiceID, mailTemplateID, form)
            // .then(
            //     (response) => {
            //         console.log('Письмо успешно отправлено!', response.status, response.text);
            //         hidePopupAndResetForm();
            //         showPopup(body, popupSuccess, overlay);
            //     },
            //     (error) => {
            //         console.error('Не удалось отправить письмо', error);
            //         hidePopupAndResetForm();
            //         showPopup(body, popupFailed, overlay);
            //     }
            // )
            // .finally(
            //     () => {
            //         hideLoader(loader);
            //     }
            // );

            /*
                Отправка при помощи php sendmail
            */

            const popupFormData = new FormData(popupForm);

            fetch('api/sendmail.php', {
                method: 'POST',
                body: popupFormData
            })
            .then(checkFetchResponse)
            .then(data => {
                console.log('Письмо успешно отправлено', data);
                hidePopupAndResetForm();
                showPopup(body, popupSuccess, overlay);
            })
            .catch(error => {
                console.error('Не удалось отправить письмо', error);
                hidePopupAndResetForm();
                showPopup(body, popupFailed, overlay);
            })
            .finally(() => {
                // hideLoader(loader);
            })

            function checkFetchResponse (res) {
                return res.ok
                ? res.json()
                : Promise.reject(`Ошибка Fetch: ${res.status}`);
            };
        });

        popupForm.addEventListener('click', (e) => clearFormErrors(e.currentTarget));

        const inputs = popupForm.querySelectorAll('.form__input');
        inputs.forEach(input => placeholders[input.name] = input.placeholder);

    /*
        ПОДГОТОВКА ОТПРАВКИ ФОРМЫ ПРИ ПОМОЩИ EMAILJS.COM
    */
        // emailjs.init({
        //     publicKey: mailPublicKey,
        // });
    });

    function showPopup (body, popup, overlay) {
        console.log('showPopup');
        body.classList.add('noscroll');
        popup.classList.remove('hidden');
        if (overlay) overlay.classList.remove('hidden');
    }

    function hidePopup (body, popup, overlay) {
        console.log('hidePopup');
        body.classList.remove('noscroll');
        popup.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');
    }

    function setProduct (button, popup) {
        console.log('setProduct');
        if (!popup) {
            return console.error('DOM: no elemen #popup-order found');
        }

        const product = button ? button.dataset.product : '';
        const inputProduct = popup.querySelector('.popup__form input[name="product"]');

        if (!inputProduct) {
            return console.error('DOM: no data-product specified in .button_buy');
        }

        inputProduct.value = product;

        const popupProduct = popup.querySelector('.popup__product');
        if (!popupProduct) {
            return console.error('DOM: no .popup__product element found');
        }

        popupProduct.innerHTML = product ? 'Модель: ' + product : '';
    }

    function checkFormErrors(e) {
        console.log('checkFormErrors');

        let isFormValid = true;

        const form = e.currentTarget;

        const formName = form.querySelector('input[name="name"]');
        const formTel = form.querySelector('input[name="tel"]');
        const formEmail = form.querySelector('input[name="email"]');

        if (!formName || !formName.value) {
            console.warn('Error: no input "name" or no name specified in form');

            formName.classList.add('form__input_error');
            formName.placeholder = 'Укажите ваше имя';

            isFormValid = false;
        }

        if (!((formTel && formTel.value) || (formEmail && formEmail.value))) {
            console.warn('Error: no input "tel" or "e-mail" in form');
            console.warn('Error: or no tel or e-mail specified in form');

            formTel.classList.add('form__input_error');
            formEmail.classList.add('form__input_error');
            formTel.placeholder = 'Укажите телефон';
            formEmail.placeholder = 'или адрес e-mail';

            isFormValid = false;
        }

        return isFormValid;
    }

    function clearFormErrors(form) {
        console.log('clearFormErrors');
        if (!form) {
            return console.error('DOM: no .form element found');
        }

        const inputs = form.querySelectorAll('.form__input');
        inputs.forEach(input => {
            input.classList.remove('form__input_error');
            input.placeholder = placeholders[input.name] ? placeholders[input.name] : '';
        });
    }

    function resetForm(form) {
        console.log('resetForm');
        if (!form) {
            return console.error('DOM: no .form element found');
        }

        form.reset();

        const popupProduct = document.querySelector('.popup__product');
        if (!popupProduct) {
            return console.error('DOM: no .popup__product element found');
        }

        popupProduct.innerHTML = '';
    }

    function showLoader(loader){
        console.log('showLoader');
        if (!loader) return;

        loader.classList.remove('hidden');
    }

    function hideLoader(loader){
        console.log('hideLoader');
        if (!loader) return;

        loader.classList.add('hidden');
    }
})();
