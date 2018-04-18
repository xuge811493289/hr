<!-- 用户设置 -->
<template>
	<div class="content">
		<!-- 选项卡头部 -->
		<div class="tbl-header">
			<el-tabs v-model="activeName" type="card" @tab-click="tabClick">
		    <el-tab-pane label="教师用户" name="teacher" v-if='user_type==2'></el-tab-pane>
		    <el-tab-pane label="学生用户" name="student"></el-tab-pane>
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
      activeName:'teacher',
      user_type:'',
		}
	},
	created(){//页面跳转前。
		this.user_type = sessionStorage.getItem('user_type');
	},
	mounted(){//页面跳转后。
		this.$router.push({
      path:path.join('/settings/users/','teacher'),
    });
    if(this.user_type == 3){//权限限制：让教师用户去默认访问学生信息页面。写在created里有点早，此时变量p为undefined。v-if只能控制选项卡的显示与隐藏，无法控制数据加载，只要手动改变网址，就可以访问管理员的权限。
  		let p = window.location.href.split('users/')[1];
  		if(p == 'teacher'){
  			this.$router.push({
		      path:path.join('/settings/users/','student'),
		    });
  		}
  	}
	},
  methods:{
  	// 使用编程式路由处理选项卡切换
    tabClick(tab, event) {
  		this.$router.push({
        path:path.join('/settings/users/',tab.name),
      });
    },
  },
}
</script>

<style scoped>
.el-tabs__item {
  font-weight: normal;
  color: rgb(115, 115, 115);
}
</style>