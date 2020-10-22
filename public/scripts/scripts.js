
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  const peso = Number(document.getElementById("peso").value);
  const idade = Number(document.getElementById("idade").value);
  const altura = Number(document.getElementById("altura").value);
  const genero = seleciona("genero");
  const dados = calcTMB(peso, idade, altura, genero);
  console.log(dados);
  /*
  dados.basal,dados.sedentario,dados.light,dados.moderado,dados.ativo,
  dados.superAtivo,dados.ganharPeso,dados.perderPeso*/
  const elementosHtml = `
  <h2 style ="text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb;" class="result">Seu Resultado foi:</h2>
  <div class='result-list'>
	 <ul>
		 <li>Metabolismo Basal : ${dados.basal.toFixed(2)} cal</li>
		 <li>Sedentário controle remoto : ${dados.sedentario.toFixed(2)} cal</li>
		 <li>Exercício light : ${dados.light.toFixed(2)} cal</li>
		 <li>Exercício moderado: ${dados.moderado.toFixed(2)} cal</li>
		 <li>Exercício regular : ${dados.ativo.toFixed(2)} cal</li>
		 <li>Exercício 2horas por dia: ${dados.superAtivo.toFixed(2)} cal</li>
   </ul>
   </div>
   <div>
   <h3 style ="text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb;">Ganhar Peso</h3>
  
	 <p>Para ganhar peso você deve consumir todos os dias ${
     dados.ganharPeso
   } cal</p>
   </div>

   <div>
   <h3 style ="text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb;">Perder Peso</h3>
   
   <p>Para perder peso você deve ter um consumo de até ${
     dados.perderPeso
   } cal</p>
   </div>
   
  `;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = elementosHtml;
  resultado.style.transition = "all .5s";
});

function calcular(event) {
  event.preventDefault();
  
  const peso = Number(document.getElementById('peso').value);
  const idade = Number(document.getElementById('idade').value);
  const altura = Number(document.getElementById('altura').value);
  const genero = seleciona('genero');
  const dados = calcTMB(peso, idade, altura, genero);
  
  document.getElementById('metabolismo_basal').innerHTML = Math.ceil(
    dados.basal
  );
  document.getElementById('sedentario').innerHTML = Math.ceil(dados.sedentario);
  document.getElementById('exercicio_leve').innerHTML = Math.ceil(
    dados.exercicio_leve
  );
  document.getElementById('exercicio_moderado').innerHTML = Math.ceil(
    dados.moderado
  );
  document.getElementById('ativo').innerHTML = Math.ceil(dados.ativo);
  document.getElementById('super_ativo').innerHTML = Math.ceil(
    dados.superAtivo
  );
  document.getElementById('ganhar_peso').innerHTML = Math.ceil(
    dados.ganharPeso
  );
  document.getElementById('perder_peso').innerHTML = Math.ceil(
    dados.perderPeso
  );

  document.getElementById('result-data').style.visibility = 'visible';
} 

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

    exercicio_leve: 1.375 * res,

    moderado: 1.55 * res,
    ativo: 1.725 * res,
    superAtivo: 1.9 * res,
    ganharPeso: res + 450,
    perderPeso: res - 450,
  };
  return resData;
}
