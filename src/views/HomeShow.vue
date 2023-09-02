<template>
    <div class="home">
      <div class="section" v-for="(section, index) in sections" :key="index">
        <div>{{ section.title }}</div>
        <div>{{ section.content }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sections: [
          {
            title: "欢迎来到网站",
            content: "这是一个示例网站主页。",
          },
          {
            title: "网站特点",
            content: "本网站具有以下特点：...",
          },
          // 添加更多部分
        ],
      };
    },
  };
  </script>
  
  <style>
  .home{
    height:93vh;
    width:100%;
  }
  /* 样式可以根据需求进行修改 */
  .section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    color:black
  }
  
  .section.active {
    opacity: 1;
  }
  </style>
  