$(document).ready(function(){

    /* Карусель в секции Hero - самое начало страницы */
    const $owl = $('.hero-slider__cards').owlCarousel(
    {
        items: 3,
        margin: 50,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        dots: true,
        responsive: {
            0: { items: 1,
                margin: 0,
                stagePadding: 0,
                autoWidth: false,
                autoHeight: true,
            },
            1200: {
                items: 3,
                stagePadding: 80,
                autoWidth: true,
                autoHeight: false,
            }
        },
        center: true,
        pullDrag: true,
    });

    $(".hero-slider__button_next").click(function() {
        $owl.trigger("next.owl.carousel");
    });

    $(".hero-slider__button_prev").click(function() {
        $owl.trigger("prev.owl.carousel");
    });

    /* Карусель с товарами - появляется динамически при < 768px*/

    let carouselInitialized = false;
    const $cardsContainer = $('.products__cards');

    function initCarousel() {

        if ($(window).width() < 767 && !carouselInitialized) {
            $cardsContainer.addClass('owl-carousel owl-theme').owlCarousel({
                items: 1,
                loop: true,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 5000,
                center: true,
                pullDrag: true,
            });
            carouselInitialized = true;
        }
    }

    function destroyCarousel() {
        if ($(window).width() >=767 && carouselInitialized) {
            $cardsContainer.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-theme');
            carouselInitialized = false;
        }
    }

    initCarousel();
    destroyCarousel();
    

    $(window).resize(function() {
        initCarousel();
        destroyCarousel();
    });

    /* Карусель с отзывами */

    $('.reviews__reviews').owlCarousel(
    {
        items: 2,
        margin: 20,
        loop: true,
        autoplay: false,
        autoplayTimeout: 5000,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 2
            }
        }
    });
});