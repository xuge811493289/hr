import axios from '../axios';
import qs from 'querystring';
import moment from 'moment';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		gradeCurve:[],
		clazzCurve:[],
		courseCurve:[],
		rateCurve2:[],//基础心率
		rateCurve3:[],//阶段心率
		stuList:[],
		clazzTimeCurve:[],
		curveClazzR:[],
		curvePersonR:[],
		flag:false,
	},
	getters:{
		gradeCurve:state => state.gradeCurve,
		clazzCurve:state => state.clazzCurve,
		courseCurve:state => state.courseCurve,
		rateCurve2:state => state.rateCurve2,
		rateCurve3:state => state.rateCurve3,
		stuList:state => state.stuList,
		clazzTimeCurve:state => state.clazzTimeCurve,
		curveClazzR:state => state.curveClazzR,
		curvePersonR:state => state.curvePersonR,
		flag:state => state.flag,
	},
	mutations:{
		allCurve:(state,val) => {
			state.gradeCurve = val[0];//年级
			state.courseCurve = val[1];//课程
		},
		allClazzCurve:(state,val) => {
			state.clazzCurve = val[0];//班级
		},
		allRateCurve:(state,val) => {
			state.rateCurve2 = [];//清空。
      state.rateCurve3 = [];
			for(var i=0;i<3;i++){
				state.rateCurve2.push(val[0][0][i].name+'：'+val[0][0][i].value);
			}
			for(var i=3;i<val[0][0].length;i++){
				state.rateCurve3.push(val[0][0][i]);
			}
			val[0][0].length > 6 ? state.flag = true : state.flag = false;
			state.stuList = val[1];
			state.clazzTimeCurve = val[2];
		},
		allClazzCurveR:(state,val) => {//班级曲线数据。
			if(val){
				state.curveClazzR = val;
			}
		},
		allPersonCurveR:(state,val) => {//个人曲线数据。
			if(val){
				state.curvePersonR = val;
			}
		},
	},
	actions:{
		//find:
		findAllCurve:(context) => {
			axios.post(bp+'/Report/show_headInfo').then(({data})=>{
				context.commit('allCurve',data);
			});
		},
		//queryKeys:
		findCurve:(context,form) => {
			axios.post(bp+'/Report/show_headInfo',qs.stringify(form)).then(({data})=>{
				context.commit('allCurve',data);
			});
		},
		//reqClazz:
		reqClazzCurve:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_class',qs.stringify(form)).then(({data})=>{
					context.commit('allClazzCurve',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//reqClazzHeart:班级最高心率等
		reqClazzHeartCurve:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_classHeartRate',qs.stringify(form)).then(({data})=>{
					context.commit('allRateCurve',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	//请求数据报表班级曲线数据：
		reqClazzCurveReport:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_Report',qs.stringify(form)).then(({data})=>{
					context.commit('allClazzCurveR',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	//请求数据报表个人曲线数据：
		reqPersonCurveReport:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/get_personReport',qs.stringify(form)).then(({data})=>{
					context.commit('allPersonCurveR',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	}
}

		/*
			form.date1 = date(form.date1);
			form.date2 = date(form.date2);
			function date(time){
				if(time == undefined){
					time = '1996-06-06';
				}else if(time){
					time = moment(time).format('YYYY-MM-DD');
				}
			}
		*/