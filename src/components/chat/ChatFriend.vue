<template>
     <div class="chat-friend" >
      <div class="info-time">
        <n-avatar round>{{ chatInfo.sender.slice(-2) }}</n-avatar>
        <span>{{ chatInfo.sender }}</span>
        
          
      </div>
      <div class="chat-record">
          <div class="chat-text" v-if="chatInfo.type==='text'">
              {{chatInfo.content}}
          </div>
          <div v-else-if="chatInfo.type==='image'">
            <div class="img-wrapper">
              <el-image
                style="width: 150px; height: 150px;z-index: 2;"
                lazy
                :src="'http://81.70.184.77:8000'+ chatInfo.file"
                :zoom-rate="1.2"
                :preview-src-list="['http://81.70.184.77:8000' + chatInfo.file]"
                :initial-index="1"
                fit="cover"
              />
            </div>
            <!-- <img :src="'http://81.70.184.77:8000'+ chatInfo.file"> -->
          </div>
          </div>
      <div class="info-time">
          <span>{{ formattedTime(chatInfo.send_time) }}</span>
      </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import{NAvatar} from "naive-ui"

export default defineComponent({
  props:{
    chatInfo:{}
  },  
  // setup() {
  //       return{
           
  //       }
  //   },
    components:{
        NAvatar
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
              }
            else {
                // 否则，格式化成 月-日 时:分
                const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
                const day = dateTime.getDate().toString().padStart(2, '0');
                const hours = dateTime.getHours().toString().padStart(2, '0');
                const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                return `${month}-${day} ${hours}:${minutes}`;
            }
        },
      }
})
</script>

<style lang="scss" scoped>
.chat-friend {
          width: 100%;
          float: left;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .chat-text {
            max-width: 90%;
            padding: 15px;
            font-size: 18px;
            border-radius: 5px 20px 20px 20px;
            background-color: rgba(#FACCCC ,0.7)  ;
            color: #48464C;
            &:hover {
              background-color:   #FACCCC ;
            }
          }
          .img-wrapper{
            height:180px;
            width:180px;
            background-color: rgba(#FACCCC ,0.7)  ;
            // padding: 10px 10px;
            box-sizing: border-box;
            border-radius: 3px;
            display: flex; /* 使用 Flex 布局 */
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
    
          }
          .info-time {
            margin: 10px 0;
            color: black;
            font-size: 14px;
            .avator {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10px;
            }
            span:last-child {
              color: rgb(101, 104, 115);
              margin-left: 10px;
              vertical-align: middle;
            }
          }
        }
 
</style>