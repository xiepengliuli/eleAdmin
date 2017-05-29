<template>
<div id="app">
  <router-view></router-view>
</div>
</template>
<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'

 var bus = new Vue()
  export default{
 	computed:mapGetters([
      'isLogin'
    ]),
  	watch:{
		$route(to){
			//如果没有登陆和访问的不是项目根目录
			if (!this.isLogin && to.path !="/") {
				alert("没登陆,跳转到登陆页!");
			    this.$router.push("/");
		    } 
		}
	}
  }
</script>

