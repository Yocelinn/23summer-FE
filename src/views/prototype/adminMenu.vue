<template>
    <el-row class="tac">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <h2>原型管理</h2>
          <router-link to="/person/protectCenter">
            <el-menu-item index="1">
            <el-icon><document /></el-icon>
            <span>返回项目</span>
          </el-menu-item>
          </router-link>
          <router-link to="/documentadmin">
            <el-menu-item index="2">
              <el-icon><EditPen /></el-icon>
            <span>文档编辑</span>
            </el-menu-item>
          </router-link>
        </el-menu>
    </el-row>
  </template>
  
  <script>

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
  
  
  .el-menu {
    height: 93vh;
    width: 200px;
  }
  
  .el-col{
    margin-top: 0px;
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
  