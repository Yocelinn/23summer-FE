<template>
 <div class="searchMsg">
    <el-input :class="{ 'sticky': true}"
        v-model="searchInput"
        placeholder="Please Input"
        :suffix-icon="Search"
        @keyup.enter="handleSearch"
    />
    <n-list hoverable clickable v-for="(chatInfo,index) in searchResults" :key="index" class="MsgList">
        <n-list-item>
            <div class="chat-wrapper">
                <n-avatar class="avatar">{{ chatInfo.sender.slice(-2)}}</n-avatar>
                <div class="chat-info">
                    <div class="sender-name">
                        {{ chatInfo.sender }}
                    </div>
                    <div class="chat-content">
                        {{ chatInfo.content }}
                    </div>
                </div>
                <div class="chat-time">
                    {{ formattedTime(chatInfo.send_time) }}
                </div>
            </div>
            <n-divider />
        </n-list-item>

    </n-list>

 </div>
</template>
<script>
import { defineComponent,ref } from 'vue'
import {NModal,NList,NListItem,NAvatar,NDivider} from 'naive-ui'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios'
export default defineComponent({
    props:{
        curTeamId: Number, // 声明 curTeamId 为一个 Number 类型的属性
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
    setup(props) {
        const curTeamId=ref(props.curTeamId);
        const selectedMember=ref(props.selectedMember);
        const searchInput=ref();
        const searchResults=ref([]);
        function handleSearch(){
            console.log(searchInput.value)
            let searchUrl='chat/search';
            let searchData={
                "team_id":  parseInt(curTeamId.value), 
                "key": searchInput.value
            }
            if(selectedMember.value.user_id!=-1) {
                searchUrl='chat/pri/search'
                searchData={
                    "team_id": parseInt(curTeamId.value), 
                    "key": searchInput.value,
                    "rec_id":selectedMember.value.user_id
                }
            }
            axios.post(searchUrl,JSON.stringify(searchData))
            .then((response)=>{
                console.log(response.data)
                if(response.data.code!=200){
                    console.log(response.date.error)
                }
                else{
                    searchResults.value=response.data.chats
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
        }
    },
})
</script>
<style scoped>
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
    font-size:10px;
    color:#9E9CF4
}
.chat-content{
    word-wrap: break-word;
}
.n-divider {
    margin: 5px 3px; /* 调整分隔线的上下间距 */
    border-color: #ccc; /* 修改分隔线的颜色 */
}
</style>
