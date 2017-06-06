 <template>
 <div>
 	<div style="margin-bottom: 10px;">
 		<addPage style="" v-on:flush="getList"></addPage>
 	</div>

   <el-tree
      highlight-current
	  :data="data2"
	  :props="defaultProps"
	  show-checkbox
	  node-key="id"
	  default-expand-all
	  :expand-on-click-node="true"
	  :render-content="renderContent">
	</el-tree> 
 </div>
	 
 </template>

<script>
  let id = 1000;
  import AddPage from "./module/user_add.vue"
  export default {
   components: {
    // <my-component> 将只在父模板可用
    'addPage': AddPage
  	},
  	mounted:function(){
  		this.getList();
  	},
    data() {
      return {
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'moduleName'
        }
      }
    },

    methods: {
	 getList(){
           var _this=this;
           this.$http.post("admin/module/treeGrid").then(
            function(res){
              _this.data2=getTree(res.data,"id","parentModuleId");;

            }
          ).catch(
            function(err){
            })
      },
      append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },

      remove(store, data) {
        store.remove(data);
      },

      //树控件的模板
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span style="width:350px;">{node.label}</span>
              <span style="width:350px;margin-left:30px;">{data.moduleUrl}</span>
            </span>
            <span style="float: right; margin-right: 20px">

   		<el-button type="text" size="small" on-click={ () => this.append(store, data) }>查看</el-button>
        <el-button type="text" size="small" on-click={ () => this.remove(store, data) }>编辑</el-button>            
            </span>
          </span>);
      }
    }
  };
</script>

<style>
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #bbc5d4;
}
</style>