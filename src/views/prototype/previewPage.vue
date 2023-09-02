<template>
    <div class="preview-page">
      <!-- 预览内容如下 -->
        <div class="preview-container">
            <Preview v-if="previewStatus === 'true'"  v-model="state"></Preview>       
            <h2 v-else >已关闭预览</h2>
        </div>
    </div>
  </template>
  
  <script>
  import data from '@/data.json'
  import { ref, provide, computed } from 'vue'
  import { registerConfig as config } from '@/utils/editor-config.jsx'
  import { registerIcon as icon} from '@/utils/editor-icon'
  import Preview from '@/packages/preview'


  export default {
    name: 'PrototyeView',
    components: {
        Preview
    },
    setup() {
      const previewStatus = localStorage.getItem('preview') || 'false'
      console.log(previewStatus)
      const state = ref(JSON.parse(localStorage.getItem('data')) || data)
      provide('config', config) //把config提供出去
      provide('icon',icon)  // 把图标列表提供出去
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
        state,
        previewStatus
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .preview-page {
    position: absolute;
  /*  top: 20px;
    left: 20px;
    right: 20px;
    */
    height: 93vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .preview-container {
    position:absolute;
    display: flex;
    left: 200px
  }
  .el-card {
    --el-card-padding: 0px; 
    border: 0px;
  }
  #el-card {
    border: 0px;
  }
   
  </style>
  