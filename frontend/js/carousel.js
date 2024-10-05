document.addEventListener('DOMContentLoaded', function () {
    // Função para rolar para a esquerda
    function scrollPrev(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (carousel) {
            carousel.scrollLeft -= 200;
        }
    }

    // Função para rolar para a direita
    function scrollNext(carouselId) {
        const carousel = document.getElementById(carouselId);
        if (carousel) {
            carousel.scrollLeft += 200;
        }
    }

    // Inicializar funcionalidade de arrastar e soltar
    function initializeDragging(carouselId) {
        const carousel = document.getElementById(carouselId);
        let isDragging = false;
        let startX;
        let scrollLeft;

        if (carousel) {
            carousel.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });

            carousel.addEventListener('mouseleave', () => {
                isDragging = false;
            });

            carousel.addEventListener('mouseup', () => {
                isDragging = false;
            });

            carousel.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 3; // Velocidade de rolagem
                carousel.scrollLeft = scrollLeft - walk;
            });
        }
    }

    // Inicializar rolagem e arrastar para os dois carrosséis
    initializeDragging('carousel-content');
    initializeDragging('carousel-socials');

    // Funções globais para serem chamadas nos botões
    window.scrollPrev = scrollPrev;
    window.scrollNext = scrollNext;
});
