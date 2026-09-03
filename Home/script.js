const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

// Toggle do menu mobile
menuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Fecha o menu ao clicar em um dos links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (event) => {
    const isMenuOpen = navList.classList.contains('active');
    const clickedInsideMenu = navList.contains(event.target);
    const clickedOnButton = menuBtn.contains(event.target);

    if (isMenuOpen && !clickedInsideMenu && !clickedOnButton) {
        navList.classList.remove('active');
    }
});

// Altera estilo da navbar no scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ==========================================
   3. SISTEMA DE TRANSAÇÕES & FINANÇAS
   ========================================== */
const historicoTransacoes = [];

function adicionarTransacao(descricao, valor, categoria) {
    const novaTransacao = {
        id: Date.now(),
        descricao,
        valor,
        categoria
    };
    historicoTransacoes.push(novaTransacao);
}

function listarExtrato() {
    const resumo = historicoTransacoes.map(transacao => {
        const status = transacao.valor > 0 ? '🟢' : '🔴';
        const operador = transacao.valor > 0 ? '+' : '';
        return `${status} ${transacao.categoria} ${transacao.descricao}: ${operador}R$ ${transacao.valor}`;
    });

    console.log("--- Extrato da Conta ---");
    console.log(resumo);
}

function calcularSaldoAtual() {
    const saldoTotal = historicoTransacoes.reduce((acumulador, transacao) => acumulador + transacao.valor, 0);

    console.log("-----------------");
    console.log(`Saldo Atual: R$ ${saldoTotal}`);
    console.log("-----------------");
}

function mostrarApenasDespesas() {
    const despesas = historicoTransacoes.filter(transacao => transacao.valor < 0);

    console.log("---- Valor de Despesas ----");
    console.log(despesas);
}

/* ==========================================
   4. INICIALIZAÇÃO / TESTES
   ========================================== */
adicionarTransacao("salário", 1200, "renda");
adicionarTransacao("GTA6", -499, "Steam");

console.log("Histórico de transações: ", historicoTransacoes);
listarExtrato();
calcularSaldoAtual();
mostrarApenasDespesas();