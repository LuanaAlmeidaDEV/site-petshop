// Variáveis de controle global
let totalGeral = 0;
let itensNoCarrinho = 0;

// Abrir e fecha o carrinho lateral
function toggleCarrinho() {
    const carrinho = document.getElementById('carrinho-lateral');
    carrinho.classList.toggle('carrinho-hidden');
}

// Seleciona todos os botões de compra e adiciona o evento de clique
const botoesAdicionar = document.querySelectorAll('.bt-c');

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        // Extrai os dados do botão clicado
        const nome = botao.getAttribute('data-nome');
        const preco = parseFloat(botao.getAttribute('data-preco'));

        adicionarAoCarrinho(nome, preco);
    });
});

// Atualiza a lista, o total e abre o painel
function adicionarAoCarrinho(nome, preco) {
    const lista = document.getElementById('lista-carrinho');
    const displayTotal = document.getElementById('valor-total');
    const displayContagem = document.getElementById('cart-count'); // O número no botão flutuante

    // Cria o item na lista do carrinho
    const novoItem = document.createElement('li');
    novoItem.style.display = 'flex';
    novoItem.style.justifyContent = 'space-between';
    novoItem.style.padding = '8px 0';
    novoItem.style.borderBottom = '1px solid #eee';
    
    novoItem.innerHTML = `
        <span>${nome}</span>
        <strong>R$ ${preco.toFixed(2).replace('.', ',')}</strong>
    `;
    
    lista.appendChild(novoItem);

    // Atualiza os cálculos
    totalGeral += preco;
    itensNoCarrinho++;

    // Atualizar 
    displayTotal.innerText = totalGeral.toFixed(2).replace('.', ',');
    if(displayContagem) displayContagem.innerText = itensNoCarrinho;

    // Mostrar no carrinho quando adiciona item
    const carrinho = document.getElementById('carrinho-lateral');
    carrinho.classList.remove('carrinho-hidden');
}


function enviarParaWhatsapp(event) {
    event.preventDefault(); // Impede de atualizar a página

    const telefone = "5547996866541";

    // Pega as informações do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const servico = document.getElementById('servicos').value;
    const mensagem = document.getElementById('mensagem').value;

    // Monta a mensagem organizada
    const texto = `Olá! Meu nome é *${nome}*
*Email:* ${email}
*Serviço:* ${servico}
*Mensagem:* ${mensagem}`;

    // Manda a mensagem organizada para o WhatsApp
    const msgFormatada = encodeURIComponent(texto);
    const url = `https://wa.me/${telefone}?text=${msgFormatada}`;

    window.open(url, '_blank');
}


document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    // Impede o envio automático do formulário
    event.preventDefault();

    // Limpa msg de erro anterior
    limparErros();

    // Pega os valores
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    let formularioValido = true;

    // Valida o nome
    if (nome === "") {
        mostrarErro('erro-nome', 'Por favor, digite seu nome.');
        formularioValido = false;
    }

    // Valida o Email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarErro('erro-email', 'Digite um e-mail válido.');
        formularioValido = false;
    }

    //  Se tudo estiver ok, envia.
    if (formularioValido) {
        alert("Formulário enviado com sucesso!");
    }
});

function mostrarErro(idElemento, mensagem) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = mensagem;
    elemento.style.color = "red";
    elemento.style.fontSize = "0.8rem";
}

function limparErros() {
    const mensagens = document.querySelectorAll('.erro-msg');
    mensagens.forEach(msg => msg.textContent = "");
}
