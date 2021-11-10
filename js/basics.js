"use strict";
////////////////////////////////////////////////////////////
//             Clases e instancias de objetos             //
////////////////////////////////////////////////////////////

class Fruit{
    constructor(nombre, precio, kilosVez, kilosTotales, genero){
      this.nombre = nombre;
      this.precio = precio;
      this.kilosVez = kilosVez;
      this.kilosTotales = kilosTotales;
      this.genero = genero;
    }
}
class WinterFruit extends Fruit{
  constructor(nombre, precio, kilosVez, kilosTotales, genero, conservarNevera){
    super(nombre, precio, kilosVez, kilosTotales, genero);
    this.conservarNevera = conservarNevera;
      
  }
}
class SummerFruit extends Fruit{
  constructor(nombre, precio, kilosVez, kilosTotales, genero, proximidad, region){ //Son o no son de proximidad //Region=lugar
    super(nombre, precio, kilosVez, kilosTotales, genero);
    this.proximidad = proximidad;
    this.region = region;
  }
}
var kiwi = new WinterFruit("Kiwi",parseFloat(document.getElementById("precioKiwi").placeholder),0,0,"M",false);
var pera = new WinterFruit("Pera",parseFloat(document.getElementById("precioPera").placeholder),0,0,"F",false);
var manzana = new WinterFruit("Manzana",parseFloat(document.getElementById("precioManzana").placeholder),0,0,"F",false);
var platano = new WinterFruit("Plátano",parseFloat(document.getElementById("precioPlatano").placeholder),0,0,"M",false);
var mandarina = new SummerFruit("Mandarina",parseFloat(document.getElementById("precioMandarina").placeholder),0,0,"F",false,"Salamanca");
var naranja = new SummerFruit("Naranja",parseFloat(document.getElementById("precioNaranja").placeholder),0,0,"F",true,"Palencia");
var melon = new SummerFruit("Melón",parseFloat(document.getElementById("precioMelon").placeholder),0,0,"M",false,"Huelva");
var sandia = new SummerFruit("Sandía",parseFloat(document.getElementById("precioSandia").placeholder),0,0,"F",true,"Canarias");
var pinna = new SummerFruit("Piña",parseFloat(document.getElementById("precioPinna").placeholder),0,0,"F",false,"Macondo");
var limon = new WinterFruit("Limón",parseFloat(document.getElementById("precioLimon").placeholder),0,0,"M",true);
  //Almacena todos los productos
var cestaCompra = [kiwi, pera, manzana, platano, mandarina, naranja, melon, sandia, pinna, limon];
  
/////////////////////////////////////////////////////////////
// Arrays con todos los elementos importantes de la página //
/////////////////////////////////////////////////////////////

var arrayDivs = document.getElementsByClassName("frame");
var inputs = document.getElementsByClassName("inputTextKG");
var textoCambiante = document.getElementsByClassName("invisiblePrice_moved");
var arraySpan = document.getElementsByTagName("span");
var arrayImg = document.getElementsByTagName("img");

////////////////////////////////////////////////////////////
//      Limpieza de variables y cuadros de texto          //
////////////////////////////////////////////////////////////

var limpiarTextArea = () =>
  (document.getElementById("textAreaFactura").value = "");
var limpiarCestaCompra = () => {
  cestaCompra = [kiwi, pera, manzana, platano, mandarina, naranja, melon, sandia, pinna, limon]; //Volvemos a ordenar
  cestaCompra.map((cesta) => { //Vaciamos los kilos totales y relativos
    (cesta.kilosTotales = 0);
    (cesta.kilosVez = 0) 
  });
};
var limpiarZonaLateral= () =>{ //TODO
  let zonaLateral = document.getElementsByClassName("zonaLateral")[0];
  let elementoAEliminar=zonaLateral.getElementsByTagName("p");
  for(let i=0; i<zonaLateral.childElementCount; i++){
    elementoAEliminar[i].remove();
    i--;
  }
}

var limpiarTimer=() =>{
  setTimeout(function(){
    limpiarZonaLateral();
    limpiarCestaCompra();
    limpiarTextArea();
  },10000);
}

////////////////////////////////////////////////////////////
//    Efectos sobre el cuadrado de Kg y sus transiciones  //
////////////////////////////////////////////////////////////

var arrayAuxiliar=[false,false,false,false,false,false,false,false,false,false] 

//Evitar un miniBug que hacia que se pudiera cambiar el TextoCambiante al hacer click
//Sin este array con cada cambio en el input nos cambiaria el texto, así sabemos si ya lo ha cambiado o si no lo ha cambiado aun

for(let i=0; i<inputs.length; i++){
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
      textoCambiante[i].classList.remove("negrita");
      textoCambiante[i].classList.remove("subrayado");
      arraySpan[i].classList.add('show');
      textoCambiante[i].textContent=`${precio}€ / Kg`;
    }
  }, 260); 
  setTimeout(function() { 
    textoCambiante[i].classList.remove('hide')
  }, 260);
}
////////////////////////////////////////////////////////////
//      Iluminación y comprobación del click en img       //
////////////////////////////////////////////////////////////

for(let i=0; i<arrayImg.length; i++){
  arrayImg[i].addEventListener("click",() => {
    if(comprobarNumerico(inputs[i],i)){
      cambioGradualColorFondoVerdeFrame(i);
      addKilos(i);
    }else{
      cambioGradualColorFondoRojoFrame(i);
      inputs[i].value="";
    }
  });
}

function comprobarNumerico(elemento, i){
  if(isNaN(elemento.value) || elemento.value=="" || elemento.value<=0){
    return false;
  }else{
    elemento.value = libreDeErrorCeroDelanteNumero(elemento.value)
    return true;
  }
}
function cambioGradualColorFondoVerdeFrame(i) {
  arrayDivs[i].classList.add("frame_clicked_green");
  setTimeout(() => {
    finalizarCambioColorVerdeClick(i);
  }, 200);
}
function cambioGradualColorFondoRojoFrame(i) {
  textoCambiante[i].textContent="Introduce Kg!";
  textoCambiante[i].classList.add("subrayado");
  textoCambiante[i].classList.add("negrita");
  arraySpan[i].classList.add('show'); //mostrar texto "Kg"
  arrayDivs[i].classList.add("frame_clicked_red");
  setTimeout(() => {
    finalizarCambioColorRojoClick(i);
  }, 200);
}
function finalizarCambioColorVerdeClick(i) {
  arrayDivs[i].classList.remove("frame_clicked_green");
}
function finalizarCambioColorRojoClick(i) {
  arraySpan[i].classList.remove('show');
  arrayDivs[i].classList.remove("frame_clicked_red");
}


