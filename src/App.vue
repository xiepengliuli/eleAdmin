<template>
<div id="app">
<Login></Login>
</div>
</template>
<script>
import Vue from 'vue'
import Login from './commponents/login.vue'
 var bus = new Vue()
export default{
  components:{
    Login
  }
}
</script>

