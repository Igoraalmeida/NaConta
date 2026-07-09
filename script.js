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