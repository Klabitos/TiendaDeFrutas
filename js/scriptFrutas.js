/*TODO 
CREAR RAMA DE DESARROLLO
OBJETOS(DATOS KILOS PRECIO) INSTANCIA DE UNA CLASE
- CLASE FRUTA: NOMBRE+PRECIO+KILOS
-FRUTAS VERANO: PROXIMIDAD+REGION
-FRUTAS INVIERNO: CONSERVAR FUERA DE LA NEVERA
TRATAMIENTO DE ERRORES
ORGANIZAR CODIGO EN ARCHIVOS
----
FUNCIONALIDAD-->
CAJA DE TEXTO PARA METER KILOS DE FRUTA QUE QUEREMOS
PULSAR LA IMAGEN INTRODUCIRÁ LOS KILOS
--AL PULSAR EN FRUTA Y SOLO SI HAY MÁS DE 0 KILOS SE AÑADE LA FRUTA Y SUS KILOS , CON FONDO DE ALGÚN COLOR
--CADA FRUTA VA AÑADIENDO INFORMACIÓN
--SE SUBRAYA CADA VEZ QUE SE HA AÑADIDO ESA FRUTA Y SDE QUITA EL SOMBREADO DE L AULTIMA AÑADIDA
--TODO SE QUITA CUANDO SE ACABA EL PEDIDO

--CAJA DE TEXTO VACIO AL FINAL + BOTON PARA FINALIZAR
--BOTON METE EN LA CAJA DE TEXTO LA COMPRA
----1 LINEA CON FECHA Y HORA DE LA FINALIZACIÓN DEL PEDIDO
----CADA TIPO DE FRUTA APARECERÁ SOLO 1 VEZ CON TODOS LOS KILOS
----ORDEN ALFABETICO INVERSO
--- PRECIO FINAL, DOS DECIMINALES REDONDEADO HACIA ABAJO

Fecha de compra: DD/MM/AAAA HH:MM 
Peras ---- 1 kilo --- 1,45€ -- 1,45€ 
Naranjas ---- 2 kilos --- 1,35€ -- 2,70€ 
Manzanas ---- 5 kilos --- 1,19€ -- 5,95€ 
... ---- ... 
Precio total : xx € 
Precio medio: xx €/kg


-----MOSTRAR VENTANA EMERGENTE CON TODA LA INFO DE VERANO O INVIERNO

-----TRAS LA FINALIZACIÓN DE UN PEDIDO Y A LOS 10 SEGUNDOS SE LIMPIA LA BARRA LATERAL, EL AREA DONDE SE MUESTRA LA COMPRA Y CUALQUIER VARIABLE INTERNA

*/



//Variables globales. Almacenan nombre+precio+kilos
"use strict";

var cestaKiwi = [
  "kiwi",
  parseFloat(document.getElementById("precioKiwi").placeholder),
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
