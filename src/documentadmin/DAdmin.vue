<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="360px">
          <CommonAside></CommonAside>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
  data() {
    return {}
  },
  components: {
    CommonAside
  },
}
</script>