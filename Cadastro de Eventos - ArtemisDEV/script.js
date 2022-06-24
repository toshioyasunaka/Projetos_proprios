
let eventos = [];

//Class visto anteriormente em cursos online. Usei como referência um projeto antigo.
class Evento {
    constructor(dadosEvento) {
        this.evento = dadosEvento[0];
        this.data = dadosEvento[1];
        this.local = dadosEvento[2];
        this.lotacao = dadosEvento[3];
    }
}

function registrarEvento() {
    let dadosEvento = pegarDadosEvento();
    let evento = new Evento(dadosEvento);

    eventos.push(evento);

    //validarDadosEvento();
    renderizarEventos();
    limparCampos();
    console.log(eventos)
}

//Essa função de pegar a lotação vi no código de uma lição que o Gustavo Fukuda fez.
function pegarDadosEvento() {
    let evento = document.getElementById('nome').value;    
    let data = document.getElementById('data').value;    
    let local = document.getElementById('local').value;  
    let lotacaoInput = document.getElementsByClassName('lotacao');
    let lotacao = pegarLotacao(lotacaoInput);  

    return [evento, data, local, lotacao];
}

//Gostaria de ter feito a validação, mas não consegui a tempo :(
    /*function validarDadosEvento() {
    let evento = document.getElementById('nome').value;    
    let data = document.getElementById('local').value;    
    let local = document.getElementById('local').value;  
    let lotacaoInput = document.getElementsByClassName('lotacao');
    let lotacao = pegarLotacao(lotacaoInput); 

    if (evento || local || data || lotacao !== true) {
        alert('Insira todos os dados corretamente!')
    } 
}
*/

function pegarLotacao(lotacaoInput) {
    for (let index = 0; index < lotacaoInput.length; index++) {
        if (lotacaoInput[index].checked) {
            return lotacaoInput[index].value;
        }
    }   
}

function limparValorInput (){
    let lotacao = document.getElementsByName('lotacao');
    
        for (let index = 0; index < lotacao.length; index++) {
            lotacao[index].checked = false;
        }       
}

function deixarPrimeiraMaiuscula(dados) {
    let primeiraMaiuscula = dados.slice(0, 1).toUpperCase();
    let letrasRestantes = dados.slice(1);
    return primeiraMaiuscula + letrasRestantes;
}

//Esqueleto da função abaixo foi com base na tarefa de To Do List feito pelo Gustavo Fukuda.
function renderizarEventos() {
    let divEventos = document.getElementById('eventos');

    limparTelaAntiga();

    for (let evento of eventos) {

        let novaDiv = document.createElement('div');
        novaDiv.className = 'evento';

        for (dados in evento) {
            let divDados = document.createElement('div');
            divDados.innerHTML = deixarPrimeiraMaiuscula(dados) + ': ' + evento[dados];

            novaDiv.appendChild(divDados);
        }

        divEventos.appendChild(novaDiv);
    }
}

function limparCampos() {
    document.getElementById('nome').value = '';    
    document.getElementById('local').value = '';    
    document.getElementById('local').value = '';  
    limparValorInput();
    //document.getElementById('checkbox_termos').checked = false;
}

function limparTelaAntiga() {
        let divEventos = document.getElementById('eventos');
    
        divEventos.innerHTML = '';
}


