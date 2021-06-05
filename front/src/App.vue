<template>
  <Header @onClickMenu="onChildChange($event)"/>
  <div v-if="typeView == 'cargar'">
    <UploadXML />
  </div>
  <div v-if="typeView == 'mostrar'">
    <GetXML />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import UploadXML from './components/UploadXML.vue'
import GetXML from './components/GetXML.vue'

export default {
  name: 'App',
  data() {
     return {
      typeView: 'cargar'
    }
  },
  methods: {
    onChildChange(value){
      console.log(value);
      this.typeView = value
    }
  },
  components: {
    Header,
    UploadXML,
    GetXML
  }
}
</script>
