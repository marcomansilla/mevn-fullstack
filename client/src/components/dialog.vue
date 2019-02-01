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
	    <label for="autor">Autor</label>
	    <input type="text" id="autor" placeholder="Autor" v-model="registro.autor"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="isbn">ISBN</label>
	    <input type="text" id="isbn" placeholder="ISBN" v-model="registro.isbn"/>
	  </div>
	  <div class="col-sm-12 col-md-6">
	    <label for="editorial">Editorial</label>
	    <input type="text" id="editorial" placeholder="Editorial" v-model="registro.editorial"/>
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
	    titulo:'',
	    registro:{
		titulo:'',
		isb:'',
		autor:'',
		editorial:'',
	    },
	    methodType:'',
	    coleccion:''
	}
    },
    methods:{
	cancel(){
	    this.$emit('cancel-action')
	},
	async addRecord(){
	    if (this.methodType=="post"){
		var res = await Service.newRecord(this.coleccion, this.registro)
	    } else {
		var res = await Service.update(this.coleccion, id, this.registro)
	    }
	    if (res.status==201){
		EventBus.$emit('dbSuccess', this.coleccion)
	    }
	}
    },
    created(){
	EventBus.$on('displayDialog', (data)=>{
	    if (data.task==='crear'){
		this.titulo="Agregar registro";
		this.methodType='post';
	    }else{
		this.titulo="Editar registro";
		this.registro=data.registro;
		this.methodType='put'
	    }
	    this.coleccion=data.coleccion
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
