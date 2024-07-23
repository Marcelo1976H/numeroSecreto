let numerosEscolhidos = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();//let numeroSecreto = 7;
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');    
} 

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!'); 
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas); 
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número é menor!'); 
        } else {
            exibirTextoNaTela('p', 'O número é maior!');
        }
        limpaCampo();
    }
    tentativas++ //tentativas = tentativas+1;  
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);//return parseInt(Math.random() * 100 + 1);
    let quantNumEscolhidos = numerosEscolhidos.length;

    if (quantNumEscolhidos == numeroLimite) {
        numerosEscolhidos = [];
    }
    if (numerosEscolhidos.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosEscolhidos.push(numeroEscolhido);
        console.log (numerosEscolhidos);
        return numeroEscolhido;
    }
}

function limpaCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}