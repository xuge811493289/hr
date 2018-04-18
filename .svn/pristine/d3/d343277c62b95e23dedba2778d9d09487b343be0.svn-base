import axios from '../axios';
import qs from 'querystring';
import moment from 'moment';
import $ from 'jquery';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		courseMonitor:[],//课程
		clazzMonitor:[],//班级
		gradeMonitor:[],//年级
		toolMonitor:[],//工具箱
		rateMonitor:[],//心率
	},
	getters:{
		gradeMonitor:state => state.gradeMonitor,
		clazzMonitor:state => state.clazzMonitor,
		toolMonitor:state => state.toolMonitor,
		courseMonitor:state => state.courseMonitor,
		rateMonitor:state => state.rateMonitor,
	},
	mutations:{
		allClazzMonitor:(state,val) => {//年级、课程。
			state.gradeMonitor = val[0];
			state.courseMonitor = val[1];
		},
		allClazzM:(state,val) => {//班级名称、id
			state.clazzMonitor = val;
		},
		allToolM:(state,val) => {//工具箱名称、id
			state.toolMonitor = val;
		},
		allRateCurveM:(state,val) => {//班级心率
			state.rateMonitor = val;
		},
	},
	actions:{
		//find:
		findAllClazzMonitor:(context) => {
			axios.post(bp+'/Report/show_headInfo').then(({data})=>{
				context.commit('allClazzMonitor',data);
			});
		},
		//queryKeys:
		findClazzMonitor:(context,form) => {
			axios.post(bp+'/Report/show_headInfo',qs.stringify(form)).then(({data})=>{
				context.commit('allClazzMonitor',data);
			});
		},
	//请求工具箱：
		reqToolMonitor:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_tools',qs.stringify(form)).then(({data})=>{
					context.commit('allToolM',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	//请求班级：
		reqClazzMonitor:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_class',qs.stringify(form)).then(({data})=>{
					context.commit('allClazzM',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	//reqClazzHeart:班级最高心率等
		reqClazzHeartMonitor:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_classStartHeartRate',qs.stringify(form)).then(({data})=>{
					context.commit('allRateCurveM',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	},
}


