const navLinks = document.querySelectorAll('.nav-links a[data-target]');
const tabContents = document.querySelectorAll('.tab-content');
const btnTransacao = document.querySelector('.btn-new-transaction')

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

// troca as cores do transacrion form
const typeButtons = document.querySelectorAll('.btn-type');
const hiddenBtn = document.querySelector('#transaction-type');

typeButtons.forEach(button => {
    button.addEventListener('click', () => {
       typeButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        hiddenBtn.value = button.dataset.type
    })
})

const btnTransactionForm = document.querySelector('.btn-new-transaction-form');

btnTransactionForm.addEventListener('click', (e)=>{
    e.preventDefault();
    Swal.fire({
        title: 'Aviso',
        text: 'Construção em andamento...',
        icon: 'info',
        confirmButtonColor: '#5ec57e',
        confirmButtonText: 'Entendido'
    })

})