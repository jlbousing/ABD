//API RESTFULL BACKEND DE LA APLICACIÓN

var sql = require("mssql"), //MÓDULO PARA CONECTAR MSSQL CON NODEJS
    http = require("http"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    server = http.createServer(app);


//SE DEFINE EL MOTOR DE PLANTILLAS
app.engine("dust", cons.dust);
app.set("view engine", "dust");

//SE CONFIGURA LA UBICACIÓN DE LAS VISTAS
app.set("views", __dirname + "/views"); 

app.use(express.static(__dirname + "/public")); //MIDDLEWARE PARA SERVIR ARCHIVOS ESTÁTICOS

 //BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var config = {
    user: 'sa',
    password: 'pass',
    server: 'localhost\\JORGESQL', // You can use 'localhost\\instance' to connect to named instance
    database: 'ServicioCarro',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

//FUNCIÓN PARA DESPLEGAR DATOS EN LA VISTA DE REGISTRO
function CallbackHellRegistro(res){
    
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    
    conn.connect(function(err){
        
        
        
        if(err){
            console.log(err);
        }
        
        //CALLBACK HELL
        request.query("SELECT * FROM tipo_vehiculo",function(err,recordset){
        
            var tipo = recordset;
            request.query("SELECT * FROM modelo",function(err,recordset){
                
                var modelo = recordset;
                
                request.query("SELECT * FROM color",function(err,recordset){
                    
                    var color = recordset;
                    
                    request.query("EXECUTE SP_ListaVehiculos",function(err,recordset){
                        
                        var vehiculo = recordset;
                        
                        request.query("SELECT * FROM cliente",function(err,recordset){
                            
                            var cliente = recordset;
                            
                            request.query("SELECT * FROM marca",function(err,recordset){
                                var marca = recordset;
                                
                                request.query("SELECT * FROM ListaServicio",function(err,recordset){
                                    
                                    var servicio = recordset;
                                    
                                    var datos = {
                                         tipoVehiculo: tipo,
                                         modelo: modelo,
                                         color: color,
                                         vehiculo: vehiculo,
                                         cliente: cliente,
                                         marca: marca,
                                         servicio: servicio
                                       };
                        
                                        res.render("registro",datos);
                                    
                                });
                            });
                            
                        });
                        
                    });
                });
            });
        });
        
    });    
    
}

function CallbackHellPrincipal(res){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    
    conn.connect(function(err){
        
        //CALLBACKHELL
        
        request.query("EXECUTE SP_CRUDServicio",function(err,recordset){
            
            var crud = recordset;
            
            request.query("SELECT * FROM ListaServicio",function(err,recordset){
                
                var ls = recordset;
                
                request.query("SELECT * FROM vehiculo",function(err,recordset){
                    
                    var vehiculoSelector = recordset;
                    
                    request.query("SELECT * FROM tipo_pago",function(err,recordset){
                        
                        var pago = recordset;
                        
                        var datos = {
                            
                            crud: crud,
                            ListaServicio: ls,
                            vehiculoSelector: vehiculoSelector,
                            tipo_pago: pago
                        }
                        
                        res.render("index",datos);
                        
                    });
                });
            });
        });
        
    });
}

//MÉTODO QUE PERMITE BUSCAR A UN CARRO POR SU PLACA
function buscarCarro(socket,dato){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        if(err){
            console.log(err);
        }
        else{
            
            request.query("EXECUTE SP_BuscarCarro "+dato,function(err,recordset){
                
                if(err){
                    console.log(err);
                    socket.emit("CarroBuscado",0); //SE ENVIA UNA SEÑAL PARA VALIDAR QUE NO SE ENCONTRO
                }
                else{
                    
                    //console.log(recordset);
                    socket.emit("CarroBuscado",recordset); //SE ENVIA LOS DATOS AL CLIENTE
                }
                
            });
            
        }
        
    });
}

function grafico(socket){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        request.query("select count(*) FROM cita WHERE id_Lservicio = 1",function(err,recordset){
            
            var engrase = recordset;
            
            request.query("select count(*) FROM cita WHERE id_Lservicio = 2",function(err,recordset){
            
            var revision = recordset;
              
                request.query("select count(*) FROM cita WHERE id_Lservicio = 3",function(err,recordset){
            
            var aceite = recordset;
            
               request.query("select count(*) FROM cita WHERE id_Lservicio = 4",function(err,recordset){
            
            var bateria = recordset;
            
               request.query("select count(*) FROM cita WHERE id_Lservicio = 5",function(err,recordset){
            
            var cauchos = recordset;
            
                request.query("select count(*) FROM cita WHERE id_Lservicio = 6",function(err,recordset){
            
            var reparacion = recordset;
            
                 request.query("select count(*) FROM cita WHERE id_Lservicio = 7",function(err,recordset){
            
            var latoneria = recordset;
            
                  request.query("select count(*) FROM cita WHERE id_Lservicio = 8",function(err,recordset){
            
            var frenos = recordset;
            
                  request.query("select count(*) FROM cita WHERE id_Lservicio = 9",function(err,recordset){
            
            var pintura = recordset;
            
                request.query("select count(*) FROM cita WHERE id_Lservicio = 1",function(err,recordset){
            
            var caja = recordset;
            
                var dato = {
                    
                    engrase: engrase,
                    revision: revision,
                    aceite: aceite,
                    bateria: bateria,
                    cauchos: cauchos,
                    reparacion: reparacion,
                    latoneria: latoneria,
                    frenos: frenos,
                    pintura: pintura,
                    caja: caja
                }
                
                socket.emit("grafico",dato); //SE ENVIA AL CLIENTE
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
        
    });
    
}

app.get("/",function(req,res){
       
    CallbackHellPrincipal(res); 
});

app.get("/registro",function(req,res){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    
    conn.connect(function(err){
        
        
        
        if(err){
            console.log(err);
        }
        
        //CALLBACK HELL
        request.query("SELECT * FROM tipo_vehiculo",function(err,recordset){
        
            var tipo = recordset;
            request.query("SELECT * FROM modelo",function(err,recordset){
                
                var modelo = recordset;
                
                request.query("SELECT * FROM color",function(err,recordset){
                    
                    var color = recordset;
                    
                    request.query("EXECUTE SP_ListaVehiculos",function(err,recordset){
                        
                        var vehiculo = recordset;
                        
                        request.query("SELECT * FROM cliente",function(err,recordset){
                            
                            var cliente = recordset;
                            
                            request.query("SELECT * FROM marca",function(err,recordset){
                                var marca = recordset;
                                
                                request.query("SELECT * FROM ListaServicio",function(err,recordset){
                                    
                                    var servicio = recordset;
                                    
                                    var datos = {
                                            tipoVehiculo: tipo,
                                            modelo: modelo,
                                            color: color,
                                            vehiculo: vehiculo,
                                            cliente: cliente,
                                            marca: marca,
                                            servicio: servicio
                                           };
                        
                                         res.render("registro",datos);
                                });
                            });
                            
                        });
                        
                    });
                });
            });
        });
        
    });    
    
});


app.get("/estadistica",function(req,res){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        request.query("EXECUTE SP_TopVehiculo",function(err,recordset){
            
            var v = recordset;
            console.log(v);
            
            request.query("EXECUTE SP_TopServicio",function(err,recordset){
                
                var s = recordset;
                console.log(s);
                
                var dato = {
                    
                    topv: v,
                    tops: s
                }
                
                res.render("estadisticas",dato);
            });
            
        });
        
    });
    
    
});


//MÉTODO POST PARA INGRESAR CLIENTES NUEVOS A LA BASE DE DATOS
app.post("/ingresoCliente",function(req,res){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        if(err){
            console.log(err);
        }
        else{
            
            var consulta = "EXECUTE SP_InsertarClientes "+"'"+req.body.nombre+"','"+req.body.apellido+"',"+req.body.ci+",'"+req.body.fechanacimiento+"'";
            
            request.query(consulta); //SE INSERTA UN CLIENTE EN LA BASE DE DATOS
            console.log("SE INGRESO UN CLIENTE NUEVO A LA BASE DE DATOS");
            CallbackHellRegistro(res);
        }
        
        
    });
    
});

//MÉTODO POST PARA INGRESAR VEHICULOS NUEVOS A LA BASE DE DATOS
app.post("/ingresoVehiculo",function(req,res){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        if(err){
            console.log(err);
        }
        else{
            
            var consulta = "EXECUTE SP_InsertarVehiculo "+"'"+req.body.tipo+"','"+req.body.placa+"','"+req.body.marca+"','"+req.body.modelo+"','"+req.body.color+"'";
            
            request.query(consulta);
            CallbackHellRegistro(res);
        }
        
    });
    
});

//MÉTODO POST PARA INGRESAR SERVICIOS
app.post("/nuevaCita",function(req,res){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        if(err){
            console.log(err);
        }
        else{
            
            request.query("EXECUTE SP_ValidarCI "+req.body.ci,function(err,recordset){
                
                if(err){
                    console.log(err);
                }
                else{
                    
                    if(recordset[0] != undefined){
                        
                 var consulta = "EXECUTE SP_InsertarCita "+"'"+req.body.fecha+"','"+req.body.ci+"','"+req.body.placa+"','"+req.body.listaS+"',"+req.body.precioNeto+","+req.body.precioGanancia+",'"+req.body.pago+"'";
                        
                       //console.log(consulta);
                       request.query(consulta);
                       CallbackHellPrincipal(res);
                    }
                    else{
                        console.log("no existe");
                    }
                    
                }
                
            });
        }
        
    });
    
});

app.get("/ddad",function(req,res){
    
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        if(err){
            console.log(err);
        }
        
        request.query("SELECT * FROM cliente",function(err,recordset){
        
        if(err){
            console.log(err);
        }else{
            res.send(recordset);
        }
        
        conn.close();
       });
    });
    
});
        
server.listen(8080,function(){
    console.log("Aplicacion corriendo en el puerto 8080");
    
});


//----------------------- RUTINAS DE SOCKET.IO ----------------------------------------------------



//SE INICIALIZA EL OBJETO DE socketIO
var io = require("socket.io").listen(server);

//SE CREAN LAS RUTINAS DEL WEBSOCKET (socketIO)

io.sockets.on("connection",function(socket){
    
    console.log("SE HA CONECTADO UN CLIENTE");
    
    socket.on("buscarCarro",function(data){
        
        buscarCarro(socket,data);
        
    });
    
     
    var conn = new sql.Connection(config);
    var request = new sql.Request(conn);
    
    conn.connect(function(err){
        
        request.query("select count(*) FROM cita WHERE id_Lservicio = 1",function(err,recordset){
            
            var engrase = recordset;
            
            request.query("select count(*) FROM cita WHERE id_Lservicio = 2",function(err,recordset){
            
            var revision = recordset;
              
                request.query("select count(*) FROM cita WHERE id_Lservicio = 3",function(err,recordset){
            
            var aceite = recordset;
            
               request.query("select count(*) FROM cita WHERE id_Lservicio = 4",function(err,recordset){
            
            var bateria = recordset;
            
               request.query("select count(*) FROM cita WHERE id_Lservicio = 5",function(err,recordset){
            
            var cauchos = recordset;
            
                request.query("select count(*) FROM cita WHERE id_Lservicio = 6",function(err,recordset){
            
            var reparacion = recordset;
            
                 request.query("select count(*) FROM cita WHERE id_Lservicio = 7",function(err,recordset){
            
            var latoneria = recordset;
            
                  request.query("select count(*) FROM cita WHERE id_Lservicio = 8",function(err,recordset){
            
            var frenos = recordset;
            
                  request.query("select count(*) FROM cita WHERE id_Lservicio = 9",function(err,recordset){
            
            var pintura = recordset;
            
                request.query("select count(*) FROM cita WHERE id_Lservicio = 1",function(err,recordset){
            
            var caja = recordset;
            
                var dato = {
                    
                    engrase: engrase,
                    revision: revision,
                    aceite: aceite,
                    bateria: bateria,
                    cauchos: cauchos,
                    reparacion: reparacion,
                    latoneria: latoneria,
                    frenos: frenos,
                    pintura: pintura,
                    caja: caja
                }
                
                console.log("bandera");
                socket.emit("grafico",dato); //SE ENVIA AL CLIENTE
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
            
        });
        
    });
    
    
    
});
