<template>
  <div class="background">
    <div class="home-content">
      <transition name="fade" appear>
        <div class="home-left" v-if="showLeft">
          
          <span class="title">无域管理平台</span>
          <div class="wave-text-container">
          <div class="descrip">
            <span class="wave">简洁：提供高效的团队与项目管理，助力事务协作</span><br>
            <span class="wave">互通：提供完善的团队聊天和群聊，保障事务沟通</span><br>
            <span class="wave">设计：提供多功能多页面原型设计，畅快想象实现</span><br>
            <span class="wave">编辑：提供模版化自由的文本编辑，让所见即所得</span><br>
          </div>
          </div>
          <div class="button-container">
            <button class="open" @click="goUse()">开始使用</button>
          </div>
        </div>
      </transition>
    </div>
    <div class="img-content">
      <transition name="fade">
       <img v-if="showImg" src="../assets/home-img.png" class="home-img" alt="img loading..."> 
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import router from "@/router";

export default {
  name: 'HomeView',

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
  },
  methods: {
    goUse() {
      router.push('/login')
    }
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
.descrip{
  margin-top:20px;
  font-size: 20px;;
}


/* 添加逐字逐个弹入的 CSS */
.wave {
  display: inline-block;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
}

/* 使用 nth-child 来分别设置不同的延迟时间 */
.wave:nth-child(1) {
  animation-delay: 0.3s; /* 第一个文本延迟 0.5s */
}

.wave:nth-child(2) {
  animation-delay: 0.6s; /* 第二个文本延迟 1s */
}

.wave:nth-child(3) {
  animation-delay: 0.7s; /* 第三个文本延迟 1.5s */
}

.wave:nth-child(4) {
  animation-delay: 1s; /* 第四个文本延迟 2s */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.img-content {
  width: 50%;
  /*height: 100%;*/
  justify-content: center;
  align-content: center;
}
.home-img {
  padding: 0 5% 5% 0;
  max-width: 100%; 
  height: auto;
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
  background-color: rgb(200, 168, 248);
  margin-top: 20%;
}
.button-container :hover {
  transform: scale(1.05);
  transition: 0.3s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
