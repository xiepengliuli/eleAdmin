<template>
	<div>
	  <Testa v-if="pitem.name=='Testa'"></Testa>
	  <Testb v-if="pitem.name=='Testb'"></Testb>
    <User  v-if="pitem.name=='User'"></User>
	</div>
</template>
<script>
  import Vue from 'vue'
  import Testa from './testa.vue'
  import Testb from './testb.vue'
  import User from './user/user.vue'
  export default{
  	props:["pitem"],
  	components:{
  		Testa,Testb,User
  	}
  }
</script>