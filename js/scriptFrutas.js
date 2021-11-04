"use strict";
/*TODO 
TRATAMIENTO DE ERRORES

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
function ordenarCestaCompra(cesta) {
  
  let cestaCompraOrdenadaAlfabeticamente = cesta.sort(function(a,b){
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
  cestaCompraDatosTratados = ordenarCestaCompra(cestaCompra);
  cestaCompraDatosTratados = cestaCompraDatosTratados.filter((fruta) => fruta[2] != 0); //Eliminar elementos con 0 kilos
  

  texAreaElement.value += "\n";
  texAreaElement.value += "-------------------\n";

  for (let i = 0; i < cestaCompraDatosTratados.length; i++) {
    texAreaElement.value +=
      cestaCompraDatosTratados[i].nombre +
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

//FUNCIONALIDAD DE AÑADIR KILOS Y MOSTRAR EN PANTALLA
function addKilos(i){
  addKilosObjeto(i);
  addEnPantallita(i);
  restablecerKilosACero(i);
  retirarIluminacionClases();
  iluminarMismaClase(i);
}

function addKilosObjeto(i){
  cestaCompra[i].kilosTotales+=inputs[i].value;
  cestaCompra[i].kilosVez=inputs[i].value;
}
function addEnPantallita(i){
  let elementoAdd = document.createElement("p");
  let zonaLateral = document.getElementsByClassName("zonaLateral")[0]
  elementoAdd.innerText=`${cestaCompra[i].kilosVez} kg de ${cestaCompra[i].nombre} `;
  elementoAdd.classList.add(`idFruta${i}`);
  zonaLateral.appendChild(elementoAdd);
}
function restablecerKilosACero(i){
  inputs[i].value="";
  //Cambios visuales
  textoCambiante[i].textContent="Introduce Kg";
  arraySpan[i].classList.remove('show');
  arrayAuxiliar[i]=false;
}
function retirarIluminacionClases(){
  let elementosIluminados = document.getElementsByClassName("idFrutaRepetido");
  for(let z=0; z<elementosIluminados.length; z++){
    elementosIluminados[z].classList.remove("idFrutaRepetido");
    z--; //HOT FIX para solucionar que cada vez que elimino la clase la variable disminuye su LENGTH
    //Esto hace que el bucle no funcione bien puesto que cuando va a leer el elemento 2 este es el 1, y asi en cada iteración.
    //El length baja en cada iteración
  }
}
function iluminarMismaClase(i){
  let elementosMismaClase = document.getElementsByClassName(`idFruta${i}`);
  for(let j=0; j<elementosMismaClase.length; j++){
    elementosMismaClase[j].classList.add("idFrutaRepetido");
  }
}



//ERRORES
function libreDeErrorCeroDelanteNumero(numero){
  if(numero.toString()[0]==0 && numero.toString()[1]!="."){
    console.error("Comenzar con un número en 0 puede ocasionar problemas, evítalo, por favor.")
    return false;
  }else{
    return true;
  }
}
