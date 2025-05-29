// Dados dos bairros
let neighborhoods = [
    { id: "1", name: "Centro", waterLevel: 35, lastUpdate: "14:30" },
    { id: "2", name: "Vila Esperança", waterLevel: 72, lastUpdate: "14:28" },
    { id: "3", name: "Jardim das Flores", waterLevel: 15, lastUpdate: "14:32" },
    { id: "4", name: "Bairro Alto", waterLevel: 88, lastUpdate: "14:25" }
];

// Função para determinar o nível de risco
function getRiskLevel(level) {
    if (level <= 50) {
        return {
            status: "Risco Baixo",
            class: "safe",
            icon: "✓"
        };
    } else if (level <= 80) {
        return {
            status: "Risco Moderado",
            class: "warning",
            icon: "⚠"
        };
    } else {
        return {
            status: "Risco Alto",
            class: "danger",
            icon: "!"
        };
    }
}

// Função para criar um card de bairro
function createNeighborhoodCard(neighborhood) {
    const risk = getRiskLevel(neighborhood.waterLevel);
    
    return `
        <div class="neighborhood-card ${risk.class}">
            <div class="card-header">
                <h3 class="neighborhood-name">${neighborhood.name}</h3>
                <span class="update-badge">Atualizado às ${neighborhood.lastUpdate}</span>
            </div>
            
            <div class="water-level-section">
                <div class="level-header">
                    <span class="level-label">Nível da Água</span>
                    <span class="level-percentage">${neighborhood.waterLevel}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${risk.class}" style="width: ${neighborhood.waterLevel}%"></div>
                </div>
            </div>
            
            <div class="status-section">
                <div class="status-icon ${risk.class}">${risk.icon}</div>
                <span class="status-text ${risk.class}">${risk.status}</span>
            </div>
        </div>
    `;
}

// Função para renderizar todos os cards
function renderCards() {
    const cardsGrid = document.getElementById('cardsGrid');
    cardsGrid.innerHTML = neighborhoods.map(createNeighborhoodCard).join('');
}

// Função para obter horário atual formatado
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Função para atualizar os dados
function updateData() {
    const updateButton = document.getElementById('updateButton');
    const refreshIcon = document.getElementById('refreshIcon');
    const buttonText = document.getElementById('buttonText');
    
    // Desabilitar botão e mostrar loading
    updateButton.disabled = true;
    refreshIcon.classList.add('spinning');
    buttonText.textContent = 'Atualizando...';
    
    // Simular atualização de dados após 1.5 segundos
    setTimeout(() => {
        // Gerar novos valores aleatórios para cada bairro
        neighborhoods = neighborhoods.map(neighborhood => ({
            ...neighborhood,
            waterLevel: Math.floor(Math.random() * 100),
            lastUpdate: getCurrentTime()
        }));
        
        // Re-renderizar os cards
        renderCards();
        
        // Restaurar botão
        updateButton.disabled = false;
        refreshIcon.classList.remove('spinning');
        buttonText.textContent = 'Atualizar Situação';
    }, 1500);
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar os cards iniciais
    renderCards();
    
    // Adicionar evento de clique ao botão
    const updateButton = document.getElementById('updateButton');
    updateButton.addEventListener('click', updateData);
    
    // Atualização automática a cada 30 segundos (opcional)
    setInterval(() => {
        // Atualizar apenas os horários sem mudar os níveis
        neighborhoods = neighborhoods.map(neighborhood => ({
            ...neighborhood,
            lastUpdate: getCurrentTime()
        }));
        renderCards();
    }, 30000);
});