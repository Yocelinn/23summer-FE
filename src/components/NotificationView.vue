<template>
    <!-- <n-scrollbar style="max-height: 500px"> -->
    <el-scrollbar >
          
    <div class="notification">
        <!-- <el-button  @click="toggleList" type="primary" style="background-color: #9E9CF4;border-color: #8b8af1;color:white">
                click
        </el-button> -->
        <!-- <div class="noti-column"  :class="{ 'slide-out': showList }">
            <transition name="slide">
            <div v-if="showList" class="noti-list-wrapper"> -->
        <div class="noti-list-header" :class="{ 'sticky': showList }">
            <el-select v-model="value" class="noti-selector" placeholder="全部消息" @change="handleNotiSelectChange" >
                <el-option
                v-for="item in noti_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right"><MoreFilled /></el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="allNotiFinished">一键已读</el-dropdown-item>
                    <el-dropdown-item @click="allNotiDeleted">一键删除已读消息</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div v-if="value==='AllNoti'">
            <n-list hoverable clickable class="noti-list"  v-for="(noti,index) in notifications" :key="index">
            <n-list-item   @mouseenter="setHover(index, true)" @mouseleave="setHover(index, false)">
                <n-thing :title="noti.is_read ? '查看消息' : '您有一条新消息'" content-style="margin-top: 10px;"
                @click="enterChatRoom(noti)">  
                <div class="noti-list-item">
                    <div class="noti-list-content">
                        <div class="noti-avator">
                            <el-avatar :size="30" :src="circleUrl" />
                        </div>
                        <div class="noti-content">
                            <div class="noti-msg">{{ noti.sender }} {{ noti.content }}</div>
                            <div class="noti-time">{{ formattedTime(noti.send_time) }}</div>
                        </div>
                    </div> 
                    <div class="icon-choose" :class="{'hovered': isHovered_all}">
                        <template v-if="!noti.is_read&& !isHovered_all[index]">
                            <!-- 未读消息的图标 -->
                            <!-- 显示数字标识未读消息数量 -->
                            <div class="unread-badge">1</div>
                            <!-- <CircleCheckFilled /> -->

                        </template>
                        <el-icon  class="noti-icon-check"
                            style="color:  #A1EBDE ;margin-right:30px" @click="checkNoti(noti.msg_id,index)" v-if="isHovered_all[index]&&!noti.is_read">
                            <CircleCheckFilled />
                        </el-icon>
                        
                        <el-icon class="noti-icon-delete"
                            style="color:  #FACCCC;" @click="deleteNoti(noti.msg_id)" v-if="isHovered_all[index]">
                            <CircleCloseFilled />
                        </el-icon>
                    </div>
                </div>
                
                
                </n-thing>
            </n-list-item>
            
            </n-list>
        </div>
        <div v-else-if="value==='NotiNotRead'">
            <n-list hoverable clickable class="noti-list"  v-for="(noti,index) in this.notiNotRead" :key="index">
            <n-list-item   @mouseenter="setHoverNot(index, true)" @mouseleave="setHover(index, false)">
                <n-thing title="您有一条新消息" content-style="margin-top: 10px;">  
                <div class="noti-list-item">
                    <div class="noti-list-content">
                        <div class="noti-avator">
                            <el-avatar :size="30" :src="circleUrl" />
                        </div>
                        <div class="noti-content">
                            <div class="noti-msg">{{ noti.sender }} {{ noti.content }}</div>
                            <div class="noti-time">{{ formattedTime(noti.send_time) }}</div>
                        </div>
                    </div> 
                    <div class="icon-choose" :class="{'hovered': isHovered_not}">
                        <template v-if="!isHovered_not[index]">
                            <div class="unread-badge">1</div>
                            <!-- <CircleCheckFilled /> -->

                        </template>
                        <el-icon class="noti-icon-check"
                            style="color:  #A1EBDE ;margin-right:30px" @click="checkNoti(noti.msg_id)" v-if="isHovered_not[index]">
                            <CircleCheckFilled />
                        </el-icon>
                        
                        <el-icon class="noti-icon-delete"
                            style="color:  #FACCCC;" @click="deleteNoti(noti.msg_id)" v-if="isHovered_not[index]">
                            <CircleCloseFilled />
                        </el-icon>
                    </div>
                </div>
                </n-thing>
            </n-list-item>
            
            </n-list>
        </div>
        <div v-else>
            <n-list hoverable clickable class="noti-list"  v-for="(noti,index) in this.notiHasRead" :key="index">
            <n-list-item   @mouseenter="setHoverRead(index, true)" @mouseleave="setHoverRead(index, false)">
                <n-thing title="查看消息" content-style="margin-top: 10px;">  
                <div class="noti-list-item">
                    <div class="noti-list-content">
                        <div class="noti-avator">
                            <el-avatar :size="30" :src="circleUrl" />
                        </div>
                        <div class="noti-content">
                            <div class="noti-msg">{{ noti.sender }} {{ noti.content }}</div>
                            <div class="noti-time">{{ formattedTime(noti.send_time) }}</div>
                        </div>
                    </div> 
                    <div class="icon-choose" :class="{'hovered': isHovered_read}">
                        <el-icon class="noti-icon-delete"
                            style="color:  #FACCCC;" @click="deleteNoti(noti.msg_id)" v-if="isHovered_read[index]">
                            <CircleCloseFilled />
                        </el-icon>
                    </div>
                </div>
               </n-thing>
            </n-list-item>
            
            </n-list>
        </div>
            
            <!-- </div>
        </transition>
    </div> -->
</div>
</el-scrollbar>  
<!-- </n-scrollbar> -->
</template>
<script>

import { defineComponent ,ref,watchEffect} from 'vue'
import { NList,NListItem,NThing,NSpace,NTag } from 'naive-ui'
import { CheckmarkCircle } from "@vicons/ionicons5";
import axios from 'axios'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
// import { post } from '@/utils/'

export default defineComponent({
    props:{
        // showList: Boolean, // 控制列表的显示状态

    },
    setup(){
       const notifications=ref([]);
       const curTeamId=ref()
       const router = useRouter()
       const notiNotRead=ref([]);
       const notiHasRead=ref([]);
       const isHovered_all=ref([]);
       const value=ref("AllNoti");
       const circleUrl=ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
       const noti_options=ref([
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
        ])
        const isHovered_not=ref([]);
        const isHovered_read=ref([]);
        const checkisShow=([]);
    //    const checkisShow=ref([]);

        function enterChatRoom(noti){
            // console.log('enterChatRoom')
            let url='/message/self/'+noti.msg_ig
            axios.get(url)
            .then((response)=>{
                console.log(response.data)
                if(response.data.code!=200){
                    console.log(response.data.error)
                }
                else{
                    router.push('/chat')
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
       function checkNoti(id,index){
            axios.put('message/operate',{"msg_id":id})
            .then((response)=>{
                // console.log(response)
                if(response.data.code!=200){
                    console.log(response.data.error);
                }
                else{
                    // console.log("消息已读");
                    // console.log("selectedValue:"+this.value)
                    if(value.value==="AllNoti")
                       {
                        // this.checkisShow[index]=false;
                        
                        fetchNotifications();
                        // console.log("重新拉取")
                        // console.log(this.checkisShow);
                       }
                    else if(value.value==="NotiNotRead"){
                        getNotiNotRead();
                    }
                    else if(value.value==="NotiHasRead"){
                        getNotiHasRead();
                    }
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
        function deleteNoti(id){
            axios.post('/message/operate',{"msg_id": id})
            .then((response)=>{
                // console.log(response)
                if(response.data.code!=200){
                    console.log(response.data.error);
                }
                else{
                    // console.log(notifications)

                    // console.log("selectedValue:"+this.value);
                    if(value.value==="AllNoti")
                        fetchNotifications(); // 重新获取数据
                    else if(value.value==="NotiNotRead"){
                        getNotiNotRead();
                    }
                    else if(value.value==="NotiHasRead"){
                        getNotiHasRead();
                    }
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
        function allNotiFinished(){
            curTeamId.value=window.sessionStorage.getItem('curTeamId')
            axios.put('/message/operate_all',{"team_id":parseInt(curTeamId)})
            .then((response)=>{
                // console.log(response)
                if(response.data.code!=200){
                    alert(response.data.messages);
                }
                else{
                    // console.log("消息已读");
                    // console.log("selectedValue:"+value.value);
                    if(value.value==="AllNoti"){
                        fetchNotifications(); // 重新获取数据
                        // this.$forceUpdate();
                    }
                    else if(value.value==="NotiNotRead"){
                        getNotiNotRead();
                    }
                    else if(value.value==="NotiHasRead"){
                        getNotiHasRead();
                    }
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
        function allNotiDeleted(){
            curTeamId.value=window.sessionStorage.getItem('curTeamId')
            axios.delete('/message/operate_all',{"team_id":parseInt(curTeamId)})
            .then((response)=>{
                // console.log(response)
                if(response.data.code!=200){
                    console.log(response.data.messages);
                }
                else{
                    // console.log("消息已读");
                    // console.log("selectedValue:"+value.value);
                    if(value.value==="AllNoti")
                        fetchNotifications(); // 重新获取数据
                    else if(value.value==="NotiNotRead"){
                        getNotiNotRead();
                    }
                    else if(value.value==="NotiHasRead"){
                        getNotiHasRead();
                    }
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
        function fetchNotifications() {
            curTeamId.value=window.sessionStorage.getItem('curTeamId')
            console.log("teamId:"+curTeamId.value)
            axios.post('/message/all',{"team_id":parseInt(curTeamId.value)})
            .then((response)=>{
                // console.log(response)
                if(response.data.code!=200){
                    console.log(response.data.messages);
                    // alert(response.data.msg);
                }
                else{
                    notifications.value = response.data.messages;
                    console.log(response.data.messages);
                    // this.checkisShow = this.notifications.map((message) => !message.is_read);

                    // console.log(this.checkisShow);
                    isHovered_all.value = response.data.messages.map(() => false);
                    // response.data.messages.forEach((msg,index) => {
                    //     this.notifications[index]=msg;
                    //     this.isHovered_not.value = response.data.messages.map(() => false);
                    //     this.isHovered_all[index]=false;
                    // });
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
         function getNotiNotRead(){
            curTeamId.value=window.sessionStorage.getItem('curTeamId')
                axios.post('/message/all',{"team_id":parseInt(curTeamId.value),"is_read":0})
                .then((response)=>{
                // console.log(response)
                if(response.data.code!=200){
                    console.log(response.data.messages);
                    // alert(response.data.msg);
                }
                else{
                    notiNotRead.value = response.data.messages;
                    isHovered_all.value = response.data.messages.map(() => false);
                    // response.data.messages.forEach((msg,index) => {
                    //     this.notiNotRead[index]=msg;
                        
                    //     this.isHovered_not[index]=false;
                    // });
                }
            })
            .catch(error=>{
                console.log(error);
            })
       }
       function getNotiHasRead() {
            curTeamId.value=window.sessionStorage.getItem('curTeamId')
            axios.post('/message/all',{"team_id":parseInt(curTeamId.value),"is_read":1})
            .then((response)=>{
            // console.log(response)
            if(response.data.code!=200){
                console.log(response.data.messages);
                // alert(response.data.msg);
            }
            else{
                notiHasRead.value = response.data.messages;
                    isHovered_read.value = response.data.messages.map(() => false);
            }
        })
        .catch(error=>{
            console.log(error);
        })
        }
        function handleNotiSelectChange(newValue){
            value.value=newValue;
            // console.log(value.value);
            if(value.value==="NotiNotRead"){
                getNotiNotRead();
            }
            else if(value.value==="NotiHasRead"){
                getNotiHasRead();
            }
            else if(value.value==="AllNoti"){
                fetchNotifications();
            }
        }
        function setHover(index, value) {
            // 使用 Vue.set 方法来确保响应式更新
            isHovered_all.value[index]= value;

        }
        function setHoverNot(index, value) {
            // 使用 Vue.set 方法来确保响应式更新
            isHovered_not.value[index]= value;
        }
        function setHoverRead(index, value) {
            // 使用 Vue.set 方法来确保响应式更新
            isHovered_read.value[index]= value;
        }
        function formattedTime(dateTimeStr) {
            const dateTime = new Date(dateTimeStr);
            const now = new Date();

            const isSameDate =
                now.getDate() === dateTime.getDate() &&
                now.getMonth() === dateTime.getMonth() &&
                now.getFullYear() === dateTime.getFullYear();

            if (isSameDate) {
                // 如果日期是今天，只格式化成今天的时:分
                const hours = dateTime.getHours().toString().padStart(2, '0');
                const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                return `今天 ${hours}:${minutes}`;
            } else {
                // 否则，格式化成 月-日 时:分
                const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
                const day = dateTime.getDate().toString().padStart(2, '0');
                const hours = dateTime.getHours().toString().padStart(2, '0');
                const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                return `${month}-${day} ${hours}:${minutes}`;
            }
        }
       onMounted(()=>{
        fetchNotifications();
       
       });
       return{
        notifications,notiNotRead,notiHasRead,isHovered_all,noti_options,circleUrl,value, isHovered_not,
        isHovered_read,checkisShow,curTeamId,
        // checkisShow,
        CheckmarkCircle,
        checkNoti,deleteNoti,allNotiDeleted,allNotiFinished,
        getNotiHasRead,getNotiNotRead,fetchNotifications, handleNotiSelectChange,setHoverNot,setHover,setHoverRead,
        formattedTime,enterChatRoom,router
       }
    },
    data() {
        return {
        
       
        // selectedValue: '',
        
        showList:true,
        
        };
    },
    components:{
        NList,NListItem,NThing,NSpace,NTag
    },
    
    methods: {
        // toggleList() {
        // this.showList = !this.showList; // 切换列表显示状态
        // },
        
      
       
    },
   
})
</script>
<style scoped>
.icon-choose {
  display: flex;
  align-items: center;
  transition: all 0.3s;
}
.unread-badge {
  /* 未读消息数量的样式 */
  background-color: #559aefde; /* 修改为你希望的颜色 */
  color: white;
  font-size: 12px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute;
  top: -8px;
  right: -8px; */
}
.hovered {
  /* 鼠标悬停时的样式 */
  /* background-color: #f0f0f0; 修改为你希望的背景颜色 */
}
.noti-list-item {
    display: flex;
    justify-content: space-between; /* 将项目放在容器中，首尾对齐 */
    align-items: center; /* 垂直居中对齐项目 */
    
}
.noti-list-content{
    display:flex;
    
}
.noti-list-content:hover{
    cursor: pointer;
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
    justify-content: space-between; /* 将项目放在容器中，首尾对齐 */
    align-items: center; /* 垂直居中对齐项目 */
    margin-right:30px;
}
.noti-list-item{
    display: flex;
}
.noti-avator{
    flex:0 0 auto;
    
}
.noti-content{
    margin-left:10px;
    display: flex;
    flex-direction: column;
    /* display:flex; */
}
.noti-allChecked{
    justify-content: flex-end;
}
.noti-list-header.sticky {
    position: sticky;
    top: 0; /* 顶部距离 */
    background-color: white; /* 背景颜色，可根据需要修改 */
    z-index: 1; /* 可能需要调整的层叠顺序 */
}
.icon-choose{
    font-size:20px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.noti-msg{
    font-size: 18px;
    font-weight:300;
    align-self: flex-start;
}
.noti-time{
    align-self: flex-start;
}
.noti-icon-check:hover{
    font-size:25px;
}

.noti-icon-delete:hover{
    font-size:25px;
}
.notification{
    z-index:10000;
}
</style>