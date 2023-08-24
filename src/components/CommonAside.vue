<template>
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
        >
        <h3>
            文档管理
        </h3>
          <el-menu-item index="2">
            <span><el-button type="primary" :icon="ArrowLeft">隐藏边栏</el-button></span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>@团队成员</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script setup>
  import {
    Document,
    ArrowLeft,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  </script>
  
<style>
.el-menu {
    height: 100vh;
}

.el-menu h3{
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
}

.el-button {
  color: #545c64
}
</style>
  