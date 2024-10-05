// Função para abrir e fechar o menu ao clicar no ícone
function toggleMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const menu = document.getElementById('mobile-menu');
    overlay.classList.toggle('show');
    menu.classList.toggle('show');
}

// Função para fechar o menu
function closeMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
    const menu = document.getElementById('mobile-menu');
    overlay.classList.remove('show');
    menu.classList.remove('show');
}

// Verificar o tamanho da tela ao carregar e ao redimensionar
function checkWindowSize() {
    const menuBtn = document.getElementById('menu-btn');
    const desktopNav = document.getElementById('desktop-nav');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const header = document.querySelector('header');

    if (menuBtn && desktopNav && mobileMenuOverlay && header) {
        if (window.innerWidth <= 1050) {
            // Exibir o botão de menu e ocultar o navbar tradicional em telas pequenas
            menuBtn.style.display = "block";
            desktopNav.style.display = "none";
            header.style.display = "flex"; // Mostrar o header com o botão de menu
        } else {
            // Exibir o navbar tradicional e ocultar o botão de menu em telas grandes
            menuBtn.style.display = "none";
            desktopNav.style.display = "flex"; // ou block, dependendo do layout
            header.style.display = "none"; // Ocultar o header que contém o botão
            // Garantir que o menu lateral esteja fechado
            mobileMenuOverlay.classList.remove('show');
            const menu = document.getElementById('mobile-menu');
            menu.classList.remove('show');
        }
    }
}

// Esperar o DOM ser carregado antes de executar o script
document.addEventListener("DOMContentLoaded", function() {
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);

    // Adicionar listener para fechar o menu ao clicar no overlay
    const overlay = document.getElementById('mobile-menu-overlay');
    overlay.addEventListener('click', closeMenu);

    // Adicionar listener para fechar o menu ao clicar em qualquer link dentro do menu
    const menuLinks = document.querySelectorAll('#mobile-menu a');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
});
