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
                    <div class="chat-name">{{selectedChat.value.name}}</div>
                    <div class="window-header-icon">
                        <el-icon class="header-icon"><Back /></el-icon>
                        <el-icon @click="drawer=true" v-if="selectedChat.value.type==='group'"><MoreFilled /></el-icon>
                        
                    </div>
                    <n-drawer v-model:show="drawer" :width="502" placement="right">
                        <GroupDetail :curChat="selectedChat" :friend_list="friend_list" @updateList="updateChatList" />
                    </n-drawer>
                    <!-- <el-drawer
                        v-model="drawer"
                        :direction="direction"
                        
                    > -->
                <!-- </el-drawer> -->
                </div>
                <div class="chat-content" ref="chatContent">
                    <div class="chat-window-content" v-for="record in records" :key="record.value.chat_id" >
                        <ChatFriend :chatInfo="record" v-if="record.sender_id!=user.value.user_id" />
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
                            <SearchMsg :curTeamId="curTeamId" :selectedMember="selectedChat" @sendMsg="getMsg"/>
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
import { defineComponent, ref, h, onMounted, onBeforeUnmount, nextTick } from "vue";
import { NSelect, NMention, NList, NListItem, NTag, NAvatar, NModal, NDrawer } from "naive-ui";
import ChatMe from "@/components/chat/ChatMe.vue";
import ChatFriend from "@/components/chat/ChatFriend.vue";
import axios from 'axios';
import { useStore } from 'vuex';
import { animation } from "@/util/util";
import CryptoJS from 'crypto-js';
import SearchMsg from "@/components/chat/SearchMsg.vue";
import GroupDetail from "@/components/chat/GroupDetail.vue";
import { ElMessage, ElLoading } from 'element-plus';

export default defineComponent({
  components: {
    NSelect, NMention, ChatMe, ChatFriend, PersonCard, HeadPortrait, NList, NListItem, NAvatar, NTag, NModal, NDrawer,
    SearchMsg, GroupDetail
  },
  setup() {
    const curTeamId = ref(parseInt(window.sessionStorage.getItem('curTeamId')));
    const curTeamName = ref(window.sessionStorage.getItem('curTeamName'));
    const websocketURL = ref('');
    const user = ref({});
    const records = ref([]);
    const isPerm = ref(false);
    const mentionedMembers = ref([]);
    const selectedMentionValue = ref('');
    const form = ref({
      file: '',
      team_id: ''
    });
    const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
    const current = '';
    const selectedChat = ref({});
    const drawer = ref(false);
    const direction = ref('rtl');
    const addedGroupName = ref([]);
    const selectedValue = ref();
    const addedFriends = ref([]);
    const chat_list = ref([]);
    const store = useStore();
    const showModal = ref(false);
    const showAddGroup = ref(false);
    const text_content = ref("");
    const friend_list = ref([]);
    const friend_options = ref([]);
    const select_options = ref([]);
    const manager_friend_options = ref([{ value: "所有人", label: "所有人" }]);

    const generateIdentifier = (num1, num2) => {
      const smallerNum = Math.min(num1, num2);
      const largerNum = Math.max(num1, num2);
      const numStr = `${smallerNum}-${largerNum}`;
      const identifier = CryptoJS.SHA256(numStr).toString(CryptoJS.enc.Hex);
      return identifier;
    };

    const getFriendList = () => {
      axios.post('/team/seemember', { "team_id": curTeamId.value })
        .then((response) => {
          if (response.data.code != 200) {
            console.log(response.data.messages);
          } else {
            friend_list.value = response.data.res;
            manager_friend_options.value.push(
              ...response.data.res
                .filter(item => item.user_id !== user.value.user_id)
                .map(item => ({
                  value: item.nickname,
                  label: item.user_id
                })));
          }
        });
    };

    const getChatList = (id) => {
      axios.post('chat/list', { "team_id": parseInt(id) })
        .then((response) => {
          if (response.data.code != 200) {
            console.log(response.data.message);
          } else {
            chat_list.value = response.data.res;
            select_options.value = response.data.res
              .map(item => ({
                value: item.no,
                label: item.name
              }));
            selectedChat.value = response.data.res.find(item => item.type === 'team');
            selectedValue.value = selectedChat.value.no;
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    const handleShowClick = () => {
      showModal.value = true;
    };

    const handleAddGroup = () => {
      showAddGroup.value = true;
      console.log("创建群聊" + showAddGroup.value);
    };

    const addConfirm = () => {
      // console.log(addedGroupName.value)
      // if(addedGroupName.value===''){
      //   ElMessage({
      //         message: '群聊名称不能为空',
      //         type: 'warning',
      //       });
      // }
      // else{
        axios.post('/chat/group/create', { "name": addedGroupName.value, "team_id": curTeamId.value, "members": addedFriends.value })
        .then((response) => {
          if (response.data.code != 200) {
            console.log(response.data.message);
          } else {
            // ElMessage({
            //   message: '创建群聊成功',
            //   type: 'success',
            // });
            const LastChat = chat_list.value[chat_list.value.length - 1];
            chat_list.value.push({ "no": LastChat.no + 1, "type": "group", "id": response.data.group_team, "name": addedGroupName.value });
            select_options.value.push({
              value: LastChat.no + 1,
              label: addedGroupName.value
            });
            addedFriends.value = [];
            addedGroupName.value = '';
          }
        })
        .catch(err => {
          console.log(err);
        });
      // }
      
      showAddGroup.value = false;
    };

    const sendNotiToMembers = (members, chat_id) => {
      members.forEach((member) => {
        const NotiContent = {
          rec_id: member,
          content: "@了你",
          team_id: curTeamId.value,
          ref_type: "chat",
          ref_id: chat_id
        };
        axios.post('message/create', JSON.stringify(NotiContent))
          .then((response) => {
            console.log("sendMsg");
            console.log(JSON.stringify(NotiContent));
            console.log(response.data.message);
          })
          .catch(error => {
            console.log(error);
          });
      });
    };

    const scrollBottom = () => {
      nextTick(() => {
        const scrollDom = document.getElementById('chatContent');
        if (scrollDom) {
          animation(scrollDom, scrollDom.scrollHeight - scrollDom.offsetHeight);
        }
      });
    };

    const receiveMessage = (data) => {
      let receiveMsg = {};
      if (data.is_file === 0) {
        receiveMsg = {
          sender_id: data.id,
          content: data.message,
          send_time: data.time,
          sender: data.name,
          type: "text"
        };
      } else {
        receiveMsg = {
          sender_id: data.id,
          file: data.message,
          send_time: data.time,
          sender: data.name,
          type: data.is_file === 1 ? "image" : "file"
        };
      }
      records.value.push(receiveMsg);
      scrollBottom();
    };

    const sendText = () => {
      let sendUrl = '/chat/create';
      let postData = {
        team_id: parseInt(curTeamId.value),
        content: text_content.value,
      };
      if (selectedChat.value.type === 'member') {
        sendUrl = '/chat/create/pri';
        postData = {
          team_id: parseInt(curTeamId.value),
          content: text_content.value,
          rec_id: selectedChat.value.id
        };
      } else if (selectedChat.value.type === 'group') {
        sendUrl = '/chat/create/group';
        postData = {
          group_id: selectedChat.value.id,
          content: text_content.value,
        };
      }
      if (text_content.value) {
        axios.post(sendUrl, JSON.stringify(postData))
          .then((response) => {
            if (response.data.code != 200) {
              console.log(response.data.error);
            } else {
              chatSocket.send(JSON.stringify({
                'id': response.data.sender,
                'name': user.value.nickname,
                'message': text_content.value,
                'time': response.data.send_time,
                'is_file': 0
              }));
              sendNotiToMembers(mentionedMembers.value, response.data.chat_id);
              text_content.value = "";
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("发送消息不能为空！");
      }
    };

    const sendImg = (image) => {
      let sendUrl = '/chat/file';
      let imgData = new FormData();
      if (selectedChat.value.type === 'group') {
        sendUrl = '/chat/file/group';
        imgData.append("grouup_id", selectedChat.value.id);
      } else {
        imgData.append("team_id", parseInt(curTeamId.value));
      }
      imgData.append("file", image.raw);
      if (selectedChat.value.type === 'member') {
        sendUrl = '/chat/file/pri';
        imgData.append("rec_id", selectedChat.value.id);
      }
      axios.post(sendUrl, imgData)
        .then((response) => {
          if (response.data.code != 200) {
            console.log(response.data.message);
          } else {
            chatSocket.send(JSON.stringify({
              'id': response.data.sender,
              'name': user.value.nickname,
              'message': response.data.file,
              'time': response.data.send_time,
              'is_file': 1
            }));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    const sendFile = (file) => {
      let sendUrl = '/chat/file';
      let fileData = new FormData();
      if (selectedChat.value.type === 'group') {
        sendUrl = '/chat/file/group';
        fileData.append("grouup_id", selectedChat.value.id);
      } else {
        fileData.append("team_id", parseInt(curTeamId.value));
      }
      fileData.append("file", file.raw);
      if (selectedChat.value.type === 'member') {
        sendUrl = '/chat/file/pri';
        fileData.append("rec_id", selectedChat.value.id);
      }
      axios.post(sendUrl, fileData)
        .then((response) => {
          if (response.data.code != 200) {
            console.log(response.data.message);
          } else {
            chatSocket.send(JSON.stringify({
              'id': response.data.sender,
              'name': user.value.nickname,
              'message': response.data.file,
              'time': response.data.send_time,
              'is_file': 2
            }));
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    const getUserInfo = () => {
      axios.get('user/myself/')
        .then((response) => {
          user.value = response.data;
        });
    };

    const chatSocket = new WebSocket(websocketURL.value);

    const getMsg = (val) => {
      showModal.value = false;
      document.getElementById('record' + val.content).scrollIntoView({ behavior: "smooth", block: 'start', inline: 'start' });
    };

    const updateChatList = (val) => {
      console.log("receiveChild:UPDATE");
      console.log(val.value);
      const curTeamId = window.sessionStorage.getItem('curTeamId');
      drawer.value = false;
      getChatList(curTeamId);
    };

    const choose_friend = (member) => {
      selectedValue.value = member.no;
      selectedChat.value = member;
      let hash = generateIdentifier(user.value.user_id, selectedChat.value.id);
      if (selectedChat.value.type === 'group') {
        websocketURL.value = `ws://81.70.184.77:8000/ws/chat/group/${selectedChat.value.id}/`;
      } else if (selectedChat.value.type === 'member') {
        websocketURL.value = `ws://81.70.184.77:8000/ws/chat/pri/${hash}/`;
      } else {
        websocketURL.value = `ws://81.70.184.77:8000/ws/chat/${curTeamId.value}/`;
      }
      console.log(websocketURL)
      if (chatSocket) {
        chatSocket.close();
      }
      chatSocket.value = new WebSocket(websocketURL.value);
      const self = this;
      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        self.receiveMessage(data);
        console.log(data);
      };
      getAllRecord();
    };

    const atFriend = (option) => {
      selectedMentionValue.value = option.label;
      if (selectedMentionValue.value === '所有人') {
        mentionedMembers.value = friend_list.value.filter(member => member.user_id !== user.value.user_id);
      } else {
        if (!mentionedMembers.value.includes(selectedMentionValue.value)) {
          mentionedMembers.value.push(selectedMentionValue.value);
        }
      }
    };

    const getAllRecord = () => {
      let url = `/chat/all/${curTeamId.value}`;
      if (selectedChat.value.type === 'member') {
        url = `/chat/all/pri/${curTeamId.value}/${selectedChat.value.id}`;
      } else if (selectedChat.value.type === 'group') {
        url = `/chat/all/group/${selectedChat.value.id}`;
      }
      axios.get(url)
        .then((response) => {
          if (response.data.code != 200) {
            console.log(response.data.error);
          } else {
            records.value = response.data.chats;
            scrollBottom();
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    const sendSocketMessage = (message, is_file) => {
      chatSocket.send(JSON.stringify({
        'id': user.value.user_id,
        'name': user.value.nickname,
        'message': message,
        'time': new Date().toISOString(),
        'is_file': is_file
      }));
    };

    onMounted(() => {
      curTeamId.value = parseInt(window.sessionStorage.getItem('curTeamId'));
      curTeamName.value = window.sessionStorage.getItem('curTeamName');
      websocketURL.value = `ws://81.70.184.77:8000/ws/chat/${curTeamId.value}/`;
      getUserInfo();
      getFriendList();
      getChatList(curTeamId.value);
      getAllRecord();

      chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        receiveMessage(data);
        console.log(data);
      };
    });

    onBeforeUnmount(() => {
      if (chatSocket) {
        chatSocket.close();
      }
    });

    return {
      updateChatList,
      addedGroupName,
      drawer,
      direction,
      selectedValue,
      showModal,
      showAddGroup,
      handleShowClick,
      handleAddGroup,
      addConfirm,
      addedFriends,
      getMsg,
      store,
      text_content,
      friend_list,
      chat_list,
      friend_options,
      select_options,
      manager_friend_options,
      renderLabel: (option) => h('span', [option.value]),
      getFriendList,
      getChatList,
      generateIdentifier,
      user,
      records,
      sendText,
      sendImg,
      sendFile,
      choose_friend,
      atFriend,
      getAllRecord,
      curTeamId,
      curTeamName,
      websocketURL,
      circleUrl,
      current,
      selectedChat,
      mentionedMembers,
      selectedMentionValue,
      form
    };
  },
 
  
});
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