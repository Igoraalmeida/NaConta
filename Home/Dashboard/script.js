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

  transactionsContainer.innerHTML = '';

  transaction.forEach(item => {
    
  const typeText = item.type === 'income' ? 'Receita' : 'Despesa';
  const typeBadgeClass = item.type === 'income' ? 'type-receipts' : 'type-expense';

  const formattedAmount = item.amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  });

  // Formatação da Data
  const [year, month, day] = item.Date.split('-');
  const formattedDate = item.Date ? `${day}/${month}/${year}` : '-';

  const row = `
      <div class="grid-row">
        <span class="date">${formattedDate}</span>
        <span class="description">${item.description}</span>
        <span><span class="badge" data-category="${item.category}">${item.category}</span></span>
        <span class="amount">${formattedAmount}</span>
        <span class="text-center"><span class="badge ${typeBadgeClass}">${typeText}</span></span>
       
      </div>
    `;
    // Adiciona a linha dentro do container
    transactionsContainer.innerHTML += row;
  });
}

// Total de Transações (Elementos do Display)
const totalExpensesVal = document.querySelector('#total-expenses-val');
const totalReceiptsVal = document.querySelector('#total-receipts-val');
// Total de Transações (Elementos do Rodapé)
const totalTransactionCount = document.querySelector('#total-transaction-count');
const totalGeneralAmount = document.querySelector('#total-general-amount');
// Saldo Atual
const cashBalanceVal = document.querySelector('#Cash-balance-val');

// função para atualizar o total de transações e o saldo
function updateTotals() {
  const total = transaction.reduce((acc, item) => {
    if (item.type === 'income') {
      totalReceiptsVal.textContent = item.amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      return acc + item.amount;
    } else {
      totalExpensesVal.textContent = item.amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      return acc - item.amount;
    }
  }, 0);

  if (totalGeneralAmount && cashBalanceVal) {
    totalGeneralAmount.textContent = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    cashBalanceVal.textContent = total.toLocaleString('pt-BR', {
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
    amount: Math.abs(Number(transactionAmount.value)),
    type: hiddenBtn.value || 'income' // Garantia de ter um tipo padrão se nada for clicado
  };

  transaction.push(newTransactions);

  renderTransactions();
  updateTotals();

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