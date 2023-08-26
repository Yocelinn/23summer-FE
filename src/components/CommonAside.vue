<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <h2>文档管理</h2>
        <router-link to="/documentadmin">
          <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>返回项目</span>
        </el-menu-item>
        </router-link>
        <router-link to="/documentadmin">
          <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>原型设计</span>
          </el-menu-item>
        </router-link>
        <router-link to="/documentadd">
          <el-menu-item index="4">
          <el-icon><Edit /></el-icon>
          <span>文档编辑</span>
          </el-menu-item>
        </router-link>
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

.el-menu h2{
  color: #fff;
  text-align: center;
  line-height: 48px;
  font-size: 22px;
  font-weight: 400;
  padding-top: 20px;
}

.el-button {
color: #FFF
}

.e-link span {
color: #fff
}


.edit {
  margin-top: 20px;
}

.el-menu-item span {
  font-size: 16px;
  margin-left: 6px;
}
</style>
