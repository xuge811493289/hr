<template>
	<div class="list">
		<el-row class='rowTop'>
		  <el-col :span="14">
        <el-form inline :model='options' size='mini'>
          <el-row>
            <el-col :span='6'>
              <el-form-item>
                <el-select clearable v-model="options.tools_id" placeholder="请选择工具箱">
                  <el-option v-for="item in toolsCircle" :label="item.tools_name" :value="item.tools_id" :key="item.tools_id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item>
                <el-button type='info' size='small' @click='query' class="search"><!-- <i class="fa fa-search"></i> -->&nbsp;查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
		  </el-col>
		  <el-col :span="10">
        <el-row type='flex' justify='end'>
          <el-form inline size='mini'>
            <el-col :span='7'>
              <el-form-item>
                <el-button type="info" size='small' @click='single2' class="add"><!-- <i class="fa fa-plus"></i> -->新增</el-button>
              </el-form-item>
            </el-col>
            <el-col :span='9'>
              <el-form-item>
                <el-button type="info" size='small' @click='batch2' class="adds"><!-- <i class="fa fa-plus-circle"></i> -->批量导入</el-button>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
                 <el-form-item>
                  <el-button type="info" size='small' @click='batchDelete' class="delete"><!-- <i class="fa fa-remove"></i> -->批量删除</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
		  </el-col>
		</el-row>	 
    
		<el-table :data="circle"  style="width:100%" border stripe :header-row-style="rowClass" size='mini' @selection-change="selectChange" align='center' :height='height' ref="table" @row-click='toggleSelection'>
			<el-table-column type="selection" align='center'></el-table-column>
			<el-table-column type='index' label="序号" width='60' align='center'></el-table-column>
      <el-table-column prop='handler_id' label="handler_id" v-if='false' align='center'></el-table-column>
      <el-table-column prop='tools_id' label="tools_id" v-if='false' align='center'></el-table-column>
      <!-- <el-table-column prop='tools_name' label="工具箱名称" align='center'></el-table-column> -->
      <el-table-column prop="handler_number" label="手环编号" align='center'></el-table-column>
      <el-table-column prop="handler_status" label="启用状态" align='center'></el-table-column>
      <el-table-column label="操作" align='center' width="120">
        <template slot-scope='scope'>
          <i class="options fa fa-edit" @click="edit2(scope.$index, scope.row)"></i>
          <i class="options fa fa-trash" @click="delete2(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>  
    <!-- <div class='coll'></div>
    <div class="block page" :hidden='hideCircle'>
      <el-pagination @current-change="currentChangeCircle"
        layout="prev,pager,next"
        :total="pagesCircle">
      </el-pagination>
    </div> -->
	
		<el-dialog :visible.sync="visible2" center>
      <div slot="title" class="dialog-title">
        {{title2}}
      </div>
      <el-form :model="form2" :rules='rules' class='demo-ruleForm dialog' ref='form2' size='mini'>
        <!-- <el-form-item label="序号" :label-width="fw">
          <el-input v-model="form2.num" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="手环编号" :label-width="fw" prop='handler_number'>
          <el-input v-model="form2.handler_number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="启用状态" :label-width="fw" prop='handler_status'>
          <el-radio-group v-model="form2.handler_status">
            <el-radio label="启用">启用</el-radio>
            <el-radio label="禁用">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle2" size='mini'>取 消</el-button>
        <el-button type="info" @click="submit2('form2')" class="yes" size='mini'>确 定</el-button>
      </div>
    </el-dialog> 
    <el-dialog :visible.sync="visible2s" center>
      <div slot="title" class="dialog-title">
        {{title2s}}
      </div>
      <el-form :model="form2s" class='dialog3' size='mini'>
        <el-row>
          <el-col :span='6'>
            <el-form-item label="">
              <el-row type='flex' justify='end'>
                <el-button type='info' size='mini' @click='download' class="download">下载模版</el-button>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span='18'>
            <el-form-item label="">
              <!-- <el-upload class="upload-demo" ref="upload" center action="http://10.0.7.46:8080/project/bracelet/Home/manager/handler_up" :show-file-list="false" :accept='xls' :file-list="fileList" :auto-upload="false" :on-change="handleChange" :headers="headers">
                <el-input style="width:420px" slot="trigger" v-model="filename" size="small" type="info" placeholder="手环批量导入：文件上传" v-if="clearShow"></el-input>
                <div slot="tip" class="el-upload__tip" style='color:#ccc;'>只能上传xls/xlsx文件</div>
              </el-upload> -->
              <el-input style="width:90%" v-model="filename" placeholder="手环批量导入：文件上传" size='mini'></el-input>
              <form :action="circleUpUrl" method="post" enctype="multipart/form-data" target='iframe_display' style='position:relative; opacity:0;'>
                <iframe name="iframe_display" style="display:none;"></iframe>   
                <input type="file" id='file' name="excelData" style='position:absolute;top:-30px;left:0; width:90%' value='' @change='changeFileReport' />
                <input type="submit" id='submit' value="" style='position:absolute;top:88px;left:-166px;' />
              </form>
            </el-form-item>
          </el-col>
        </el-row>
      	<!-- <el-form-item label="导入说明" :label-width="fw3">
        	<el-table :data="lists" style="width:100%">
			      <el-table-column prop="name" label="工具箱名称" width="200"></el-table-column>
  			    <el-table-column prop="no" label="手环编号" width="120"></el-table-column>
  		    </el-table>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle2s" size='mini'>取 消</el-button>
        <el-button type="info" @click="submit2s" class="adds" size='mini'>导 入</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import $ from 'jquery';
import cg from '../../../store/configure.js';
var bp = cg.bp; 

export default {
  data() {
    return {
    	fw:'120px',
    	fw3:'170px',
      token:'',
      height:0,
      title2:'单个新增手环',
    	title2s:'批量新增手环',
      circleUpUrl:'',
      visible2:false,
    	visible2s:false,
      form2:{},
    	form2s:{},
      selectArr:[],
      lists:[],
      options:{},
      file:{},
      filename:'',
    //  fileList:[{name:'',url:'http://10.0.7.46:8080/project/bracelet/Home/manager/handler_up'}],
    //  xls:'application/vnd.ms-excel',
    //  clearShow:true,
      headers:{'Content-Type':'multipart/form-data'},
      rules:{
        handler_number:[
          {required:true,message:'请输入手环编号',trigger: 'blur'},
        ],
        handler_status:[
          {required:true,message:'请选择手环启用状态',trigger: 'change'},
        ],
      },
    }
  },
  created(){
    this.findAllCircle();
    this.token = sessionStorage.getItem('token');
    this.circleUpUrl = bp+'/manager/handler_up?token='+this.token;
    this.height = $(window).height()-256;//应对于不同的分别率。
  },
  computed:{
    ...mapGetters(['circle','toolsCircle','pagesCircle','hideCircle']),
  },
  methods: {
  //分页：
    currentChangeCircle(val){
      this.form.page = val;
      this.queryData(this.form).then((result)=>{
        
      }).catch((error)=>{
        console.log('手环分页功能操作失败，后台报错！-->'+error);
      });
    },
   	edit2(i,row){
      this.visible2=true;
      this.title2='手环信息修改';
      this.form2 = row;
    },
  	delete2(i,row){
      this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteByIdCircle({handler_id:row.handler_id}).then((result)=>{
          if(result.data.code == 200){
            this.$notify({
              title:'成功',
              type: 'success',
              message: '手环信息删除成功'
            });
            this.query();
          }else{
            console.log('手环信息删除失败，后台返回状态码：'+result.data.code);
          }
        }).catch((error)=>{
          console.log('手环信息失败，后台报错！-->'+error);
        });
      }).catch(() => {
        this.$notify({
          title:'成功',
          type: 'info',
          message: '已取消删除'       
        });          
      });
    },
    changeFileReport(){//当用户选择文件时。
      this.filename = $('#file').val();
    },
    selectChange(val) {
      this.selectArr = val;
    },
    toggleSelection(row,event,column){
        // 切换选中状态
        this.$refs.table.toggleRowSelection(row);
    },
    batchDelete(){
      var arr = this.selectArr;
      var ids = '';
      for(var i=0;i<arr.length;i++){
        ids += (arr[i].handler_id+';');
      }
      if(ids){
        this.$confirm('此操作将永久删除这些数据，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.batchDeleteByIdCircle({handlerid_str:ids}).then((result)=>{
            if(result.data.code == 200){
              this.$notify({
                title:'成功',
                type: 'success',
                message: '手环信息批量删除成功'
              });
              this.query();
            }else{
              console.log('手环信息批量删除失败，后台返回状态码：'+result.data.code);
            }
          }).catch((error)=>{
            console.log('批量删除失败，后台报错！-->'+error);
          });
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }else{
         this.$notify({
          type: 'info',
          message: '请先选择手环'
        });  
      }
    },
  	single2(){
      if(this.options.tools_id == undefined){
        this.$notify({
          type: 'warning',
          message: '请先选择工具箱，再新增手环！',
        });
      }else{
        this.visible2=true;
        this.title2='单个新增手环';
        this.form2 = {handler_status : '启用'};
        this.form2.tools_id = this.options.tools_id;
      }
    },
  	batch2(){
      this.visible2s=true;
      this.filename = '';//清空输入框用户选择的文件。
    },
  	submit2(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveCircle(this.form2).then((result)=>{
            if(result.data.code == 200){
              this.$notify({
                title:'成功',
                type: 'success',
                message: '操作成功'
              });
              this.query()
            }else{
              console.log('手环提交功能操作失败，后台返回状态码：'+result.data.code);
            }
          }).catch((error)=>{
            console.log('手环提交功能操作失败，后台报错！-->'+error);
          });
          this.visible2=false;
        } else {
          console.log('error submit!!');
          return false;
        }
      }); 
    },
    submit2s(){
    //  this.$refs.upload.submit();
      $('#submit').trigger('click');
      this.visible2s=false;
      var vm = this;
      this.$notify({type:'info',message:'批量导入时间较长，请耐心等待！'});
      setTimeout(function(){
        if(vm.options){
          vm.findCircle(vm.options).then(()=>{//刷新。
            vm.$notify({type:'success',message:'批量导入成功！'});
          });
        }else{
          vm.findAllCircle().then(()=>{
            vm.$notify({type:'success',message:'批量导入成功！'});
          });
        }
      },2000);
    },
    cancle2(){
      this.visible2=false;
    },
    cancle2s(){
      this.visible2s=false;
    },
    rowClass(row, index) {
      return {"background-color":"#E6EBF5",'color':'#878D99'}
    },
    query(){
      this.findCircle(this.options).then((result)=>{}).catch((error)=>{
        console.log('手环查询功能失败，后台报错！-->'+error);
      });
    },
    download(){//下载模版。
    //跳转到下载地址：
      window.location.href = bp+'/manager/handler_download?token='+this.token;
    },
    /*handleChange(file, fileList){
      this.filename=file.name;
    },*/
    ...mapActions(['findAllCircle','saveCircle','deleteByIdCircle','batchDeleteByIdCircle','findCircle','uploadCircle']),
  },
}
</script>

<style scoped>
  *{
    font-size:12px;
  }
	.icon {
    cursor: pointer;
    font-size: 20px;
  }
  .coll{
  	height:5px;
  }
  .dialog .el-input{
   width:90%;
  }
  .dialog3 .el-input{
    width:90%;
  }
  .dialog-footer{
    text-align:right;
  }
  .rowTop .el-form .el-form-item{
    margin-top:-3px;
    margin-bottom:11px;
  }
  .yes{
    font-size:12px;
    background: #448db8;
    border:none;
  }
  .add{
    font-size:12px;
    background: #448db8;
    border:none;
  }
  .adds{
    font-size:12px;
    background: #448db8;
    border:none;
  }
  .search{
    font-size:12px;
    background: #448db8;
    border:none;
  }
  .download{
    font-size:12px;
   /* border:none;*/
    background: #448db8; 
    border:none;
    border-radius: 0;
    margin-top: 2px;
    margin-left: 3px;

  }
  .delete{
    font-size:12px;
    border:none;
    background: #FA5555;
  }
  .list i.options{
  padding: 0 5px;
  cursor: pointer;
  color: #448db8; 
}

</style>
<style>
   /*模态框样式*/
  .dialog-title {
    background-color: #448db8;
    height: 52px;
    line-height: 52px;
    font-size: 18px;
    color: #FFF;
  }
  .el-dialog__headerbtn i.el-dialog__close {
    color: #FFF;
  }
  div.el-dialog__header {
    padding: 0;
  }
  div.el-dialog--center .el-dialog__header {
    padding-top: 0
  }
</style>

