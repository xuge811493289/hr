<!-- 手环工具箱 -->
<template>
	<div class="content">
		<!-- 选项卡头部 -->
		<div class="tbl-header">
			<el-tabs v-model="activeName" type="card" @tab-click="tabClick">
		    <el-tab-pane label="添加工具箱" name="addTool"></el-tab-pane>
		    <el-tab-pane label="手环列表" name="circleList"></el-tab-pane>
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
      activeName:'addTool',
		}
	},
	mounted(){//预加载。
		this.$router.push({
      path:path.join('/settings/tools/','addTool'),
    });
	},
  methods:{
  	// 使用编程式路由处理选项卡切换
    tabClick(tab, event) {
      this.$router.push({
        path:path.join('/settings/tools/',tab.name),
      });
    }
  }
}
</script>

<style scoped>
.el-tabs__item {
  font-weight: normal;
  color: rgb(115, 115, 115);
}
</style>