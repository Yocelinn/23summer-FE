<template>
    <div id="chatUI">
        <div class="chat-wrapper">  
            <div class="chat-friend-list">
                
                <div class="header-item">
                    <el-icon class="header-icon"><ChatDotRound /></el-icon>
                    <div class="header-text">全部</div>
                </div>
                <div class="list-header">
                    <!-- <n-select class="chat-friend-selector"
                    v-model:value="selectedValue" 
                    filterable
                    placeholder="搜索"  
                    :options="select_options"
                    @change="handleChatSelectChange"
                    /> -->
                    <div class="header-add">
                        <div class="add-icon" @click="handleAddGroup">+</div>
                        <n-modal 
                            v-model:show="showAddGroup"
                            class="custom-card"
                            preset="card"
                            :style="bodyStyle"
                            size="huge"
                            :bordered="false"
                            :segmented="segmented"
                            :mask-closable="false">
                            <template #header>
                                <div class="addGroupNameTip">
                                    创建群聊
                                </div>
                                <el-input  placeholder="请输入群聊名称" v-model="addedGroupName" style="margin-top:10px">
                                </el-input>
                            </template>
                            <div class="addMemberTip">
                                请选择邀请成员
                            </div>
                            <el-checkbox-group v-model="addedFriends" fill="#9E9CF4">
                                <el-checkbox  v-for="friend in friend_list" :key="friend.user_id" :label="friend.user_id">
                                {{ friend.nickname }}</el-checkbox>
                            </el-checkbox-group>
                            <div class="confirmButton">
                                <el-button color="#9E9CF4"  plain @click="addConfirm">确认创建</el-button>
                            </div>
                            <!-- <div class="addFriend" v-for="friend in friend_list">
                            </div> -->
                        </n-modal>
                    </div>
                </div>
                <n-list hoverable clickable v-for="(member,index) in chat_list" :key="index" class="chat-list">
                    <n-list-item class="chat-list-item" @click="choose_friend(member)" :class="{'isSelected' :selectedValue===member.no}">
                        <!-- <HeadPortrait/> -->
                        <div class="chat-item-info">
                            <div class="avatar">
                                <el-avatar shape="square" :size="30" :src="circleUrl" />
                            </div>
                            <div class="chat-info">
                                <div class="info-name" >{{ member.name }}</div>
                                <!-- <div class="detail">{{member.email}}</div> -->
                            </div>
                        </div>
                    </n-list-item>
                </n-list>
            </div>
            <div class="chat-window">
                <!-- <div class="chat-window-header">{{this.curTeamName}}({{ friend_list.length }})</div> -->
                <div class="chat-window-header">
                    <div class="chat-name">{{this.selectedChat.name}}</div>
                    <div class="window-header-icon">
                        <el-icon class="header-icon"><Back /></el-icon>
                        <el-icon @click="drawer=true" v-if="this.selectedChat.type==='group'"><MoreFilled /></el-icon>
                        
                    </div>
                    <n-drawer v-model:show="drawer" :width="502" placement="right">
                        <GroupDetail :curChat="this.selectedChat" :friend_list="friend_list" @updateList="updateChatList" />
                    </n-drawer>
                    <!-- <el-drawer
                        v-model="drawer"
                        :direction="direction"
                        
                    > -->
                <!-- </el-drawer> -->
                </div>
                <div class="chat-content" ref="chatContent">
                    <div class="chat-window-content" v-for="record in this.records" :key="record.chat_id" >
                        <ChatFriend :chatInfo="record" v-if="record.sender_id!=this.user.user_id" />
                        <ChatMe :chatInfo="record" v-else />
                    </div>
                    <!-- <ChatFriend/>
                    <ChatMe/> -->
                </div>
                <div class="chat-window-text">
                    <div class="toolbar">
                            <el-upload ref="uploadRef" class="upload-demo" accept="image/png, image/jpeg,image.jpg" :auto-upload="false"
                            :on-change="sendImg">
                                <template #trigger>
                                    <el-icon class="tool-icon"><Picture /></el-icon>
                                </template>
                            </el-upload>
                            <el-upload ref="uploadRef" class="upload-demo" accept=".doc,.docx,.pdf,.zip,.pptx" :auto-upload="false" :on-change="sendFile">
                                <template #trigger>
                                    <el-icon class="tool-icon" ><FolderOpened /></el-icon>
                                </template>
                            </el-upload>
                            <el-icon class="tool-icon"  @click="handleShowClick"><Search /></el-icon>
                            <n-modal
                                v-model:show="showModal"
                                class="custom-card"
                                preset="card"
                                :style="bodyStyle"
                                size="huge"
                                :bordered="false"
                                :segmented="segmented"
                            >
                            <template #header>
                                聊天记录
                            </template>
                            <SearchMsg :curTeamId="this.curTeamId" :selectedMember="this.selectedChat" @sendMsg="getMsg"/>
                            </n-modal>
                    </div>
                    <!-- <Editor/> -->
                    
                    <n-mention v-if="isPerm" type="textarea" :options="manager_friend_options" :render-label="renderLabel"  v-model:value="text_content" 
                    class="chat-window-textarea" :on-select="atFriend" @keydown.enter.prevent="sendText()"/>
                    <n-mention v-else type="textarea" :options="friend_options" :render-label="renderLabel" v-model:value="text_content" 
                    class="chat-window-textarea" :on-select="atFriend" @keydown.enter.prevent="sendText()"/>
                   
                    <!-- <button class="send-button" @click="sendMessage">发送</button> -->
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
    import PersonCard from "@/components/chat/PersonCard.vue";
    import HeadPortrait from "@/components/chat/HeadPortrait.vue";
    import { defineComponent,ref,h, onMounted } from "vue";
    import { NSelect,NMention,NList,NListItem,NTag,NAvatar,NModal,NDrawer } from "naive-ui";
    import ChatMe from "@/components/chat/ChatMe.vue"
    import ChatFriend from "@/components/chat/ChatFriend.vue"
    import axios from 'axios'
    import { useStore } from 'vuex';
    import { animation } from "@/util/util";
    import CryptoJS from 'crypto-js'
    import SearchMsg from "@/components/chat/SearchMsg.vue"
    import GroupDetail from "@/components/chat/GroupDetail.vue"
    import { ElMessage,ElLoading } from 'element-plus'
    // import Editor from "@/components/chat/EditorArea.vue";
    export default defineComponent ({
    components:{
       NSelect,NMention,ChatMe,ChatFriend,PersonCard,HeadPortrait,NList,NListItem,NAvatar,NTag,NModal,NDrawer,
       SearchMsg,GroupDetail
    },
    mounted(){
        
        this.curTeamId=parseInt(window.sessionStorage.getItem('curTeamId'));
            this.curTeamName=window.sessionStorage.getItem('curTeamName');
            this.websocketURL= 'ws://'
                +  '81.70.184.77:8000' //改成服务器地址81.70.184.77:8000 
                + '/ws/chat/' 
                + this.curTeamId //改成团队id 
                + '/';
            this.getUserInfo();
            this.getFriendList();
            this.getChatList(this.curTeamId);
            this.getAllRecord();
            const self = this;
            this.chatSocket = new WebSocket( 
                this.websocketURL ),
            this.chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data); 
                // console.log(data)   
                self.receiveMessage(data)
                console.log(data)
                // document.querySelector('#chat-log').value += (data.message + '\n'); 
            } 
    },
    setup(){
        // onMounted(()=>{
        //    loading.value=false;
        // })
        // const loading=ref(true);
        const drawer=ref(false)
        const direction = ref('rtl')
        const addedGroupName=ref([]);
        const selectedValue=ref();
        const addedFriends=ref([]);
        const chat_list=ref([]);
        const store = useStore();
        const showModal=ref(false)
        const showAddGroup=ref(false)
        const text_content=ref("");
        const friend_list=ref([]);
        const friend_options=ref([]);
        const select_options=ref([]);
        const manager_friend_options=ref([{ value: "所有人", label: "所有人" }])
        const getMsg=(val)=>{
            console.log("receiveChild" +val.content)
            showModal.value=false;
            document.getElementById('record'+val.content).scrollIntoView({ behavior: "smooth",block:'start',inline:'start' })
            console.log(document.getElementById('record'+val.content))

            // console.log(val.content)

        }
        const updateChatList=(val)=>{
            console.log("receiveChild:UPDATE")
            console.log(val.value)

            let curTeamId=window.sessionStorage.getItem('curTeamId')
            // selectedValue.value=chat_list.value[0].no;
            
            drawer.value=false;
            getChatList(curTeamId)
        }
        // const crypto = require('crypto-js');
        function generateIdentifier(num1, num2) {
        // 确保数字从小到大排列
            const smallerNum = Math.min(num1, num2);
            const largerNum = Math.max(num1, num2);
            // 将数字组合转换为字符串
            const numStr = `${smallerNum}-${largerNum}`;
                // console.log(numStr)
            // 使用 SHA-256 哈希函数生成标识
            // console.log(crypto)
            const identifier = CryptoJS.SHA256(numStr).toString(CryptoJS.enc.Hex);
            // console.log(identifier)
            return identifier;

        }
         function getFriendList(){
            // console.log(this.curTeamId)
            axios.post('/team/seemember',{ "team_id":this.curTeamId})
            .then((response)=>{
                // console.log(this.curTeamId)
                // console.log(response)
                if(response.data.code!=200){
                    // console.log("seemember wrong")
                    // console.log("seemember wrong")
                    console.log(response.data.messages);
                    // alert(response.data.msg);
                }
                else{
                    // friend_list.value=response.data.res;
                    // let teamChat={
                    //     "user_id": -1,
                    //     // "perm": 1,
                    //     "nickname": this.curTeamName,
                    //     // "name": "ttt",
                    //     "isPerm": ""
                    // }
                    // friend_list.value=response.data.res;
                    // chat_list.value.push(teamChat)
                    // this.selectedChat=teamChat;
                    // this.chat_list.push(...response.data.res.filter(item => item.user_id !== this.user.user_id) );
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
        function getChatList(id){
            // console.log("curTeamId"+this.curTeamId)
            // console.log("id"+id.value)
            axios.post('chat/list',{"team_id":parseInt(id)})
            .then((response)=>{
                if(response.data.code!=200){
                    console.log(response.data.message);
                }
                else{

                    console.log("getChatList成功")
                    // console.log(response.data.res)
                    chat_list.value=response.data.res;
                    select_options.value=response.data.res
                    .map(item => ({
                        value: item.no,  // 假设 id 为 value
                        label: item.name  // 假设 name 为 label
                    }))
                    // console.log(this.selectedChat)
                    this.selectedChat = response.data.res.find(item => item.type==='team');
                    // console.log(this.selectedChat)
                    selectedValue.value=this.selectedChat.no;
                    // select_options.value.push({value:teamChat.user_id,label:teamChat.nickname})
                   
                    console.log("更新选择器")
                    console.log(select_options.value)
                    
                    
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
        function handleShowClick(){
                showModal.value=true;
            } 
        function handleChatSelectChange(){
        }
        function handleAddGroup(){
            showAddGroup.value=true;
            console.log("创建群聊"+showAddGroup.value)
        }
        function addConfirm(){
            let curTeamId=window.sessionStorage.getItem('curTeamId')
            axios.post('/chat/group/create',{"name": addedGroupName.value,"team_id": curTeamId,  "members": addedFriends.value})
            .then((response)=>{
                if(response.data.code!=200){
                    console.log(response.data.message)
                }
                else{
                    // ElMessage({
                    //     message: '创建群聊成功',
                    //     type: 'success',
                    // })
                    // getChatList(curTeamId);
                    console.log(chat_list.value)
                    const LastChat= chat_list.value[chat_list.value.length - 1];
                    // console.log(LastChat.no)
                    chat_list.value.push({"no":LastChat.no+1,"type":"group","id":response.data.group_team,"name": addedGroupName.value})
                    select_options.value.push({value: LastChat.no+1,  // 假设 id 为 value
                        label: addedGroupName.value })
                    // getChatList(curTeamId)
                    // window.location.reload()
                    // this.$root.reloadPage();
                    addedFriends.value=[];
                    addedGroupName.value=''
                    // chat_list.value.push()
                }
            })
            .catch(err=>{
                console.log(err)
            })
            showAddGroup.value=false;
            console.log(addedFriends)
            
        }
        return{
            updateChatList,
            addedGroupName,
            drawer,
            direction,
            selectedValue,
            // selectedValues: ref(null),
            showModal,showAddGroup,
            handleShowClick,handleAddGroup,addConfirm,
            // scrollToMsg,
            addedFriends,
            getMsg,
            store,
            text_content,
            friend_list,
            chat_list,
            friend_options,
            select_options,
            manager_friend_options,
            renderLabel: (option) => h( 'span',[
                option.value
            ]),
            // records,
            getFriendList,
            getChatList,
            // crypto,
            generateIdentifier,
            // showModal: ref(false),
            bodyStyle: {
            width: "600px"
            },
            segmented: {
                content: "soft",
                footer: "soft"
            },
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
      choose_friend(member){
            // console.log("choose"+member.nickname)
            this.selectedValue=member.no;
            this.selectedChat=member
            // console.log
            // console.log(this.selectedChat)
            if(this.selectedChat.type==='member'){
                let hash=this.generateIdentifier(this.user.user_id,this.selectedChat.id)
                this.websocketURL= 'ws://'
            +  '81.70.184.77:8000' //改成服务器地址81.70.184.77:8000 
            + '/ws/chat/pri/' 
            + hash //hash标识
            + '/'  }
            else if(this.selectedChat.type==='group'){
                // let hash=this.generateIdentifier(this.user.user_id,this.selectedChat.user_id)
                this.websocketURL= 'ws://'
            +  '81.70.184.77:8000' //改成服务器地址81.70.184.77:8000 
            + '/ws/chat/group/' 
            + this.selectedChat.id 
            + '/' 
            }
            else{
                this.websocketURL= 'ws://'
                +  '81.70.184.77:8000' //改成服务器地址81.70.184.77:8000 
                + '/ws/chat/' 
                + this.curTeamId //改成团队id 
                + '/';
            }
            // console.log(this.selectedChat.type)
            // console.log(this.curTeamId)
            console.log(this.websocketURL)
            if(this.chatSocket){
                this.chatSocket.close();
                // console.log("close last chatSocket")
            }
            this.chatSocket = new WebSocket( 
                this.websocketURL )
            const self = this;
            this.chatSocket.onmessage = function(e) {
                const data = JSON.parse(e.data); 
                // console.log(data)   
                self.receiveMessage(data)
                console.log(data)
                // document.querySelector('#chat-log').value += (data.message + '\n'); 
            } 
            this.getAllRecord();
            // console.log(this.websocketURL)
                
            // else{
            //     this.websocketURL= 'ws://'
            // +  '81.70.184.77:8000' //改成服务器地址81.70.184.77:8000 
            // + '/ws/chat/' 
            // + this.curTeamId //改成团队id 
            // + '/'
                
            }
        ,
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
            // console.log(this.mentionedMembers)
        },
        getAllRecord(){
            // chat=chat/all'+curTeamId

            console.log("getAllRecord")
            let url='/chat/all/'+this.curTeamId;
            if(this.selectedChat.type==='member'){
                url='/chat/all/pri/'+this.curTeamId+'/'+this.selectedChat.id;
            }
            else if(this.selectedChat.type==='group')
            {
                url='/chat/all/group/'+this.selectedChat.id;
            }
            // if(this.selectedChat.type==='team'){
                console.log(url)
                axios.get(url)
                .then((response)=>{
                    // console.log(response)
                    if(response.data.code!=200){
                        console.log(response.data.error);
                    }
                    else{
                        // records.value=response.data.chats;
                        this.records=response.data.chats;
                        this.scrollBottom();
                        // console.log(records.value)
                    }
                })
            // }
                .catch(error=>{
                    console.log(error);
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
            // const date=new Date()
            let receiveMsg=ref({});
            if(data.is_file===0){
                receiveMsg={
                    sender_id:data.id,
                    content:data.message,
                    send_time:data.time,
                    sender:data.name,
                    type:"text"
             }   
            }
            else {
                receiveMsg={
                    sender_id:data.id,
                    file:data.message,
                    send_time:data.time,
                    sender:data.name,
                    type:data.is_file===1?"image":"file"
                }
            }
            // console.log(this.records);
            this.records.push(receiveMsg)
            // console.log(this.records);
            this.scrollBottom();

        },
        sendText(){
                // console.log(this.text_content)
                // const now=new Date()
                // console.log(now.toISOString())
                let sendUrl='/chat/create'
                let postData = {
                    team_id: parseInt(this.curTeamId),
                    content: this.text_content
                    };
                if(this.selectedChat.type==='member'){
                    sendUrl='/chat/create/pri';
                    postData={
                        team_id: parseInt(this.curTeamId),
                        content: this.text_content,
                        rec_id:this.selectedChat.id
                    }
                }
                else if(this.selectedChat.type==='group'){
                    sendUrl='/chat/create/group';
                    postData={
                        group_id:this.selectedChat.id,
                        content: this.text_content,
                        
                    }
                }
                 if(this.text_content){    
                    // console.log("sendUrl "+sendUrl)
                    // console.log("postData "+postData)  
                    axios.post(sendUrl,JSON.stringify(postData))
                    .then((response)=>{
                        // console.log("发送消息")
                        // console.log(response.data)
                        if(response.data.code!=200){
                            console.log(response.data.error)
                        }
                        else{  
                            this.chatSocket.send(JSON.stringify({
                                'id': response.data.sender, 
                                'name':this.user.nickname,
                                'message': this.text_content,
                                'time': response.data.send_time,
                                'is_file':0
                            })); 
                            console.log(this.mentionedMembers);
                            // this.mentionedMembers = this.mentionedMembers.filter(member => {
                            // // 假设 member 是一个成员对象，成员对象有一个属性比如 name，用于表示成员名字
                            // return this.text_content.includes(member.nickname)})
                            

                            this.sendNotiToMembers(this.mentionedMembers,response.data.chat_id);
                            // this.scrollBottom();
                            this.text_content="";
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                    })
                }
                else{
                    console.log("发送消息不能为空！")
                }
            },
        sendImg(image){
            let sendUrl='/chat/file'
            let imgData=new FormData();
            if(this.selectedChat.type==='group'){
                sendUrl='/chat/file/group'
                imgData.append("grouup_id",this.selectedChat.id);
            }
            else{
                imgData.append("team_id",parseInt(this.curTeamId));
            }
            
            imgData.append("file",image.raw);
            // console.log(image.raw)
            if(this.selectedChat.type==='member'){
                sendUrl='/chat/file/pri';
                imgData.append("rec_id",this.selectedChat.id)
            }
            axios.post(sendUrl,imgData)
            .then((response)=>{
                // console.log(response.data)
                if(response.data.code!=200){
                    console.log(response.data.message)
                }
                else{
                    this.chatSocket.send(JSON.stringify({
                        'id': response.data.sender, 
                        'name':this.user.nickname,
                        'message': response.data.file,
                        'time': response.data.send_time,
                        'is_file':1
                    })); 
                    // console.log(imgData.get('file'))
                    // console.log('http://81.70.184.77:8000'+response.data.file)
                }
            })
            .catch(error=>{
                console.log(error);
            })  
        },
        sendFile(file){
            let sendUrl='/chat/file'
            let fileData=new FormData();
            if(this.selectedChat.type==='group'){
                sendUrl='/chat/file/group'
                fileData.append("grouup_id",this.selectedChat.id);
            }
            else{
                fileData.append("team_id",parseInt(this.curTeamId));
            }
            
            fileData.append("file",file.raw);
            // console.log(image.raw)
            if(this.selectedChat.type==='member'){
                sendUrl='/chat/file/pri';
                fileData.append("rec_id",this.selectedChat.id)
            }
            axios.post(sendUrl,fileData)
            .then((response)=>{
                // console.log(response.data)
                if(response.data.code!=200){
                    console.log(response.data.message)
                }
                else{
                    this.chatSocket.send(JSON.stringify({
                        'id': response.data.sender, 
                        'name':this.user.nickname,
                        'message': response.data.file,
                        'time': response.data.send_time,
                        'is_file':2
                    })); 
                    // console.log(fileData.get('file'))
                    // console.log('http://81.70.184.77:8000'+response.data.file)
                }
            })
            .catch(error=>{
                console.log(error);
            })  
        },
        sendNotiToMembers(members,chat_id){
            members.forEach((member)=>{
                const NotiContent = {
                            rec_id: member, // member是接收者的 id
                            content:"@了你", // 通知内容可以根据需求自定义
                            team_id:this.curTeamId,
                            ref_type:"chat",
                            ref_id:chat_id

                        }
                axios.post('message/create',JSON.stringify(NotiContent))
                .then((response)=>{
                    console.log("sendMsg")
                    console.log(JSON.stringify(NotiContent))
                    console.log(response.data.message)
                })
                .catch(error=>{
                    console.log(error);
                })
            })
    },
},
    data(){
        return{
            // crypto: require('crypto'),
            circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            current:'',
            selectedChat:'',
            websocketURL:'',
            // TeamChat:{},
            curTeamId:'',
            curTeamName:'',
            user:'',
            records:[],
            isPerm:false,
            mentionedMembers: [], // 被 @ 的成员列表
            selectedMentionValue:'',
            form:{
                file:'',
                team_id:''
            }
        }
    }
  })
</script>

<style lang="scss" scoped>
#chatUI{
    display: flex;
     justify-content: center; /* 在水平方向上居中 */
    align-items: center; 
}
.header-item {
    margin-top:20px;
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  
}

.header-icon{
    // width: 42px;
    align-items: center;
    justify-content: center;
    // display: flex;
    font-size:20px;
    // padding: 4px;
    margin:4px;
    position: relative;
    text-align: center;
    color: #48464C;
   
}
.header-text{
  color:  #48464C;
}

.header-tag{
    margin-top: 20px; 
    font-size:15px;
    padding:10px;
    text-align: left; /* 靠左对齐 */
  border-bottom: 1px solid #e3e3e3; /* 添加下边框 */
}
.chat-wrapper{
    display: flex;
   
    // padding:20px;
    width:100%;
    height:92vh;
    // margin-top:20px;
    position: relative; 
    // border-color:#e3e3e3
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    
}

.chat-left-nav{
    width:10%;
    border-right: 1px solid #ccc; /* 添加右边框 */
}
.chat-friend-list{
    width:20%;
    // border-radius:10px;
    border: 1px solid #e3e3e3; /* 添加右边框 */
    display: flex; /* 使用 Flex 布局 */
    flex-direction: column; /* 垂直布局子元素 */
    /* background-color: #9d9cf435; */
    background-color: #cecefc1d;
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
    // padding:10px;
    border:2px solid #9d9cf464;;   
    border-radius: 30px;;
    margin: 0 10px 5px 10px;
    
    
}
:deep(.n-list.n-list--hoverable .n-list-item ){
    border-radius: 20px;
}

.chat-item-info{
    margin-left: 20px;;
    display:flex;
}
.avatar{
    flex:0 0 auto
}
.chat-info{
    margin-left: 10px;
    text-align: left;
    font-size: 17px;
    display: block;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 18px;
    line-height: 18px;
    // max-width: 140px;
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
    font-size:20px;
    font-weight:400
    
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
// background-color: #cecefc3e;
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
&:hover{
    cursor:pointer;
    color:#9E9CF4;
}
}

.send-button {
    flex-grow:1;
  position: absolute;
  bottom: 10px;
  right: 10px;
//   background-color: #007bff; /* 设置按钮背景颜色 */
  color: #fff; /* 设置按钮文字颜色 */
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.list-header{
    display:flex;
    justify-content: space-between;

}
.chat-friend-selector{
    margin-top:20px;
    margin-bottom:20px;
    width:70%;
    justify-content: space-between;
    // height: 60px;
    // padding: 14px;
    // position: relative;
    
}
.header-add{
    display: flex;
justify-content: center;
align-items: center;
width: 32px;
height: 32px;
background:#9E9CF4;
border-radius: 2px;
font-size: 24px;
color: #fff;
margin-top:20px;
cursor: pointer;
}
// .add-icon{
// }
.chat-window-textarea{
    border-color:#fff;
    text-align:left;
    
}
// .chat-window-textarea:focus{
//         border: var(--n-border-focus);
//     }
.isSelected{
    // background-color:rgb(243, 243, 245);
    background-color: #9d9cf464;;
}
.confirmButton{
    text-align:right
}
:deep(.el-checkbox__input.is-checked+.el-checkbox__label ){
    color: #9E9CF4;
}
:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color:#9E9CF4;
    border-color: #7d7bf2;
}
:deep(.el-checkbox) {
--el-checkbox-input-border-color-hover: #7d7bf2; 
}

.header-icon{
    margin-right:20px;
}
:deep(.n-list n-list--show-divider n-list--hoverable n-list--clickable chat-list){
   --n-color: #9E9CF4; 
}
</style>