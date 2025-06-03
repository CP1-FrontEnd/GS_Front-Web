document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Função para mostrar erro
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = message;
        input.style.borderColor = '#dc2626';
    }

    // Função para limpar erro
    function clearError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.textContent = '';
        input.style.borderColor = 'var(--border-color)';
    }

    // Validação em tempo real
    nameInput.addEventListener('input', function() {
        if (this.value.trim().length < 2) {
            showError(this, 'Nome deve ter pelo menos 2 caracteres');
        } else {
            clearError(this);
        }
    });

    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            showError(this, 'Email inválido');
        } else {
            clearError(this);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim().length < 10) {
            showError(this, 'Mensagem deve ter pelo menos 10 caracteres');
        } else {
            clearError(this);
        }
    });

    // Validação no envio
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validar nome
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Nome é obrigatório e deve ter pelo menos 2 caracteres');
            isValid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Email é obrigatório e deve ser válido');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Mensagem é obrigatória e deve ter pelo menos 10 caracteres');
            isValid = false;
        }

        if (isValid) {
            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            form.reset();
        }
    });
});