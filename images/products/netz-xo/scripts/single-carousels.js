$(document).ready(function() {

    /* Карусель в секции Hero - самое начало страницы */
    $('.hero-single__photos').owlCarousel(
    {
        items: 4,
        margin: 0,
        loop: true,
        autoplay: false,
        autoplayTimeout: 5000,
        nav: false,
        dots: false,
        responsive: {
            0: { 
                items: 2,
            },
            480: { 
                items: 3,
            },
            1200: {
                items: 4,
            }
        },
        pullDrag: true,
    });
});