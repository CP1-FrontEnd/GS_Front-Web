document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'blue';
    body.setAttribute('data-theme', savedTheme);

    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            // Feedback visual
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});