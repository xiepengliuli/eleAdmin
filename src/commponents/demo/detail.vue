<template>
  <div id="demo_detail">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      size="small"
      >
       <el-form :label-position="labelPosition" label-width="120px"  :inline="isinline" :model="form_data" ref="form_data" class="demo-form-inline demo-ruleForm" :rules="rules" >
        <el-form-item label="名称:" prop="name">
          <el-input v-model="form_data.name" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['dialogShow','id'],
    watch:{
      id:function(_id){
        this.loadEditData(_id);
      }

    },
    computed:{
      dialogVisible: {
          get: function () {
            return this.dialogShow
          },
          set: function (newValue) {
            if (!newValue) {
                this.$emit('close');
            } 
          
          }
      }
    },
    data() {
      return {
        labelPosition:"right",
        isinline:true,
        demoStateList:[{
          value:"0",
          text:"正常"
        },{
          value:"1",
          text:"冻结"
        }
        ],
        form_data:{
          id:"",
          name:""
        }
    };
  },
  methods: {
      loadEditData(id){
        var _this=this;
        this.$http.post("admin/demoEntry/getById",qs.stringify({id:id})).then(function(res){
            if(res.data.success){
              res.data.obj.password="";
              //_this.form_data=res.data.obj;//因为有多余的属性(如日期类型的数据,可能报400错误,springMVC服务端接受参数会出问题)
              copyto(_this.form_data,res.data.obj);
              $("#demo_detail .el-form input").attr("disabled","disabled");
              $("#demo_detail .el-form select").attr("disabled","disabled");
              $("#demo_detail .el-form textarea").attr("disabled","disabled");
            }
          })
      }
    }
  };
</script>