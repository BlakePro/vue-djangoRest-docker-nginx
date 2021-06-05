export const alertDanger = 'bg-red-500'
export const alertWarning = 'bg-yellow-500'
export const alertSuccess = 'bg-green-500'
export const urlApi = 'http://localhost:1337/hello'

export const getDataXML = xml => {
  let parser = new DOMParser()
  let xmlDoc = parser.parseFromString(xml, "text/xml")

  //COMPROBANTE
  if(xmlDoc != ''){
    let comprobante = xmlDoc.getElementsByTagName("cfdi:Comprobante")[0]
    let metodoPago = comprobante.getAttribute('MetodoPago')
    let tipoDeComprobante = comprobante.getAttribute('TipoDeComprobante')
    let total = comprobante.getAttribute('Total')
    let fecha = comprobante.getAttribute('Fecha')

    //EMISOR
    let comprobanteEmisor = comprobante.getElementsByTagName("cfdi:Emisor")[0]
    let emisorNombre = comprobanteEmisor.getAttribute('Nombre')
    let emisorRfc = comprobanteEmisor.getAttribute('Rfc')

    //RECEPTOR
    let comprobanteReceptor = comprobante.getElementsByTagName("cfdi:Receptor")[0]
    let receptorNombre = comprobanteReceptor.getAttribute('Nombre')
    let receptorRfc = comprobanteReceptor.getAttribute('Rfc')

    //CONCEPTOS
    let conceptos = []
    let comprobanteConceptos = comprobante.getElementsByTagName("cfdi:Conceptos")
    for(let no in comprobanteConceptos){
      try{
        let comprobanteConcepto = (comprobanteConceptos[no]).getElementsByTagName("cfdi:Concepto")[0]
        let importeConcepto = comprobanteConcepto.getAttribute('Importe')
        let valorUnitario = comprobanteConcepto.getAttribute('ValorUnitario')
        let descripcion = comprobanteConcepto.getAttribute('Descripcion')
        conceptos.push({importeConcepto, valorUnitario, descripcion})
      }catch(e){
        //
      }
    }

    //IMPUESTOS
    let comprobanteImpuestos = comprobante.getElementsByTagName("cfdi:Impuestos")[1]
    let totalImpuestosTrasladados = comprobanteImpuestos.getAttribute('TotalImpuestosTrasladados')

    //TRASLADOS
    let traslados = []
    let comprobanteImpuesto = comprobante.getElementsByTagName("cfdi:Impuestos")[0]
    let comprobanteTraslados = comprobanteImpuesto.getElementsByTagName("cfdi:Traslados")
    for(let no in comprobanteTraslados){
      try{
        let comprobanteTraslado = (comprobanteTraslados[no]).getElementsByTagName("cfdi:Traslado")[0]
        let tasaOCuota = comprobanteTraslado.getAttribute('TasaOCuota')
        let importeTraslado = comprobanteTraslado.getAttribute('Importe')
        traslados.push({tasaOCuota, importeTraslado})
      }catch(e){
        //
      }
    }

    let response = {metodoPago, tipoDeComprobante, total, fecha, emisorNombre, emisorRfc, receptorNombre, receptorRfc, totalImpuestosTrasladados, conceptos, traslados}
    return response
  }else{
    return {}
  }
}
