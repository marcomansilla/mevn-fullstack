/* eslint-disable */
<template>
<div class="container">
  <h1>Listado de libros disponibles</h1>
  <div class="row">
    <div class="col-sm-4">
      <h3>Libros <button class="primary" @click="openDialog('crear','libros')"><i class="fa fa-plus"></i></button></h3>
      <div class="row">
	<div class="card error fluid col-sm-12" v-for="libro in libros">
	  <h4>{{libro.titulo}}</h4>
	  <p><em>Autor: </em> <strong>{{getAutor(libro.autor)}}</strong></p>
	  <p><em>Editorial:</em> <strong>{{getEditorial(libro.editorial)}}</strong></p>
	  <div class="row">
	    <div class="col-lg-6">
	      <button class="primary btn"><i class="fa fa-pencil"></i> Editar</button>
	    </div>
	    <div class="col-sm-6">
	      <button class="danger btn" type="button" @click="removeRecord('libros',libro._id)"><i class="fa fa-trash"></i> Eliminar</button>
	    </div>
	  </div>
	</div>
      </div>
    </div>
    <div class="col-sm-4">
      <h3>Autores</h3>
    </div>
    <div class="col-sm-4">
      <h3>Editoriales</h3>
    </div>
  </div>
  <!-- dialog modal experiment -->
  <Dialog v-show="displayDialog" @cancel-action="displayDialog=false"/>
</div>
</template>

<script>
import { EventBus } from '../event-bus.js'
import	Service	 from '../service'
import Dialog from './dialog'

export default {
    name: 'listado',
    components:{
	Dialog
    },
    data(){
	return {
	    displayDialog:false,
	    collections:['autores','editoriales','libros'],
	    libros:[],
	    autores:[],
	    editoriales:[],
	    error:null
	}
    },
    methods:{
	openDialog(task, coleccion, record={}){
	    this.displayDialog=true
	    EventBus.$emit('displayDialog', {task, coleccion, record})
	},
	getAutor(id){
	    var autor= this.autores.find((autor)=>autor._id===id);
	    if (autor){
		return `${autor.apellido}, ${autor.nombre}`
	    }
	    return 'No se ha encontrado el autor'
	},
	getEditorial(id){
	    var editorial = this.editoriales.find(editorial=>editorial._id===id)
	    if (editorial){
		return editorial.nombre
	    }
	    return 'No se ha encontrado la editorial'
	},
	async removeRecord(collection, id){
	    var res = await Service.deleteRecord(collection,id);
	    this[collection] = await Service.getRecords(collection);
	}
    },
    created(){
	this.collections.forEach(async(collection)=>{
	    try {
		this[collection] = await Service.getRecords(collection);
	    }catch(e){
		this.error=e;
	    }
	}),
	EventBus.$on('dbSuccess',async  (payload)=>{
	    this.displayDialog=false;
	    this[payload]= await Service.getRecords(payload);
	})
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.btn {
    display:block;
    width:95%
}

h3 {
    width:100%;
    display:block
}

h3 button {
    text-align:right;
}

form label {
    display:block;
    width:100px !important
}

dialog {
    position:absolute;
    z-index:999999999;
    top:25vh
}

dialog::backdrop {
    background-color:rgba(255,255,255,7)
}
</style>
