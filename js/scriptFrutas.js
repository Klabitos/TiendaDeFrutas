/*TODO 

OBJETOS(DATOS KILOS PRECIO) INSTANCIA DE UNA CLASE

TRATAMIENTO DE ERRORES
ORGANIZAR CODIGO EN ARCHIVOS
----
FUNCIONALIDAD-->

PULSAR LA IMAGEN INTRODUCIRÁ LOS KILOS
--AL PULSAR EN FRUTA Y SOLO SI HAY MÁS DE 0 KILOS SE AÑADE LA FRUTA Y SUS KILOS , CON FONDO DE ALGÚN COLOR
--CADA FRUTA VA AÑADIENDO INFORMACIÓN
--SE SUBRAYA CADA VEZ QUE SE HA AÑADIDO ESA FRUTA Y SDE QUITA EL SOMBREADO DE L AULTIMA AÑADIDA
--TODO SE QUITA CUANDO SE ACABA EL PEDIDO


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



function re_start() {
  //limpiarAreaDerechaInmediatamente
  limpiarTextArea();
  limpiarCestaCompra();
}


//Funcionalidad básica de modificar y preparar la web
var addUnKiloAFrutaPorID = (ID_FrutaPosicionCestaCompra) => {
  cestaCompra[ID_FrutaPosicionCestaCompra][2]++;
};


//Onload

//Funciones para tratar el array de cestaCompra
function ordenarCestaCompra() {
  
  let cestaCompraOrdenadaAlfabeticamente = cestaCompra.sort(function(a,b){
    if(a.nombre < b.nombre) { return -1; }
    if(a.nombre > b.nombre) { return 1; }
    return 0;
  });
  return cestaCompraOrdenadaAlfabeticamente;
}


// // //Para saber si tiene que ecribir kilos en singular o plurar /////////////////////////// UTILITIES
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
