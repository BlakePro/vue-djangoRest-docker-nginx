<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
    <div v-if="messageAlert != ''" class="fixed top-6 right-6 transition ease-in duration-300">
      <div class="text-white font-lg p-4 border-0 rounded text-center " :class='colorAlert'>
        {{ messageAlert }}
      </div>
    </div>
    <div class="text-center text-xl text-gray-800 font-semibold">Cargar XML</div>
    <div class="mt-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
      <div class="text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="text-lg text-gray-600">
          <label for="file-upload" class="text-xl cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Selecciona el XML</span>
            <input @change="getXML" id="file-upload" name="file-upload" type="file" class="sr-only" />
          </label>
          <div class="pt-2 text-gray-400">
            {{ nameFile }}
          </div>
          <div v-if="emisorRfc != ''" class="pt-5 text-md font-semibold text-blue-600">
            <hr class="py-3">
            {{ emisorNombre }}
            <div class="text-blue-500"> {{ emisorRfc }} </div>
            <div class="text-blue-400"> ${{ monto }} </div>
          </div>
        </div>
      </div>

    </div>
    <div class="pt-5 text-right">
      <button v-if="isValidXml" @click="saveXML" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-4 px-6 text-lg rounded-lg">
        Guardar XML
      </button>
    </div>
  </div>
</template>

<script>
  import { alertDanger, alertWarning, alertSuccess, urlApi, getDataXML } from '../utils'
  export default {
    data() {
       return {
        messageAlert: '',
        colorAlert: '',
        nameFile: '',
        base64Xml: '',
        emisorNombre: '',
        emisorRfc: '',
        monto: '',
        isValidXml: false
      }
    },
    methods: {
      getXML: function(e){
        //Obtener el archivo, nombre y tipo cuando el usuario lo haya seleccionado
        let files = e.target.files
        if(typeof files[0] !== 'undefined'){
          let file = files[0]
          let fileName = file.name
          let fileType = file.type
          this.nameFile = fileName
          this.messageAlert = ''
          this.emisor = ''
          this.monto = ''

          //Validar el tipo de archivo
          let acceptedFiles = ['text/xml', 'application/xml']
          if (acceptedFiles.indexOf(fileType) == 0){

            this.colorAlert = alertSuccess
            this.isValidXml = true

            //Archivo seleccionado - texto
            let readerXml = new FileReader()
            readerXml.readAsText(file)
            readerXml.onload = () => {
              let xml = readerXml.result
               this.base64Xml = xml

              let data = getDataXML(xml)
              this.emisorNombre = data.emisorNombre
              this.emisorRfc = data.emisorRfc
              this.monto = new Intl.NumberFormat().format(parseInt(data.total))
            }

          }else{
            this.setAlertMessage('El tipo de archivo es incorrecto. Intente nuevamente', alertWarning)
            this.isValidXml = false

          }
        }
      },
      saveXML: function(){
        //Datos para enviar a API
        let data = {
          "nombre": this.emisorNombre,
          "rfc": this.emisorRfc,
          "xml_base64": btoa(this.base64Xml)
        }

        //Enviar el archivo ya en base64 a la API para ser almacenado y procesado
        fetch(urlApi, {
          headers: {'Content-Type': 'application/json'},
          method: 'POST',
          body: JSON.stringify(data)

        }).then(res => {
          console.log(res)
          this.setAlertMessage(`El XML de ${this.emisorRfc} fue guardado correctamente`, alertSuccess)
          this.emisorNombre = ''
          this.emisorRfc = ''
          this.base64Xml = ''
          this.nameFile = ''
          this.isValidXml = false

        }).catch(res => {
          this.setAlertMessage(`Existe un error al guardar el XML (${res})`, alertDanger)
        })
      },
      setAlertMessage: function(message, color, timeout = 3500){
        this.messageAlert = message
        this.colorAlert = color
        setTimeout(() => this.messageAlert = '', timeout);
      }
    }
  }
</script>
