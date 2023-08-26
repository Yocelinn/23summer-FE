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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

</style>
