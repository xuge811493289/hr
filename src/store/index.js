import Vue from 'vue';
import Vuex from 'vuex';
import student from './users/student';
import teacher from './users/teacher';
import clazz from './units/clazz';
import course from './units/course';
import grade from './units/grade';
import unit from './units/unit';
import courseSection from './units/courseSection';
import circle from './settings/circle';
import rate from './settings/rate';
import tools from './settings/tools';
import timeTable from './settings/timeTable';
import clazzMonitor from './clazzMonitor/clazzMonitor';
import clazzBegin from './clazzBegin/clazzBegin';
import bind from './clazzBegin/bind';
import remark from './clazzBegin/remark';
import curve from './reports/curve';
import data from './reports/data';
import err from './reports/err';
import home from './home/home';
import usersClouds from './clouds/usersClouds';
import unitsClouds from './clouds/unitsClouds';

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		student,
		teacher,
		clazz,
		course,
		grade,
		unit,
		courseSection,
		circle,
		rate,
		tools,
		timeTable,
		clazzMonitor,
		clazzBegin,
		curve,
		data,
		err,
		home,
		usersClouds,
		unitsClouds,
		remark,
		bind,
	}
});