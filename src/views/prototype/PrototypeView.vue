<template>
     <div id="prototype-page" class="main">
        <span class="left-menu" >
            <!-- <div class="text">页面大小： {{ pageStyle.width }} × {{ pageStyle.height }}</div> -->
            <div class="button-container">
                <button @click="changePageVisible = true" class="basic-button">修改页面大小</button>
            </div>
            <div class="button-container">
                <button @click="createPage" class="basic-button">新建页面</button>
            </div>
            
            <el-divider border-style="double" />

            <ComponentList></ComponentList>
            <el-divider border-style="double" />

        </span>
        <div class="canvas">
            <div  
            v-for="(page, index) in pageArray" 
            :key="index"
            class="one-page" 
            :style="pageStyle"
            :class="{ 'selected': page.content.selected }"
            @click="selectItem(page, index)">
                haha is {{ page.content.name }} 
                select is {{  page.content.selected }}
                <VueDragResizeRotate :x="0" :y="0" :w="200" :h="100"  class="item1">
                    <p>你可以拖着我，按照自己的意愿调整大小。1</p>
                </VueDragResizeRotate>
                <VueDragResizeRotate :x="0" :y="0" :w="200" :h="150"  class="item2">
                    <p>你可以拖着我，按照自己的意愿调整大小。2</p>
                </VueDragResizeRotate>

            
            </div>

        </div>
        <span class="right-menu">
            这是右边栏
            <div class="text">元素名：{{ Object.keys(activeItem).length > 0 ? activeItem.content.name : '' }} </div>
            <div class="button-container">
                <button @click="deletePage(activeItem.id)" class="basic-button">删除页面</button>
            </div>
            
            <el-divider border-style="double" />
            
        </span>

        <el-dialog v-model="changePageVisible" :append-to-body="true" title="修改页面大小" center> 
            <el-form :model="pageChange">
                <el-form-item label="页面宽度" label-width="150px">
                    <el-input v-model="pageChange.width" placeholder="请输入像素值，如800"/>
                </el-form-item>
                <el-form-item label="页面高度" label-width="150px">
                    <el-input v-model="pageChange.height" placeholder="请输入像素值，如500px"/>
                </el-form-item>
            </el-form>
            <span class="dialog-footer">
                <el-button @click="changePageVisible = false">取消</el-button>
                <el-button type="primary" @click="changePageSize()">确认</el-button>
            </span>
        </el-dialog>
    </div> 
</template>

<script>
import ComponentList from '@/components/Prototype/ComponentList' // 左侧列表组件


export default {
    name: 'prototype-view',
    components: {
        ComponentList
    },
    data() {
        return {
            pageStyle: {
                height: '',
                width: ''
            },
            pageChange:{
                height: '',
                width: ''
            }, 
            onePage: {
                name: '',
                type: 'page',
                selected: false,
                backgroundColor: 'white',
            },
            pageArray: [],
            pageCount: 0,

            activeItem: {},

            changePageVisible: false
        }
    },
    mounted() {
        this.pageStyle.height = '600px'
        this.pageStyle.width = '800px'
        this.initPage()
    },
    methods: {
        initPage() {
            this.onePage.name = '页面'
            this.pageArray.push({id: this.pageCount, content: JSON.parse(JSON.stringify(this.onePage))})
        },
        changePageSize() {
            this.changePageVisible = false
            let sizeData = JSON.parse(JSON.stringify(this.pageChange))
            this.pageStyle = sizeData
            this.pageStyle.height += 'px'
            this.pageStyle.width += 'px'
        },
        createPage() {
            this.pageCount++
            this.onePage.name = '页面'
            this.pageArray.push({id: this.pageCount, content: JSON.parse(JSON.stringify(this.onePage))})
        },
        selectItem(item, index) {
            console.log(item)
            this.activeItem = item
            // Reflect.set(this.activeItem,'id',index)
            // 选中的是页面
            if(this.activeItem.content.type === 'page') {
                this.pageArray.forEach((page, i) => {
                    page.content.selected = (i === index);
                });
            }
        },
        deletePage(index) {
            // splice删除： 第一个参数为删除的位置，第二个参数为删除的元素数量
            this.pageArray.splice(index, 1)
        }
    }
}
    
</script>

<style scoped>
.main {
    height: 93vh;
    display: flex;
    overflow: hidden;
    position: absolute;
    margin: 0;
}

.left-menu {
    width: 15vw;
    height: 100%;
    background-color: #dcd1e7;  
    display: block;
}

.text {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
}
.button-container {
    display: flex;
    justify-content: center;
}
.basic-button {
    border: #808080 1px solid;
    border-radius: 5px;
    padding: 5px 8px;
    background-color: rgb(239, 235, 240);
}
:deep(.el-divider--horizontal) {
    background-color: rgb(147, 142, 142);
    height: 1.5px;
    width: 95%;
    margin-left: 2.5%;
}

.canvas {
    width: 70vw;
    overflow: auto;
    position: relative;
    background-color: #808080;
    background: linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px);
    background-size: 20px 20px, 20px 20px;
}
.item1 {
    border: 1px black solid;
    background-color: palegoldenrod;
}
.item2 {
    border: 1px black solid;
    background-color: pink;
}
.one-page {
    background-color: white;
    border: 1px solid rgb(219, 217, 217);
}
.selected {
    border: 2px dashed #9f5ee1;
}

.right-menu {
    width: 13vw;
}

.dialog-footer {
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly
}


/*css主要部分的样式*/
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
.canvas::-webkit-scrollbar {
    width: 8px; /*对垂直流动条有效*/
    height: 8px; /*对水平流动条有效*/
  }
  
  /*定义滚动条的轨道颜色、内阴影及圆角*/
.canvas::-webkit-scrollbar-track{
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); 
    background-color: transparent; 
  }
   
  /*定义滑块颜色、内阴影及圆角*/
 .canvas::-webkit-scrollbar-thumb{
    border-radius: 8px;
    background-color: #d5d6d8;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  }
  
  /*定义滑块悬停变化颜色、内阴影及圆角*/
.canvas::-webkit-scrollbar-thumb:hover{
    background-color: #C7C9CC;
  }
</style>