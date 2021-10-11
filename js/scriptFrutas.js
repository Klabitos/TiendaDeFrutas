//Variables globales. Almacenan nombre+precio+kilos
var cestaKiwi=["kiwi", parseFloat(document.getElementById("precioKiwi").innerHTML), 0];
var cestaPera=["pera", parseFloat(document.getElementById("precioPera").innerHTML), 0];
var cestaManzana=["manzana", parseFloat(document.getElementById("precioManzana").innerHTML), 0];
var cestaPlatano=["platano", parseFloat(document.getElementById("precioPlatano").innerHTML), 0];
var cestaMandarina=["manarina", parseFloat(document.getElementById("precioMandarina").innerHTML), 0];
var cestaNaranja=["naranja", parseFloat(document.getElementById("precioNaranja").innerHTML), 0];
var cestaMelon=["melon", parseFloat(document.getElementById("precioMelon").innerHTML), 0];
var cestaSandia=["sandia", parseFloat(document.getElementById("precioSandia").innerHTML), 0];
var cestaPinna=["piña", parseFloat(document.getElementById("precioPinna").innerHTML), 0];
var cestaLimon=["limon", parseFloat(document.getElementById("precioLimon").innerHTML), 0];
//Almacena todos los productos
var cestaCompra = [cestaKiwi,cestaPera,cestaManzana,cestaPlatano,cestaMandarina,cestaNaranja,cestaMelon,cestaSandia,cestaPinna,cestaLimon];

//Funcionalidad básica de modificar y preparar la web
var addUnKiloAFrutaPorID = ID_FrutaPosicionCestaCompra =>  cestaCompra[ID_FrutaPosicionCestaCompra][2]++;
var limpiarTextArea = () => document.getElementById("textAreaFactura").value="";
var limpiarCestaCompra = () => {
    for(let i=0; i<cestaCompra.length;i++){
        cestaCompra[i][2]=0;
    }
}


//Funciones para tratar el array de cestaCompra
var eliminarFrutasCeroKilos = (num) => num==0?false:true;
 // // //Para saber si tiene que ecribir kilos en singular o plurar
var kilo_or_kilos = num => num<=1?"kilo":"kilos"


function mostrarCompra(){
    limpiarTextArea();
    let texAreaElement = document.getElementById("textAreaFactura");
    let precioTotal = 0;
    let kilos = 0;
    let precioMedioKilo = 0;
    texAreaElement.value+="\n";
    for(let i=0; i<cestaCompra.length; i++){
        if (eliminarFrutasCeroKilos(cestaCompra[i][2])){texAreaElement.value+=cestaCompra[i][0]+"  --- "+cestaCompra[i][2]+" "+kilo_or_kilos(cestaCompra[i][2])+"\n"};
        precioTotal+=cestaCompra[i][2]*cestaCompra[i][1];
        kilos+=cestaCompra[i][2];
    }
    precioMedioKilo = precioTotal/kilos;
    texAreaElement.value+="Precio total: "+precioTotal+" €"+"\n";
    texAreaElement.value+="Precio medio: "+precioMedioKilo.toFixed(2)+" €"+"\n";
    limpiarCestaCompra();
}

function re_start(){
    limpiarTextArea();
    limpiarCestaCompra();
}