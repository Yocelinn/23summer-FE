<template>
  <el-row class="tac">
    <el-menu
            active-text-color="#7E7CF4"
            background-color="#9E9CF451"
            class="el-menu-vertical-demo"
            text-color="#7E7CF4"
            @open="handleOpen"
            @close="handleClose"
    >
      <h2 style="color: #7E7CF4">文档管理</h2>
      <router-link to="/person/protectCenter">
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>返回项目</span>
        </el-menu-item>
      </router-link>
      <router-link to="/prototype">
        <el-menu-item index="4">
          <el-icon><PictureRounded /></el-icon>
          <span>原型设计</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-row>
</template>

<script>
import {
  Document,
  ArrowLeft,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
export default{
  methods:{
    docsedit(){
      window.sessionStorage.setItem('curDocsId', '0');
      this.$router.push('/documentadd');
    }
  }
}
</script>

<style scoped>
.tac {
  height: 93vh;
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
.el-menu-vertical-demo{
  padding-top: 0;
}
</style>
