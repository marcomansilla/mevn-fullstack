/* eslint-disable */
<template>
<div class="container">
  <h1>Listado de registros disponibles</h1>
  <div class="row">
    <!-- Libros -->
    <div class="col-sm-4">
      <h3>Libros <button class="primary" @click="openDialog('crear','libros')"><i class="fa fa-plus"></i></button></h3>
      <div class="row">
	<div class="card error fluid col-sm-12" v-for="libro in libros">
	  <h4>{{libro.titulo}}</h4>
	  <p><em>Autor: </em> <strong>{{getAutor(libro.autor)}}</strong></p>
	  <p><em>Editorial:</em> <strong>{{getEditorial(libro.editorial)}}</strong></p>
	  <div class="row">
	    <div class="col-lg-6">
	      <button class="primary btn" @click="openDialog('editar','libros', libro)"><i class="fa fa-pencil"></i> Editar</button>
	    </div>
	    <div class="col-sm-6">
	      <button class="danger btn" type="button" @click="removeRecord('libros',libro._id)"><i class="fa fa-trash"></i> Eliminar</button>
	    </div>
	  </div>
	</div>
      </div>
    </div>
    <!-- Autores -->
    <div class="col-sm-4">
      <h3>Autores <button class="primary" @click="openDialog('crear','autores')"><i class="fa fa-plus"></i></button></h3>
      <div class="row">
	<div class="card warning fluid col-sm-12" v-for="autor in autores">
	  <h4>{{autor.apellido}}, {{autor.nombre}}</h4>
	  <p><strong>Nacionalidad: </strong> {{autor.nacionalidad}}</p>
	  <p><strong>E-mail: </strong> <em>{{autor.email}}</em></p>
	  <div class="row">
	    <div class="col-lg-6">
	      <button class="primary btn" @click="openDialog('editar','autores', autor)"><i class="fa fa-pencil"></i> Editar</button>
	    </div>
	    <div class="col-sm-6">
	      <button class="danger btn" type="button" @click="removeRecord('autores',autor._id)"><i class="fa fa-trash"></i> Eliminar</button>
	    </div>
	  </div>
	</div>
      </div>
    </div>
    <!-- Editoriales -->
    <div class="col-sm-4">
      <h3>Editoriales <button class="primary" @click="openDialog('crear','editoriales')"><i class="fa fa-plus"></i></button></h3>
      <div class="row">
	<div class="card success fluid col-sm-12" v-for="editorial in editoriales">
	  <h4>{{editorial.nombre}}</h4>
	  <p><em>Direccion: </em> <strong>{{editorial.direccion}}</strong></p>
	  <p><em>Telefono:</em> <strong>{{editorial.telefono}}</strong></p>
	  <div class="row">
	    <div class="col-lg-6">
	      <button class="primary btn" @click="openDialog('editar','editoriales', editorial)"><i class="fa fa-pencil"></i> Editar</button>
	    </div>
	    <div class="col-sm-6">
	      <button class="danger btn" type="button" @click="removeRecord('editoriales',editorial._id)"><i class="fa fa-trash"></i> Eliminar</button>
	    </div>
	  </div>
	</div>
      </div>
    </div>
  </div>
  <!-- dialog modal experiment -->
  <DialogBook v-show="displayDialogLibros" @cancel-action="displayDialogLibros=false"/>
  <DialogAuthor v-show="displayDialogAutores" @cancel-action="displayDialogAutores=false"/>
  <DialogEditorial v-show="displayDialogEditoriales" @cancel-action="displayDialogEditoriales=false"/>
</div>
</template>

<script>
import { EventBus } from '../event-bus.js'
import {apiRequests} from '../mixins/apiRequests.js'
import DialogBook from './dialogBook'
import DialogAuthor from './dialogAuthors'
import DialogEditorial from './dialogEditorials'

export default {
    mixins:[apiRequests],
    name: 'listado',
    components:{
	DialogBook,
	DialogAuthor,
	DialogEditorial
    },
    data(){
	return {
	    displayDialogLibros:false,
	    displayDialogAutores:false,
	    displayDialogEditoriales:false,
	    error:null
	}
    },
    methods:{
	capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	},
	async openDialog(task, coleccion, registro={}){
	    this[`displayDialog${this.capitalizeFirstLetter(coleccion)}`]=true
	    await EventBus.$emit(`displayDialog${this.capitalizeFirstLetter(coleccion)}`, {task, coleccion, registro})
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
	    var remove = confirm("Confirma que desea eliminar el registro?")
	    if (remove){
		var res = await this.deleteRecord(collection,id);
		this[collection] = await this.getRecords(collection);
	    }
	}
    },
    created(){
	this.collections.forEach(async (coleccion)=>{
	    await EventBus.$on(`${coleccion}Success`,async  (payload)=>{
		this[`displayDialog${this.capitalizeFirstLetter(coleccion)}`]=false;
		this[payload]= await this.getRecords(payload);
	    })
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

.card.success {
    background-color:#689f38;
    color:#fff
}

dialog::backdrop {
    background-color:rgba(255,255,255,7)
}
</style>
