import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		bind:[],//展示表格
		clazzBind:[],//班级
		gradeBind:[],//年级
		toolsBind:[],//工具箱
	},
	getters:{
		bind:state => state.bind,
		clazzBind:state => state.clazzBind,
		gradeBind:state => state.gradeBind,
		toolsBind:state => state.toolsBind,
	},
	mutations:{
		allBind:(state,val) => {
			val.forEach(function(item){
				item.stu_gender = item.stu_gender == 1 ? item.stu_gender = '女' : item.stu_gender = '男';
			})
			state.bind = val;
		},
		allGrade:(state,val) => {
			state.gradeBind = val[0];
		},
		allTool:(state,val) => {
			state.toolsBind = val;
		},
		allClass:(state,val) => {
			state.clazzBind = val;
		},
	},
	actions:{
		//findGrade:
		findGradeBind:(context) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_headInfo').then(({data})=>{
					context.commit('allGrade',data);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
		//findAll:
		findAllBind:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_bind',qs.stringify(form)).then(({data})=>{
					context.commit('allBind',data);
					resolve(data);
				}).catch(function(error){
					reject(error);
				});
			});
		},
		//findAll:
		findAllBindAsync:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_bind',qs.stringify(form)).then(({data})=>{
					context.commit('allBind',data);
					resolve(data);
				}).catch(function(error){
					reject(error);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
		//findTool:
		findToolBind:(context) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_tools').then(({data})=>{
					context.commit('allTool',data);
				});	
			}).catch((error)=>{
				reject(error);
			});
		},
		//findClass:
		findClazzBind:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_class',qs.stringify(form)).then(({data})=>{
					context.commit('allClass',data);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
		//绑定成功执行findAllBind
		bind_hand:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/bind_hand',qs.stringify(form)).then((result)=>{
					resolve(result);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
		//保存修改的手环
		updateBind:(context,form) => {//带着token请求数据。
			console.log(form);
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/update_bind',qs.stringify(form)).then((result)=>{
					// context.commit('findAllBind');
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//delete:
		deleteBind:(context,form) => {//带着token请求数据。
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/delete_bind',qs.stringify(form)).then((result)=>{
					resolve(result.data);//去data里拿到code
				}).catch((error)=>{
					reject(error);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
	}
}
