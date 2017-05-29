//SCRIPT PARA CONTROLAR EL VIEW DE REGISTRO
    

$('.campoFecha').datepicker({
     format: "yyyy-mm-dd"
});

$("#IngresoCliente").hide();
$("#ListaCliente").hide();
$("#IngresoVehiculo").hide();
$("#ListaVehiculo").hide();
$("#IngresoServicio").hide();
$("#ListaServicio").hide();

function ShowIngresoC(){
    
    $("#IngresoCliente").show();
    $("#ListaCliente").hide();
    $("#IngresoVehiculo").hide();
    $("#ListaVehiculo").hide();
    $("#IngresoServicio").hide();
    $("#ListaServicio").hide();
}

function ShowListaC(){
    
    $("#IngresoCliente").hide();
    $("#ListaCliente").show();
    $("#IngresoVehiculo").hide();
    $("#ListaVehiculo").hide();
    $("#IngresoServicio").hide();
    $("#ListaServicio").hide();
}

function ShowIngresoV(){
    
    $("#IngresoCliente").hide();
    $("#ListaCliente").hide();
    $("#IngresoVehiculo").show();
    $("#ListaVehiculo").hide();
    $("#IngresoServicio").hide();
    $("#ListaServicio").hide();
}

function ShowListaV(){
    
    $("#IngresoCliente").hide();
    $("#ListaCliente").hide();
    $("#IngresoVehiculo").hide();
    $("#ListaVehiculo").show();
    $("#IngresoServicio").hide();
    $("#ListaServicio").hide();
}

function ShowIngresoS(){
    $("#IngresoCliente").hide();
    $("#ListaCliente").hide();
    $("#IngresoVehiculo").hide();
    $("#ListaVehiculo").hide();
    $("#IngresoServicio").show();
    $("#ListaServicio").hide();
}

function ShowListaS(){
    $("#IngresoCliente").hide();
    $("#ListaCliente").hide();
    $("#IngresoVehiculo").hide();
    $("#ListaVehiculo").hide();
    $("#IngresoServicio").hide();
    $("#ListaServicio").show();
}







