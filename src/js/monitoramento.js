let bairros = [
            { id: 1, nome: "Centro", nivel: 35, ultimaAtualizacao: "14:30" },
            { id: 2, nome: "Vila Esperança", nivel: 72, ultimaAtualizacao: "14:28" },
            { id: 3, nome: "Jardim das Flores", nivel: 15, ultimaAtualizacao: "14:32" },
            { id: 4, nome: "Bairro Alto", nivel: 88, ultimaAtualizacao: "14:25" }
        ];

        function obterTipoRisco(nivel) {
            if (nivel <= 50) {
                return {
                    classe: "safe",
                    status: "Risco Baixo",
                    icone: "✓"
                };
            } else if (nivel <= 80) {
                return {
                    classe: "warning",
                    status: "Risco Moderado",
                    icone: "⚠"
                };
            } else {
                return {
                    classe: "danger",
                    status: "Risco Alto",
                    icone: "!"
                };
            }
        }

        
        function criarCard(bairro) {
            const risco = obterTipoRisco(bairro.nivel);
            
            return `
                <div class="card ${risco.classe}">
                    <div class="card-header">
                        <h3 class="neighborhood-name">${bairro.nome}</h3>
                        <span class="time-badge">Atualizado às ${bairro.ultimaAtualizacao}</span>
                    </div>
                    
                    <div class="water-level">
                        <div class="level-info">
                            <span class="level-label">Nível da Água</span>
                            <span class="level-value">${bairro.nivel}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill ${risco.classe}" style="width: ${bairro.nivel}%"></div>
                        </div>
                    </div>
                    
                    <div class="status">
                        <div class="status-icon ${risco.classe}">${risco.icone}</div>
                        <span class="status-text ${risco.classe}">${risco.status}</span>
                    </div>
                </div>
            `;
        }

        
        function renderizarCards() {
            const container = document.getElementById('cardsContainer');
            container.innerHTML = bairros.map(criarCard).join('');
        }

        
        function obterHorarioAtual() {
            const agora = new Date();
            return agora.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }

        
        function atualizarDados() {
            const botao = document.getElementById('updateBtn');
            const spinner = document.getElementById('spinner');
            const texto = document.getElementById('btnText');
            
            
            botao.disabled = true;
            spinner.classList.add('spinning');
            texto.textContent = 'Atualizando...';
            
            setTimeout(() => {
                
                bairros = bairros.map(bairro => ({
                    ...bairro,
                    nivel: Math.floor(Math.random() * 100),
                    ultimaAtualizacao: obterHorarioAtual()
                }));
                
                renderizarCards();
                
                botao.disabled = false;
                spinner.classList.remove('spinning');
                texto.textContent = 'Atualizar Situação';
            }, 1500);
        }

        function atualizarHorarios() {
            bairros = bairros.map(bairro => ({
                ...bairro,
                ultimaAtualizacao: obterHorarioAtual()
            }));
            renderizarCards();
        }

        document.addEventListener('DOMContentLoaded', function() {
            
            renderizarCards();
            
            document.getElementById('updateBtn').addEventListener('click', atualizarDados);
            
            setInterval(atualizarHorarios, 30000);
        });