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

/////////////////////////////////////////////////////////////////////////////////////////////
var arrayDivs = document.getElementsByClassName("frame");
var inputs = document.getElementsByClassName("inputTextKG");
var textoCambiante = document.getElementsByClassName("invisiblePrice_moved");
var arraySpan = document.getElementsByTagName("span");
var arrayAuxiliar=[false,false,false,false,false,false,false,false,false,false] //Evitar un miniBug que hacia que se pudiera cambiar el TextoCambiante al hacer click
//Sin este array con cada cambio en el input nos cambiaria el texto, así sabemos si ya lo ha cambiado o si no lo ha cambiado aun

for(let i=0; i<10; i++){
  inputs[i].addEventListener("input", () =>{
    if(arrayAuxiliar[i]==false && inputs[i].value!=""){ 
      arrayAuxiliar[i]=true; 
      fadein(parseFloat(inputs[i].placeholder).toFixed(2), i);   //Tiene que cambiar el mensaje de la caja con un FadeIn, le paso el mensaje (que es el precio y viene en el placeholder) y el iterador(i)
    }
  }); 
  inputs[i].addEventListener("blur", ()=>{
    if(inputs[i].value=="" && arrayAuxiliar[i]==true){
      arrayAuxiliar[i]=false;
      fadein(parseFloat(inputs[i].placeholder).toFixed(2), i);   
      }; 
    }
  );
}

function fadein(precio, i){
  textoCambiante[i].classList.add('hide');
  setTimeout(function(){
    if(textoCambiante[i].textContent==`${precio}€ / Kg`){
      textoCambiante[i].textContent="Introduce Kg";
      arraySpan[i].classList.remove('show');
    }else{
      arraySpan[i].classList.add('show');
      textoCambiante[i].textContent=`${precio}€ / Kg`;
    }
  }, 260); 
  setTimeout(function() { 
    textoCambiante[i].classList.remove('hide')
  }, 260);
}

function re_start() {
  //limpiarAreaDerechaInmediatamente
  limpiarTextArea();
  limpiarCestaCompra();
}

class Fruit{
  constructor(nombre, precio, kilosVez, kilosTotales){
    this.nombre = nombre;
    this.precio = precio;
    this.kilosVez = kilosVez;
    this.kilosTotales = kilosTotales;
  }
}
class WinterFruit extends Fruit{
  constructor(nombre, precio, kilosVez, kilosTotales, conservarNevera){
    super(nombre, precio, kilosVez, kilosTotales);
    this.conservarNevera = conservarNevera;
    
  }
}
class SummerFruit extends Fruit{
  constructor(nombre, precio, kilosVez, kilosTotales, proximidad, region){ //Son o no son de proximidad //Region=lugar
    super(nombre, precio, kilosVez, kilosTotales);
    this.proximidad = proximidad;
    this.region = region;
  }
}

var kiwi = new WinterFruit("Kiwi",parseFloat(document.getElementById("precioKiwi").placeholder),0,0,false);
var pera = new WinterFruit("Pera",parseFloat(document.getElementById("precioPera").placeholder),0,0,false);
var manzana = new WinterFruit("Manzana",parseFloat(document.getElementById("precioManzana").placeholder),0,0,false);
var platano = new WinterFruit("Plátano",parseFloat(document.getElementById("precioPlatano").placeholder),0,0,false);
var mandarina = new SummerFruit("Mandarina",parseFloat(document.getElementById("precioMandarina").placeholder),0,0,false,"Salamanca");
var naranja = new SummerFruit("Naranja",parseFloat(document.getElementById("precioNaranja").placeholder),0,0,false,"Palencia");
var melon = new SummerFruit("Melón",parseFloat(document.getElementById("precioMelon").placeholder),0,0,false,"Huelva");
var sandia = new SummerFruit("Sandía",parseFloat(document.getElementById("precioSandia").placeholder),0,0,false,"Canarias");
var pinna = new SummerFruit("Piña",parseFloat(document.getElementById("precioPinna").placeholder),0,0,false,"Macondo");
var limon = new WinterFruit("Limón",parseFloat(document.getElementById("precioLimon").placeholder),0,0,true);

//Almacena todos los productos
var cestaCompra = [kiwi, pera, manzana, platano, mandarina, naranja, melon, sandia, pinna, limon];

//Funcionalidad básica de modificar y preparar la web
var addUnKiloAFrutaPorID = (ID_FrutaPosicionCestaCompra) => {
  cestaCompra[ID_FrutaPosicionCestaCompra][2]++;
  limpiarTextArea();
};

////////////////////////////////////////////////////////////
//      Limpieza de variables y cuadros de texto          //
////////////////////////////////////////////////////////////
var limpiarTextArea = () =>
  (document.getElementById("textAreaFactura").value = "");
var limpiarCestaCompra = () => {
  cestaCompra = [kiwi, pera, manzana, platano, mandarina, naranja, melon, sandia, pinna, limon]; //Volvemos a ordenar
  cestaCompra.map((cesta) => { //Vaciamos los kilos totales y relativos
    (cesta[2] = 0);
    (cesta[3] = 0) 
  });
};
//Onload

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
