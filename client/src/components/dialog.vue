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
	    <input type="text" id="titulo" placeholder="Titulo" v-model="registro.titulo"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="autores">Autor</label>
	    <select id="autores" name="autores" v-model="registro.autor">
	      <option value="" disabled selected>Seleccione el autor</option>
	      <option v-for="(autor, key) in autores" :value="autor._id">{{autor.apellido}}, {{autor.nombre}}</option>
	    </select>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="isbn">ISBN</label>
	    <input type="text" id="isbn" placeholder="ISBN" v-model="registro.isbn"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="editoriales">Editorial</label>
	    <select id="editoriales" name="editoriales" v-model="registro.editorial" placeholder="Seleccione la editorial">
	      <option value="" disabled selected>Seleccione la editorial</option>
	      <option v-for="(editorial, key) in editoriales" :value="editorial._id">{{editorial.nombre}}</option>
	    </select>
	  </div>
	</div>
	<button type="submit" class="primary" @click.prevent="addRecord">Enviar</button>
	<button class="danger" @click.prevent="cancel">Cancelar</button>
      </fieldset>
    </form>
  </dialog>
</div>
</template>

<script>
/* eslint-disable */
import { EventBus } from '../event-bus'
import	Service	 from '../service'

export default {
    name:'Dialog',
    data(){
	return {
	    collections:['autores', 'editoriales'],
	    autores:[],
	    editoriales:[],
	    titulo:'',
	    registro:{},
	    recordID:null,
	    methodType:'',
	    coleccion:''
	}
    },
    methods:{
	cancel(){
	    this.$emit('cancel-action')
	},
	async addRecord(){
	    console.log(this.registro)
	    if (this.methodType=="post"){
		var res = await Service.newRecord(this.coleccion, this.registro)
	    } else {
		var res = await Service.updateRecord({collection:this.coleccion, record:this.registro, id:this.recordID})
	    }
	    if (res.status==201){
		EventBus.$emit('dbSuccess', this.coleccion)
	    }else{
		console.log(res)
	    }

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
	EventBus.$on('displayDialog', (payload)=>{
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
