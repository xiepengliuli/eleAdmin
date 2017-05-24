<template>
  <div>
  	<div style="margin-bottom: 10px;">
  	<el-collapse>
		  <el-collapse-item title="搜索" name="1"> 	 
		  	<el-row :gutter="20">
			  <el-col :span="4">
			  	<el-input v-model="loginname" placeholder="登陆名"></el-input>
			  </el-col>
			  <el-col :span="4">
			  	<el-input v-model="loginname" placeholder="登陆名"></el-input>
			  </el-col>
			  <el-col :span="5">
			  	<el-input v-model="loginname" placeholder="登陆名"></el-input>
			  </el-col>
			    <el-col :span="5">
			  	<el-input v-model="loginname" placeholder="登陆名"></el-input>
			  </el-col>
			</el-row><el-row :gutter="20">
			  <el-col :span="4">
			  	<el-input v-model="loginname" placeholder="登陆名"></el-input>
			  </el-col>
			  <el-col :span="4">
			  	<el-input v-model="loginname" placeholder="登陆名"></el-input>
			  </el-col>
			  <el-col :span="6"  :offset="10">
			  	<el-button type="primary" icon="search">搜索</el-button>
			  	<el-button type="primary" icon="delete">清空</el-button>
			  </el-col>
			</el-row>
			 </el-collapse-item>
	</el-collapse>
  	</div>

  	 <div style="margin-bottom:10px;">
	 	<el-button type="primary" icon="edit"  @click="dialogFormVisible = true">添加</el-button>
		<el-button type="primary" icon="share">共享</el-button>
		<el-button type="primary" icon="delete">批量删除</el-button>
  	 </div>

  	<el-table
    ref="multipleTable"
    :data="tableData3"
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
      width="120">
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">

    </el-table-column>
        <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
      </el-table-column>
        <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
      </el-table-column>
        <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
      </el-table-column>
        <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>

    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template scope="scope">
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>


<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>


  <div class="block" style="margin-top: 20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="2000">
    </el-pagination>
  </div>
  </div>
</template>

<script>
  export default {
  	methods:{  handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }

  },
	data() {
      return {
      	dialogFormVisible: false,
      	loginname:'',
      	form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      	username:'',
      	currentPage4: 4,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    }
  }
</script>
<style type="text/css">
	.el-row {
    	margin-bottom: 10px;
  	}
  	.el-input{
  		line-height: 30px;
  	}
</style>