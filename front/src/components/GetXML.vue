<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
    <div class="text-center text-xl text-gray-800 font-semibold">Mis Facturas</div>
    <div v-if="dataXML.length == 0" class="mt-4">
      <div class="text-white font-lg p-4 border-0 rounded text-left bg-red-500">
        Sin Facturas Registradas
      </div>
    </div>
    <div v-if="dataXML.length > 0" class="overflow-x-auto">
      <div class="bg-white rounded my-6">
        <table class="min-w-max w-full table-auto">
          <thead>
            <tr class="bg-gray-200 text-gray-600">
              <th class="p-3">Nombre Emisor</th>
              <th class="p-3">RFC Emisor</th>
              <th class="p-3">Nombre Receptor</th>
              <th class="p-3">RFC Receptor</th>
              <th class="p-3">Fecha</th>
              <th class="p-3">Método Pago</th>
              <th class="p-3">Tipo Comprobante</th>
              <th class="p-3">Total</th>
              <th class="p-3">Total Impuestos</th>
            </tr>
          </thead>
          <tbody class="text-gray-600">
            <tr class="border-b border-gray-100 hover:bg-gray-50" v-for="(prop, index) in dataXML" :key="index">
             <td class="p-3" v-text="prop.emisorNombre"></td>
             <td class="p-3 font-bold" v-text="prop.emisorRfc"></td>
             <td class="p-3" v-text="prop.receptorNombre"></td>
             <td class="p-3 font-bold" v-text="prop.receptorRfc"></td>
             <td class="p-3 text-center" v-text="prop.fecha"></td>
             <td class="p-3" v-text="prop.metodoPago"></td>
             <td class="p-3 text-center" v-text="prop.tipoDeComprobante"></td>
             <td class="p-3 text-center font-bold" v-text="prop.total"></td>
             <td class="p-3 text-center" v-text="prop.totalImpuestosTrasladados"></td>
           </tr>
         </tbody>
       </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { urlApi, getDataXML } from '../utils'
  const load = async () => {
    let res = await fetch(urlApi)
    let json = await res.json()
    let data = []
    for(let prop of json){
      let field = prop.fields
      let xml_base64 = atob(field.xml_base64)
      if(xml_base64.includes('<?xml version="1.0"', 0)){
        let nombre = field.nombre
        let rfc = field.rfc
        let file = getDataXML(xml_base64)
        data.push(file)
      }
    }
    console.log(data);
    return data
  }

  export default {
    data() {
       return {
        messageAlert: '',
        colorAlert: '',
        dataXML: []
      }
    },
    async created() {
      this.dataXML = await load()
    },
    methods: {
      setAlertMessage: function(message, color, timeout = 3500){
        this.messageAlert = message
        this.colorAlert = color
        setTimeout(() => this.messageAlert = '', timeout);
      }
    }
  }
</script>
