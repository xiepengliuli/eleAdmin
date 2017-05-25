<style type="text/css">
</style>
<template>
<div>
          <div class="page-container">
            <h1>后台管理系统</h1>
            <form action="" method="post">
        <div>
          <input type="text" name="username" class="username" placeholder="用户名" autocomplete="off"/>
        </div>
                <div>
          <input type="password" name="password" class="password" placeholder="密码" oncontextmenu="return false" onpaste="return false" />
                </div>
                <button id="submit" type="button">登录</button>
            </form>
            <div class="connect">
                <p>If we can only encounter each other rather than stay with each other,then I wish we had never encountered.</p>
        <p style="margin-top:20px;">如果只是遇见，不能停留，不如不遇见。</p>
            </div>
        </div>
    <div class="alert" style="display:none">
      <h2>消息</h2>
      <div class="alert_con">
        <p id="ts"></p>
        <p style="line-height:70px"><a class="btn">确定</a></p>
      </div>
    </div>

</div>
</template>

<script>

export default {

  data(){
    return{
      username:"admin",
      password:""
    }
  },
  methods:{
    login:function(){
      if(!validate()){
        return;
      }

    }
  }
}

</script>

