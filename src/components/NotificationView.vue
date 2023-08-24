<template>
    <div class="notification">
        <el-button  @click="toggleList" type="primary" style="background-color: #9E9CF4;border-color: #8b8af1;color:white">
                click
        </el-button>
        <div class="noti-column"  :class="{ 'slide-out': showList }">
            <transition name="slide">
            <div v-if="showList" class="noti-list-wrapper">
                <div class="noti-list-header">
                <el-select v-model="value" class="noti-selector" placeholder="全部消息" >
                    <el-option
                    v-for="item in noti_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
                <div class="noti-allChecked">
                    
                </div>
              
            </div>
                <n-list hoverable clickable class="noti-list">
                    <n-list-item>
                        <n-thing title="task" content-style="margin-top: 10px;">
                            
                        <template #description>
                            <n-space size="small" style="margin-top: 4px">
                                <n-tag :bordered="false" type="info" size="small">
                                团队
                            </n-tag>
                            </n-space>
                        </template>
                        <div class="noti-list-item">
                            <div class="noti-avator">
                                <el-avatar :size="30" :src="circleUrl" />
                            </div>
                            <div class="noti-content">
                                <div class="noti-msg">lalalalala</div>
                                <div class="noti-time">xx-xx</div>
                            </div>
                        </div>
                        
                       
                        </n-thing>
                    </n-list-item>
                    <n-list-item>
                        <n-thing title="Task" content-style="margin-top: 10px;">
                        <template #description>
                            <n-space size="small" style="margin-top: 4px">
                            <n-tag :bordered="false" type="info" size="small" background-color="#A1EBDE  ">
                                团队
                            </n-tag>
                            
                            </n-space>
                        </template>
                        <div class="noti-list-item">
                            <div class="noti-avator">
                                <el-avatar :size="30" :src="circleUrl" />
                            </div>
                            <div class="noti-content">
                                <div class="noti-msg">lalalalala</div>
                                <div class="noti-time">xx-xx</div>
                            </div>
                           
                        </div>
                        </n-thing>
                    </n-list-item>
                </n-list>
            </div>
        </transition>
    </div>
</div>
</template>
<script>
import { defineComponent } from 'vue'
import { NList,NListItem,NThing,NSpace,NTag } from 'naive-ui'
import { CheckmarkCircle } from "@vicons/ionicons5";
export default defineComponent({
    data() {
        return {
        showList: false, // 控制列表的显示状态
        value:"AllNoti",
        circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        noti_options:[
            {
                value:"AllNoti",
                label:"全部消息"
            },
            {
                value:"NotiNotRead",
                label:"未读消息"
            },
            {
                value:"NotiHasRead",
                label:"已读消息"
            }
        ]
        };
    },
    components:{
        NList,NListItem,NThing,NSpace,NTag,
    },
    methods: {
        toggleList() {
        this.showList = !this.showList; // 切换列表显示状态
        },
    },
    setup(){
        return {
            CheckmarkCircle
        }
    }
})
</script>
<style scoped>

.notification{
    display:flex;
    justify-content:flex-end;
   
    /* width:30%; */
    
}

.noti-column{
    width:30%;
    overflow-x: hidden;
  position: relative;
  transition: width 0.5s; /* 添加宽度过渡效果 */
}
.noti-selector{
   width:30%;
   margin: 10px 10px 0 5%;
}
.noti-column.slide-enter-active,
.noti-column.slide-leave-active {
  transition: transform 0.5s, width 0.5s; /* 添加 transform 和宽度过渡效果 */
}

.noti-column.slide-enter,
.noti-column.slide-leave-to {
  transform: translateX(-100%); /* 初始时内容在左侧 */
}

.noti-column.slide-out.slide-leave-active {
  transform: translateX(0); /* 向右滑出时恢复初始位置 */
}

.noti-list-wrapper {
  
  position: fixed;
  top: 0;
  right: 0;
  width: 30%; /* 列表宽度占满父容器，可以根据需要进行调整 */
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  overflow-y: auto; /* 添加纵向滚动条，如果内容过多时可滚动 */
}
.noti-list-header{
    display: flex;
}
.noti-list-item{
    display: flex;
}
.noti-avator{
    flex:0 0 auto;
    
}
.noti-content{
    margin-left:10px;
}
.noti-allChecked{
    justify-content: flex-end;
}
</style>