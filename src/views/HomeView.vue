<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Notification/>
  </div>
</template>

<script>
// @ is an alias to /src
import Notification from '@/components/NotificationView.vue'

export default {
  name: 'NotificationView',
  components: {
    Notification
  }
}
</script>
