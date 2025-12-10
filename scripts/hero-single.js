document.addEventListener("DOMContentLoaded", () => {
    const singleImg = document.querySelector(".hero-single__image");
    const modelElem = document.querySelector(".hero-single__model");
    const formLabels = document.querySelectorAll(".hero-form__label");
    const singlePhotosContainer = document.querySelector(
        ".hero-single__photos"
    );
    const allPhotos = document.querySelectorAll(".hero-single__photo");
    const buyButton = document.querySelector(".hero-form__button");

    if (!singleImg)
        return console.error("DOM: no .hero-single__image element found");
    if (!singlePhotosContainer)
        return console.error("DOM: no .hero-single__photos element found");
    if (!buyButton)
        return console.error("DOM: no .hero-form__button element found");

    function init() {
        const params = new URLSearchParams(window.location.search);
        const model = params.get("product");

        if (!model) return;

        if (!/^[a-zA-Z0-9_-]+$/.test(model)) {
            console.warn("Invalid get-parameter: product!");
            return;
        }

        const label = document.querySelector(
            `.hero-form__label[data-model="${model}"]`
        );

        if (!label) return console.warn("DOM: no .hero-form__label element found");

        whenReadyThen(() => {
            setTimeout(() => dispatchLabelClick(label), 10);
        });

        setModel(model);
    }

    function activatePhoto(photo) {
        if (!photo || !photo.src) return;
        allPhotos.forEach((p) =>
            p.classList.remove("hero-single__photo_active")
        );
        photo.classList.add("hero-single__photo_active");
        singleImg.src = photo.src;
    }

    function setModel(text = "") {
        console.log("SetModel");
        if (!modelElem) return console.warn("DOM: no model element found");
        modelElem.textContent = `Модель: ${text}`;
        console.log(buyButton.dataset.product);
        buyButton.dataset.product = text;
        console.log(buyButton.dataset.product);
    }

    function activateRadio(radio) {
        if (!radio) return console.warn("DOM: no button element found");

        document
            .querySelectorAll(".hero-form__radio")
            .forEach((rb) => (rb.checked = false));
        radio.checked = true;
    }

    function dispatchLabelClick(label) {
        label.dispatchEvent(
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );
    }

    function whenReadyThen(fn) {
        // если есть jQuery — используем его ready (без $ в коде)
        if (window.jQuery) {
            if (window.jQuery.isReady) {
                fn();
            } else {
                window.jQuery(fn); // только регистрация колбэка, не триггер jQuery-событий
            }
            return;
        }

        // без jQuery — ждем DOMContentLoaded
        if (
            document.readyState === "complete" ||
            document.readyState === "interactive"
        ) {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    singlePhotosContainer.addEventListener("click", (e) => {
        const clickedPhoto = e.target.closest(".hero-single__photo");
        if (!clickedPhoto)
            return console.error("DOM: no .hero-single__photo element found");

        activatePhoto(clickedPhoto);

        const model = clickedPhoto.dataset.model;
        if (!model) return console.error("DOM: no data-model attribute found");

        const label = document.querySelector(
            `.hero-form__label[data-model="${model}"]`
        );
        const inputId = label.getAttribute("for");
        const input = document.getElementById(inputId);

        activateRadio(input);
        setModel(clickedPhoto.dataset.model);
    });

    formLabels.forEach((label) => {
        label.addEventListener("click", () => {
            const index = label.dataset.index;
            console.log("Index: ", index);
            if (index == undefined)
                return console.error("DOM: no data-index attribute found");

            const targetPhoto = document.querySelector(
                `.hero-single__photo[data-index="${index}"]`
            );

            activatePhoto(targetPhoto);
            console.log("Ready to set model");
            setModel(label.dataset.model);
        });
    });

    init();
});
