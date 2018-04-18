import axios from '../axios';
import qs from 'querystring';
import moment from 'moment';
import $ from 'jquery';
import cg from '../configure.js';
var bp = cg.bp;
var tid,utype;

export default {
	state:{
	//后台：
		courseBegin:[],//课程类型
		clazzBegin:[],//班级
		gradeBegin:[],//年级
		toolBegin:[],//工具箱
		rateBegin2:[],//班级基础心率数据
		rateBegin3:[],//班级阶段心率数据
		noBind:[],// 修改手环
		flagBegin:false,
	},
	getters:{
		gradeBegin:state => state.gradeBegin,
		clazzBegin:state => state.clazzBegin,
		toolBegin:state => state.toolBegin,
		courseBegin:state => state.courseBegin,
		rateBegin2:state => state.rateBegin2,
		rateBegin3:state => state.rateBegin3,
		// 修改手环
		noBind:state=>state.noBind,
		flagBegin:state=>state.flagBegin,
	},
	mutations:{
		show_headGrade:(state,val) => {//年级。
			state.gradeBegin = val;
		},
		show_headCourse:(state,val) => {//课程。
			state.courseBegin = val;
		},
		allClazzB:(state,val) => {//班级名称、id
			state.clazzBegin = val[0];
			sessionStorage.setItem('school_prefix',val[1]);
		},
		allToolB:(state,val) => {//工具箱名称、id
			state.toolBegin = val;
		},
		allRateCurveB:(state,val) => {//班级心率
			state.rateBegin2 = [];//清空。
      state.rateBegin3 = [];
			for(var i=0;i<3;i++){
				state.rateBegin2.push(val[0][i].name+'：'+val[0][i].value);
			}
			for(var i=3;i<val[0].length;i++){
				state.rateBegin3.push(val[0][i]);
			}
			val[0].length > 6 ? state.flagBegin = true : state.flagBegin = false;
		},
		// 修改手环
		allBCh:(state,val)=>{
			state.noBind = val;	
		},
	},
	actions:{
		requestCourse:(context,form) => {
			if(utype == 2){
				return new Promise((resolve,reject)=>{
					axios.post(bp+'/Report/show_headCourse',qs.stringify(form)).then(({data})=>{
						context.commit('show_headCourse',data);
					});
				}).catch((error)=>{
					reject(error);
				});
			}else if(utype == 3){
				form.teach_id = tid;
				return new Promise((resolve,reject)=>{
					axios.post(bp+'/Report/show_teachCourse',qs.stringify(form)).then(({data})=>{
						context.commit('show_headCourse',data);
					});
				}).catch((error)=>{
					reject(error);
				});
			}
		},
		//find:
		findAllClazzBegin:(context) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_headGrade').then(({data})=>{
					context.commit('show_headGrade',data);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
		//queryKeys:
		findClazzBegin:(context,form) => {
			form.teach_id = tid;
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_headGrade',qs.stringify(form)).then(({data})=>{
					context.commit('show_headGrade',data);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
	//请求班级：
		reqClazzBegin:(context,form) => {
			function get(){
				tid = sessionStorage.getItem('teach_id');
				utype = sessionStorage.getItem('user_type');
			}
			get();
			if(utype == 2){
				return new Promise((resolve,reject)=>{
					axios.post(bp+'/Report/show_class',qs.stringify(form)).then(({data})=>{
						context.commit('allClazzB',data);
						resolve(data);
					}).catch((error)=>{
						reject(error);
					});
				}).catch((error)=>{
					reject(error);
				});
			}else if(utype == 3){
				form.teach_id = tid;
				return new Promise((resolve,reject)=>{
					axios.post(bp+'/Report/show_teachClass',qs.stringify(form)).then(({data})=>{
						context.commit('allClazzB',data);
						resolve(data);
					}).catch((error)=>{
						reject(error);
					});
				}).catch((error)=>{
					reject(error);
				});
			}
		},
	//请求工具箱：
		reqToolBegin:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_tools',qs.stringify(form)).then(({data})=>{
					context.commit('allToolB',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
	//reqClazzHeart:班级最高心率等
		reqClazzHeartBegin:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_classStartHeartRate',qs.stringify(form)).then(({data})=>{
					context.commit('allRateCurveB',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			}).catch((error)=>{
				reject(error);
			});
		},
		// 修改手环
		reqBeginChange:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_noBind',qs.stringify(form)).then(({data})=>{
					context.commit('allBCh',data);
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

