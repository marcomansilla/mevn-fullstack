<template>
<div class="container">
  <h1>Biblioteca MEVN - App de prueba</h1>

  <Listado />
  <footer>
    <p>Copyleft 2018</p>
  </footer>
</div>
</template>

<script>
import Listado from './components/listado.vue'
export default {
    components:{
	Listado
    },
    data(){
	return {}
    }
}
</script>

<style>

</style>
