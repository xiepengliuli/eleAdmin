<template>
<el-card class="box-card" style="width: 400px;margin:0 auto;margin-top: 250px;">

  <div slot="header"  style="margin:0 auto;">
    <span style="line-height: 36px; margin-left: 110px;" class="text" >VueDemo系统</span>
  </div>
  <div class="text item">
    <el-row type="flex" justify="center">
      <el-col :span="12" ><el-input v-model="username" placeholder="请输入用户名"></el-input></el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12" > <el-input v-model="password" placeholder="请输入密码"></el-input></el-col>
    </el-row>
      <el-row type="flex"  justify="center">
      <el-col :span="12" align="middle">
          <el-button type="info" @click="login">登录</el-button>
      </el-col>
    </el-row>
  </div>
</el-card>
</template>

<script>

import {mapGetters} from 'vuex'

export default {

  data(){
    return{
      username:"admin",
      password:"admin"
    }
  },
  methods:{
    login(){
        var _this=this;
        this.$http.get('admin/user/loginvue',{
          params: {
            loginName:_this.username,
            password:_this.password
          }
        }).then(function(res){
              if (res.data.success) {
                _this.$store.dispatch('LOGIN_SUCCESS');
                _this.$router.push("main");
              }

        }).catch(function(err){
            console.log(err);
        });
      }
  },
  computed:mapGetters([
      'isLogin'
    ]),
  mounted(){
    if (this.isLogin) {
      this.$router.push("main");
    } 
  }
}


</script>
<style  scoped>
  .el-button {
    padding: 10px 68px;
  }
  .el-row {
    margin-bottom: 10px;
  }
  .el-input{
    line-height: 30px;
  }
  .text {
    font-size: 20px;

  }
</style>




