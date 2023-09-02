<template>
  <div>
    <header-top></header-top>
    <router-view/>
  </div>
</template>

<script>
import HeaderTop from './components/HeaderTop.vue';
export default {
  components: {
    HeaderTop
  }
}
</script>

<style>
body{
  margin: 0
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
.el-card {
  --el-card-padding: 0px; 
}
:deep(.el-card) {
  border: 0px;
}
</style>
