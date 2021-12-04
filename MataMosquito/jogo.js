
// Layout da página
var altura = 0;
var largura = 0;

// Vidas do jogo
var vidas = 1;

// Tempo inicial do jogo
var tempo = 15;

// Tempo para renderizar mosquito na tela
var criaMosquitoTempo = 2000;

// Recupera o parâmetro da URL
var nivel = window.location.search;

// Remove o sinal de interrogação 
nivel = nivel.replace('?', '');

// Define o tempo para o mosquito aparecer na tela de acordo com o nivel de dificuldade informado
if(nivel === 'normal') {
	//1500
	criaMosquitoTempo = 2000;
} else if(nivel === 'dificil') {
	//1000
	criaMosquitoTempo = 1000;
} else if (nivel === 'saiyajin') {
	//750
	criaMosquitoTempo = 750;
}

// Função para ajustar a tela de jogo
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight;
	largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();

// Função para controlar o tempo do jogo
var cronometro = setInterval(function() {
	tempo -= 1
	if(tempo < 0) {
		clearInterval(cronometro);
		clearInterval(criaMosca);
		window.location.href = 'vitoria.html';
	} else {
		document.getElementById('cronometro').innerHTML = tempo;
	}
}, 1000)


function posicaoRandomica() {
	//remove o mosquito anterior (caso exista)
	if(document.getElementById('mosquito')) {

		document.getElementById('mosquito').remove();

		if(vidas > 3) {
			// redireciona o usuário para a tela de game over
			window.location.href = 'fim_de_jogo.html';
		} else {
			// Altera a quantidade de vidas
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
			vidas++
		}
	}

	// Posição do mosquto na tela
	var posicaoX = Math.floor(Math.random() * largura) - 90;
	var posicaoY = Math.floor(Math.random() * altura) - 90;

	// Evita que o mosquito saia da
	posicaoX = posicaoX < 0 ? 0 : posicaoX;
	posicaoY = posicaoY < 0 ? 0 : posicaoY;

	//criar o elemento html para exibir o mosquito
	var mosquito = document.createElement('img');
	mosquito.src = 'imagens/mosquito.png';
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
	mosquito.style.left = posicaoX + 'px';
	mosquito.style.top = posicaoY + 'px';
	mosquito.style.position = 'absolute';
	mosquito.id = 'mosquito';
	mosquito.onclick = function() {
		// Remove o mosquito ao clicar no elemento (imagem)
		this.remove();
	}

	// Adiciona o elemento criado no HTML
	document.body.appendChild(mosquito);

}

// Função para definir tamanho do mosquito
function tamanhoAleatorio() {
	
	var classe = Math.floor(Math.random() * 3);
	
	switch(classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

// Função para alter o lado da imagem
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}

