$(document).ready(function() {

    /* Карусель в секции Hero - самое начало страницы */
    const $owl = $('.hero-single__photos').owlCarousel(
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
        animateIn: "fadeInLeft",
        animateOut: "fadeOutLeft",
        smartSpeed: 300,
        navSpeed: 300,
        slideBy: 1
    });

    $('.hero-single__gallery-button_prev').click(function() {
        if ($owl) $owl.trigger('prev.owl.carousel');
    });

    $('.hero-single__gallery-button_next').click(function() {
        if ($owl) $owl.trigger('next.owl.carousel');
    });

    $('.hero-form__label').on('click', function() {
        console.log('Button clicked');

        const index = $(this).data('index');
        console.log('index:', index );

        if (index == undefined) return
        $owl.trigger('to.owl.carousel', [index, 300]);
    });
});
