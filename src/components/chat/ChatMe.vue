<template>
    <div class="chat-me" :id="'record'+chatInfo.chat_id" @contextmenu="showContextMenu">
        <div class="left-info">
          <span>{{ chatInfo.sender }}</span>
          <div class="chat-record">
           
            <div class="chat-text" v-if="chatInfo.type==='text'">
                {{chatInfo.content}}
            </div>
            <div v-else-if="chatInfo.type==='image'">
              <div class="img-wrapper">
              <el-image
                style="width: 150px; height: 150px;z-index:2"
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
            <div v-else-if="chatInfo.type==='file'">
              <a :href="'http://81.70.184.77:8000'+chatInfo.file" download style="text-decoration: none;">
                <div class="file-wrapper">
                  <div class="file-data">
                    <img src="@/assets/file.png">
                    <div class="file-info">
                      <div class="file-name">
                        {{ chatInfo.file.replace('/media/chat/', '') }}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="info-time">
              <span>{{ formattedTime(chatInfo.send_time) }}</span>
          </div>
        </div>
        <div class="info-time">
          <n-avatar >{{ chatInfo.sender.slice(-2) }}</n-avatar>
        </div>
          </div>
</template>
<script>
import { defineComponent} from 'vue'
import {NAvatar} from 'naive-ui'

export default defineComponent({
  props:{
    chatInfo:{}
  },

    // setup() {
    //     return{
    //         value:ref('这里是名字')
    //     }
    // },
    components:{
        NAvatar
    },
    methods:{
      showContextMenu(event) {
    // 阻止默认的右键菜单
        event.preventDefault();

        // 在这里可以根据 event 对象的坐标来确定菜单的位置
        const x = event.clientX;
        const y = event.clientY;

        // 显示下拉菜单，你可以使用一个 Vue 组件或者普通的 HTML 元素来实现
        // 这里以一个简单的示例为例，使用一个普通的 div 元素作为下拉菜单
        const contextMenu = document.createElement("div");
        contextMenu.className = "context-menu";
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        contextMenu.innerHTML = `
          <ul>
            <li>转发</li>
            <li>多选</li>
          </ul>
        `;

        // 将下拉菜单添加到 DOM 中
        document.body.appendChild(contextMenu);

        // 在下拉菜单之外的地方点击时，关闭下拉菜单
        document.addEventListener("click", this.hideContextMenu);
      },

  hideContextMenu() {
    // 移除下拉菜单
    const contextMenu = document.querySelector(".context-menu");
    if (contextMenu) {
      contextMenu.remove();
    }

    // 移除点击事件监听器
    document.removeEventListener("click", this.hideContextMenu);
  },
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
  
})
</script>

<style lang="scss" scoped>
.chat-me {
          width: 100%;
          float: right;
          margin-bottom: 10px;
          position: relative;
          display: flex;
          // flex-direction: column;
          justify-content: flex-end;
          // align-items: flex-end;
          .left-info{
            display:flex;
            flex-direction: column;
            align-items: flex-end;
            margin-right:10px;
            color:#48464C
          }
          .chat-record{
            flex:1;
          }
          .chat-text {
            float: right;
            // max-width: 90%;
            max-width:500px;
            text-align:left;
            padding: 10px;
            font-size: 16px;
            border-radius: 10px 1px 10px 10px;
            background-color:rgba(#9E9CF4 ,0.6);
            color: #48464C;
            word-wrap: break-word;
            &:hover {
              background-color: rgba(#9E9CF4,0.8) ;
            }
          }
          .img-wrapper{
            height:180px;
            width:180px;
            background-color: rgba(#9E9CF4 ,0.6)  ;
            // padding: 10px 10px;
            box-sizing: border-box;
            border-radius: 3px;
            display: flex; /* 使用 Flex 布局 */
            justify-content: center; /* 水平居中 */
            align-items: center; /* 垂直居中 */
    
          }
          .file-wrapper{
            display: flex;
            align-items: center; /* 垂直居中对齐 */
            justify-content: center; /* 水平居中对齐 */
            height: 70px;
            // padding: 2px;
            width: 240px;
            background: #fff;
            border-radius: 3px;
            border: 1px solid rgba(0,0,0,.12);
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            cursor: pointer;
          }
          .file-data{
            display: -webkit-flex;
          }
          .file-info{
            // margin-left: 12px;
            display: flex;
            flex-wrap: wrap;
            align-content: space-around;
          }
          .file-name{
            color: rgba(0,0,0,.6784313725);
            font-size: 14px;
            width: 160px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .info-time {
            // margin: 10px 0;
            color: #48464C;
            font-size: 12px;
            display: flex;
            justify-content: flex-end;

            // img {
            //   width: 30px;
            //   height: 30px;
            //   border-radius: 50%;
            //   vertical-align: middle;
            //   margin-left: 10px;
            // }
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
