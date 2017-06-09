<template>
<el-row>
  <el-col :span="24">
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="serach_form.name" placeholder="名称"></el-input>
        </el-col>
        <el-col :span="6"  :offset="10">
          <el-button type="primary" icon="search" @click="getList">搜索</el-button>
          <el-button type="primary" icon="delete" @click="clear">清空</el-button>
        </el-col>
      </el-row>
    </el-card>
      <!--表头操作按钮-->
   <div style="float: left;margin: 15px 0px;">
      <addPage style="float:left;" v-on:flush="getList"></addPage>
      <editPage style="float:left;" :dialogShow="editDialogVisible" v-on:flush="getList" v-on:close="editDialogVisible=false" :id="editid"></editPage>
      <detailPage style="float:left;" :dialogShow="detailDialogVisible" v-on:flush="getList" v-on:close="detailDialogVisible=false" :id="detailid"></detailPage>
   </div>
    <el-table
    ref="multipleTable"
    :data="feny.rows"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    
    <el-table-column
      prop="name"
      label="名称"
      width="120" show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="name"
      label="名称_back"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120" prop="id">
      <template scope="scope">
        <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
        <el-button type="text" size="small" @click="detail(scope)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="serach_form.page"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="serach_form.rows"
    layout="total, sizes, prev, pager, next, jumper"
    :total="feny.total">
  </el-pagination>

  </div>    
  </el-col>
</el-row>
</template>

<script>

  import AddPage from "./add.vue"
  import EditPage from "./edit.vue"
  import DetailPage from "./detail.vue"
  
  var search_data={
    name:"",
    rows:10,
    page:1
  };

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
    methods:{  
      handleSizeChange(val) {
        //每頁多少条改变以后触发
        this.serach_form.rows=val;
        this.getList();
      },
      handleCurrentChange(val) {
        //请求点击的页的数据
        this.serach_form.page=val;
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },getList(){
           var _this=this;
           this.$http.post("admin/demoEntry/dataGrid",
          qs.stringify(_this.serach_form)).then(
            function(res){
              _this.feny.rows=res.data.rows;
              _this.feny.total=res.data.total;
            }
          ).catch(
            function(err){
            })
      },detail(scope){
        this.detailid=scope.row.id;
        this.detailDialogVisible=true;
      },clear(){
        this.serach_form=$.extend(true,{}, search_data);
        this.getList();
      },edit(scope){
        this.editid=scope.row.id;
        this.editDialogVisible=true;
      }

  },
  data() {
      return {
        editid:'',
        detailid:'',
        editDialogVisible:false,
        detailDialogVisible:false,
        serach_form:$.extend(true,{}, search_data),
        feny:{
          total:0,//总数
          rows: [],//数据
        },//根据总数算分页,根据data填充数据
        multipleSelection: []//选中的对象数组
      }
    }
  }
</script>
<style scoped>
  .el-row {
      margin-bottom: 10px;
    }
    .el-input{
      line-height: 30px;
    }
</style>