<template>
  <div>
    <el-button type="primary" icon="plus" @click="dialogVisible = true">添加</el-button>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      size="small"
      >
       <el-form :label-position="labelPosition" label-width="120px"  :inline="isinline" :model="form_data" ref="form_data" class="demo-form-inline demo-ruleForm" :rules="rules" >
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form_data.name" placeholder="请输入名称"></el-input>
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
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ]
        },
        labelPosition:"right",
        isinline:true,
        dialogVisible:false,
        userStateList:[{
          value:"0",
          text:"正常"
        },{
          value:"1",
          text:"冻结"
        }
        ],
        form_data:{
          name:""
        }
    };
  },
  methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
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