<template>
<div>
  <dialog open>
    <form>
      <fieldset>
	<legend>Edit record</legend>
	<div class="row">
	  <div class="col-sm-12 col-md-6">
	    <label for="titulo">Titulo</label>
	    <input type="text" id="titulo" placeholder="Titulo"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="autor">Autor</label>
	    <input type="text" id="autor" placeholder="Autor"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="isbn">ISBN</label>
	    <input type="text" id="isbn" placeholder="ISBN"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="editorial">Editorial</label>
	    <input type="text" id="editorial" placeholder="Editorial"/>
	  </div>
	</div>
	<button type="submit" class="primary">Enviar</button>
	<button class="danger" @click.prevent="cancel">Cancelar</button>
      </fieldset>
    </form>
  </dialog>
</div>
</template>

<script>
export default {
    name:'Dialog',
    props:['tipo','registro'],
    data(){
	return {
	    titulos:{
		crear:"Crear registro",
		editar:"Editar registro"
	    }
	}
    },
    methods:{
	cancel(){
	    this.$emit('cancel-action')
	}
    }

}
</script>

<style>

</style>
