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
.n-base-select-menu .n-base-select-option.n-base-select-option--selected{
    --n-option-text-color-active: #9E9CF4
}
.n-base-select-menu .n-base-select-option .n-base-select-option__check {
  --n-option-check-color:#9E9CF4
}

</style>
