<template>
  <div class="main-page">
    <Editor v-model="state"></Editor>
  </div>
</template>

<script>
import data from '@/data.json'
import { ref, provide } from 'vue'
import Editor from '@/packages/editor.jsx'
import { registerConfig as config } from '@/utils/editor-config.jsx'
import { registerIcon as icon} from '@/utils/editor-icon'
export default {
  name: 'PrototyeView',
  components: {
    Editor
  },
  setup() {
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
      state
    }
  }
}
</script>

<style lang="scss" >
.main-page {
  position: absolute;
/*  top: 20px;
  left: 20px;
  right: 20px;
  */
  top: 0px;
  left: 5px;
  right: 0px;
  bottom: 20px;
}
</style>
