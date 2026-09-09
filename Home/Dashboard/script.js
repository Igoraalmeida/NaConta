const navLinks = document.querySelectorAll('.nav-links a[data-target]');
const tabContents = document.querySelectorAll('.tab-content');
const btnTransacao = document.querySelector('.btn-new-transaction')

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        navLinks.forEach(l => l.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
 
        link.classList.add('active');

        const targetId = link.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

btnTransacao.addEventListener('click', () => {
    Swal.fire({
        title: 'Aviso',
        text: 'Construção em andamento...',
        icon: 'info',
        confirmButtonColor: '#5ec57e',
        confirmButtonText: 'Entendido'
    });
});