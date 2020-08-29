const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (event) {
  event.preventDefault();
  const peso = Number(document.getElementById('peso').value);
  const idade = Number(document.getElementById('idade').value);
  const altura = Number(document.getElementById('altura').value);
  const genero = seleciona('genero');
  const dados = calcTMB(peso, idade, altura, genero);
  console.log(dados);
  /*
  dados.basal,dados.sedentario,dados.light,dados.moderado,dados.ativo,
  dados.superAtivo,dados.ganharPeso,dados.perderPeso*/
  const elementosHtml = `
	<h2>Seu Resultado foi:</h2>
	 <ul>
		 <li>Metabolismo Basal : ${dados.basal.toFixed(2)} cal</li>
		 <li>Sedentário controle remoto : ${dados.sedentario.toFixed(2)} cal</li>
		 <li>Exercício light : ${dados.light.toFixed(2)} cal</li>
		 <li>Exercício moderado: ${dados.moderado.toFixed(2)} cal</li>
		 <li>Exercício regular : ${dados.ativo.toFixed(2)} cal</li>
		 <li>Exercício 2horas por dia: ${dados.superAtivo.toFixed(2)} cal</li>
	 </ul>
	 <h4>Ganhar Peso</h4>
	 <p>Para ganhar peso você deve consumir todos os dias ${
     dados.ganharPeso
   } cal</p>
	 <h4>Perder Peso</h4>
	 <p>Para perder peso você deve ter um consumo de até ${dados.perderPeso} cal</p>
  `;
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = elementosHtml;
});
//pega o genero se masculino ou feminino
function seleciona(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

/* função para calcular a taxa metabólica basal e o nível de calorias necessárias 
de acordo com a prática esportiva*/
function calcTMB(peso, idade, altura, genero) {
  const res =
    genero === 'Masculino'
      ? 10 * peso + 6.25 * altura - 5 * idade + 5
      : 10 * peso + 6.25 * altura - 5 * idade - 161;
  const resData = {
    basal: res,
    sedentario: 1.2 * res,
    light: 1.375 * res,
    moderado: 1.55 * res,
    ativo: 1.725 * res,
    superAtivo: 1.9 * res,
    ganharPeso: res + 450,
    perderPeso: res - 450,
  };
  return resData;
}
