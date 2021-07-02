const limparFormulario = (endereco) =>{
  document.querySelector("#mensagemErro").value = '';
  document.querySelector("#rua").value = '';
  document.querySelector("#bairro").value = '';
  document.querySelector("#cidade").value = '';
  document.querySelector("#estado").value = '';
}

const mostrarNoFormulario = (endereco) => {
  document.querySelector("#rua").value = endereco.logradouro;
  document.querySelector("#bairro").value = endereco.bairro;
  document.querySelector("#cidade").value = endereco.localidade;
  document.querySelector("#estado").value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (numeroCep) => numeroCep.length == 8 && eNumero(numeroCep);

const buscarCep = async () => {
  limparFormulario();

  const numeroCep = document.querySelector("#cep").value
  const url = `http://viacep.com.br/ws/${numeroCep}/json`
  // http://ws.apicep.com/cep/${numeroCep}.json (??? não funciona)

  if (cepValido(numeroCep)) {
    //fetch retorna um valor e await serve para esperar a resposta:
    const informacoes = await fetch(url);
    // pega só o valor json:
    const endereco = await informacoes.json();

    if (endereco.hasOwnProperty('erro')) {
      console.log(endereco)
      document.querySelector("#mensagemErro").value = 'CEP não encontrado!'
    } else {
      mostrarNoFormulario(endereco)
    }

  } else{
   document.querySelector("#mensagemErro").value = 'CEP incorreto'
  }
}

document.querySelector('#cep')
  .addEventListener('focusout', buscarCep);
