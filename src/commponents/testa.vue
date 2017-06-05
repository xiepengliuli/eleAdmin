<template>
<el-row>
  <el-col :span="24">
	<div>
		<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"  default-expand-all></el-tree>
	</div>  	
</el-col>
</el-row>
	
</template>

<script>

var temp=[
   {id:"0",
		pid:null,
		name:"名称0",
		ids:"1,2,3"
   },
   {id:"1",
		pid:null,
		name:"名称1",
		ids:"1,2,3"
   },
   {id:"2",
		pid:"1",
		name:"名称1_1",
		ids:"1,2,3"
   },
   {id:"3",
		pid:"1",
		name:"名称1_2",
		ids:"1,2,3"
   },
   {id:"4",
		pid:"3",
		name:"名称1_2_1",
		ids:"1,2,3"
   }
];
  export default {
  	mounted:function(){
  		this.data=getTree(temp,"id","pid");
  	},
    data() {
      return {
        data:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>