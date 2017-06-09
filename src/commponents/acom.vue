<template>
	<div>
	  <Testa v-if="pitem.name=='Testa'"></Testa>
	  <Module v-if="pitem.name=='Module'"></Module>
    <User  v-if="pitem.name=='User'"></User>
    <Demo  v-if="pitem.name=='Demo'"></Demo>
    <DemoAttachment  v-if="pitem.name=='DemoAttachment'"></DemoAttachment>
    <DemoTag v-if="pitem.name=='DemoTag'"></DemoTag>
	</div>
</template>
<script>
  import Vue from 'vue'
  import Testa from './testa.vue'
  import Module from './module/manager.vue'
  import User from './user/manager.vue'
  import Demo from './demo/manager.vue'
  import DemoAttachment from './demo_attachment/manager.vue'
  import DemoTag from './demo_tag/manager.vue'

  export default{
  	props:["pitem"],
  	components:{
  		Testa,Module,User,Demo,DemoAttachment,DemoTag
  	}
  }
</script>