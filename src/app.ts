import express, {Request, Response} from 'express';
import cors from 'cors';
import xmlgen from 'facturacionelectronicapy-xmlgen';
import xmlsign from 'facturacionelectronicapy-xmlsign';
import qrgen from 'facturacionelectronicapy-qrgen';
import setApi from 'facturacionelectronicapy-setapi';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/hello', (req: Request, res: Response) => {
    
    var name = req.body.name,
        color = req.body.color;

    var params1 = {
        "version": 150,
        "fechaFirmaDigital": "2022-04-26T12:59:10",
        "ruc": "3997053-1",
        "razonSocial": "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
        "nombreFantasia": "DIEGO LOPEZ SOLIS",
        "actividadesEconomicas": [{
            "codigo": "46410",
            "descripcion": "COMERCIO AL POR MAYOR DE TEXTILES, PRENDAS DE VESTIR, CALZADO, ARTÍCULOS DE MARROQUINERÍA Y TALABARTERÍA"
        }],
        "timbradoNumero": "12559590",
        "timbradoFecha": "2022-06-21T00:00:00",
        "tipoContribuyente": 2,
        "tipoRegimen": 8,
        "establecimientos": [{
            "codigo": "001",
            "direccion": "Barrio Carolina",
            "numeroCasa": "0",
            "complementoDireccion1": "Entre calle 2",
            "complementoDireccion2": "y Calle 7",
            "departamento": 11,
            "departamentoDescripcion": "ALTO PARANA",
            "distrito": 145,
            "distritoDescripcion": "CIUDAD DEL ESTE",
            "ciudad": 3432,
            "ciudadDescripcion": "PUERTO PTE.STROESSNER (MUNIC)",
            "telefono": "0973-527155",
            "email": "DIELOSI@GMAIL.COM",
            "denominacion": "Sucursal 1"
        }]
    };
    
    var data = {
        "tipoDocumento": 1,
        "establecimiento": "001",
        "codigoSeguridadAleatorio": "1111111",
        "punto": "002",
        "numero": 1007000,
        "descripcion": "",
        "observacion": "",
        "fecha": "2022-06-30T10:11:00",
        "tipoEmision": 1,
        "tipoTransaccion": 1,
        "tipoImpuesto": 1,
        "moneda": "USD",
        "condicionTipoCambio": 1,
        "cambio": "6852.00",
        "cliente": {
            "contribuyente": true,
            "ruc": "80007801-2",
            "razonSocial": "AGRO SILO SANTA CATALINA S.A.    ",
            "nombreFantasia": "",
            "tipoOperacion": 1,
            "direccion": "AGRO SILO SANTA CATALINA S.A.    ",
            "numeroCasa": "0",
            "departamento": 11,
            "departamentoDescripcion": "ALTO PARANA",
            "distrito": 211,
            "distritoDescripcion": "LOS CEDRALES",
            "ciudad": 5695,
            "ciudadDescripcion": "LOS CEDRALES",
            "pais": "PRY",
            "paisDescripcion": "Paraguay",
            "tipoContribuyente": 2,
            "documentoTipo": 1,
            "documentoNumero": "",
            "telefono": "0633220071",
            "celular": "",
            "email": "",
            "codigo": 712
        },

        "factura": {
            "presencia": 1
        },
        "condicion": {
            "tipo": 2,
            "credito": {
                "tipo": 2,
                "plazo": "",
                "cuotas": 1,
                "montoEntrega": 0,
                "infoCuotas": [
                    {
                        "moneda": "USD",
                        "monto": "23401.18",
                        "vencimiento": "2022-06-15"
                    }
                ]
            }
        },
        "items": [
            {
                "codigo": "9123",
                "descripcion": "SOJA EN GRANOS - TONELADAS",
                "observacion": "",
                "unidadMedida": 99,
                "cantidad": "37.194",
                "precioUnitario": "629.1654",
                "cambio": "6852.00",
                "ivaTipo": 4,
                "ivaBase": 50,
                "iva": 5,
                "lote": null,
                "vencimiento": null,
                "numeroSerie": "",
                "numeroPedido": "",
                "numeroSeguimiento": ""
            }
        ]
    };

    
    xmlgen.generateXMLDE(params1, data).then(xml => {
        //console.log(xml);
        xmlsign
        .signXML(xml, './certs/3997053.p12', 'Die1905982022')
        .then(xmlFirmado => {
            var xmlFormateado = xmlFirmado.replace(/(\r\n|\n|\r)/gm, "");
            console.log("xml Formato: " + xmlFirmado);

            qrgen
            .generateQR(xmlFirmado,"1", "ABCD0000000000000000000000000000", "test")
            .then(xmlQR => {
                    console.log("xml Formato: " + xmlQR);
                    console.log("Color: " + color);
                    
                    setApi.
                    recibe(1, xmlQR, "test", './certs/3997053.pfx', 'Die1905982022')
                    .then(xmlSET => {
                        console.log(xmlSET);
                        res.send({message: xmlSET, color: color});
                    })
                
                }).catch(error => {
                    "Error " + error
                });
            
        }).catch(error => {
            console.log("Error: " + error);
        });
    }).catch(error => {
        console.log("Error: " + error);      
    });
});

app.get('/sendUser/:name', (req: Request, res: Response) => {
    res.send("Hola " + req.params.name);
});

app.post('/postRequest', (req: Request, res: Response) => {
    res.send(req.body.telefono);
});

app.post('/postSifen', (req: Request, res: Response) => {
    
    
    var params1 = req.body.params;
    
    var data = req.body.data;

    
    xmlgen.generateXMLDE(params1, data).then(xml => {
        xmlsign
        .signXML(xml, './certs/3997053.p12', 'Die1905982022')
        .then(xmlFirmado => {
            qrgen
            .generateQR(xmlFirmado,"1", "ABCD0000000000000000000000000000", "test")
            .then(xmlQR => {
                    console.log("xml Formato: " + xmlQR);
                    
                    setApi.
                    recibe(1, xmlQR, "test", './certs/3997053.pfx', 'Die1905982022')
                    .then(xmlSET => {
                        console.log(xmlSET);
                        res.send(
                            {
                                message: xmlSET, 
                                xml: xmlQR
                            }
                            );
                    })
                
                }).catch(error => {
                    "Error " + error
                });
            
        }).catch(error => {
            console.log("Error: " + error);
        });
    }).catch(error => {
        console.log("Error: " + error);      
    });
});


const puerto = process.env.PORT || 3000;

app.listen(puerto, ()=>"App listening on the port " + puerto);