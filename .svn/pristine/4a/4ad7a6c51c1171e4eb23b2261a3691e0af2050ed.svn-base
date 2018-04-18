import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		subject:[],   //课程类型数据
		teach:[],     //教师、班级、课程类型混合数据
		clazzsTime:[],//班级数据
		gradesTime:[],//年级数据
		teachList:[], //教师数据
		hh:[],        //班级、课程类型对应的教师。
	},
	getters:{
		subject:state => state.subject,
		teach:state => state.teach,
		gradesTime:state => state.gradesTime,
		clazzsTime:state => state.clazzsTime,
		teachList:state => state.teachList,
		hh:state => state.hh,
	},
	mutations:{
		allTimeTable:(state,val) => {
			state.subject = val[0];
			state.gradesTime = val[1];
			state.clazzsTime = val[2];
			state.teach = val[3];
			state.teachList = val[4];
			if(state.clazzsTime){
				var len = state.clazzsTime.length;
				for(var i=0;i<len;i++){
	        state.hh[i] = new Array();
	      }
	      var len2 = state.subject.length;
	      for(var i=0;i<len;i++){
	        for(var j=0;j<len2;j++){
	          var x = i*len2 + j;
	          state.hh[i][j] = state.teach[x].teach_name;
	        }
	      }
			}
		}
	},
	actions:{
		saveTimeTable:(context,form) => {
			var str = form.class_id+'@'+form.course_type_id+'@'+form.teach_ids;
			return new Promise((resolve,reject)=>{
			//add$update:
				axios.get(bp+'/manager/add_subject',{params:qs.stringify({ids:str})}).then((result)=>{
					context.dispatch('findAllTimeTable');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
				/*axios.post(bp+'/manager/add_subject',qs.stringify({ids:str})).then((result)=>{
					context.dispatch('findAllTimeTable');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});*/
			});
		},
		//find:
		findAllTimeTable:(context) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/show_subject').then(({data})=>{
					context.commit('allTimeTable',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//queryKeys:
		findTimeTable:(context,timeTable) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/show_subject',qs.stringify(timeTable)).then(({data})=>{
					context.commit('allTimeTable',data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	/*	//delete:
		deleteByIdTimeTable:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/manager/delete_subject',qs.stringify(ids)).then((result)=>{
					context.dispatch('findAllTimeTable');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},*/
	}
}


