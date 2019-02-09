<template>
<div>
  <div class="backdrop" @click="cancel"></div>
  <dialog open>
    <form>
      <fieldset>
	<legend>{{titulo}}</legend>
	<div class="row">
	  <div class="col-sm-12 col-md-6">
	    <label for="nombre">Nombre</label>
	    <input type="text" id="nombre" placeholder="Nombre de la editorial" v-model.lazy="registro.nombre"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="direccion">Direccion</label>
	    <input type="text" id="direccion" placeholder="Direccion" v-model.lazy="registro.direccion"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="telefono">Telefono</label>
	    <input type="text" id="telefono" placeholder="Telefono" v-model.lazy="registro.telefono"/>
	  </div>
	</div>
	<button type="submit" class="primary" @click.prevent="addOrUpdateRecord('editoriales')">Enviar</button>
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
    name:'DialogEditorial',
    data(){
	return {
	    titulo:''
	}
    },
    created(){
	EventBus.$on('displayDialogEditoriales', (payload)=>{
	    console.log(payload);
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
