import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		grade:[],//年级
		reqGreade:0,
	},
	getters:{
		grade:state => state.grade,
		reqGreade:state=>state.reqGreade,
	},
	mutations:{
		allGrade:(state,val) => {
			val.forEach(function(item,index){
				item.grade_status == 1 ? item.grade_status = '启用' : item.grade_status = '禁用';
				item.grade_graduation == 1 ? item.grade_graduation = '是' : item.grade_graduation = '否';
			});
			state.grade = val;
		},
		allReq:(state,val)=>{
			state.reqGreade=val;
		}
	},
	actions:{
		saveGrade:(context,form) => {
		//	row.grade_status=='启用' ? row.grade_status='1' : row.grade_status='2';
    //  row.grade_graduation=='是' ? row.grade_graduation='1' : row.grade_graduation='2';
			return new Promise((resolve,reject)=>{
			//add:
				if(form.grade_id==undefined){//如果id不存在，执行添加。
					axios.post(bp+'/manager/add_grade',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllGrade');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
			//update:
				}else{  //否则执行修改。
					axios.post(bp+'/manager/update_grade',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllGrade');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
				}
			});
		},
		//find:
		findAllGrade:(context) => {
			axios.post(bp+'/manager/show_grade').then(({data})=>{
				context.commit('allGrade',data);
			});
		},
		//queryKeys:
		findGrade:(context,grade) => {
			axios.post(bp+'/manager/show_grade',qs.stringify(grade)).then(({data})=>{
				context.commit('allGrade',data);
			});
		},
		//delete:
		deleteByIdGrade:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/delete_grade',qs.stringify(ids)).then((result)=>{
					context.dispatch('findAllGrade');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		reqGrade:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/get_bigGrade',qs.stringify(form)).then(({data})=>{
					context.commit('allReq',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
	}
}


//所有返回按钮都要处理状态码和文字。


