import {Service} from '../service.js';
import { EventBus } from '../event-bus.js';

export const apiRequests = {
    data(){
	return {
	    registro:{},
	    recordID:null,
	    methodType:'',
	    coleccion:''
	};
    },
    methods:{
	async addOrUpdateRecord(){
	    var res = [];
	    console.log(this.registro);
	    if (this.methodType=="post"){
		res = await Service.newRecord(this.coleccion, this.registro);
	    } else {
		res = await Service.updateRecord({collection:this.coleccion, record:this.registro, id:this.recordID});
	    }
	    if (res.status==201){
		EventBus.$emit('dbSuccess', this.coleccion);
	    }else{
		console.log(res);
	    }
	},
	cancel(){
	    this.$emit('cancel-action');
	    this.registro={};
	}
    }
};

//export default apiRequests;
