"use strict";
exports.__esModule = true;
var express_1 = require("express");
var facturacionelectronicapy_xmlgen_1 = require("facturacionelectronicapy-xmlgen");
var facturacionelectronicapy_xmlsign_1 = require("facturacionelectronicapy-xmlsign");
var facturacionelectronicapy_qrgen_1 = require("facturacionelectronicapy-qrgen");
var facturacionelectronicapy_setapi_1 = require("facturacionelectronicapy-setapi");

var params1 = {
  version: 150,
  fechaFirmaDigital: "2022-04-26T11:14:53",
  ruc: "80069563-1",
  razonSocial:
    "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
  nombreFantasia: "TIPS S.A. TECNOLOGIA Y SERVICIOS",
  actividadesEconomicas: [
    {
      codigo: "1254",
      descripcion: "Desarrollo de Software",
    },
  ],
  timbradoNumero: "12558946",
  timbradoFecha: "2022-04-25T00:00:00",
  tipoContribuyente: 2,
  tipoRegimen: 8,
  establecimientos: [
    {
      codigo: "001",
      direccion: "Barrio Carolina",
      numeroCasa: "0",
      complementoDireccion1: "Entre calle 2",
      complementoDireccion2: "y Calle 7",
      departamento: 11,
      departamentoDescripcion: "ALTO PARANA",
      distrito: 145,
      distritoDescripcion: "CIUDAD DEL ESTE",
      ciudad: 3432,
      ciudadDescripcion: "PUERTO PTE.STROESSNER (MUNIC)",
      telefono: "0973-527155",
      email: "tips@tips.com.py",
      denominacion: "Sucursal 1",
    },
  ],
};
var data = {
  tipoDocumento: 1,
  establecimiento: "001",

  punto: "001",
  numero: "0000001",
  descripcion: "Aparece en el documento",
  observacion:
    "Cualquier informacion de marketing, publicidad, sorteos, promociones para el Receptor",
  tipoContribuyente: 1,
  fecha: "2018-09-14T10:11:00",
  tipoEmision: 1,
  tipoTransaccion: 1,
  tipoImpuesto: 1,
  moneda: "PYG",
  condicionAnticipo: 1,
  condicionTipoCambio: 1,
  cambio: 6700,
  cliente: {
    contribuyente: true,
    ruc: "2005001-1",
    razonSocial: "Marcos Adrian Jara Rodriguez",
    nombreFantasia: "Marcos Adrian Jara Rodriguez",
    tipoOperacion: 1,
    direccion: "Avda Calle Segunda y Proyectada",
    numeroCasa: "1515",
    departamento: 11,
    departamentoDescripcion: "ALTO PARANA",
    distrito: 143,
    distritoDescripcion: "DOMINGO MARTINEZ DE IRALA",
    ciudad: 3344,
    ciudadDescripcion: "PASO ITA (INDIGENA)",
    pais: "PRY",
    paisDescripcion: "Paraguay",
    tipoContribuyente: 1,
    documentoTipo: 1,
    documentoNumero: "2324234",
    telefono: "061-575903",
    celular: "0973-809103",
    email: "cliente@cliente.com",
    codigo: "1548",
  },
  usuario: {
    documentoTipo: 1,
    documentoNumero: "157264",
    nombre: "Marcos Jara",
    cargo: "Vendedor",
  },
  factura: {
    presencia: 1,
    fechaEnvio: "2021-10-21",
    dncp: {
      modalidad: "ABC",
      entidad: 1,
      año: 2021,
      secuencia: 3377,
      fecha: "2020-09-14T10:11:00",
    },
  },
  autoFactura: {
    tipoVendedor: 1,
    documentoTipo: 1,
    documentoNumero: 1,
    nombre: "Vendedor autofactura",
    direccion: "Vendedor autofactura",
    numeroCasa: "Vendedor autofactura",
    departamento: 11,
    departamentoDescripcion: "ALTO PARANA",
    distrito: 143,
    distritoDescripcion: "DOMINGO MARTINEZ DE IRALA",
    ciudad: 3344,
    ciudadDescripcion: "PASO ITA (INDIGENA)",
    transaccion: {
      lugar: "Donde se realiza la transaccion",
      departamento: 11,
      departamentoDescripcion: "ALTO PARANA",
      distrito: 143,
      distritoDescripcion: "DOMINGO MARTINEZ DE IRALA",
      ciudad: 3344,
      ciudadDescripcion: "PASO ITA (INDIGENA)",
    },
  },
  notaCreditoDebito: {
    motivo: 1,
  },
  remision: {
    motivo: 1,
    tipoResponsable: 1,
    kms: 150,
    fechaFactura: "2021-10-21",
  },
  condicion: {
    tipo: 1,
    entregas: [
      {
        tipo: 1,
        monto: "150000",
        moneda: "PYG",
        cambio: 0,
      },
      {
        tipo: 3,
        monto: "150000",
        moneda: "PYG",
        cambio: 0,
        infoTarjeta: {
          tipo: 1,
          tipoDescripcion: "Dinelco",
          numeroTarjeta: 3232,
          titular: "Marcos Jara",
          ruc: "80069563-1",
          razonSocial: "Bancard",
          medioPago: 1,
          codigoAutorizacion: 232524234,
        },
      },
      {
        tipo: 2,
        monto: "150000",
        moneda: "PYG",
        cambio: 0,
        infoCheque: {
          numeroCheque: "32323232",
          banco: "Sudameris",
        },
      },
    ],
    credito: {
      tipo: 1,
      plazo: "30 días",
      cuotas: 2,
      montoEntrega: 1500000.0,
      infoCuotas: [
        {
          moneda: "PYG",
          monto: 800000.0,
          vencimiento: "2021-10-30",
        },
        {
          moneda: "PYG",
          monto: 800000.0,
          vencimiento: "2021-11-30",
        },
      ],
    },
  },
  items: [
    {
      codigo: "A-001",
      descripcion: "Producto o Servicio",
      observacion: "Información adicional o complementaria sobre el producto",
      partidaArancelaria: 4444,
      unidadMedida: 77,
      cantidad: 10.5,
      precioUnitario: 10800,
      cambio: 0,
      descuento: 0,
      anticipo: 0,
      pais: "PRY",
      paisDescripcion: "Paraguay",
      tolerancia: 1,
      toleranciaCantidad: 1,
      toleranciaPorcentaje: 1,
      cdcAnticipo: "44digitos",
      dncp: {
        codigoNivelGeneral: "12345678",
        codigoNivelEspecifico: "1234",
        codigoGtinProducto: "12345678",
        codigoNivelPaquete: "12345678",
      },
      ivaTipo: 1,
      ivaBase: 100,
      iva: 5,
      lote: "A-001",
      vencimiento: "2022-10-30",
      numeroSerie: "",
      numeroPedido: "",
      numeroSeguimiento: "",
      importador: {
        nombre: "Importadora Parana S.A.",
        direccion: "Importadora Parana S.A.",
        registroImportador: "Importadora Parana S.A.",
        registroSenave: "Importadora Parana S.A.",
        registroEntidadComercial: "Importadora Parana S.A.",
      },
    },
  ],
  sectorSupermercados: {
    nombreCajero: "Juan Antonio Caceres",
    efectivo: 150000,
    vuelto: 30000,
    donacion: 1000,
    donacionDescripcion: "Donado para la caridad",
  },
  detalleTransporte: {
    tipo: 1,
    modalidad: 1,
    tipoResponsable: 1,
    condicionNegociacion: "CFR",
    numeroManifiesto: "AF-2541",
    numeroDespachoImportacion: "153223232332",
    inicioEstimadoTranslado: "2021-11-01",
    finEstimadoTranslado: "2021-11-01",
    paisDestino: "PRY",
    paisDestinoNombre: "Paraguay",
    salida: {
      direccion: "Paraguay",
      numeroCasa: 123,
      complementoDireccion1: "Entre calle 2",
      complementoDireccion2: "y Calle 7",
      departamento: 11,
      departamentoDescripcion: "ALTO PARANA",
      distrito: 143,
      distritoDescripcion: "DOMINGO MARTINEZ DE IRALA",
      ciudad: 3344,
      ciudadDescripcion: "PASO ITA (INDIGENA)",
      pais: "PRY",
      paisDescripcion: "Paraguay",
      telefonoContacto: "097x",
    },
    entrega: {
      direccion: "Paraguay",
      numeroCasa: 123,
      complementoDireccion1: "Entre calle 2",
      complementoDireccion2: "y Calle 7",
      departamento: 11,
      departamentoDescripcion: "ALTO PARANA",
      distrito: 143,
      distritoDescripcion: "DOMINGO MARTINEZ DE IRALA",
      ciudad: 3344,
      ciudadDescripcion: "PASO ITA (INDIGENA)",
      pais: "PRY",
      paisDescripcion: "Paraguay",
      telefonoContacto: "097x",
    },
    vehiculo: {
      tipo: 1,
      marca: "Nissan",
      documentoTipo: 1,
      documentoNumero: "232323-1",
      obs: "Ninguna",
      numeroMatricula: "1234567",
      numeroVuelo: 143,
    },
    transportista: {
      contribuyente: true,
      nombre: "Paraguay",
      ruc: "80068684-1",
      documentoTipo: 1,
      documentoNumero: "99714584",
      direccion: "y Calle 7",
      obs: 11,
      pais: "PRY",
      paisDescripcion: "Paraguay",
      chofer: {
        documentoNumero: "1234",
        nombre: "Jose Benitez",
        direccion: "Jose Benitez",
      },
      agente: {
        nombre: "Jose Benitez",
        ruc: "515415-1",
        direccion: "Jose Benitez",
      },
    },
  },
  complementarios: {
    ordenCompra: "a",
    ordenVenta: "a",
    numeroAsiento: "a",
    carga: {
      ordenCompra: "a",
      ordenVenta: "a",
      numeroAsiento: "a",
    },
  },
};
facturacionelectronicapy_xmlgen_1["default"]
  .generateXMLDE(params1, data)
  .then(function (xml) {
    //console.log(xml);
    facturacionelectronicapy_xmlsign_1["default"]
      .signXML(xml, "certs/3997053.pfx", "Die1905982022")
      .then(function (xmlFirmado) {
        var xmlFormateado = xmlFirmado.replace(/(\r\n|\n|\r)/gm, "");
        console.log("xml Formato: " + xmlFormateado);
        facturacionelectronicapy_qrgen_1["default"]
          .generateQR(xmlFormateado, "1", "123456", "prod")
          .then(function (xmlQR) {
            facturacionelectronicapy_setapi_1["default"]
              .recibe(1, xmlQR, "test", "certs/3997053.pfx", "Die1905982022")
              .then(function (xmlSET) {
                console.log("XML enviado a la SET", xmlSET);
                //res.send({message: xmlSET});
              });
          })
          ["catch"](function (error) {
            console.log("Error: " + error);
          });
      })
      ["catch"](function (error) {
        console.log("Error de nuestra wea: " + error);
      });
  })
  ["catch"](function (error) {
    console.log("Error: " + error);
  });
