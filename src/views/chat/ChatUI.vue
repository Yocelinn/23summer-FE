<template>
    <div id="chatUI">
        <div class="chat-wrapper">
            <!-- <div class="chat-left-nav">
                
            </div> -->   
            <div class="chat-friend-list">
                团队成员
                <n-select class="chat-friend-selector" @click="choose_friend"
                v-model:value="selectedValue"
                filterable
                placeholder="搜索"  
                :options="friend_options"
                />
                <el-scrollbar>
                    <div v-for="(member,index) in friend_list" :key="index">
                        <PersonCard :personInfo="member"/>
                    </div>
                </el-scrollbar>
                
            </div>
            <div class="chat-window">
                <div class="chat-window-header">这里是团队名({{ friend_list.length }})</div>
                <div class="chat-content" ref="chatContent">
                    <div class="chat-window-content" v-for="record in this.records" :key="record.chat_id">
                        <ChatFriend :chatInfo="record" v-if="record.sender_id!=this.user.user_id"/>
                        <ChatMe :chatInfo="record" v-else/>
                    </div>
                    <!-- <ChatFriend/>
                    <ChatMe/> -->
                </div>
                <div class="chat-window-text">
                    <!-- <Editor/> -->
                    <n-mention type="textarea" :options="friend_options" v-model:value="text_content" 
                    class="chat-window-textarea" @keydown.enter.prevent="sendMessage()"/>
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
    import axios from 'axios'
    import { useStore } from 'vuex';
    import { animation } from "@/util/util";
    // import Editor from "@/components/chat/EditorArea.vue";
    export default defineComponent ({
    components:{
        PersonCard,NSelect,NMention,ChatMe,ChatFriend
    },
    mounted(){
        this.getFriendList();
        this.getAllRecord();
        this.getUserInfo();
        const self = this;
        this.chatSocket = new WebSocket( 
            'ws://'
            +  '81.70.184.77:8000' //改成服务器地址81.70.184.77:8000 
            + '/ws/chat/' 
            + this.curTeamId //改成团队id 
            + '/' ),
        console.log('ws://'
            +  '81.70.184.77:8000' //改成服务器地址81.70.184.77:8000 
            + '/ws/chat/' 
            + this.curTeamId //改成团队id 
            + '/' )
        this.chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data); 
            console.log(data)   
            self.receiveMessage(data)
            // console.log(data)
            // document.querySelector('#chat-log').value += (data.message + '\n'); 
        } 
    },
    setup(){
        const store = useStore();
        // const user = store.state.user;
        // const curTeamId = store.state.curTeamId;
        // const curTeamId=ref(1)
        // const uid=ref(5);

        // console.log(uid.value);
        const text_content=ref("");
        const friend_list=ref([]);
        const friend_options=ref([]);
        // const records=ref([])
        
        function getFriendList(){
            axios.post('/team/seemember',{ "team_id":this.curTeamId})
            .then((response)=>{
                // console.log(this.curTeamId)
                console.log(response)
                if(response.data.code!=200){
                    console.log(response.data.messages);
                    // alert(response.data.msg);
                }
                else{
                    friend_list.value=response.data.res;
                    friend_options.value = response.data.res.map(item => ({
                        value: item.nickname,  // 假设 id 为 value
                        label: item.nickname  // 假设 name 为 label
                    }));
                }
            })
        }
       
       
        return{
            selectedValue: ref(null),
            selectedValues: ref(null),
            store,

           
            // user,
            // uid,
            text_content,
            friend_list,
            friend_options,
            // records,

            getFriendList,

        }
    },    
    methods:{
        choose_friend(){

        },
        getAllRecord(){
            // chat=chat/all'+curTeamId

            // console.log(chat)
            axios.get(`/chat/all/${this.curTeamId}`)
            .then((response)=>{
                console.log(response)
                if(response.data.code!=200){
                    console.log(response.data.message);
                }
                else{
                    // records.value=response.data.chats;
                    this.records=response.data.chats;
                    this.scrollBottom();
                    // console.log(records.value)
                }
            })
        },
        getUserInfo(){
            axios.get('user/myself/')
            .then((response)=>{
                this.user=response.data;
                // console.log(this.user)
            })
        },
        scrollBottom() {
            this.$nextTick(() => {
            const scrollDom = this.$refs.chatContent;
            animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
        });
        },
        receiveMessage(data){
            const date=new Date()
            const receiveMsg={
                sender_id:data.id,
                content:data.message,
                send_time:date.toISOString(),
                sender:data.name
            }
            // console.log(this.records);
            this.records.push(receiveMsg)
            // console.log(this.records);
            this.scrollBottom();

        },
        sendMessage(){
                // console.log(this.text_content)
                // const now=new Date()
                // console.log(now.toISOString())
                if(this.text_content){ 
                    // let newMsg={
                    //             sender_id:this.uid,
                    //             content:this.text_content,
                    //             send_time:now.toISOString(),
                    //             sender:this.name
                    //         }
                    //         console.log(this.records)
                    //         this.records.push(newMsg)
                            
                            // console.log(this.records)
                            // messageInputDom.value = '';
                           
                            // this.scrollBottom();
                            // }
                    axios.post('/chat/create',{"team_id": this.curTeamId, "content": this.text_content})
                    .then((response)=>{
                        console.log(response.data)
                        if(response.data.code!=200){
                            console.log(response.data.message)
                        }
                        else{
                          
                            
                            // document.querySelector('#chat-message-submit').onclick = function(e) 
                            // { 
                            // const messageInputDom = document.querySelector('#chat-message-input'); 
                            // const message = messageInputDom.value; // 使用chatSocket发送信息 
                            console.log(this.user.name);
                            this.chatSocket.send(JSON.stringify({
                                'id': response.data.sender, 
                                'name':this.user.nickname,
                                'message': this.text_content,
                                'time': response.data.send_time
                            })); 
                            // this.scrollBottom();
                            this.text_content="";
                        }
                    })
                }
                else{
                    alert("发送消息不能为空！")
                }
            
            }
    },
    data(){
        return{
            curTeamId:1,
            user:'',
            records:[]
        }
    }
  })
</script>

<style lang="scss" scoped>
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
  background-color: rgba(#48464C,0.2);
  padding: 10px;
  border-radius: 10px;
}
.chat-content{
    width: 100%;
    height: 85%;
    overflow-y: scroll;
    padding: 20px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
    }
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
    border-color:#fff;
    text-align:left;
}
</style>