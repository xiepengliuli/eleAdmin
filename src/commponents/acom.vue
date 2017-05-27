<template>
	<div>
	  <Testa v-if="pitem.name=='Testa'"></Testa>
	  <Testb v-if="pitem.name=='Testb'"></Testb>
	  <Testc v-if="pitem.name=='Testc'"></Testc>
	</div>
</template>
<script>
  import Vue from 'vue'
  import Testa from './testa.vue'
  import Testb from './testb.vue'
  import Testc from './testc.vue'
  export default{
  	props:["pitem"],
  	components:{
  		Testa,Testb,Testc
  	}
  }
</script>