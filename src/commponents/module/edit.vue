<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      size="small"
      >
       <el-form :label-position="labelPosition" label-width="130px"  :inline="isinline" :model="form_data" ref="form_data" class="demo-form-inline demo-ruleForm" :rules="rules" >
        <el-form-item  label="资源名称:" prop="moduleName">
          <el-input  v-model="form_data.moduleName" placeholder="请输入资源路径"></el-input>
        </el-form-item>
         <el-form-item  label="资源路径:" prop="moduleUrl">
          <el-input v-model="form_data.moduleUrl" placeholder="请输入姓名">
          </el-input>
         </el-form-item>
         <el-form-item   label="排序号:" prop="moduleSort">
              <el-input-number v-model="form_data.moduleSort" :min="1"></el-input-number>
          </el-form-item>
         <el-form-item  label="上级资源:" prop="parentModuleName">
            <el-popover
              ref="popover2"
              placement="bottom"
              width=""
              trigger="click"
             >
               <el-tree style="min-height:200px;max-height:300px;overflow:auto;"
                :data="pre_data.data2"
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="pre_data.defaultProps" @current-change="selectParent">
              </el-tree>   
            </el-popover> 
             <el-input readonly  v-model="form_data.parentModuleName" placeholder="请选择内容" style="width:192px;">
               <template slot="append">
                      <el-button v-popover:popover2>选择</el-button>
               </template>
             </el-input>
         </el-form-item>
         <el-form-item label="备注:" prop="moduleDesc">
             <ueditor :value=form_data.moduleDesc  v-bind:config=ueditor_config v-on:input="input" v-on:ready="ready"></ueditor>
         </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form_data')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Ueditor from "../../assets/ueditor/ueditor.vue"

  export default {
    components: {
      // <my-component> 将只在父模板可用
      'ueditor': Ueditor
    },
    props: ['dialogShow','id'],
    watch:{
      id:function(_id){
        this.getById(_id);
      },dialogVisible:function(val){
        if (val) {
          //this.resetForm('form_data');//页面打开时清空表单
          this.getList();
        } 
      }
    },
    computed:{
      dialogVisible: {
          get: function () {
            return this.dialogShow
          },
          set: function (newValue) {
            if (!newValue) {
                this.$emit('close');
            } 
          
          }
      }
    },
    data() {
      return {
        ueditor_config: {
          initialFrameWidth: 650,
          initialFrameHeight: 320,
          autoHeight: false
        },
        labelPosition:"right",
        isinline:false,
        rules:{
            moduleName: [
              { required: true, message: '请输入资源名称', trigger: 'blur'},
              { min: 2, max: 60, message: '长度在 2 到 60 个字符', trigger: 'blur' }
            ]
        },
        form_data:{
          id:"",
          moduleName:"", 
          moduleTypeId:"0",
          moduleUrl:"",
          moduleDesc:"",
          parentModuleId:"",
          parentModuleName:"",
          moduleSort:""
        },
        pre_data:{
          data2: [],
          defaultProps: {
            children: 'children',
            label: 'moduleName'
          }
        }
       
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getById(id){
          var _this=this;
          this.$http.post("admin/module/getById",qs.stringify({id:id})).then(function(res){
              if(res.data.success){
                //_this.form_data=res.data.obj;//因为有多余的属性(如日期类型的数据,可能报400错误,springMVC服务端接受参数会出问题)
                copyto(_this.form_data,res.data.obj);
              }
            })
     },
     getList(){
           var _this=this;
           this.$http.post("admin/module/treeGrid").then(
            function(res){
              _this.pre_data.data2=getTree(res.data,"id","parentModuleId");

            }
          ).catch(
            function(err){
            })
      },
      selectParent(_cur,_node){
        this.form_data.parentModuleId=_cur.id;
        this.form_data.parentModuleName=_cur.moduleName;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var _this=this;
          if (valid) {
            this.$http.post("admin/module/edit",
            qs.stringify(_this.form_data)).then(
              function(res){
                if(res.data.success){
                        _this.dialogVisible = false;
                        _this.$emit('flush');
                 }else{
                    alert(res.data.msg);       
                 }
           
              }
            ).catch(
              function(err){
            })
          } else {
            return false;
          }
        });
      },
      input(data){
        this.form_data.moduleDesc=data.content;
           //data:编辑付文本的时候的返回的数据对象,要绑定到form_data对象上,返回的数据如下:{ wordCount: wordCount, content: content, plainTxt: plainTxt }
      },
      ready(ueditor){
              //ueditor:富文本对象实例
      }

    }
  };
</script>
<style>
  .el-dialog--small {
    width: 60%;
   }
</style>