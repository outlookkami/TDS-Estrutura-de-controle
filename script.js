function VerificarIdade(){
    idade = document.getElementById('idade').value;
    resultado = document.getElementById('resultado').innerHTML('');

    if (idade>18){
        resultado.innerHTML('Você é maior de idade');
    }else{
        resultado.innerHTML('Você é menor de idade');
    }
}