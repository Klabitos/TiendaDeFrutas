
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

var cestaCompra = [cestaKiwi,cestaPera,cestaManzana,cestaPlatano,cestaMandarina,cestaNaranja,cestaMelon,cestaSandia,cestaPinna,cestaLimon];

var addUnKiloAFrutaPorID = ID_FrutaPosicionCestaCompra =>  cestaCompra[ID_FrutaPosicionCestaCompra][2]++;



function mostrarCompra(){
    for(let i=0; i<cestaCompra.length; i++){
        console.log(cestaCompra[i][2]+" kilos de "+cestaCompra[i][0]);
    }
}