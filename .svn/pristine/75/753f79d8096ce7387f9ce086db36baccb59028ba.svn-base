<!-- 上课节次  -->
<template>
	<div class="courseSection">
    <el-row class='rowTop'>
      <el-col :span='8' :offset="16">
        <el-row type='flex' justify='end'>
          <el-form inline size='mini'>
            <el-row>
              <el-col :span='24'>
                <el-form-item class='but'>
                    <el-button type='info' size='small' @click='add5' class="add"><!-- <i class="fa fa-plus"></i> -->&nbsp;新增节次</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
    <el-table :data="section" class='table' border stripe :header-row-style="rowClass" size='mini' :height='height'>
      <el-table-column type="index" label="序号" align='center'></el-table-column>
      <el-table-column prop="class_section_id" label="class_section_id" v-if='false' align='center'></el-table-column>
      <el-table-column prop="class_section_name" label="节次名称" align='center'></el-table-column>
      <el-table-column prop="class_section_start" label="开始时间" :formatter='dateFormat' align='center'></el-table-column>
      <el-table-column prop="class_section_end" label="结束时间" :formatter='dateFormat' align='center'></el-table-column>
      <el-table-column label="操作" width="80" align='center'>
        <template slot-scope='scope'>
        	<i class="options fa fa-edit" @click="edit5(scope.$index, scope.row)"></i>
	        <i class="options fa fa-trash" @click="delete5(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改、新增 -->
    <el-dialog :visible.sync="visible5" center>
      <div slot="title" class="dialog-title">
        {{title5}}
      </div>
      <el-form :model="form5" :rules='rules' class='demo-ruleForm dialog' ref='form5'>
        <!-- 
        <el-form-item label="序号" :label-width="fw">
          <el-input v-model="form5.no" auto-complete="off"></el-input>
        </el-form-item> 
        -->
        <el-form-item label="节次名称" :label-width="fw" prop='class_section_name' style="width: 100%">
          <el-input v-model="form5.class_section_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="fw" prop='class_section_start'>
          <el-time-picker style="width: 100%" type="time" placeholder="选择开始时间" v-model="form5.class_section_start" @change='dataDisable3'></el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="fw" prop='class_section_end' >
          <el-time-picker style="width: 100%" type="time" placeholder="选择结束时间" v-model="form5.class_section_end" @change='dataDisable2'></el-time-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle5"  size="small">取 消</el-button>
        <el-button type="info" @click="submit5('form5')" class="yes" size="small" :disabled='bool'>确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script type="text/javascript">
import {mapActions,mapGetters} from 'vuex';
import moment from 'moment';
import $ from 'jquery';

export default {
  name: 'courseSection',
  data(){
    return {
      fw:'120px',
      bool:false,
      title5:'上课',
      height:0,
      form5:{},
      cs:{},
      visible5:false,
      rules:{
        class_section_name:[
          {required:true,message:'请输入节次名称',trigger: 'blur'},
        ],
        class_section_start:[
          {type:'date',required:true,message:'请选择开始时间',trigger: 'change'},
        ],
        class_section_end:[
          {type:'date',required:true,message:'请选择结束时间',trigger: 'change'},
        ],
      }, 
    }
  },
  created(){
    this.findAllSection();
    this.height = $(window).height()-256;//应对于不同的分别率。
  },
  computed:{
    ...mapGetters(['section']),
  },
  methods:{
    dataDisable2(){
       if(this.form5.class_section_start<this.form5.class_section_end){
        this.bool = false;
       }else{
         this.$notify({
          type: 'waring',
          message: '请选择大于开始上课的时间'
        });    
        /*var year = new Date().getYear() + 1900;
        var month = new Date().getMonth() + 1;
        var date = new Date().getDate();
        this.form5.class_section_end = new Date(year,month,date,0,0); */    
        //this.form5.class_section_end = '';   
        this.bool = true;  
       }
    },
    dataDisable3(){
       if(this.form5.class_section_start<this.form5.class_section_end){
        this.bool = false;
       }else{
         this.$notify({
          type: 'info',
          message: '请输入小于结束上课的时间'
        });    
        this.bool = true;  
       }
    },
    add5(){
      this.visible5=true;
      this.title5='新增节次';
      this.form5 = {};
    },
    edit5(i,row){
      this.visible5=true;
      this.title5='节次修改';
      /*var s = row.class_section_start;
      var e = row.class_section_end;
      console.log(s,e,typeof s)
      s = new Date(e);//时间格式化。
      e = new Date(s);//时间格式化。
      console.log(s,e,typeof s)*/
      // /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/

      //通过后台传来的时间字符串获取年月日时分秒
      var pattern = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
      var arr = pattern.exec(row.class_section_start);
      var year = arr[1];
      var month = arr[2];
      var day = arr[3];
      var hour = arr[4];
      var min = arr[5];
      var socend = arr[6];
      //格式化数据
      row.class_section_start = new Date(year, month, day, hour, min);

      var pattern = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
      var arr = pattern.exec(row.class_section_end);
      var year = arr[1];
      var month = arr[2];
      var day = arr[3];
      var hour = arr[4];
      var min = arr[5];
      var socend = arr[6];
      //格式化数据
      row.class_section_end = new Date(year, month, day, hour, min);
      this.form5 = row;
    },
    delete5(i,row){
      this.$confirm('此操作将永久删除该条数据，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteByIdSection({class_section_id:row.class_section_id}).then((result)=>{
          if(result.data.code == 200){
            this.$notify({
              type: 'success',
              message: '节次信息删除成功',
            });
          }else{
            console.log('节次信息删除失败，后台返回状态码：'+result.data.code);
          }
        }).catch((error)=>{
          console.log('节次信息删除失败，后台报错!'+error);
        });
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    submit5(formName){
      this.$refs[formName].validate((valid) => {//表单验证。
        if (valid) {
          this.saveSection(this.form5).then((result)=>{
            if(result.data.code == 200){
              this.$notify({
                type: 'success',
                message: '操作成功'
              });
            }else{
              console.log('上课节次提交操作失败，后台返回状态码：'+result.data.code);
            }
          }).catch((error)=>{
            console.log('上课节次提交操作失败，后台报错！-->'+error);
          });
          this.visible5=false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    cancle5(){
      this.visible5=false;
    },
    rowClass(row, index) {
      return {"background-color":"#E6EBF5",'color':'#878D99'}
    },
    query(){
      this.findSection(this.cs).then((result)=>{}).catch((error)=>{
        console.log('节次信息查询失败，后台报错！-->'+error);
      });
    },
  //时间格式处理：
    dateFormat(row,column){
      var date = row[column.property];
      if(date == undefined){return '';}
      var t = moment(date).format('HH:mm:ss');//时间格式化。
      return t;
    },
  //提取：
    ...mapActions(['findAllSection','saveSection','deleteByIdSection','findSection']),
  },
}
</script>

<style scoped>
  *{
    font-size:12px;
  }
  .courseSection{
    position: relative;
  }
  .icon {
    cursor: pointer;
    font-size: 20px;
  }
  .table{
    position: absolute;
    margin-top: 0px;
    left:0px;
    right: 0px;
  }
  /*.el-table-column{
    header-align: center;
  }*/
  .dialog-footer{
    text-align:right;
  }
  .rowTop .el-form .el-form-item{
    margin-top:-3px;
    margin-bottom:11px;
  }
  .rowTop .but{
    /*margin-top: 50px;*/
    margin-right:0;
    margin-left:8px;
  } 
  .add{
    background: #448db8;
    border:none;
  }
  .yes{
    background: #448db8;
    border:none;
  }
  .courseSection i.options{
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
