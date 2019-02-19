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
			    <input type="text" id="nombre" placeholder="Nombre" v-model.lazy="registro.nombre"/>
			</div>
			<div class="col-sm-12 col-md-6">
			    <label for="apellido">Apellido</label>
			    <input type="text" id="apellido" placeholder="Apellido" v-model.lazy="registro.apellido"/>
			</div>
			<div class="col-sm-12 col-md-6">
			    <label for="nacionalidad">Nacionalidad</label>
			    <input type="text" id="isbn" placeholder="Nacionalidad" v-model.lazy="registro.nacionalidad"/>
			</div>
			<div class="col-sm-12 col-md-6">
			    <label for="email">E-mail</label>
			    <input type="text" id="email" placeholder="E-mail" v-model.lazy="registro.email"/>
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
     name:'DialogAuthor',
     data(){
	 return {
	     titulo:''
	 }
     },
     created(){
	 EventBus.$on('displayDialogAutores', (payload)=>{
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
