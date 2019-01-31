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

    // delete record
    static async deleteRecord(collection, id){
	await axios.delete(`${url}${collection}/${id}`).then(res=>{status:204}).catch(e=>console.log(e));
    }
    // update record
}

export default Service ;
