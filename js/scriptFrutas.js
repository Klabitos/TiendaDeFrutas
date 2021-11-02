//Variables globales. Almacenan nombre+precio+kilos
"use strict";

var cestaKiwi = [
  "kiwi",
  parseFloat(document.getElementById("precioKiwi").innerHTML),
  0,
];
var cestaPera = [
  "pera",
  parseFloat(document.getElementById("precioPera").innerHTML),
  0,
];
var cestaManzana = [
  "manzana",
  parseFloat(document.getElementById("precioManzana").innerHTML),
  0,
];
var cestaPlatano = [
  "platano",
  parseFloat(document.getElementById("precioPlatano").innerHTML),
  0,
];
var cestaMandarina = [
  "mandarina",
  parseFloat(document.getElementById("precioMandarina").innerHTML),
  0,
];
var cestaNaranja = [
  "naranja",
  parseFloat(document.getElementById("precioNaranja").innerHTML),
  0,
];
var cestaMelon = [
  "melon",
  parseFloat(document.getElementById("precioMelon").innerHTML),
  0,
];
var cestaSandia = [
  "sandia",
  parseFloat(document.getElementById("precioSandia").innerHTML),
  0,
];
var cestaPinna = [
  "piña",
  parseFloat(document.getElementById("precioPinna").innerHTML),
  0,
];
var cestaLimon = [
  "limon",
  parseFloat(document.getElementById("precioLimon").innerHTML),
  0,
];
//Almacena todos los productos
var cestaCompra = [
  cestaKiwi,
  cestaPera,
  cestaManzana,
  cestaPlatano,
  cestaMandarina,
  cestaNaranja,
  cestaMelon,
  cestaSandia,
  cestaPinna,
  cestaLimon,
];

//Funcionalidad básica de modificar y preparar la web
var addUnKiloAFrutaPorID = (ID_FrutaPosicionCestaCompra) => {
  cestaCompra[ID_FrutaPosicionCestaCompra][2]++;
  limpiarTextArea();
};
var limpiarTextArea = () =>
  (document.getElementById("textAreaFactura").value = "");
var limpiarCestaCompra = () => {
  cestaCompra = [
    cestaKiwi,
    cestaPera,
    cestaManzana,
    cestaPlatano,
    cestaMandarina,
    cestaNaranja,
    cestaMelon,
    cestaSandia,
    cestaPinna,
    cestaLimon,
  ];
  cestaCompra.map((cesta) => (cesta[2] = 0));
};
//Onload
function re_start() {
  limpiarTextArea();
  limpiarCestaCompra();
}
//Funciones para tratar el array de cestaCompra
function ordenarCestaCompra() {
  let cestaCompraOrdenadaAlfabeticamente = cestaCompra.sort(function (a, b) {
    return a[0] < b[0];
  });
  return cestaCompraOrdenadaAlfabeticamente;
}
// // //Para saber si tiene que ecribir kilos en singular o plurar
var kilo_or_kilos = (num) => (num <= 1 ? "kilo" : "kilos");

function mostrarCompra() {
  let texAreaElement = document.getElementById("textAreaFactura");
  let precioTotal = 0;
  let kilos = 0;
  let precioMedioKilo = 0;
  let cestaCompraDatosTratados = [];
  limpiarTextArea();
  //TODO ORDENAR BIEN
  cestaCompraDatosTratados = cestaCompraDatosTratados.filter((fruta) => fruta[2] != 0); //Eliminar elementos con 0 kilos
  cestaCompraDatosTratados = ordenarCestaCompra();

  texAreaElement.value += "\n";
  texAreaElement.value += "-------------------\n";

  for (let i = 0; i < cestaCompraDatosTratados.length; i++) {
    texAreaElement.value +=
      cestaCompraDatosTratados[i][0] +
      "  --- " +
      cestaCompraDatosTratados[i][2] +
      " " +
      kilo_or_kilos(cestaCompraDatosTratados[i][2]) +
      "\n";
    precioTotal +=
      cestaCompraDatosTratados[i][2] * cestaCompraDatosTratados[i][1];
    kilos += cestaCompraDatosTratados[i][2];
  }
  precioMedioKilo = precioTotal / kilos;
  texAreaElement.value += "-------------------\n";
  texAreaElement.value +=
    "Precio total: " + precioTotal.toFixed(2) + " €" + "\n";
  texAreaElement.value +=
    "Precio medio: " + precioMedioKilo.toFixed(2) + " €" + "\n";
  limpiarCestaCompra();
}

//ESTILIZAR EL CLICK
function cambioGradualColorFondoFrame(id) {
  let element = document.getElementById(id);
  element.classList.remove("frame");
  element.classList.add("frame_clicked");
  setTimeout(() => {
    finalizarCambioColorClick(id);
  }, 200);
}

function finalizarCambioColorClick(id) {
  let element = document.getElementById(id);
  element.classList.remove("frame_clicked");
  element.classList.add("frame");
}
