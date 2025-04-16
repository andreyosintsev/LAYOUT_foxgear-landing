(function(){

    document.addEventListener('DOMContentLoaded', () => {

        const accordeon = document.querySelector('.accordeon');

        if (!accordeon) {
            return console.error('DOM: no .accordeon element found');
        };

        const accordeonItemTitles = accordeon.querySelectorAll('.accordeon__item-title');

        accordeonItemTitles.forEach(accordeonItemTitle =>
            accordeonItemTitle.addEventListener('click', function() {
                    const item = this.closest('.accordeon__item');
                    const content = item.querySelector('.accordeon__item-content');

                    if (item.classList.contains('accordeon__item_active')) {
                        content.style.maxHeight = '0';
                        item.classList.remove('accordeon__item_active');
                    } else {
                        item.classList.add('accordeon__item_active');
                        content.style.maxHeight = content.scrollHeight + 'px'; //
                    }
                }
            )
        );
    });
})();
