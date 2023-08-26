<template>
    <div id="chatUI">
        <div class="chat-wrapper">
            <!-- <div class="chat-left-nav">
                
            </div> -->
            <div class="chat-friend-list">
                friend-list
                <n-select class="chat-friend-selector" @click="choose_friend"
                v-model:value="selectedValue"
                filterable
                placeholder="搜索"  
                :options="select_options"
                />
                <PersonCard/>
            </div>
            <div class="chat-window">
                <div class="chat-window-header">这里是团队名</div>
                <div class="chat-window-content">
                    Main
                    <ChatFriend/>
                    <ChatMe/>
                </div>
                <div class="chat-window-text">
                    <n-mention type="textarea" :options="select_options" v-model:value="text_content" 
                    class="chat-window-textarea" @keydown.enter.prevent="sendMessage"/>
                </div>
            </div>
              
            
        </div>
    </div>
</template>
<script>
  import PersonCard from "@/components/chat/PersonCard.vue";
  import { defineComponent,ref } from "vue";
import { NSelect,NMention } from "naive-ui";
import ChatMe from "@/components/chat/ChatMe.vue"
import ChatFriend from "@/components/chat/ChatFriend.vue"
  export default defineComponent ({
    components:{
        PersonCard,NSelect,NMention,ChatMe,ChatFriend
    },
    setup(){
        return{
            selectedValue: ref(null),
            selectedValues: ref(null),
            select_options:[
                {
                    label: '同事1号',
                    value: '同事1号'
                },
                {
                    label: '可爱的2号',
                    value: '可爱的2号'
                },
                {
                    label: "猜猜我是几号",
                    value: '猜猜我是几号'
                },
            ]
        }
    },
    methods:{
        choose_friend(){

        },
        sendMessage(){
           
            console.log(this.text_content)
        }
    },
    data(){
        return{
            text_content:''
        }
    }
  })
</script>

<style scoped>
.chat-wrapper{
    display: flex;
    width:100%;
    height:90vh;
}
.chat-left-nav{
    width:10%;
    border-right: 1px solid #ccc; /* 添加右边框 */
}
.chat-friend-list{
    width:20%;
    border-radius:10px;
    border: 1px solid #e3e3e3; /* 添加右边框 */
    display: flex; /* 使用 Flex 布局 */
    flex-direction: column; /* 垂直布局子元素 */
    /* background-color: #9d9cf435; */
    align-items: center; /* 垂直居中 */
}
.chat-window {
  flex-grow: 1;
  margin-right:20px;
  display: flex;
  flex-direction: column; /* 垂直方向布局 */
  padding:10px;
}

.chat-window-header {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
}

.chat-window-content {
  flex-grow: 1; /* 占据剩余可用空间 */
  background-color: #fff;
  padding: 10px;
}

.chat-window-text {
  /* background-color: #f0f0f0; */
  padding: 10px;
  height:15%;

}
.chat-friend-selector{
    width:80%;
    
}
.chat-window-textarea{
    border-color:#fff
}
</style>