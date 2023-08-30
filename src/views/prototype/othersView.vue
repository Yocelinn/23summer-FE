<template>
    <div class="main-page">
        <iframe width="100%" height="100%" src="https://excalidraw.com/#token=OadxD7IxOhZ7l-X2PNmuL"></iframe>
    </div>
  </template>
  
  <script>
  import data from '@/data.json'
  import { ref, provide } from 'vue'
//   import Editor from '@/packages/editor'
  import { registerConfig as config } from '@/utils/editor-config.jsx'
  export default {
    name: 'App',
    components: {
    //   Editor
    },
    setup() {
      const state = ref(JSON.parse(localStorage.getItem('data')) || data)
      provide('config', config) //把config提供出去
      const formDate = ref({
        username: 'admin',
        passward: 123456,
        text: '666',
        start: 0,
        end: 100,
        silde:0
      })
      provide('formDate', formDate)
      return {
        state
      }
    }
  }
  </script>
  
  <style lang="scss" >
  /* .main-page {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
  } */
  .main-page {
    height: 93vh;
    width: 100%;
  }
  </style>
  