import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		clazz:[],
		grades:[],
		teachs:[],
		rateClazzSetting:[],
	},
	getters:{
		clazz:state => state.clazz,
		grades:state => state.grades,
		teachs:state => state.teachs,
		rateClazzSetting:state => state.rateClazzSetting,
	},
	mutations:{
		allClazz:(state,val) => {
			val[1].forEach(function(item,index){
				item.class_status == 1 ? item.class_status = '启用' : item.class_status = '禁用';
				let arr = item.rate.split(',');
				for(var k=0;k<arr.length;k++){//为心率值绑定属性名。
					item['rate'+k] = arr[k];
				}
			});
			state.clazz = val[1];
			state.grades = val[0];
			state.teachs = val[2];
		},
		allRateNameClazz:(state,val) => {//为心率设置属性名。
			state.rateClazzSetting = [];
			for(var i=0;i<val.length;i++){
				let name = val[i].heartrate_name;
				let prop = 'rate'+i;
				let obj = {
					name : name,
					prop : prop,
				}
				state.rateClazzSetting.push(obj);
			}
		}
	},
	actions:{
		saveClazz:(context,form) => {
			return new Promise((resolve,reject)=>{
			//add:
				if(form.class_id==undefined){//如果id不存在，执行添加。
					axios.post(bp+'/manager/add_class',qs.stringify(form)).then((result)=>{
						// context.dispatch('findClazz');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
			//update:
				}else{  //否则执行修改。
					axios.post(bp+'/manager/update_class',qs.stringify(form)).then((result)=>{
						// context.dispatch('findClazz');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
				}
			});
		},
		//findRateNameClazz:
		findRateNameClazz:(context) => {
			axios.post(bp+'/manager/get_rateName').then(({data})=>{
				context.commit('allRateNameClazz',data);
			});
		},
		//find:
		findAllClazz:(context) => {
			axios.post(bp+'/manager/show_class').then(({data})=>{
				context.commit('allClazz',data);
			});
		},
		//queryKeys:
		findClazz:(context,form) => {
			axios.post(bp+'/manager/show_class',qs.stringify(form)).then(({data})=>{
				context.commit('allClazz',data);
			});
		},
		//delete:
		deleteByIdClazz:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/delete_class',qs.stringify(ids)).then((result)=>{
					// context.dispatch('findClazz');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		batchSaveClazz:(context,obj) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/batchAdd_class',qs.stringify(obj)).then((result)=>{
					// context.dispatch('findClazz');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	}
}


