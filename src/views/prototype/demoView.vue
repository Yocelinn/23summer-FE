<template>
  <div class="main-page">
    <Editor v-model="state"></Editor>    
  </div>
</template>

<script>
import data from '@/data.json'
import { ref, provide, computed } from 'vue'
import Editor from '@/packages/editor.jsx'
import { registerConfig as config } from '@/utils/editor-config.jsx'
import { registerIcon as icon} from '@/utils/editor-icon'
import { useStore, mapState } from 'vuex'
export default {
  name: 'PrototyeView',
  components: {
    Editor, 
  },
  computed: {
        ...mapState(['pageData']),
        // 其他 computed properties
  },
  setup() {
    const state = ref(JSON.parse(localStorage.getItem('data')) || data)
    const store = useStore()
    const pageData = computed(() => {
        return store.state.pageData;
    });
    // 说明这是创建的新页面，不能使用localStorage
    if(Object.keys(pageData.value).length !== 0) {
      state.value = data
      state.value.container.width = pageData.value.width
      state.value.container.height = pageData.value.height
      store.commit('clearPageData')
    }
    const previewStatus = ref(localStorage.getItem('preview') || false)
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

<style lang="scss">
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
.el-card {
  --el-card-padding: 0px; 
  border: 0px;
}
#el-card {
  border: 0px;
}
 
</style>
