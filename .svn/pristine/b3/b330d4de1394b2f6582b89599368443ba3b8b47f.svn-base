// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import JpUI from './components';
import ElTreeGrid from 'element-tree-grid';

import store from './store';

import 'font-awesome/css/font-awesome.css'
//引入ztree插件
import './plugins/zTree/jquery.ztree.all-3.5.min.js'
import './plugins/zTree/zTreeStyle/zTreeStyle.css'

Vue.config.productionTip = false

/*
	注册组件
*/
//饿了么组件
Vue.use(ElementUI);
//treeGrid插件库
Vue.component(ElTreeGrid.name,ElTreeGrid);
//杰普组件
Vue.use(JpUI);

/* 
	自定义样式
*/
import './css/index.css';

/*
	实例化Vue根对象
*/
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

