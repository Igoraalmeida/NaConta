const navLinks = document.querySelectorAll('.nav-links a[data-target]');
const tabContents = document.querySelectorAll('.tab-content');
const btnTransacao = document.querySelector('.btn-new-transaction');

const buttons = document.querySelectorAll('.btn-switch-section');
const sections = document.querySelectorAll('.section');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const target = button.dataset.target; // Pega "secao-planilha" ou "secao-resumo"

    // 1. Apaga tudo
    sections.forEach(s => s.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));

    // 2. Mostra a seção clicada
    document.getElementById(target).classList.add('active');

    // 3. Acende TODOS os botões que vão para essa mesma seção
    document.querySelectorAll(`[data-target="${target}"]`).forEach(b => b.classList.add('active'));
  });
});

// troca as cores do transaction form
const typeButtons = document.querySelectorAll('.btn-type');
const hiddenBtn = document.querySelector('#transaction-type');

typeButtons.forEach(button => {
  button.addEventListener('click', () => {
    typeButtons.forEach(btn => btn.classList.remove('active'));

    button.classList.add('active');

    hiddenBtn.value = button.dataset.type;
  });
});

const btnTransactionForm = document.querySelector('.btn-new-transaction-form');

/**
 * Nova Transação
 */

/* Mapeamento dos Elementos do DOM */
const transactionForm = document.querySelector('.transaction-form');
const transactionsContainer = document.querySelector('.grid-body');

/* Inputs */
const transactionDate = document.querySelector('#transaction-date');
const transactionDescription = document.querySelector('#transaction-description');
const transactionCategory = document.querySelector('#transaction-category');
const transactionAmount = document.querySelector('#transaction-amount');

/* Botões do Seletor de Tipo */
const typeSelectorButton = document.querySelectorAll('.type-selector .btn-type');

let transaction = [];

function renderTransactions() {  
  // 1. Limpa o container para redesenhar a lista atualizada
  transactionsContainer.innerHTML = '';
  // 2. Passa por cada transação que está dentro do vetor
  transaction.forEach(item => {
    
    // 1. Se for 'income', o texto é "Receita", senão é "Despesa"
    const typeText = item.type === 'income' ? 'Receita' : 'Despesa';

    // 2. Se for 'income', a classe CSS é 'type-receipts' (verde), senão é 'type-expense' (vermelho)
    const typeBadgeClass = item.type === 'income' ? 'type-receipts' : 'type-expense';

    // 3. Monta o HTML da linha com os dados da transação
    const row = `
      <div class="grid-row">
        <span class="date">${item.Date}</span>
        <span class="description">${item.description}</span>
        <span><span class="badge" data-category="${item.category}">${item.category}</span></span>
        <span class="amount">R$ ${item.amount}</span>
        <span class="text-center"><span class="badge ${typeBadgeClass}">${typeText}</span></span>
      </div>
    `;
    // 4. Adiciona a linha dentro do container
    transactionsContainer.innerHTML += row;
  });
}

// Total de Transações (Elementos do Rodapé)
const totalTransactionCount = document.querySelector('#total-transaction-count');
const totalGeneralAmount = document.querySelector('#total-general-amount');

function updateFooterTotal() {
  const total = transaction.reduce((acc, item) => {
    if (item.type === 'income') {
      return acc + item.amount;
    } else {
      return acc - item.amount;
    }
  }, 0);

  if (totalGeneralAmount) {
    totalGeneralAmount.textContent = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  if (totalTransactionCount) {
    totalTransactionCount.textContent = `${transaction.length} lançamentos consolidados`;
  }
}

/* Evento de envio do formulário */
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newTransactions = {
    id: Date.now(),
    Date: transactionDate.value,
    description: transactionDescription.value,
    category: transactionCategory.value,
    amount: Number(transactionAmount.value),
    type: hiddenBtn.value || 'income' // Garantia de ter um tipo padrão se nada for clicado
  };

  transaction.push(newTransactions);

  renderTransactions();
  updateFooterTotal();

  console.log('Transações atualizadas:', transaction);

  Swal.fire({
    title: 'Sucesso!',
    text: 'Transação adicionada com sucesso.',
    icon: 'success',
    confirmButtonColor: '#5ec57e',
    confirmButtonText: 'OK'
  });
 
  transactionForm.reset();
});

// Execução inicial para atualizar a tela no carregamento da página
updateFooterTotal();