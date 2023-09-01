<template>
 <div class="sear chMsg">
    <div class="search-bar">
        <el-input :class="{ 'sticky': true}"
            v-model="searchInput"
            placeholder="Please Input"

            @keyup.enter="handleSearch"
        />
        <el-button  :icon="Search" @click="handleSearch" class="search-button" />
    </div>
    <n-list hoverable clickable v-for="(chatInfo,index) in searchResults" :key="index" class="MsgList">
        <!-- <div v-if="searchResults.length===0">
            什么都没搜到
        </div> -->
        <n-list-item  @mouseenter="setHover(index, true)" @mouseleave="setHover(index, false)">
            <div class="chat-wrapper" @click="jumpToMsg(chatInfo)">
                <n-avatar class="avatar">{{ chatInfo.sender.slice(-2)}}</n-avatar>
                <div class="chat-info">
                    <div class="sender-name">
                        {{ chatInfo.sender }}
                    </div>
                    <div class="chat-content">
                        {{ chatInfo.content }}
                    </div>
                </div>
                <div class="left-nav">
                    <div class="chat-time">
                        {{ formattedTime(chatInfo.send_time) }}
                    </div>
                    <div class="redirectTip" v-if="isHovered[index]">
                        定位至聊天
                    </div>
                </div>
                

            </div>
            <n-divider />
        </n-list-item>

    </n-list>

 </div>
</template>
<script>
import { defineComponent,ref,defineEmits } from 'vue'
import {NModal,NList,NListItem,NAvatar,NDivider} from 'naive-ui'
import { Search } from '@element-plus/icons-vue'

import axios from 'axios'
// const emit=defineEmits(['sendMsg']);
export default defineComponent({
    props:{
        curTeamId: String, // 声明 curTeamId 为一个 Number 类型的属性
        selectedMember: Object // 声明 selectedMember 为一个 Object 类型的属性
    },
    components:{
        NModal,NList,NListItem,NAvatar,NDivider
    },
    methods:{
        formattedTime(dateTimeStr) {
            const dateTime = new Date(dateTimeStr);
            const now = new Date();

            const isSameDate =
                now.getDate() === dateTime.getDate() &&
                now.getMonth() === dateTime.getMonth() &&
                now.getFullYear() === dateTime.getFullYear();

            const isYesterday =
                now.getDate() - 1 === dateTime.getDate() &&
                now.getMonth() === dateTime.getMonth() &&
                now.getFullYear() === dateTime.getFullYear();
            if (isSameDate) {
                // 如果日期是今天，只格式化成今天的时:分
                const hours = dateTime.getHours().toString().padStart(2, '0');
                const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                return `今天 ${hours}:${minutes}`;
            } 
            else if (isYesterday) {
            // 如果日期是昨天，显示 "昨天" 和时:分
                const hours = dateTime.getHours().toString().padStart(2, '0');
                const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                return `昨天 ${hours}:${minutes}`;
              } else {
                // 否则，格式化成 月-日 时:分
                const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
                const day = dateTime.getDate().toString().padStart(2, '0');
                const hours = dateTime.getHours().toString().padStart(2, '0');
                const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                return `${month}-${day} ${hours}:${minutes}`;
            }
        },
    },
    
    setup(props,{emit}) {
        const isHovered=ref([]);
        const curTeamId=ref(props.curTeamId);
        const selectedMember=ref(props.selectedMember);
        const searchInput=ref();
        const searchResults=ref([]);
        
        const jumpToMsg = (chatInfo) => {
            let param = {
                content: chatInfo.chat_id
            };
            console.log("sendToParent"+param.content)
            emit('sendMsg',param)
        }
        // function jumpToMsg(chatInfo){
            // let param={
            //     content:chatInfo.user_id
            // }
            // //传递给父组件
           
        //     console.log("sendToParent"+chatInfo.chat_id);
           
        //     emit('jumpToMsg',param)
           
        // }
        function setHover(index, value) {
            // 使用 Vue.set 方法来确保响应式更新
            isHovered.value[index]= value;

        }
        function handleSearch(){
            // console.log(searchInput.value)
            console.log(selectedMember.value)
            let searchUrl='chat/search';
            let searchData={
                "team_id":  parseInt(curTeamId.value), 
                "key": searchInput.value
            }
            if(selectedMember.value.type==='member') {
                searchUrl='chat/pri/search'
                searchData={
                    "team_id": parseInt(curTeamId.value), 
                    "key": searchInput.value,
                    "rec_id":selectedMember.value.id
                }
            }
            else if(selectedMember.value.type==='group'){
                searchUrl='chat/group/search'
                searchData={
                    "group_id": selectedMember.value.id,
                     "key": searchInput.value
                }
            }
            // console.log(searchData.value)
            axios.post(searchUrl,JSON.stringify(searchData))
            .then((response)=>{
                console.log(response.data)
                if(response.data.code!=200){
                    console.log(response.date.error)
                }
                else{
                    searchResults.value=response.data.chats;
                    isHovered.value = response.data.chats.map(() => false);
                }

            })
            .catch(error=>{
                console.log(error)
            })

        }
        
        return{
            Search,
            handleSearch,
            searchInput,
            searchResults,
            jumpToMsg,
            isHovered,
            setHover
        }
    },
})
</script>
<style scoped>
.search-bar{
    display: flex;
    justify-content: space-between;
}
:deep(.el-button ){
    --el-button-hover-text-color:#8988f1 ; 
--el-button-hover-bg-color: #9d9cf44b ;
 --el-button-hover-border-color: #8988f1 ;
 --el-button-active-border-color: #8988f1;
}
.chat-wrapper {
    display: flex;
    align-items: flex-start; /* 垂直上对齐头像和名字 */
}

.avatar {
    width:40px;
    height:40px;
    margin-right: 10px; /* 可以根据需要调整头像和内容之间的间距 */
    align-self: flex-start; /* 单独控制头像的垂直对齐方式 */
}
.chat-info {
    display: flex;
    flex-direction: column; /* 确保发送者名称和内容垂直排列 */
    width:70%;
    /* word-wrap: break-word; */
}
.sender-name{
    /* font-weight:400; */
    font-size:14px;
    color:#9E9CF4
}
.chat-content{
    word-wrap: break-word;
}
.n-divider {
    margin: 5px 3px; /* 调整分隔线的上下间距 */
    border-color: #ccc; /* 修改分隔线的颜色 */
}
.redirectTip{
    color:#8382d3
}
</style>
