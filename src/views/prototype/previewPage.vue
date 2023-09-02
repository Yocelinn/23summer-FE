<template>
    <div class="preview-page">
      <!-- 预览内容如下 -->
        <div class="preview-container">
            <Preview v-model="state"></Preview>   
        </div>
    </div>
  </template>
  
  <script>
  import data from '@/data.json'
  import { ref, provide, onMounted } from 'vue'
  import { registerConfig as config } from '@/utils/editor-config.jsx'
  import { registerIcon as icon} from '@/utils/editor-icon'
  import Preview from '@/packages/preview'
  import axios from 'axios'
  import { ElMessage } from "element-plus";

  export default {
    name: 'PrototyeView',
    components: {
        Preview
    },
    setup() {
      
      const state = ref(data)
      onMounted(()=>{
        const tokenIndex = location.href.indexOf('token=');
        const link_token = location.href.substring(tokenIndex + 'token='.length);

        const data_json = ref('data')
        axios.get(('/prototype/decode/'+link_token)).then((response) =>{
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            data_json.value = response.data.res
            state.value = JSON.parse(data_json.value)
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
            state.value = data
          }
        }).catch((error) => {
          ElMessage({ message: "获取页面失败，请重试",type: 'error' });
          console.log(error)
        })
      })
      
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
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .preview-page {
    top: 20px;
   /* left: 20px;
    right: 20px;
    */
    height: 93vh;
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
  