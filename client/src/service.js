/* eslint-disable*/

import axios from "axios";

const url = 'http://localhost:3000/api/';

class Service {
    // get data
    static async getRecords(collection){
	var data=[];
	await axios.get(`${url}${collection}`).then((res)=>{
	    data=res.data;
	}).catch((err)=>{
	    data = err;
	});
	return data;
    }
    // create record
    static async newRecord(collection, payload){
	var data = [];
	await axios.post(`${url}${collection}`, payload)
	    .then(res=>{
		data=res;
	    })
	    .catch(error=>console.log(error));
	return data;
    }
    // delete record
    static async deleteRecord(collection, payload){
	await axios.delete(`${url}${collection}/${payload}`).then(res=>{status:204}).catch(e=>console.log(e));
    }
    // update record
    static async updateRecord(payload){
	var data = [];
	await axios.put(`${url}${payload.collection}/${payload.id}`, payload.record)
	    .then((res)=>{
		data=res;
	    })
	    .catch(error=>console.log(error));
	return data;
    }
}

export default Service ;
