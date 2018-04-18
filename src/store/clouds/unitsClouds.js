import axios from '../axios';
import qs from 'querystring';
import cg from '../configure.js';
var bp = cg.bp;

export default {
	state:{
		unitCloud:[],//所有信息。
		unitCloudUpper:[],//上级单位
		unitCloudLevel:[],//单位级别
	},
	getters:{
		unitCloud:state => state.unitCloud,
		unitCloudUpper:state => state.unitCloudUpper,
		unitCloudLevel:state => state.unitCloudLevel,
		unitCloudTree:function(state){
			var result = [];
			//处理第一梯队数据，将level_id 为1的和父ID为0的设置为第一梯队数据
			state.unitCloud.forEach((item)=>{
				if(item.level_id == 1 || item.pId == 0){
					result.push(item);
				}
			});
			//处理第二梯队数据，为第一梯队数据添加子节点
			result.forEach((one)=>{
				state.unitCloud.forEach((item)=>{
					if(item.pid!=0 && (one.id == item.pid)){
						if(!one.children){
							one.children = [];
						}
						item.parent_id = item.pid;
						one.children.push(item);
					}
				});
			});
			//处理第三梯队数据
			result.forEach((one)=>{
				if(one.children){
					one.children.forEach((two)=>{
						state.unitCloud.forEach((item)=>{
							if(item.pid!=0 && (two.id == item.pid)){
								if(!two.children){
									two.children = [];
								}
								item.parent_id = item.pid;
								two.children.push(item);
							}
						});
					});
				}
			});	
			//处理第四梯队数据
			result.forEach((one)=>{
				if(one.children){
					one.children.forEach((two)=>{
						if(two.children){
							two.children.forEach((three)=>{
								state.unitCloud.forEach((item)=>{
									if(item.pid!=0 && (three.id == item.pid)){
										if(!three.children){
											three.children = [];
										}
										item.parent_id = item.pid;
										three.children.push(item);
									}
								});
							});
						}
					});
				}
			});
			return result;
		}
		
		/*
		unitCloudTree:function(state){
			var result = [];
			state.unitCloud.forEach((item)=>{
				if(item.level_id == 1 || item.pId == 0){
					//设置第一层数据
					result.push(item);
				} else if (item.level_id == 2){
					//为第一层数据设置内层数据
					result.forEach((two_item)=>{
						if(two_item.id == item.pid){
							if(!two_item.children){
								two_item.children = [];
							}
							item.parent_id = item.pid;
							two_item.children.push(item);
						}
					});
				} else if(item.level_id == 3){
					//为第二次数据设置内层数据
					result.forEach((two_item)=>{
						if(two_item.children){
							two_item.children.forEach((three_item)=>{
								if(three_item.id == item.pid){
									if(!three_item.children){
										three_item.children = [];
									}
									item.parent_id =item.pid;
									three_item.children.push(item);
								}
							});
						}
					});
				} else if(item.level_id == 4){
					result.forEach((two_item)=>{
						if(two_item.children){
							two_item.children.forEach((three_item)=>{
								if(three_item.children){
									three_item.children.forEach((four_item)=>{
										if(four_item.id == item.pid){
											if(!four_item.children){
												four_item.children = [];
											}
											item.parent_id =item.pid;
											four_item.children.push(item);
										}
									});
								}
							});
						}
					});
				}
			});
			return result;
		}
		*/
	},
	mutations:{
		allUnitCloud:(state,val) => {
			val[0].forEach(function(item,index){
				item.unit_status == 1 ? item.unit_status = '启用' : item.unit_status = '禁用';
				item.pId = item.pid;
				item.open=false;
			});
			state.unitCloud = val[0];
			state.unitCloudUpper = val[1];
			state.unitCloudLevel = val[2];
		}
	},
	actions:{
		saveUnitClouds:(context,form) => {
			return new Promise((resolve,reject)=>{
			//add:
				if(form.unit_id==undefined){//如果id不存在，执行添加。
					axios.post(bp+'/clouds/add_unit',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllUnitClouds');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
			//update:
				}else{  //否则执行修改。
					axios.post(bp+'/clouds/update_unit',qs.stringify(form)).then((result)=>{
						context.dispatch('findAllUnitClouds');//刷新。
						resolve(result);
					}).catch((error)=>{
						reject(error);
					});
				}
			});
		},
		//find:
		findAllUnitClouds:(context) => {
			axios.post(bp+'/clouds/get_unit').then(({data})=>{
				console.log('数据')
				context.commit('allUnitCloud',data);
			});
		},
		//find:
		findAllUnitCloudsAsync:(context) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/clouds/get_unit').then(({data})=>{
					context.commit('allUnitCloud',data);
					resolve();
				}).catch(()=>{
					reject();
				});
			})
		},
		//queryKeys:
		findUnitClouds:(context,form) => {
			axios.post(bp+'/clouds/show_unit',qs.stringify(form)).then(({data})=>{
				context.commit('allUnitCloud',data);
			});
		},
		//delete:
		deleteByIdUnitClouds:(context,ids) => {
			return new Promise((resolve,reject)=>{
				axios.post(bp+'/clouds/delete_unit',qs.stringify(ids)).then((result)=>{
					context.dispatch('findAllUnitClouds');//刷新。
					resolve(result);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
	}
}


