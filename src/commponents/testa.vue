<template>
<el-row>
  <el-col :span="24">
  bbb
	<ueditor></ueditor>
  ccc
</el-col>
</el-row>
	
</template>

<script>

import Ueditor from "../assets/ueditor/ueditor.vue"
  
  export default {
   components: {
      // <my-component> 将只在父模板可用
      'ueditor': Ueditor
    },
  	mounted:function(){
  	},
    data() {
      return {
        
      };
    },
    methods: {
      
    }
  };
</script>