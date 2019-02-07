<template>
<div>
  <div class="backdrop" @click="cancel"></div>
  <dialog open>
    <form>
      <fieldset>
	<legend>{{titulo}}</legend>
	<div class="row">
	  <div class="col-sm-12 col-md-6">
	    <label for="titulo">Titulo</label>
	    <input type="text" id="titulo" placeholder="Titulo" v-model.lazy="registro.titulo"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="autores">Autor</label>
	    <select id="autores" name="autores" v-model.lazy="registro.autor">
	      <option value="" disabled selected>Seleccione el autor</option>
	      <option v-for="(autor, key) in autores" :value="autor._id">{{autor.apellido}}, {{autor.nombre}}</option>
	    </select>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="isbn">ISBN</label>
	    <input type="text" id="isbn" placeholder="ISBN" v-model.lazy="registro.isbn"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="editoriales">Editorial</label>
	    <select id="editoriales" name="editoriales" v-model.lazy="registro.editorial" placeholder="Seleccione la editorial">
	      <option value="" disabled selected>Seleccione la editorial</option>
	      <option v-for="(editorial, key) in editoriales" :value="editorial._id">{{editorial.nombre}}</option>
	    </select>
	  </div>
	</div>
	<button type="submit" class="primary" @click.prevent="addOrUpdateRecord('libros')">Enviar</button>
	<button class="danger" @click.prevent="cancel">Cancelar</button>
      </fieldset>
    </form>
  </dialog>
</div>
</template>

<script>
/* eslint-disable */
import { apiRequests } from '../mixins/apiRequests'
import { EventBus } from '../event-bus'

export default {
    mixins:[apiRequests],
    name:'DialogBook',
    data(){
	return {
	    titulo:''
	}
    },
    created(){
	EventBus.$on('displayDialogLibros', (payload)=>{
	    console.log(payload)
	    if (payload.task==='crear'){
		this.titulo="Agregar registro";
		this.methodType='post';
	    }else{
		this.titulo="Editar registro";
		this.registro=payload.registro;
		this.recordID=payload.registro._id;
		this.methodType='put';
		delete this.registro._id
	    }
	    this.coleccion=payload.coleccion
	})
    }

}
</script>

<style>
.backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255,255,255,.7);
    z-index: 999999;
}
</style>
