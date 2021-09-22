const display = document.querySelector("#display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    display.textContent += texto;
  }
}

numeros.forEach((numero) => numero.addEventListener("click", (event) => atualizarDisplay(event.target.textContent)));

const selecionaOperador = (event) => {
  novoNumero = true;
  operador = event.target.textContent;
  numeroAnterior = display.textContent.replace(",", ".");
};

operadores.forEach((operador) =>
  operador.addEventListener("click", selecionaOperador)
);

document.querySelector("#igual").addEventListener("click", () => calcular());

const calcular = () => {
    if(operador !== undefined){
        const numeroAtual = display.textContent.replace(",", ".");
        novoNumero = true;
        atualizarDisplay(eval(`${numeroAnterior} ${operador} ${numeroAtual}`).toString().replace(".", ","));
        operador = undefined;
    }
}

document.querySelector("#limparDisplay").addEventListener("click", () => display.textContent = "")


const limparCalculo = () => {
    limparDisplay();
    novoNumero = true;
    operador = undefined;
    numeroAnterior = undefined;
}

document.querySelector("#limparCalculo").addEventListener("click", limparCalculo);

document.querySelector("#backspace").addEventListener("click", () => display.textContent = display.textContent.slice(0, -1));

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", inverterSinal);

document.querySelector("#inverter").addEventListener("click", inverterSinal);

const existeValor = () => display.textContent.length > 0;
const existeDecimal = () => display.textContent.indexOf(",") !== -1;

const inserirDecimal = () => {
  if (existeDecimal()) return
    if (existeValor()) {
    atualizarDisplay(",");
    } else {
    atualizarDisplay("0,");
    }
}

document.querySelector("#decimal").addEventListener("click", inserirDecimal);