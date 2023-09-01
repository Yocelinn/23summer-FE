<template>
    <div class="header-container">
        <div class="left-container">
            <img src="../assets/logo.jpg" alt="logo" class="logo">
        </div>
        <div class="right-container">
            <div class="item">
                <el-input
                    v-model="input2"
                    class="w-50 m-2"
                    placeholder="Please Input"
                    :suffix-icon="Search"
                    >
                    <el-icon><Search /></el-icon>
                    </el-input>
            </div>
            <div class="item chat" @click="goPerson">
                <el-icon size="20" ><House /></el-icon>
            </div>
            <div class="item chat" @click="goTeamChat">
                <el-icon size="20" ><ChatLineRound /></el-icon>
            </div>
            <div class="item bell">
                <el-icon size="20" @click="toggleNotiList" ><Bell /></el-icon>
            </div>
           
            <div class="noti-column"  :class="{ 'slide-out': showNotiList }">
                <transition name="slide">
                    <div v-if="showNotiList" class="noti-list-wrapper" >
                        <Notification/>
                    </div>
                </transition>
            </div>
            <div class="item avatar" >
                <el-popover
                    :width="300"
                    @show="readInfo"
                    popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; "
                    >
                    <template #reference>
                        <el-avatar src="https://avatars.githubusercontent.com/u/72015883?v=4" :size="40"/>
                    </template>
                    <template #default>
                        <div
                        class="demo-rich-conent"
                        style="display: flex; gap: 16px; flex-direction: column"
                        >
                            <div>
                                <el-avatar
                                    :size="60"
                                    src="https://avatars.githubusercontent.com/u/72015883?v=4"
                                    style="margin-bottom: 5px"
                                />
                                <button @click="logout" class="logout">登出</button>
                            </div>
                            <div>
                                <p
                                class="demo-rich-content__name"
                                style="margin-buttom: 5px; font-weight: 500;font-size:large;"
                                >
                                用户名： {{ userName }}
                                </p>
                                <p
                                class="demo-rich-content__mention"
                                style="margin: 0; font-size: 14px; color: var(--el-color-info)"
                                >
                                用户昵称： {{ userNickName }}
                                </p>
                            </div>

                            <p class="demo-rich-content__desc" style="margin: 0">
                                所选团队： {{ curTeamName }}
                                <button style="float: right;" @click="goTeamPage()">进入团队</button>
                            </p>
                        </div>
                    </template>
                </el-popover>
            </div>
            
        </div>
    </div>
</template>

<script>

import { Search } from '@element-plus/icons-vue'
import Notification from './NotificationView.vue'
import router from "@/router"

export default {
    setup() {
        return {
            Search,
        }
    },
    components:{
        Notification
    },
    data() {
        return {
            userName: '',
            userNickName: '',
            curTeamName: '',

            input2: '',
            showNotiList:false,
        }
    },
    mounted() {
    },
    methods:{
        toggleNotiList() {
        this.showNotiList = !this.showNotiList; // 切换列表显示状态
        },
        readInfo(){
            this.userName = window.sessionStorage.getItem('userName')
            this.userNickName = window.sessionStorage.getItem('userNickName')
            this.curTeamName = window.sessionStorage.getItem('curTeamName')
        },
        goPerson() {
            router.push('/person')
        },
        goTeamPage() {
            router.push('/teamCenter')
        },
        goTeamChat() {
            router.push('/chat')
        },
        logout() {          
            this.$store.commit('logout');
            router.push('/')
            this.showNotiList = false
        }
    },
}
</script>

<style scoped>
.logo {
    margin-top: 10px;
    width: 40px
}
.header-container {
    height:7vh;
    line-height:50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid rgb(200, 199, 199);
}
.left-container {
    margin-left: 20px;
}
.right-container {
    display: flex;
    margin-right: 30px;
}
.item {
    margin-right: 10px;

}
.bell {
    line-height: 50px;
    align-items: center;
    justify-content: center;
}
.chat {
    line-height: 50px;
    align-items: center;
    justify-content: center;
}
.item:hover {
    color: #9f5ee1;
}
.logout {
    border: none;
    background-color: #ccb7e3;
    width: 60px;
    height: 30px;
    border-radius: 5px;
    margin-top: 10px;
    float: right;
}
.avatar {
    line-height: 40px;
    align-items: center;
    justify-content: center;
}
.noti-list-wrapper {
  
  position: fixed;
  top: 7vh;
  right: 0;
  width: 30%; /* 列表宽度占满父容器，可以根据需要进行调整 */
  height: 93vh;
  background-color: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  overflow-y: auto; /* 添加纵向滚动条，如果内容过多时可滚动 */
}
.noti-column{
    /* width:30%; */
    overflow-x: hidden;
  position: relative;
  transition: width 0.5s; /* 添加宽度过渡效果 */
  z-index: 1000;
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

</style>