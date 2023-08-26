<template>
    <div class="chat-me" >
        <div class="info-time">
            <span>这里是名字</span>
          
            <n-avatar round>{{ value }}</n-avatar>
        </div>
        <div class="chat-text" >
            msgmsg
        </div>
        <div class="info-time">
            <span>这里是时间</span>
        </div>
            <!-- <div class="chat-img" v-if="item.chatType == 1">
              <img
                :src="item.msg"
                alt="表情"
                v-if="item.extend.imgType == 1"
                style="width: 100px; height: 100px"
              />
              <el-image
                style="max-width: 300px; border-radius: 10px"
                :src="item.msg"
                :preview-src-list="srcImgList"
                v-else
              >
              </el-image>
            </div> -->
            <!-- <div class="chat-img" v-if="item.chatType == 2">
              <div class="word-file">
                <FileCard
                  :fileType="item.extend.fileType"
                  :file="item.msg"
                ></FileCard>
              </div>
            </div> -->
            
          </div>
</template>
<script>
import { defineComponent,ref} from 'vue'
import {NAvatar} from 'naive-ui'

export default defineComponent({
    setup() {
        return{
            value:ref('这里是名字')
        }
    },
    components:{
        NAvatar
    }
})
</script>

<style lang="scss" scoped>
.chat-me {
          width: 100%;
          float: right;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-end;
          .chat-text {
            float: right;
            max-width: 90%;
            padding: 20px;
            border-radius: 20px 5px 20px 20px;
            background-color:rgba(#9E9CF4 ,0.9);
            color: #fff;
            &:hover {
              background-color: #9E9CF4 ;
            }
          }
          .chat-img {
            img {
              max-width: 300px;
              max-height: 200px;
              border-radius: 10px;
            }
          }
          .info-time {
            margin: 10px 0;
            color: #fff;
            font-size: 14px;
            display: flex;
            justify-content: flex-end;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              vertical-align: middle;
              margin-left: 10px;
            }
            span {
              line-height: 30px;
            }
            span:first-child {
              color: rgb(101, 104, 115);
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
</style>
