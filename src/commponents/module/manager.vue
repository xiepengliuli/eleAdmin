 <template>
 <div>
 	<div style="margin-bottom: 10px;">
 		<addPage style="" v-on:flush="getList"></addPage>
    <editPage style="float:left;" :dialogShow="editDialogVisible" v-on:flush="getList" v-on:close="editDialogVisible=false" :id="id"></editPage>
    <detailPage style="float:left;" :dialogShow="detailDialogVisible" v-on:flush="getList" v-on:close="detailDialogVisible=false" :id="id"></detailPage>
 	</div>

   <el-tree
      highlight-current
	  :data="data2"
	  :props="defaultProps"
	  node-key="id"
	  default-expand-all
	  :expand-on-click-node="true"
	  :render-content="renderContent">
	</el-tree> 
 </div>
	 
 </template>

<script>
  import AddPage from "./add.vue"
  import EditPage from "./edit.vue"
  import DetailPage from "./detail.vue"
  export default {
   components: {
    // <my-component> 将只在父模板可用
    'addPage': AddPage,
    'editPage':EditPage,
    'detailPage':DetailPage
  	},
  	mounted:function(){
  		this.getList();
  	},
    data() {
      return {
        id:'',
        editDialogVisible:false,
        detailDialogVisible:false,
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
      edit(store, data) {
        this.id=data.id;
        this.editDialogVisible=true;
      },
      detail(store, data) {
        this.id=data.id;
        this.detailDialogVisible=true;
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

                <el-button type="text" size="small" on-click={ () => this.edit(store, data) }>编辑</el-button>   
   		          <el-button type="text" size="small" on-click={ () => this.detail(store, data) }>查看</el-button>
               
            </span>
          </span>
          );
      }
    }
  };
</script>

<style>
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #bbc5d4;
}
</style>