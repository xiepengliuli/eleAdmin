<template>
<div>
  <Top></Top>
    <el-row class="tac" style="min-height:643px;">
      <el-col :span="3">
        <el-menu default-active="1-1" class="el-menu-vertical-demo" @select="handSelect" theme="dark">
          <el-submenu :index="menu.title" v-for="menu of menus">
            <template slot="title">{{menu.title}}</template>
              <el-menu-item :index="item.title" v-for="item of menu.childs">{{item.title}}</el-menu-item>
          </el-submenu>
         </el-menu>
      </el-col>
      <el-col :span="21" style="">
      <tabs :message="messagea"></tabs>
      </el-col>
    </el-row>    
 <Bottom></Bottom>
</div>
</template>
<script>
import $ from 'jquery'

import Vue from 'vue'
import AddTab from './addTab.vue'
import Top from './top.vue'
import Bottom from './bottom.vue'
var bus = new Vue()

  export default {
    
    components: {
    'tabs': AddTab,Top,Bottom
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
            title: 'Demo基本增删改查',
            name: 'Demo'
            },{
            title: '菜单1tab1',
            name: 'Testa'
            },{
            title: 'Demo多附件',
            name: 'DemoAttachment'
            },{
            title: 'Demo标签',
            name: 'DemoTag'
            }]
        },{
          title: '系统管理',
          name: '2',
            childs:[{
              title: '模块管理',
              name: 'Module'
          },{
            title: '用户管理',
            name: 'User'
            }]
        }]
      }
    }
  }
</script>
<style>
  
</style>

