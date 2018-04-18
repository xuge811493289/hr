import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		course:[],
		cous:[],
	},
	getters:{
		course:state => state.course,
		cous:state => state.cous,
	},
	mutations:{
		allCourse:(state,val) => {
			val[1].forEach(function(item,index){
				item.course_status == 1 ? item.course_status = '启用' : item.course_status = '禁用';
			});
			state.course = val[1];
			state.cous = val[0];
		}
	},
	actions:{
		saveCourse:(context,form) => {
			return new Promise((resolve,reject)=>{
			//add:
				if(form.course_id==undefined){
					axios.post(bp+'/manager/add_course',qs.stringify(form)).then((result)=>{
						// context.dispatch('findAllCourse');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
			//update:
				}else{  
					axios.post(bp+'/manager/update_course',qs.stringify(form)).then((result)=>{
						// context.dispatch('findAllCourse');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
				}
			});
		},
		saveCourseType:(context,form) => {
			return new Promise((resolve,reject)=>{
			//add:
				if(form.course_type_id==undefined){
					axios.post(bp+'/manager/add_course_type',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllCourse');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
			//update:
				}else{  
					axios.post(bp+'/manager/update_course_type',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllCourse');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
				}
			});
		},
		//find:
		findAllCourse:(context) => {
			axios.post(bp+'/manager/show_course').then(({data})=>{
				context.commit('allCourse',data);
			});
		},
		//queryKeys:
		findCourse:(context,cou) => {
			axios.post(bp+'/manager/show_course',qs.stringify(cou)).then(({data})=>{
				context.commit('allCourse',data);
			});
		},
		//delete:
		deleteByIdCourse:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/delete_course',qs.stringify(ids)).then((result)=>{
					// context.dispatch('findAllCourse');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//delete:
		deleteByIdCourseType:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/delete_course_type',qs.stringify(ids)).then((result)=>{
					context.dispatch('findAllCourse');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	},
}
