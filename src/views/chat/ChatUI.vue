<template>
    <div id="chatUI">
        <div class="chat-wrapper">  
            <div class="chat-friend-list">
                团队成员
                <n-select class="chat-friend-selector" @click="choose_friend"
                v-model:value="selectedValue"
                filterable
                placeholder="搜索"  
                :options="select_options"
                />
                <n-list hoverable clickable v-for="(member,index) in friend_list" :key="index" class="chat-list">
                    <n-list-item class="chat-list-item">
                        <!-- <HeadPortrait/> -->
                        <div class="chat-item-info">
                            <div class="avatar">
                                <el-avatar :size="30" :src="circleUrl" />
                            </div>
                            <div class="chat-info">
                                <div class="info-name">{{ member.nickname }}</div>
                                <div class="detail">{{member.email}}</div>
                            </div>
                        </div>
                    </n-list-item>
                </n-list>
            </div>
            <div class="chat-window">
                <div class="chat-window-header">{{this.curTeamName}}({{ friend_list.length }})</div>
                <div class="chat-content" ref="chatContent">
                    <div class="chat-window-content" v-for="record in this.records" :key="record.chat_id">
                        <ChatFriend :chatInfo="record" v-if="record.sender_id!=this.user.user_id"/>
                        <ChatMe :chatInfo="record" v-else/>
                    </div>
                    <!-- <ChatFriend/>
                    <ChatMe/> -->
                </div>
                <div class="chat-window-text">
                    <div class="toolbar">
                        <el-icon class="tool-icon" @click="sendPicture"><Picture /></el-icon>
                        <el-icon class="tool-icon" @click="sendFile"><FolderOpened /></el-icon>
                    </div>
                    <!-- <Editor/> -->
                    
                    <n-mention v-if="isPerm" type="textarea" :options="manager_friend_options" :render-label="renderLabel" v-model:value="text_content" 
                    class="chat-window-textarea" :on-select="atFriend" @keydown.enter.prevent="sendMessage()"/>
                    <n-mention v-else type="textarea" :options="friend_options" :render-label="renderLabel" v-model:value="text_content" 
                    class="chat-window-textarea" :on-select="atFriend" @keydown.enter.prevent="sendMessage()"/>
                    <!-- <button class="send-button" @click="sendMessage">发送</button> -->
                </div> 
            </div>
              
            
        </div>
    </div>
</template>
<script>
    import PersonCard from "@/components/chat/PersonCard.vue";
    import HeadPortrait from "@/components/chat/HeadPortrait.vue";

    import { defineComponent,ref,h } from "vue";
    import { NSelect,NMention,NList,NListItem,NAvatar } from "naive-ui";
    import ChatMe from "@/components/chat/ChatMe.vue"
    import ChatFriend from "@/components/chat/ChatFriend.vue"
    import axios from 'axios'
    import { useStore } from 'vuex';
    import { animation } from "@/util/util";
    // import Editor from "@/components/chat/EditorArea.vue";
    export default defineComponent ({
    components:{
       NSelect,NMention,ChatMe,ChatFriend,PersonCard,HeadPortrait,NList,NListItem ,NAvatar
    },
    mounted(){
        this.curTeamId=window.sessionStorage.getItem('curTeamId');
        this.curTeamName=window.sessionStorage.getItem('curTeamName');
        this.getUserInfo();
        this.getFriendList();
        this.getAllRecord();
        
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
        const select_options=ref([]);
        const manager_friend_options=ref([{ value: "所有人", label: "所有人" }])
        // const records=ref([])
        
        function getFriendList(){
            // console.log(this.curTeamId)
            axios.post('/team/seemember',{ "team_id":parseInt(this.curTeamId)})
            .then((response)=>{
                // console.log(this.curTeamId)
                console.log(response)
                if(response.data.code!=200){
                    // console.log("seemember wrong")
                    console.log(response.data.messages);
                    // alert(response.data.msg);
                }
                else{
                    friend_list.value=response.data.res;
                    const foundMe = friend_list.value.find(friend => friend.user_id === this.user.user_id);
                    // console.log(foundMe.perm)
                    if(foundMe){
                        if(foundMe.perm!=0){
                            this.isPerm=true;
                        }
                    }
                    // const foundFriend = friend_list.value.find(friend => friend.user_id === this.user.user_id);
                    // console.log(foundFriend)
                    // if (foundFriend && foundFriend.perm !== 1) {
                    //     this.isPerm = true;
                    // }
                    select_options.value=response.data.res
                    .filter(item => item.user_id !== this.user.user_id) 
                    .map(item => ({
                        value: item.user_id,  // 假设 id 为 value
                        label: item.nickname  // 假设 name 为 label
                    }));
                    friend_options.value = response.data.res
                    .filter(item => item.user_id !== this.user.user_id) 
                    .map(item => ({
                        value: item.nickname,  // 假设 id 为 value
                        label: item.user_id  // 假设 name 为 label
                    }));
                    manager_friend_options.value.push(
                        ...response.data.res
                        .filter(item => item.user_id !== this.user.user_id) 
                        .map(item => ({
                            value: item.nickname,
                            label: item.user_id
                        })));
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
            select_options,
            manager_friend_options,
            renderLabel: (option) => h( 'span',[
                option.value
            ]),
            // records,
            getFriendList,

        }
    },  
    watch: {
    pcCurrent: function() {
      this.isActive()
    }
  },  
    methods:{
        isActive() {
      this.current = this.pcCurrent
    },
    //     handleInput() {
    //   // 监听输入事件，处理 @ 的逻辑，添加或删除被 @ 的成员
    //     const atIndex = this.text_content.lastIndexOf("@");
    //     if (atIndex !== -1) {
    //         const searchText = this.text_content.slice(atIndex + 1);
    //         // 在这里根据输入的 searchText 进行成员匹配和展示
    //         // 当用户选择成员后，可以添加到 mentionedMembers 列表
    //         // 当用户删除 @ 成员时，也要从 mentionedMembers 中删除
    //     }
    //     },
        choose_friend(){

        },
        atFriend(option){
            this.selectedMentionValue=option.label;
            // this.text_content=this.text_content+option.label+' '
            // console.log(this.selectedValue);
            if(this.selectedMentionValue==='所有人'){
                this.mentionedMembers=this.friend_list.filter(member => member.user_id !== this.user.user_id);
            }
            else{
                if (!this.mentionedMembers.includes(this.selectedMentionValue)) {
                    this.mentionedMembers.push(this.selectedMentionValue);
                }
            }
            console.log(this.mentionedMembers)
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
            if (scrollDom) {
                animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
            }
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
                            // console.log
                            // console.log("TeamId:"+this.curTeamId)
                            // console.log("content"+this.text_content)
                    axios.post('/chat/create',{"team_id": parseInt(this.curTeamId), "content": this.text_content})
                    .then((response)=>{
                        console.log("发送消息")
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
                            this.sendNotiToMembers(this.mentionedMembers);
                            // this.scrollBottom();
                            this.text_content="";
                        }
                    })
                }
                
                else{
                    console.log("发送消息不能为空！")
                }
            },
        sendNotiToMembers(members){
            members.forEach((member)=>{
                const NotiContent = {
                            rec_id: member, // 假设 member 中包含接收者的 id
                            content:"@了你" // 通知内容可以根据需求自定义
                        }
                axios.post('message/create',NotiContent)
                .then((response)=>{
                   
                        console.log(response.data.message)
                   
                })
                .catch(error=>{
                    console.log(error);
                })
            })
        }
    },
    data(){
        return{
            circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            current:'',
            curTeamId:'',
            curTeamName:'',
            user:'',
            records:[],
            isPerm:false,
            mentionedMembers: [], // 被 @ 的成员列表
            selectedMentionValue:'',
        }
    }
  })
</script>

<style lang="scss" scoped>

.chat-wrapper{
    display: flex;
    width:98%;
    height:85vh;
    margin:10px;
    position: relative; 
    // border-color:#e3e3e3
    border: 1px solid #e3e3e3;
}
.chat-left-nav{
    width:10%;
    border-right: 1px solid #ccc; /* 添加右边框 */
}
.chat-friend-list{
    width:15%;
    // border-radius:10px;
    border: 1px solid #e3e3e3; /* 添加右边框 */
    display: flex; /* 使用 Flex 布局 */
    flex-direction: column; /* 垂直布局子元素 */
    /* background-color: #9d9cf435; */
    align-items: center; /* 垂直居中 */
    overflow:auto;
    // box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.1); /* 这里添加阴影 */
    // flex-grow: 1; /* 让高度占满剩余部分 */
    
}
.chat-window {
    background: #fff;
    border-left: 1px solid rgba(0,0,0,.09);
    // width: calc(100% - 280px);
    width:85%;
    height: 100%;
    position: relative;
    overflow: hidden;
    // min-width: 274px;
//   flex-grow: 1;
//   margin-right:20px;
//   display: flex;
//   flex-direction: column; /* 垂直方向布局 */
//   padding:10px;
}
.person-card {
  width: 80%;
  height: 80px;
//   border-radius: 10px;
//   background-color: #9d9cf4c4;
  position: relative;
//   margin: 25px 0 ;
  cursor: pointer;
}
.chat-list{
    width:100%;
}
.chat-list-item{
    cursor:pointer;
    display:flex;
    justify-content: space-between; /* 将项目放在容器中，首尾对齐 */
    align-items: center; /* 垂直居中对齐项目 */
}
.chat-item-info{
    display:flex;
}
.avatar{
    flex:0 0 auto
}
.chat-info{
    margin-left: 10px;
    text-align: left;
}
.chat-window-header {
//   background-color: rgba(#48464C,0.2);
  // height:10%;
    height: 60px;
    border-bottom: 1px solid rgba(0,0,0,.09);
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // width: 100%;
    position: relative;
    
}
//   border-radius: 10px;
.chat-content{
    // height: calc(100% - 276px);
    border-bottom: 1px solid rgba(0,0,0,.09);

    width: 100%;
    height: 70%;
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
  resize: none; /* 禁止文本框的尺寸调整 */

}
.toolbar{
    height: 30px;
    // padding: 0 5px;
display: flex;
}
.tool-icon{
    width: 42px;
align-items: center;
justify-content: center;
display: flex;
font-size:20px;
padding: 4px;
position: relative;
text-align: center;
color: grey;
}

.send-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #007bff; /* 设置按钮背景颜色 */
  color: #fff; /* 设置按钮文字颜色 */
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.chat-friend-selector{
    width:70%;
    // height: 60px;
    // padding: 14px;
    // position: relative;
    
}
.chat-window-textarea{
    border-color:#fff;
    text-align:left;
}
</style>