<template>
  <div class="background">
    <div class="home-content">
      <transition name="fade" appear>
        <div class="home-left" v-if="showLeft">
          <span class="title">管理平台</span>
          <div class="button-container">
            <button class="open">开始使用</button>
          </div>
        </div>
      </transition>
    </div>
    <div class="img-content">
      <transition name="fade">
       <img v-if="showImg" src="../assets/home-img.png" class="home-img" alt="img loading..."> 
      </transition>
    </div>
    <div class="home">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <Notification/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Notification from '@/components/NotificationView.vue'

export default {
  name: 'HomeView',
  
  components: {
    Notification
  },

  data() {
    return{
      showLeft: false,
      showImg: false
    }
  },
  mounted() {
    // 触发渐入效果
    this.showLeft = true;
    this.showImg = true;
  }
}
</script>

<style scoped>
.background {
  display: flex;
  height: 90%;
  width: 95%;
  position: absolute;
  overflow: hidden;
}
.home-content {
  height: 95%;
  display: grid;
  width: 50%;
  justify-content: center;
  align-content: center;
  flex: 1; 
  /*background-image: url("../assets/home-left.png");
  opacity: 0.9; */
}
.home-left {
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
}
.title {
  font-size: 50px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 20%;
}
.img-content {
  width: 50%;
  /*height: 100%;*/
  justify-content: center;
  align-content: center;
}
.home-img {
  padding: 0 5% 5% 0;
}

.button-container {
  justify-content: center;
  justify-items: center;
}
.open {
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 20px;
  font-weight: 510;
  border: none;
  border-radius: 5px;
  width: 120px;
  height: 60px;
  background-color: rgb(174, 94, 213);
  margin-top: 20%;
}
.button-container :hover {
  transform: scale(1.05);
  transition: 0.2s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
