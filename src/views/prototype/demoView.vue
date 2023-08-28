<template>
    <div class="app">
      <div class="menu">
        <!-- 可拖拽元素 -->
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          class="draggable-item"
          draggable="true"
          @dragstart="handleDragStart(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="canvas"
           @drop="handleDrop"
           @dragover="handleDragOver"
      >
        <!-- 画布区域 -->
        <div
          v-for="(item, index) in canvasItems"
          :key="index"
          class="canvas-item"
          draggable="true"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuItems: [
          { name: 'Element 1', type: 'element1' },
          { name: 'Element 2', type: 'element2' },
          // ... 可拖拽的元素
        ],
        canvasItems: [],
      };
    },
    methods: {
      handleDragStart(item) {
        // 设置拖拽数据
        event.dataTransfer.setData('itemType', item.type);
      },
      handleDragOver(e) {
        // 阻止默认行为以允许放置
        e.preventDefault();
      },
      handleDrop(e) {
        // 获取拖拽数据
        const itemType = e.dataTransfer.getData('itemType');
        // 根据数据创建新元素
        const newItem = { name: `New ${itemType}`, type: itemType };
        this.canvasItems.push(newItem);
      },
    },
  };
  </script>
  
  <style>
  .app {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }
  .menu {
    width: 20%;
    background-color: #f0f0f0;
    padding: 20px;
    
  }
  .menu .draggable-item {
    background-color: #fff;
    padding: 10px;
    margin: 10px 0;
    cursor: grab;
  }
  .canvas {
    flex: 1;
    background-color: #e0e0e0;
    padding: 20px;
    overflow: auto;
  }
  .canvas-item {
    background-color: #fff;
    padding: 20px;
    margin: 10px 0;
  }
  </style>
  