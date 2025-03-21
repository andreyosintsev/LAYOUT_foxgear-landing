(function() {

/*
    НАСТРОЙКИ ОТПРАВКИ ФОРМЫ ОБРАТНОЙ СВЯЗИ
*/
    //Публичный ключ API keys Public Key - https://dashboard.emailjs.com/admin/account
    //const mailPublicKey = '';

    //Почтовый сервис - https://dashboard.emailjs.com/admin
    //const mailServiceID = '';

    //Шаблон письма - https://dashboard.emailjs.com/admin/templates
    //const mailTemplateID = '';

    const apiSendFeedback = 'api/sendfeedback.php';

    const feedbackPlaceholders = {};
    const debug = true;

    document.addEventListener('DOMContentLoaded', () => {

        const {formFeedback, loaderFeedback, resultFeedback} = feedbackInit(
            '.feedback__form',
            '.feedback__loader',
            '.feedback__result'
        );

    /*
        РАБОТА С ФОРМОЙ
    */
        if (!formFeedback) {
            console.error('Ошибка: в HTML отсутствует feedback__form');
            return;
        }

        formFeedback.addEventListener('submit', (e) => {
            log('submit formFeedback');
            e.preventDefault();

            if (!feedbackFormCheck(e.currentTarget)) return console.warn('Form contains errors');

            feedbackSendPHP(apiSendFeedback, 'POST', formFeedback, loaderFeedback, resultFeedback);
        });

        formFeedback.addEventListener('click', (e) => feetbackFormClearErrors(formFeedback, resultFeedback));

        const inputElements = formFeedback.querySelectorAll('.feedback__input');
        inputElements.forEach(input => feedbackPlaceholders[input.name] = input.placeholder);

        const elementTextarea = formFeedback.querySelector('.feedback__textarea');
        if (elementTextarea) {
            feedbackPlaceholders[elementTextarea.name] = elementTextarea.placeholder;
        }

        function feedbackInit(selectorForm, selectorLoader, selectorResult) {
            log('Feedback init');

            return {
                formFeedback:   document.querySelector(selectorForm),
                loaderFeedback: document.querySelector(selectorLoader),
                resultFeedback: document.querySelector(selectorResult)
            }
        }

        function feedbackSendPHP(endpoint, method, elementForm, elementLoader, elementFeedbackResult) {
            log('Feedback send PHP');

            if (!elementForm) return console.error('DOM: no form element found');

            const formData = new FormData(elementForm);

            if (elementLoader) feedbackShowLoader(elementLoader);

            fetch(endpoint, { method: method, body: formData })
                .then(checkFetchResponse)
                .then(data => {
                    console.log('Письмо успешно отправлено', data);
                    feedbackShowResult(elementFeedbackResult, 'Ваше сообщение успешно отправлено', true);
                    feedbackFormReset(elementForm);
                })
                .catch(error => {
                    console.error('Не удалось отправить письмо', error);
                    feedbackShowResult(elementFeedbackResult, 'Ошибка отправки сообщения', false);
                })
                .finally(() => {
                    if (elementLoader) feedbackHideLoader(loaderFeedback);
                })

            function checkFetchResponse (res) {
                return res.ok
                ? res.json()
                : Promise.reject(`Ошибка Fetch: ${res.status}`);
            };
        }

        function feedbackSendEmailJS(elementForm, elementLoader, elementFeedbackResult) {
            log('Feedback send Email JS');

            if (!elementForm) return console.error('DOM: no form element found');

            if (elementLoader) feedbackShowLoader(elementLoader);

            emailjs.sendForm(mailServiceID, mailTemplateID, elementForm)
                .then(response => {
                    console.log('Письмо успешно отправлено!', response.status, response.text);
                    feedbackShowResult(elementFeedbackResult, 'Ваше сообщение успешно отправлено', true);
                    feedbackFormReset(elementForm);
                },
                error => {
                    console.error('Не удалось отправить письмо', error);
                    feedbackShowResult(elementFeedbackResult, 'Ошибка отправки сообщения', false);
                }
            )
            .finally(
                () => {
                        if (elementLoader) feedbackShowLoader(elementLoader);
                }
            );
    }

        function feedbackFormCheck(form) {
            log('Feedback form check');

            const inputName = form.querySelector('input[name="name"]');
            const inputEmail = form.querySelector('input[name="email"]');
            const textareaMessage = form.querySelector('textarea[name="message"]');

            const isNameValid = feedbackValueCheck(
                inputName,
                'Укажите ваше имя',
                'Error: no input "name" or no name specified in formFeedback'
            );

            const isEmailValid = feedbackValueCheck(
                inputEmail,
                'Укажите ваш e-mail',
                'Error: no input "email" or no email specified in formFeedback'
            );

            const isMessageValid = feedbackValueCheck(
                textareaMessage,
                'Введите ваш вопрос',
                'Error: no input "message" or no message specified in formFeedback'
            )

            return isNameValid && isEmailValid && isMessageValid;
        }

        function feetbackFormClearErrors(elementForm, elementFeedbackResult) {
            log('Clear Feedback form');

            log('form: ', elementForm);
            log(feedbackPlaceholders);

            if (!elementForm) {
                return console.error('DOM: no form element found');
            }

            const elementInputs = elementForm.querySelectorAll('.feedback__input');
            elementInputs.forEach(input => {
                input.classList.remove('form__input_error');
                input.placeholder = feedbackPlaceholders[input.name] ? feedbackPlaceholders[input.name] : '';
            });

            const elementTextarea = elementForm.querySelector('.feedback__textarea');
            if (elementTextarea) {
                elementTextarea.placeholder = feedbackPlaceholders[elementTextarea.name]
                    ? feedbackPlaceholders[elementTextarea.name]
                    : '' ;
                elementTextarea.classList.remove('form__input_error');
            }

            feedbackHideResult(elementFeedbackResult);
        }

        function feedbackFormReset(elementForm) {
            log('Feedback form reset');

            if (!elementForm) {
                return console.error('DOM: no form element found');
            }

            elementForm.reset();
        }

        function feedbackShowResult(elementFeedbackResult, textResult, isSuccess) {
            log('Feedback show result');

            if (!elementFeedbackResult) {
                return console.error('DOM: no feedback result element found');
            }

            if (isSuccess) {
                elementFeedbackResult.innerHTML = textResult
                    ? textResult
                    : 'Спасибо за обращение, мы свяжемся с Вами в ближайшее время';
            } else {
                elementFeedbackResult.classList.add('feedback__result_error');
                elementFeedbackResult.innerHTML = textResult
                    ? textResult
                    : 'Ошибка отправки сообщения';
            }

            elementFeedbackResult.classList.remove('hidden');
        }

        function feedbackHideResult(elementFeedbackResult) {
            log('Feedback hide result');

            if (!elementFeedbackResult) {
                return console.error('DOM: no feedback result element found');
            }

            elementFeedbackResult.classList.remove('feedback__result_error');
            elementFeedbackResult.classList.add('hidden');
        }

        function feedbackValueCheck(elementInput, errorMessageDisplay, errorMessageConsole) {
            log('Feedback value check');

            if (elementInput && elementInput.value) {
                return true;
            }

            console.warn(errorMessageConsole);

            elementInput.classList.add('form__input_error');
            elementInput.placeholder = errorMessageDisplay;

            return false;
        }

        function feedbackShowLoader(elementLoader){
            log('showLoader');
            if (!elementLoader) return console.warn('DOM: no loader element found');

            elementLoader.classList.remove('hidden');
        }

        function feedbackHideLoader(elementLoader){
            log('hideLoader');
            if (!elementLoader) return console.warn('DOM: no loader element found');

            elementLoader.classList.add('hidden');
        }

        function log(text) {
            if (debug) {
                console.log(text);
            }
        }

    /*
        ПОДГОТОВКА ОТПРАВКИ ФОРМЫ ПРИ ПОМОЩИ EMAILJS.COM
    */
        // emailjs.init({
        //     publicKey: mailPublicKey,
        // });
    });

})();
