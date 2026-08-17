const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list')
const hideNavList = document.querySelector('.hide-nav-list');

// Quando clicar no botão, liga/desliga a classe "active"
menuBtn.addEventListener('click', () => {
  navList.classList.toggle('active');
});



const historicoTransacoes = []

function adicionarTransicao(descricao, valor, categoria) {
    const novaTransicao = {
        id: Date.now(),
        descricao: descricao,
        valor: valor,
        categoria: categoria
    }
    historicoTransacoes.push(novaTransicao);
}

adicionarTransicao("salário", 1200, "renda");
adicionarTransicao("GTA6", -499, "Steam");

console.log("Histórico de transações: ",historicoTransacoes);


function listarExtrato(){
    const resumo = historicoTransacoes.map(transacao =>{
        
        if (transacao.valor > 0) {
            return `🟢 ${transacao.categoria} ${transacao.descricao} +R$ ${transacao.valor}`
        } else {
            return `🔴 ${transacao.categoria} ${transacao.descricao}: R$ ${transacao.valor}`;
        }
    });

    console.log("---Extrato da Conta---")
    console.log(resumo)
}

listarExtrato();

function calcularSaldoAtual(){
     const saldoTotal = historicoTransacoes.reduce((acumulador, transacao) => {
        return acumulador + transacao.valor;
     }, 0);

     console.log("-----------------")
     console.log(`Saldo Atual: R$ ${saldoTotal}`);
     console.log("-----------------")
}

calcularSaldoAtual();


function mostrarApenasDespessas(){
    const despesas = historicoTransacoes.filter(transacao =>{
        return transacao.valor < 0;
    })

    console.log("----valor de despessas----");
    console.log(despesas);
}

mostrarApenasDespessas();