<template>
	<div>
	  <Testa v-if="pitem.name=='Testa'"></Testa>
	  <Module v-if="pitem.name=='Module'"></Module>
    <User  v-if="pitem.name=='User'"></User>
	</div>
</template>
<script>
  import Vue from 'vue'
  import Testa from './testa.vue'
  import Module from './module/manager.vue'
  import User from './user/manager.vue'
  export default{
  	props:["pitem"],
  	components:{
  		Testa,Module,User
  	}
  }
</script>