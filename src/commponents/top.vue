<template>
<el-row  class="top">
  <el-col :span="24"  align="right" style="margin-top:26px; margin-left: -10px;" >
    <el-dropdown  @command="handleCommand">
      <el-button type="primary">
        胡砍砖<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户设置aaaaa</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
</template>
<script>
export default {
  methods:{
    handleCommand(command) {
      if (command=="logout") {
        this.logout();
      }
      },
      logout:function(){
        var _this=this;
        this.$http.get("admin/user/logout").then(
              function(res){
                _this.$router.push("/");
                _this.$store.dispatch('LOGIN_FAIL');
              }
            ).catch(
              function(err){
                 console.log(err);
            })
      }
  }
}
</script>
<style scoped>
  .top{margin-top: -10px;background-color: #58B7FF;height: 80px;}
</style>
