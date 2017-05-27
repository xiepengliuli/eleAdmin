<template>
<el-tabs v-model="editableTabsValue2" type="border-card" closable @tab-remove="removeTab">
  <el-tab-pane style="min-height: 560px;overflow-y:visible ;"
    v-for="(item, index) in editableTabs2" 
    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
  <compo :pitem="item"></compo>
  </el-tab-pane>
</el-tabs>
 </div>
</template>
<script>
  import  Compo from "./acom.vue"
  export default {
   components:{
    'compo': Compo
    },
    props: ['message'],
    data() {
      return {
        editableTabsValue2: '1',
        editableTabs2: [],
        tabIndex: 1
      }
    },   // 在组件 B 创建的钩子中监听事件
    mounted:function(){
      var _this=this;
      _this.message.$on('id-selected', 
         function (menu) {
           var isExit=false;
            _this.editableTabs2.forEach((tab, index) => {
              if(tab.title==menu.title){
                _this.editableTabsValue2=tab.name;
                isExit=true;
              }
            })
            if (!isExit) {
              _this.addTab(menu);
            } 
          }
      ) 
  },
 
    methods: {
      addTab(menu) {
        this.editableTabs2.push(menu);
        this.editableTabsValue2 = menu.name;

      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>