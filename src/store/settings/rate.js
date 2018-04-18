import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		param2:[],
		param3:[],
	},
	getters:{
		param2:state => state.param2,
		param3:state => state.param3,
	},
	mutations:{
		allRate:(state,val) => {
			state.param2 = val[0];
			state.param3 = val[1];
		}
	},
	actions:{
		saveRate:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/add_heartrate_refer',qs.stringify(form)).then((result)=>{
					context.dispatch('findAllRate');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		updateRate:(context,arr) => {
			return new Promise((resolve,reject)=>{
				for(var i=0;i<arr.length;i++){
					axios.post(bp+'/manager/update_heartrate_refer',qs.stringify(arr[i])).then((result)=>{
						context.dispatch('findAllRate');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
				}
			});
		},
		//find:
		findAllRate:(context) => {
			axios.post(bp+'/manager/show_heartrate_refer').then(({data})=>{
				context.commit('allRate',data);
			});
		},
		//queryKeys:
		findRate:(context,Rate) => {
			axios.post(bp+'/manager/show_heartrate_refer',qs.stringify(Rate)).then(({data})=>{
				context.commit('allRate',data);
			});
		},
		//delete:
		deleteByIdRate:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/delete_heartrate_refer',qs.stringify(ids)).then((result)=>{
					context.dispatch('findAllRate');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	}
}


