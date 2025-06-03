const quizData = [
    {
        question: "Qual é a principal causa de enchentes urbanas?",
        options: ["Chuvas intensas", "Impermeabilização do solo", "Falta de drenagem", "Todas as anteriores"],
        correct: 3
    },
    {
        question: "Quantos brasileiros são afetados por enchentes anualmente?",
        options: ["1 milhão", "5 milhões", "10 milhões", "15 milhões"],
        correct: 2
    },
    {
        question: "Qual tecnologia é mais eficaz para monitoramento de enchentes?",
        options: ["Câmeras", "Sensores IoT", "Satélites", "Radar"],
        correct: 1
    },
    {
        question: "Em quanto tempo um alerta de enchente deve ser emitido?",
        options: ["1 hora", "30 minutos", "15 minutos", "5 minutos"],
        correct: 2
    },
    {
        question: "Qual é o principal benefício de um sistema de alerta precoce?",
        options: ["Economia", "Salvar vidas", "Conveniência", "Tecnologia"],
        correct: 1
    },
    {
        question: "Que tipo de dados são coletados pelos sensores IoT?",
        options: ["Temperatura", "Nível da água", "Umidade", "Todos os anteriores"],
        correct: 3
    },
    {
        question: "Qual é a precisão ideal para previsões de enchente?",
        options: ["50%", "70%", "85%", "95%"],
        correct: 3
    },
    {
        question: "Como os cidadãos recebem alertas de enchente?",
        options: ["SMS", "App mobile", "Sirenes", "Todas as anteriores"],
        correct: 3
    },
    {
        question: "Qual é o tempo médio de resposta em emergências de enchente?",
        options: ["2 horas", "1 hora", "30 minutos", "15 minutos"],
        correct: 1
    },
    {
        question: "Quantos sensores são necessários para monitorar uma cidade média?",
        options: ["10-20", "50-100", "100-200", "500-1000"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    document.getElementById('question-text').textContent = `${currentQuestion + 1}. ${questionData.question}`;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index, button);
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('next-btn').disabled = true;
    selectedAnswer = null;
}

function selectOption(index, button) {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    button.classList.add('selected');
    selectedAnswer = index;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === quizData[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    let message = '';
    
    if (percentage >= 80) {
        message = 'Excelente! Você tem ótimo conhecimento sobre enchentes.';
    } else if (percentage >= 60) {
        message = 'Bom trabalho! Você entende bem o assunto.';
    } else if (percentage >= 40) {
        message = 'Razoável. Há espaço para melhorar seus conhecimentos.';
    } else {
        message = 'Precisa estudar mais sobre prevenção de enchentes.';
    }
    
    document.getElementById('score-text').textContent = 
        `Você acertou ${score} de ${quizData.length} perguntas (${percentage.toFixed(1)}%). ${message}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    
    loadQuestion();
}

document.addEventListener('DOMContentLoaded', function() {
    loadQuestion();
});