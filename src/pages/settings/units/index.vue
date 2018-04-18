<!-- 平台设置-单位设置 -->
<template>
	<div class="content">
		<!-- 选项卡头部 -->
		<div class="tbl-header">
			<el-tabs v-model="activeName" type="card" @tab-click="tabClick">
		    <el-tab-pane label="单位信息" name="unitInfo" v-if='user_type==2'></el-tab-pane>
		    <el-tab-pane label="课程设置" name="courseSetting" v-if='user_type==2'></el-tab-pane>
		    <el-tab-pane label="年级设置" name="gradeSetting" v-if='user_type==2'></el-tab-pane>
		    <el-tab-pane label="班级设置" name="clazzSetting"></el-tab-pane>
		    <el-tab-pane label="上课节次" name="courseSection" v-if='user_type==2'></el-tab-pane>
		  </el-tabs>
		</div>
		<!-- 选项卡体部 -->
	  <div class="tbl-content">
	  	<router-view></router-view>
	  </div>
	</div>
</template>
<script>
import path from 'path';
export default {
 	data(){
		return {
			name:'基础数据',
      activeName:'unitInfo',
      user_type:'',
		}
	},
	created(){
		this.user_type = sessionStorage.getItem('user_type');
	},
	mounted(){//预加载。
		this.$router.push({
      path:path.join('/settings/units/','unitInfo'),
    });
    if(this.user_type == 3){//权限限制：让教师用户去默认访问班级信息页面。
  		let p = window.location.href.split('units/')[1];
  		if(p != 'clazzSetting'){
  			this.$router.push({
		      path:path.join('/settings/units/','clazzSetting'),
		    });
  		}
  	}
	},
  methods:{
  	// 使用编程式路由处理选项卡切换
    tabClick(tab, event) {
      this.$router.push({
        path:path.join('/settings/units/',tab.name),
      });
    }
  }
}
</script>

<style>
.el-tabs__item.is-active ,.el-tabs__item:hover{
    color: #448db8;
}
.el-tabs__item {
    font-weight: normal;
    color: rgb(115, 115, 115);
}
</style>