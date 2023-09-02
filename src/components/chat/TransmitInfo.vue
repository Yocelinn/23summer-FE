<template>
     <div class="TransmintMsg">
        <div class="transmit-header">
            <el-select v-model="transmitValue" class="friend_selector" placeholder="选择转发对象" size="large">
             <el-option
                v-for="item in transmit_option"
                :key="item.no"
                :label="item.name"
                :value="item.no"

                
                />
            </el-select>
            <el-button class="transmit-button" color="  #9E9CF4 " plain @click="handleClick">转发</el-button>
        </div>
    
  
    <el-checkbox-group v-model="transList"  class="transmit-wrapper">
        <div class="transmitInfo-content" v-for="info in allRecords" :key="info.chat_id" :label="info.chat_id">
            <el-checkbox :label="info" class="transmit-checkbox">
            <div class="chat-wrapper">
                        <!-- <n-avatar class="avatar">{{ info.sender.slice(-2)}}</n-avatar> -->
            <div class="chat-info">
                <div class="sender-name">
                    {{ info.sender }}
                </div>
                <div class="chat-content">
                    {{ info.content }}
                </div>
            </div>
            <div class="left-nav">
                <div class="chat-time">
                    {{ formattedTime(info.send_time) }}
                </div>
            </div>
            </div>

       
            </el-checkbox>
        </div>
            
  </el-checkbox-group>
  
 </div>
</template>

<script>
import { defineComponent,onMounted,ref,emit } from 'vue'
import {NAvatar} from 'naive-ui'
import axios from 'axios'
export default defineComponent({
    components:{
        NAvatar
    },
    props:{
        allRecords:Array,
        userId:Number,
        transmit_option:Array,
        chooseFriend:Function,
    },
    setup(props,{emit}) {
        onMounted(()=>{
            // console.log(allRecords.value)
            console.log(transmit_option.value)
        })
        const  transmitValue=ref()
        // const searchInput=ref()
        const showModal=ref(false)
        const transList=ref([])
        const InfoResults=ref([])
        const allRecords=ref(props.allRecords)
        const transmit_option=ref(props.transmit_option)
        const chooseFriend=ref(props.chooseFriend)
        const userId=ref(props.userId)
        const TransMitInfo = (transList,item) => {
            let param = {
                 MsgList:transList,
                 chatObj:item
            };
            console.log("sendToParent"+param.MsgList)
            console.log(param.chatObj);
            emit('TransMitInfo',param)
        }

        function formattedTime(dateTimeStr) {
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
        }


        function handleClick(){
            console.log(transList.value)
            console.log(transmitValue.value)
            const item = transmit_option.value.find(chat => chat.no === transmitValue.value);
            if(item){
                console.log("转发",item)
                // chooseFriend.value(item)
                TransMitInfo(transList.value,item)
            }
            
            
            // transList.value.forEach((info)=>{
            //     const curTeamId=parseInt(window.sessionStorage.getItem('curTeamId'))
            //     axios.post('chat/create/pri',{ "team_id":curTeamId ,"content":info.content,"rec_id": transmitValue.value})
            //     .then((response)=>{
            //         console.log("sendMsg")
            //         console.log(response.data)
            //         // console.log(response.data.message)
            //     })
            //     .catch(error=>{
            //         console.log(error);
            //     })
            // })

        }
 
        return{
            transList,InfoResults,formattedTime,showModal,handleClick, transmitValue
        }

    },
})
</script>
<style scoped>
.TransmintMsg{
    max-height: 400px;
    overflow:auto
}
.transmit-header{
   margin-right:30px;
   margin-left:30px;
    display:flex;
    justify-content: space-between;
    position: sticky;
  top: 0;
  background-color: white; /* 可以添加背景颜色，使其更明显 */
  z-index: 100; 
}
.transmit-wrapper{
    padding:20px;
    display:flex;
    flex-direction: column;
    overflow:auto;
}
.transmitInfo-content{
    padding:10px;
}
.transmit-checkbox{
    width:80%;
    
}
.chat-wrapper {
    display: flex;
    
    justify-items:space-between;
    /* align-item:center; */
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
    font-size:12px;
    color:#9E9CF4
}
.chat-content{
    margin-top:3px;
    width: 300px;;
    word-wrap: break-word;
    font-size:16px;
}
:deep(.el-checkbox ){
    white-space:break-spaces
}
.left-nav{
    margin-right:10px;
    /* border:1px solid black; */
    align-items: flex-end;
    width:100px;
}
.chat-time{
    font-size: 12px;;
}
.transmit-button{
    padding:20px;
    margin-right:30px;
}

/* .transmit-wrapper{

} */
</style>