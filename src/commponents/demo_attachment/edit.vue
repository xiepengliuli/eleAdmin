<template>
  <div>
     <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      size="tiny"
      >
       <el-form :label-position="labelPosition" label-width="120px"  :inline="isinline" :model="form_data" ref="form_data" class="demo-form-inline demo-ruleForm" :rules="rules" >
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form_data.name" placeholder="请输入名称"></el-input>
        </el-form-item>

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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form_data')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['dialogShow','id'],
    watch:{
      id:function(_id){
        this.loadEditData(_id);
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
        labelPosition:"right",
        isinline:true,
        rules:{
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' },
              { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ]
        },
        userStateList:[{
          value:"0",
          text:"正常"
        },{
          value:"1",
          text:"冻结"
        }
        ],
        form_data:{
          id:"",
          name:"",
          attachments:"" 

        },
        fileList:[] //文件上传数组(临时做效果的用的,不参与表单的提交,参与提交的是attachments)
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
      loadEditData(id){
        var _this=this;
        this.$http.post("admin/demoEntry/getById",qs.stringify({id:id})).then(function(res){
            if(res.data.success){
              //////_this.form_data=res.data.obj;//因为有多余的属性(如日期类型的数据,可能报400错误,springMVC服务端接受参数会出问题)
              copyto(_this.form_data,res.data.obj);
              _this.fileList=JSON.parse(res.data.obj.attachments);
            }
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var _this=this;
          if (valid) {
            console.log(qs.stringify(_this.form_data));
            this.$http.post("admin/demoEntry/edit",qs.stringify(_this.form_data)).then(
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
                console.log(err);
            })
          } else {
            return false;
          }
        });
      }

    }
  };
</script>