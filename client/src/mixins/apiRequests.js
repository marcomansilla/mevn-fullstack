import axios from "axios";
import { EventBus } from '../event-bus';

export const apiRequests = {
    data(){
	return {
	    collections:['autores','editoriales','libros'],
	    registro:{},
	    recordID:null,
	    methodType:'',
	    coleccion:'',
	    libros:[],
	    autores:[],
	    editoriales:[],
	    url : 'api/'
	};
    },
    methods:{
	async addOrUpdateRecord(){
	    var res = [];
	    if (this.methodType=="post"){
		res = await this.newRecord(this.coleccion, this.registro);
	    } else {
		res = await this.updateRecord({collection:this.coleccion, record:this.registro, id:this.recordID});
	    }
	    if (res.status==201){
		EventBus.$emit(`${this.coleccion}Success`, this.coleccion);
		this.registro={};
	    }else{
		console.log(res);
	    }
	},
	cancel(){
	    this.$emit('cancel-action');
	    this.registro={};
	},
	// get data
	async getRecords(collection){
	    var data=[];
	    await axios.get(`${this.url}${collection}`).then((res)=>{
		data=res.data;
	    }).catch((err)=>{
		data = err;
	    });
	    return data;
	},
	// MAIN API
	// create record
	async newRecord(collection, payload){
	    var data = [];
	    await axios.post(`${this.url}${collection}`, payload)
		.then(res=>{
		    data=res;
		})
		.catch(error=>console.log(error));
	    return data;
	},
	// delete record
	async deleteRecord(collection, payload){
	    var data=[];
	    await axios.delete(`${this.url}${collection}/${payload}`).then(res=>data=res).catch(e=>data=e);
	    return data;
	},
	// update record
	async updateRecord(payload){
	    var data = [];
	    await axios.put(`${this.url}${payload.collection}/${payload.id}`, payload.record)
		.then((res)=>{
		    data=res;
		})
		.catch(error=>console.log(error));
	    return data;
	}
    },
    created(){
	this.collections.forEach(async(collection)=>{
	    try {
		this[collection] = await this.getRecords(collection);
	    }catch(e){
		this.error=e;
	    }
	});
    }
};

//export default apiRequests;
