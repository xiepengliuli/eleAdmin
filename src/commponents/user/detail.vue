<template>
  <div id="user_detail">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      size="small"
      >
       <el-form :label-position="labelPosition" label-width="120px"  :inline="isinline" :model="form_data" ref="form_data" class="demo-form-inline demo-ruleForm" >
        <el-form-item label="登录名称:" prop="loginName">
          <el-input v-model="form_data.loginName" placeholder="请输入登录名称"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="form_data.password" placeholder="请输入密码">
          </el-input>
         </el-form-item>
         <el-form-item label="用户姓名:" prop="userName">
          <el-input v-model="form_data.userName" placeholder="请输入姓名">
          </el-input>
         </el-form-item>
         <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="form_data.sex">
            <el-radio :label="item.value" v-for="item in sexlist">{{item.text}}</el-radio>
          </el-radio-group>
         </el-form-item>
         <el-form-item label="手机:" prop="mobilePhone">
          <el-input v-model="form_data.mobilePhone" placeholder="请输入手机">
          </el-input>
         </el-form-item>
         <el-form-item label="座机:" prop="telePhone">
          <el-input v-model="form_data.telePhone" placeholder="请输入座机">
          </el-input>
         </el-form-item>
         <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form_data.email" placeholder="请输入邮箱">
          </el-input>
         </el-form-item>
         <el-form-item label="用户IP:" prop="ip">
          <el-input v-model="form_data.ip" placeholder="请输入用户IP">
          </el-input>
         </el-form-item>
         <el-form-item label="用户状态:" prop="userState">
          <el-radio-group v-model="form_data.userState">
            <el-radio :label="item.value" v-for="item in userStateList">{{item.text}}</el-radio>
          </el-radio-group>
         </el-form-item>
         <br>

         <el-form-item label="备注:" prop="userDesc">
          <el-input type="textarea" :rows="5" style="width: 550px;" v-model="form_data.userDesc" placeholder="请输入备注">
          </el-input>
         </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>

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
        userStateList:[{
          value:"0",
          text:"正常"
        },{
          value:"1",
          text:"冻结"
        }
        ],
        sexlist:[{
            value:'男',
            text:'男'
          },{
            value:'女',
            text:'女'
          }],
        form_data:{
          id:"",
          loginName:"", 
          password:"",
          userName:"",
          nameLetter:"",
          sex:"",
          email:"",
          telePhone:"",
          mobilePhone:"",
          ip:"",
          userState:"",
          userDesc:"",
          userState:""
        }
    };
  },
  methods: {
      loadEditData(id){
        var _this=this;
        this.$http.post("admin/user/getById",qs.stringify({id:id})).then(function(res){
            if(res.data.success){
              res.data.obj.password="";
              //_this.form_data=res.data.obj;//因为有多余的属性(如日期类型的数据,可能报400错误,springMVC服务端接受参数会出问题)
              copyto(_this.form_data,res.data.obj);
              $("#user_detail .el-form input").attr("disabled","disabled");
              $("#user_detail .el-form select").attr("disabled","disabled");
              $("#user_detail .el-form textarea").attr("disabled","disabled");
            }
          })
      }
    }
  };
</script>