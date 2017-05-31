<template>
<el-row>
  <el-col :span="24">
  <div>
        <el-collapse>
        <el-collapse-item title="搜索" name="1">   
          <el-row :gutter="20">
          <el-col :span="4">
            <el-input v-model="serach_form.loginName" placeholder="登陆名"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="serach_form.loginName" placeholder="登陆名"></el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="serach_form.loginName" placeholder="登陆名"></el-input>
          </el-col>
            <el-col :span="5">
            <el-input v-model="serach_form.loginName" placeholder="登陆名"></el-input>
          </el-col>
        </el-row><el-row :gutter="20">
          <el-col :span="4">
            <el-input v-model="serach_form.userName" placeholder="用户名"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="serach_form.userName" placeholder="用户名"></el-input>
          </el-col>
          <el-col :span="6"  :offset="10">
            <el-button type="primary" icon="search" @click="getUserList">搜索</el-button>
            <el-button type="primary" icon="delete" @click="clear">清空</el-button>
          </el-col>
        </el-row>
         </el-collapse-item>
      </el-collapse>  

      <!--表头操作按钮-->
   <div style="float: left;margin: 15px 0px;">
      <addPage style="float:left;" v-on:flush="getUserList"></addPage>
      <editPage style="float:left;" :dialogShow="editDialogVisible" v-on:flush="getUserList" v-on:close="editDialogVisible=false" :id="id"></editPage>
      <detailPage style="float:left;" :dialogShow="detailDialogVisible" v-on:flush="getUserList" v-on:close="detailDialogVisible=false" :id="id"></detailPage>
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
    fixed="left"
      label="日期"
      width="200">
      <template scope="scope">{{ scope.row.createDate }}</template>
    </el-table-column>
        <el-table-column
      prop="userName"
      label="用户姓名"
      width="120" show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      prop="loginName"
      label="登录名"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120" prop="id">
      <template scope="scope">
        <el-button type="text" size="small" @click="detail(scope)">查看</el-button>
        <el-button type="text" size="small" @click="edit(scope)">编辑</el-button>
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
  import AddPage from "./user_add.vue"
  import EditPage from "./user_edit.vue"
  import DetailPage from "./user_detail.vue"
  
  var search_data={
    loginName:"",
    userName:"",
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
      this.getUserList();
    },
    methods:{  
      handleSizeChange(val) {
        //每頁多少条改变以后触发
        this.serach_form.rows=val;
        this.getUserList();
      },
      handleCurrentChange(val) {
        //请求点击的页的数据
        this.serach_form.page=val;
        this.getUserList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },getUserList(){
           var _this=this;
           this.$http.post("admin/user/dataGrid",
          qs.stringify(_this.serach_form)).then(
            function(res){
              _this.feny.rows=res.data.rows;
              _this.feny.total=res.data.total;
            }
          ).catch(
            function(err){
            })
      },detail(scope){
        this.id=scope.row.id;
        this.detailDialogVisible=true;
      },clear(){
        this.serach_form=$.extend(true,{}, search_data);
        this.getUserList();
      },edit(scope){
        this.id=scope.row.id;
        this.editDialogVisible=true;
      }

  },
  data() {
      return {
        id:'',
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