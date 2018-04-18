import axios from '../axios';
import qs from 'querystring';
import moment from 'moment';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		gradeData:[],
		clazzData:[],
		courseData:[],
		tableData:[],
		pagesData:0, //分页初始化，不能为空字符串，要用0，类型不同会报错。
		hideData:false,
		rateReport:[],//心率名称
	},
	getters:{
		gradeData:state => state.gradeData,
		clazzData:state => state.clazzData,
		courseData:state => state.courseData,
		tableData:state => state.tableData,
		pagesData:state => state.pagesData,
		hideData:state => state.hideData,
		rateReport:state => state.rateReport,
	},
	mutations:{
		allData:(state,val) => {
			state.gradeData = val[0];
			state.courseData = val[1];
		},
		allClazzData:(state,val) => {
			state.clazzData = val[0];
		},
		allTableData:(state,val) => {
			state.tableData = val[1];
			val[1].forEach(function(item){
				let arr = item.stage_rate.split('@');
				for(var k=0;k<arr.length;k++){//为心率值绑定属性名。
					item['rate'+k] = arr[k];
				}
			});
			state.pagesData = (+val[0])*10;
			if(state.pagesData < 10){
				state.hideData = true;
			}else{
				state.hideData = false;
			}
		},
		allRateNameReport:(state,val) => {//为心率设置属性名。
			state.rateReport = [];
			for(var i=3;i<val.length;i++){//不要最低、最高、平均。
				let name = val[i].heartrate_name+'人数';
				let prop = 'rate'+(i-3);//这里的属性名要与上面的属性值中的属性名同名。上面从0开始，这里也是从0开始。
				let obj = {
					name : name,
					prop : prop,
				}
				state.rateReport.push(obj);
			}
		}
	},
	actions:{
		//find:
		findAllData:(context) => {
			axios.post(bp+'/Report/show_headInfo').then(({data})=>{
				context.commit('allData',data);
			});
		},
		//findRateNameStu:
		findRateNameReport:(context) => {
			axios.post(bp+'/manager/get_rateName').then(({data})=>{
				context.commit('allRateNameReport',data);
			});
		},
		//reqClazzData:
		reqClazzData:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_class',qs.stringify(form)).then(({data})=>{
					context.commit('allClazzData',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//queryData:查分页data
		queryData:(context,form) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/Report/show_classReport',qs.stringify(form)).then(({data})=>{
					context.commit('allTableData',data);
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		//reqTableData:
		reqTableData:(context,form) => {
			if(form == undefined){
				return new Promise((resolve,reject)=>{
					axios.post(bp+'/Report/show_classReport').then(({data})=>{
						context.commit('allTableData',data);
						resolve(data);
					}).catch((error)=>{
						reject(error);
					});
				});
			}else{
				if(form.class_start2){
					form.class_start = Date.parse(form.class_start2)/1000;//转为时间戳。
				}
				if(form.class_end2){
					form.class_end = Date.parse(form.class_end2)/1000;
				}
				return new Promise((resolve,reject)=>{
					axios.post(bp+'/Report/show_classReport',qs.stringify(form)).then(({data})=>{
						context.commit('allTableData',data);
						resolve(data);
					}).catch((error)=>{
						reject(error);
					});
				});
			}
		},
	}
}


