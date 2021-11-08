"use strict";
/*TODO 
FUNCIONALIDAD-->
--TODO SE QUITA CUANDO SE ACABA EL PEDIDO
-----MOSTRAR VENTANA EMERGENTE CON TODA LA INFO DE VERANO O INVIERNO
//reloj cuidado cuando es solo 1 min, 07 por ejemploi
-----TRAS LA FINALIZACIÓN DE UN PEDIDO Y A LOS 10 SEGUNDOS SE LIMPIA LA BARRA LATERAL, EL AREA DONDE SE MUESTRA LA COMPRA Y CUALQUIER VARIABLE INTERNA
*/


function re_start() {
  limpiarTextArea();
  limpiarCestaCompra();
  limpiarZonaLateral();
}



//Onload

//Funciones para tratar el array de cestaCompra
function ordenarCestaCompra(cesta) {
  
  let cestaCompraOrdenadaAlfabeticamente = cesta.sort(function(a,b){
    if(a.nombre < b.nombre) { return 1; }
    if(a.nombre > b.nombre) { return -1; }
    return 0;
  });
  return cestaCompraOrdenadaAlfabeticamente;
}


// // //Para saber si tiene que ecribir kilos en singular o plurar /////////////////////////// UTILITIES
var kilo_or_kilos = (num) => (num <= 1 ? "kilo" : "kilos");


////////////////////////////////////////////Mostrar compra 
/*
var botonCompra = document.getElementById("botonComprar");
botonCompra.addEventListener("click", console.log("enga"));
*/


function mostrarCompra() { //falta redondear hacia abajo
  limpiarTextArea();
  let valorPrecioTotal;
  let textAreaElement = document.getElementById("textAreaFactura");
  let cestaFiltrada = cestaCompra.filter((fruta) => fruta.kilosTotales != 0);
  cestaFiltrada = ordenarCestaCompra(cestaFiltrada);
  diaHora(textAreaElement);
  for (let i=0; i<cestaFiltrada.length; i++) {
    textAreaElement.value+=`${cestaFiltrada[i].nombre} ---- ${cestaFiltrada[i].kilosTotales} ${kilo_or_kilos(cestaFiltrada[i].kilosTotales)} ---- ${cestaFiltrada[i].precio}€ ---- ${formatNumber(cestaFiltrada[i].precio*cestaFiltrada[i].kilosTotales,2)}€ \n`
    console.log(i)
  }
  valorPrecioTotal=precioTotal(cestaFiltrada);
  textAreaElement.value+=`\nPrecio total: ${formatNumber(precioTotal(cestaFiltrada),2)}€\nPrecio medio: ${formatNumber(precioMedio(cestaFiltrada, valorPrecioTotal),3)}€/kg`;
  limpiarCestaCompra();
  //limpiarZonaLateral();
}

function diaHora(textAreaElement){
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes();
textAreaElement.value+=`Fecha de compra: ${date} a las ${time}\n\n`
}
function precioTotal(cestaFiltrada){
  let precioTotal=0;
  for(let i=0; i<cestaFiltrada.length; i++){
    precioTotal+=Number(cestaFiltrada[i].kilosTotales*cestaFiltrada[i].precio);
  }
  return precioTotal;
}
function precioMedio(cestaFiltrada,precioTotal){
  let precioMedio = 0;
  let kilosTotales=()=>{
    let  kilos = 0;
    for(let i=0; i<cestaFiltrada.length;i++){
      kilos+=Number(cestaFiltrada[i].kilosTotales)
    }
    return kilos;
  };
  precioMedio=precioTotal/kilosTotales();
  return isNaN(precioMedio)?0:precioMedio;
}
function formatNumber(num, decimales) {
  // Lo hacemos String
  var s = "" + num;
  // Añadimos el punto si no lo tiene 
  if (s.indexOf(".") == -1) {
    s += ".";
  }
  //Añade 2 ceros por si fuera entero (Si sobran no pasa nada)
  for(let i=0; i<=decimales; i++){
    s += "0";
  }
  // Cogemos los dos decimales primeros (como es redondeo hacia abajo nunca cambian)
  return s.substring(0, s.indexOf(".") + decimales+1);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCIONALIDAD DE AÑADIR KILOS Y MOSTRAR EN PANTALLA
function addKilos(i){
  addKilosObjeto(i);
  addEnPantallita(i);
  restablecerKilosACero(i);
  retirarIluminacionClases();
  iluminarMismaClase(i);
}

function addKilosObjeto(i){
  cestaCompra[i].kilosTotales+=Number(inputs[i].value);
  cestaCompra[i].kilosVez=Number(inputs[i].value);
}
function addEnPantallita(i){
  let elementoAdd = document.createElement("p");
  let zonaLateral = document.getElementsByClassName("zonaLateral")[0]
  elementoAdd.innerText=`${cestaCompra[i].kilosVez} kg de ${cestaCompra[i].nombre} `;
  elementoAdd.classList.add(`idFruta${i}`);
  //EFECTO PARA LA RECIÉN AÑADIDA SOLO ULTIMA
  zonaLateral.appendChild(elementoAdd);
}
function restablecerKilosACero(i){
  inputs[i].value="";
  //Cambios visuales
  textoCambiante[i].textContent="Introduce Kg";
  arraySpan[i].classList.remove('show');
  arrayAuxiliar[i]=false;
}

//visuales de recien añadir
function retirarIluminacionClases(){
  let elementosIluminados = document.getElementsByClassName("idFrutaRepetido");
  for(let z=0; z<elementosIluminados.length; z++){ //No hace falta -1 por el "Bug" que arreglamos con el HOTFIX de que el length disminuye
    elementosIluminados[z].classList.remove("idFrutaRepetido");
    z--; //HOT FIX para solucionar que cada vez que elimino la clase la variable disminuye su LENGTH
    //Esto hace que el bucle no funcione bien puesto que cuando va a leer el elemento 2 este es el 1, y asi en cada iteración.
    //El length baja en cada iteración
  }
  quitarIluminaciónLastAdded();
}
function quitarIluminaciónLastAdded(){
  let ultimoElemento=false;
  if(ultimoElemento = document.getElementsByClassName("ultimaFrutaAdded")[0]){
    ultimoElemento.classList.remove("ultimaFrutaAdded");
  }
}

function iluminarMismaClase(i){
  let elementosMismaClase = document.getElementsByClassName(`idFruta${i}`);
  for(let j=0; j<elementosMismaClase.length-1; j++){ // -1 porque no queremos la más reciente
    elementosMismaClase[j].classList.add("idFrutaRepetido"); //A todas sus hermanas
  }
  iluminarRecienAdded(elementosMismaClase);
}
function iluminarRecienAdded(elementosMismaClase){
  elementosMismaClase[elementosMismaClase.length-1].classList.add("ultimaFrutaAdded"); //Solo a la que se acaba de introducir
}


//////////////////////////////////////////////////////////////////////////ERRORES 
//TODO fixear para que quite el cero y no te lo anule
function libreDeErrorCeroDelanteNumero(numero){
  if(numero.toString()[0]==0 && numero.toString()[1]!="."){
    console.error("Comenzar con un número en 0 puede ocasionar problemas, evítalo, por favor.")
    return false;
  }else{
    return true;
  }
}
