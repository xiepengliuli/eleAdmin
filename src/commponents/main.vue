<template>
<div>
<div style="margin-top: 50px;"></div>
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

$(function(){
  $('body').css("background","red");
})
import Vue from 'vue'
import AddTab from './addTab.vue'
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
          title: '测试菜单',
          name: '1',
            childs:[{
            title: '菜单1tab1',
            name: 'Testa'
            },{
              title: '菜单1tab2',
              name: 'Testb'
          }]
        },{
          title: '系统管理',
          name: '2',
            childs:[{
            title: '用户管理',
            name: 'Testc'
            }]
        }]
      }
    }
  }
</script>

