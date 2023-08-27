<template>
     <div id="prototype-page" class="main">
        
        <span class="left-menu">
            <div class="text">页面大小： {{ pageStyle.width }} × {{ pageStyle.height }}</div>
            <button @click="changePageVisible = true" class="change-button">修改页面大小</button>
        </span>
        <div class="canvas">
            <div class="one-page" :style="pageStyle">
            <!-- <canvas width="500" height="300" style="z-index:-1;border:1px black solid;position:absolute"></canvas> -->
                <VueDragResizeRotate :x="0" :y="0" :w="200" :h="200" :parent="true" class="item1">
                    <p>你可以拖着我，按照自己的意愿调整大小。1</p>
                </VueDragResizeRotate>
                <VueDragResizeRotate :x="0" :y="0" :w="200" :h="200" :parent="true" class="item2">
                    <p>你可以拖着我，按照自己的意愿调整大小。2</p>
                </VueDragResizeRotate>

            
            </div>

        </div>
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

export default {
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

            changePageVisible: false
        }
    },
    mounted() {
        this.pageStyle.height = '600px'
        this.pageStyle.width = '800px'
    },
    methods: {
        changePageSize() {
            this.changePageVisible = false
            let sizeData = JSON.parse(JSON.stringify(this.pageChange))
            this.pageStyle = sizeData
            console.log(this.pageStyle)
            this.pageStyle.height += 'px'
            this.pageStyle.width += 'px'
        }
    }
}
    
</script>

<style scoped>
.main {
    width: 100%;
    height: 93vh;
    display: flex;
}
.left-menu {
    width: 15vw;
    background-color: #dcd1e7;
    
}
.text {
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
}
.change-button {
    border: #808080 1px solid;
    border-radius: 5px;
    padding: 5px 8px;
    background-color: rgb(239, 235, 240);
}
.canvas {
    width: 70vw;
    height: 100%;
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
    /*
    width:800px;
    height:600px;
    */
    background-color: white;
    border: 1px solid rgb(219, 217, 217);
}
.dialog-footer {
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly
}
</style>