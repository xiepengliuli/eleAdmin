<template>
  <div>
    <el-button type="primary" icon="plus" @click="dialogVisible = true">添加</el-button>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      size="small"
      >
       <el-form :label-position="labelPosition" label-width="120px"  :inline="isinline" :model="form_data" ref="form_data" class="demo-form-inline demo-ruleForm" :rules="rules" >
        <el-form-item label="资源名称:" prop="moduleName">
          <el-input v-model="form_data.moduleName" placeholder="请输入登录名称"></el-input>
        </el-form-item>
         <el-form-item label="资源路径:" prop="moduleUrl">
          <el-input v-model="form_data.moduleUrl" placeholder="请输入姓名">
          </el-input>
         </el-form-item>
         <el-form-item label="排序:" prop="moduleSort">
            <el-input v-model="form_data.moduleUrl" placeholder="请输入姓名">
              </el-input>         
          </el-form-item>
         <el-form-item label="上级资源:" prop="parentModuleName">
            <el-popover
              ref="popover2"
              placement="bottom"
              width=""
              trigger="click"
             >
               <el-tree style="min-height:200px;max-height:300px;overflow:auto;"
                :data="data2"
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps" @current-change="selectParent">
              </el-tree>   
            </el-popover> 

             <el-input readonly  v-model="form_data.parentModuleName" placeholder="请选择内容" style="width:192px;">
               <template slot="append">
                      <el-button v-popover:popover2>选择</el-button>
               </template>
             </el-input>
         </el-form-item>
          
         <el-form-item label="备注:" prop="userDesc">
          <el-input type="textarea" :rows="5" style="width: 550px;" v-model="form_data.userDesc" placeholder="请输入备注">
          </el-input>
         </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form_data')">确 定</el-button>
        <el-button type="primary"  @click="resetForm('form_data')">重置表单</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {

    watch:{
      dialogVisible:function(val){
        if (val) {
          //this.resetForm('form_data');//页面打开时清空表单
        } 
      }
    },
    data() {
      return {
        rules:{
            moduleName: [
              { required: true, message: '请输入登录名称', trigger: 'blur' },
              { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ]
        },
        labelPosition:"right",
        isinline:true,
        dialogVisible:false,
        form_data:{
          moduleName:"", 
          moduleTypeId:"0",
          moduleUrl:"",
          userDesc:"",
          parentModuleId:"0",
          parentModuleName:""
        },
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    };
  },
  methods: {
      selectParent(_cur,_node){
        this.form_data.parentModuleId=_cur.id;
        this.form_data.parentModuleName=_cur.label;

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var _this=this;
          if (valid) {
            this.$http.post("admin/user/add",
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
      }

    }
  };
</script>