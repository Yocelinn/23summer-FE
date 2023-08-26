<template>
     <div class="chat-friend" >
        <div class="info-time">
            <n-avatar round class="avator">{{ value }}</n-avatar>
            <span>这里是名字</span>
            
            
        </div>
        <div class="chat-text" >
            msgmsg
        </div>
        <div class="info-time">
            <span>这里是时间</span>
        </div>
    </div>
</template>
<script>
import { defineComponent,ref } from 'vue'
import{NAvatar} from "naive-ui"

export default defineComponent({
    setup() {
        return{
            value:ref('可爱的同事2号')
        }
    },
    components:{
        NAvatar
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
            padding: 20px;
            border-radius: 5px 20px 20px 20px;
            background-color: rgba(#FACCCC ,0.9)  ;
            color: #fff;
            &:hover {
              background-color:   #FACCCC ;
            }
          }
          .chat-img {
            img {
              width: 100px;
              height: 100px;
            }
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