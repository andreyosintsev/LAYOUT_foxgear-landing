(function() {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Loaded');
        function setFullHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            document.querySelector('.menu-mobile').style.height = `${vh * 100}px`;
          }

        setFullHeight();

        if ('visualViewport' in window) {
            window.visualViewport.addEventListener('resize',  setFullHeight);
        } else {
            window.addEventListener('resize', setFullHeight);
        }
    });

    /* Загрузка видео в последнюю очередь*/
    window.addEventListener('load', () => {
        /* Принудительная загрузка всех видео на страницах в теге <video> класс .video__player */
        const videos = document.querySelectorAll('.video__player');
        videos.forEach(video => {
            const sources = video.querySelectorAll('source')
            /* Если видео не autoplay то загрузим его позже */

            if (!video.autoplay) {
                console.log('Not autoplay');
                sources.forEach(source => {
                    source.src = source.dataset.src;
                    video.load();
                })
            }

            /* Чтобы нельзя было запустить воспроизведение нескольких видео одновременно */
            video.addEventListener('play', function() {
                videos.forEach(video => {
                    if (video !== this) video.pause();
                });
            });
        });
    })
})();

