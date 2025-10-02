// LÓGICA DE VERIFICAÇÃO DE IDADE

const idadeInput = document.getElementById('idadeInput');
const verifyButton = document.getElementById('verifyButton');
const result = document.getElementById('resultado'); 

function verificarIdade(){
    result.classList.remove('visivel');
    const idade = parseInt(idadeInput.value);
    let mensagem = '';

    if(isNaN(idade) || idade < 0){
        mensagem = 'Por favor, insira uma idade válida.';
    }else if(idade < 18){
        mensagem = 'Você é menor de idade.';
    }else if(idade < 60){
        mensagem = 'Você é adulto.';
    }else{
        mensagem = 'Você é idoso.';
    }

    setTimeout(() => {
        result.innerText = mensagem;
        result.classList.add('visivel');
    }, 100);   
}

verifyButton.addEventListener('click', verificarIdade);
idadeInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter') verificarIdade();
});

// animação do canvas de fundo

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d'); // contexto 2d do canvas, onde vamos desenhar

//ajusta o tamanho do canvas para preencher o tamanho da janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Objeto para armazenar a posição do mouse

let mouse = {
    x: null,
    y: null,
    radius: 150 // área de influência do mouse
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

//array para armazenar as partículas

let particulasArray = [];
const numeroDeParticulas = 120;

// classe para representar cada partícula

class Particula{
    constructor(x, y, direcaoX, direcaoY, tamanho, cor){
        this.x = x;
        this.y = y;
        this.direcaoX = direcaoX;
        this.direcaoY = direcaoY;
        this.tamanho = tamanho;
        this.cor = cor;
    }
    // método para desenhar a partícula no canvas (método = função dentro de uma classe)

    desenhar(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2, false);
        ctx.strokeStyle = '#9023cf';
        ctx.fill();
    }

    // método para atualizar a posição da partícula
    atualizar(){
        if(this.x > canvas.width || this.x < 0){
            this.direcaoX = -this.direcaoX;
        }

        if(this.y > canvas.height || this.y < 0){
            this.direcaoY = -this.direcaoY;
        }

        this.x += this.direcaoX;
        this.y += this.direcaoY;
        this.desenhar();
    }
}

// fora da classe, função para criar o array de partículas
function init(){
    particulasArray = [];
    for(let i = 0; i < numeroDeParticulas; i++){
        let tamanho = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - tamanho * 2) + tamanho;
        let y = Math.random() * (innerHeight - tamanho * 2) + tamanho;

        let direcaoX = (Math.random() * 0.4) - 0.2;
        let direcaoY = (Math.random() * 0.4) - 0.2;

        let cor = '#9023cf';

        particulasArray.push(new Particula(x, y, direcaoX, direcaoY, tamanho, cor));
    }
}

// função para conectar as partículas com linhas

function conectar(){
    for(let a = 0; a < particulasArray.length; a++){
        for(let b = a; b < particulasArray.length; b++){
            let distancia = ((particulasArray[a].x - particulasArray[b].x) * (particulasArray[a].x - particulasArray[b].x))  +  ((particulasArray[a].y - particulasArray[b].y) * (particulasArray[a].y - particulasArray[b].y))

            // se a distância for menor que um certo valor, desenha uma linha
            if(distancia < (canvas.width/4) * (canvas.height/7)){
                ctx.strokeStyle = `rgba (160, 32, 240 ${1 - (distancia/200000)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particulasArray[a].x, particulasArray[a].y);
                ctx.lineTo(particulasArray[b].x, particulasArray[b].y);
                ctx.stroke();
            }
        }
    }
}


// loop de animação

function animar(){
    requestAnimationFrame(animar);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // limpa o canvas a cada frame
    for(let i = 0; i < particulasArray.length; i++){
        particulasArray[i].atualizar();
    }
    conectar();
}

// recria as partículas quando a janela é redimensionada

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animar();