<template>
  <el-row class="tac">
    <el-col :span="24">
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
          <span>
            <router-link to="/documentadmin">
              <el-button type="info" :icon="ArrowLeft">返回项目</el-button>
            </router-link>
          </span>
        <el-menu-item index="1" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><setting /></el-icon>
          <router-link to="/documentadd">
                <el-link :underline="false" style="color: white">新建文档</el-link>
          </router-link>
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
color: #FFF
}

.e-link span {
color: #fff
}
</style>
