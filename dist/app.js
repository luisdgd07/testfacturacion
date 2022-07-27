"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const facturacionelectronicapy_xmlgen_1 = __importDefault(require("facturacionelectronicapy-xmlgen"));
const facturacionelectronicapy_xmlsign_1 = __importDefault(require("facturacionelectronicapy-xmlsign"));
const facturacionelectronicapy_qrgen_1 = __importDefault(require("facturacionelectronicapy-qrgen"));
const facturacionelectronicapy_setapi_1 = __importDefault(require("facturacionelectronicapy-setapi"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/hello', (req, res) => {
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
    facturacionelectronicapy_xmlgen_1.default.generateXMLDE(params1, data).then(xml => {
        //console.log(xml);
        facturacionelectronicapy_xmlsign_1.default
            .signXML(xml, './certs/3997053.pfx', 'Die1905982022')
            .then(xmlFirmado => {
            var xmlFormateado = xmlFirmado.replace(/(\r\n|\n|\r)/gm, "");
            console.log("xml Formato: " + xmlFirmado);
            facturacionelectronicapy_qrgen_1.default
                .generateQR(xmlFirmado, "1", "ABCD0000000000000000000000000000", "test")
                .then(xmlQR => {
                console.log("xml Formato: " + xmlQR);
                facturacionelectronicapy_setapi_1.default
                    .recibe(1, xmlQR, "test", "certs/3997053.pfx", "Die1905982022")
                    .then(xmlSET => {
                    console.log("XML enviado a la SET", JSON.stringify(xmlSET));
                    res.send({ message: "hoal" });
                });
            }).catch(error => {
                "Error " + error;
            });
        }).catch(error => {
            console.log("Error: " + error);
        });
    }).catch(error => {
        console.log("Error: " + error);
    });
});
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => "App listening on the port " + puerto);
//# sourceMappingURL=app.js.map