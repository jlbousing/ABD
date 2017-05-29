var socket = io.connect("http://localhost:8080");

function buscarCarro(){
    
    var data = $("#buscarCarro").val();
    
    console.log("la data es ",data);
    
    socket.emit("buscarCarro",data);
    
    socket.on("CarroBuscado",function(dato){
        
        if(dato != 0){
            console.log(dato[0]);
        console.log(dato[0].nombre_marca);
        
        $("#modalrsp").text("El automovil ingresado es de marca "+dato[0].nombre_marca+", modelo "+dato[0].nombre_modelo+" año "+dato[0].year+" y tiene "+dato[0].NroCilindrada+" cilindros");
        
        
          $("#rsp").modal();
            
        }
        else{
            alert("No existe un vehiculo con esa placa");
        }
        
        
        document.getElementById("buscarCarro").value = "";
        socket.removeListener("CarroBuscado");
    });
    
}