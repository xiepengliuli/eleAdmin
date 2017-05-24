<template>
<div id="app">
<div style="margin-top: 70px;"></div>
<el-row class="tac">
  <el-col :span="3">
    <el-menu default-active="1-1" class="el-menu-vertical-demo" @select="handSelect" theme="dark">
      <el-submenu :index="menu.title" v-for="menu of menus">
        <template slot="title">{{menu.title}}</template>
          <el-menu-item :index="item.title" v-for="item of menu.childs">{{item.title}}</el-menu-item>
      </el-submenu>
     </el-menu>
  </el-col>
  <el-col :span="21">
  <tabs :message="messagea"></tabs>
  </el-col>
</el-row>
</div>
</template>
<script>
import Vue from 'vue'
import AddTab from './commponents/addTab.vue'
 var bus = new Vue()

  export default {
    
    components: {
    'tabs': AddTab
    },
    methods: {
      handSelect(key, keyPath) {
        var tempMenu;
        this.menus.forEach((menu,index2)=>{
           menu.childs.forEach((tab,index2)=>{
            if (tab.title==key) {
              tempMenu=tab;
            }
          }) 
        });
        bus.$emit('id-selected', tempMenu)
      }
    },
    data(){
      return {
        messagea:bus,
        menus:[{
          title: '菜单1',
          name: '1',
          content: '菜单1Tab 1 conads',
            childs:[{
            title: '菜单1tab1',
            name: '1-1',
            content: 'Tab 1 conadsfadsftent'
            },{
              title: '菜单1tab2',
              name: '1-2',
              content: '菜单1Tab 2 conadsfadsftent'
          }]
        },{
          title: '菜单2',
          name: '2',
          content: 'Tab 1 conadsfadsftent',
            childs:[{
            title: '菜单2tab1',
            name: '2-1',
            content: '菜单2Tab 1 conadsfadsftent'
            },{
              title: '菜单2tab2',
              name: '2-2',
              content: '菜单2Tab 2 conadsfadsftent'
          }]
        },{
          title: '菜单3',
          name: '3',
          content: 'Tab 1 conadsfadsftent',
            childs:[{
            title: '菜单3tab1',
            name: '3-1',
            content: '菜单3Tab'
            },{
              title: '菜单3tab2',
              name: '3-2',
              content: '菜单3Tab 2 conadsfadsftent'
          }]
        }]
      }
    }
  }
</script>

