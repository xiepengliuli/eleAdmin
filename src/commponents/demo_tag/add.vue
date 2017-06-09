<template>
  <div> 
    <el-button type="primary" icon="plus" @click="dialogVisible = true">添加</el-button>
    <el-dialog  
      title="添加"
      :visible.sync="dialogVisible"
      size="tiny"
      >
      <div style="margin-right: 30px;">
<el-form label-width="80px" :label-position="labelPosition" :inline="isinline" :model="form_data" ref="form_data" class="demo-form-inline demo-ruleForm" :rules="rules" >
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form_data.name" placeholder="请输入名称"></el-input>
        </el-form-item>
           <el-form-item label="附件:" prop="attachment">
             <el-upload 
              class="upload-demo"
              action="http://localhost:28080/jsp/controller.jsp?action=uploadfile"
              :on-success="handleSuccess"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
           </el-upload>
       </el-form-item>
      </el-form>

         
      </div>
      <span slot="footer" class="dialog-footer" >
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
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ]
        },
        labelPosition:"right",
        isinline:false,
        dialogVisible:false,
       
        form_data:{
          name:"",
          attachments:""
        },
        fileList:[]

    };
  },
  methods: {
      handleSuccess(response, file, attachments){
        this.fileList=attachments;
        this.form_data.attachments=JSON.stringify(attachments);//把数组转成字符串
      },
      handleRemove(file, attachments) {
        console.log(file, attachments);
      },
      handlePreview(file) {
        console.log(file);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.fileList=[];//处理上传文件的数组
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var _this=this;
          if (valid) {
            this.$http.post("admin/demoEntry/add",
            qs.stringify(_this.form_data)).then(
              function(res){
                if(res.data.success){
                        _this.dialogVisible = false;
                        _this.resetForm(formName);
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