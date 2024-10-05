document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');
    let activeIndex = 1; // Comece com o segundo card como ativo (centralizado)

    function updateCards() {
        teamCards.forEach((card, index) => {
            card.classList.remove('center', 'left', 'right');
            if (index === activeIndex) {
                card.classList.add('center');
            } else if (index === (activeIndex - 1 + teamCards.length) % teamCards.length) {
                card.classList.add('left');
            } else if (index === (activeIndex + 1) % teamCards.length) {
                card.classList.add('right');
            }
        });
    }

    teamCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            activeIndex = index;
            updateCards();
        });
    });

    // Centraliza o card ativo inicialmente
    updateCards();

    // Adiciona um loop para o carrossel
    setInterval(() => {
        activeIndex = (activeIndex + 1) % teamCards.length;
        updateCards();
    }, 8000);
});
