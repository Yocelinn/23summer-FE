<template>
    <div class="groupDetail">
            <div class="drawer-title">群详情</div>
            <div class="drawer-header">
                
                <n-avatar style="background-color: #9E9CF4 ">{{ curChat.name.substring(0,2) }}</n-avatar>
                <div class="drawer-name">{{ curChat.name }}</div>
                
            </div>
            <el-divider/>
            <div class="group-member" v-if="curChat.type==='team'">
                <div class="group-member-avatar" v-for="member in friend_list" :key="member">
                    
                    <!-- <span>我是群主</span> -->
                        <n-badge  v-if="member.perm===2" value="群主" color=" #A1EBDE " >
                            <n-avatar  round :size="40">{{ member.nickname.slice(-2) }}</n-avatar>
                     </n-badge>
                     <n-badge  v-else-if="member.perm===1" value="管理员" color=" #A1EBDE">
                            <n-avatar  round :size="40">{{ member.nickname.slice(-2) }}</n-avatar>
                     </n-badge>
                     <n-badge  v-else >
                            <n-avatar  round :size="40">{{ member.nickname.slice(-2) }}</n-avatar>
                     </n-badge>
               
            </div>
            </div>

            <div class="group-member" v-if="curChat.type==='group'&&Perm">
                <n-avatar  round color="#fff" @click="handleSelectAddMem" :size="40" class="addMemIcon">+</n-avatar>
                <!-- <el-button color="#9E9CF4" :icon="Plus" circle /> -->
                <div class="group-member-avatar" v-for="member in member_list" :key="member">
                    
                        <!-- <span>我是群主</span> -->
                            <n-badge  v-if="member.perm===0" value="-" @click="removeMember(member)">
                                <n-avatar  round :size="40">{{ member.nickname.slice(-2) }}</n-avatar>
                         </n-badge>
                         <n-badge  v-else value="群主" color=" #A1EBDE   ">
                                <n-avatar  round :size="40">{{ member.nickname.slice(-2) }}</n-avatar>
                         </n-badge>
                   
                </div>
            </div>
            <el-divider></el-divider>
            <el-dialog
                v-model="showAddModal"
                title="添加成员"
                width="30%"
                :modal="false"
            >
            <el-radio-group v-model="addedFriend" v-for="friend in unAddedFriend" :key="friend" >
                <el-radio :label="friend.user_id">{{friend.nickname}}</el-radio>
            </el-radio-group>
            <!-- <el-checkbox-group v-model="addedFriend" fill="#9E9CF4">
                    <el-checkbox  v-for="friend in friend_list" :key="friend.user_id" :label="friend.user_id">
                     {{ friend.nickname }}
                    </el-checkbox>
                </el-checkbox-group> -->
                    <div class="confirmButton">
                        <el-button color="#9E9CF4"  plain @click="addMember">确认邀请</el-button>
                    </div>
            </el-dialog>
            <div class="tool-button" v-if="curChat.type==='group'">
                <el-popconfirm v-if="Perm"
                    width="220"
                    confirm-button-text="确认"
                    confirm-button-type="danger"
                    @confirm="deleteGroup"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="#f65757"
                    title="确认解散群聊"
                >
                    <template #reference>
                    <el-button color="#f65757"  plain >解散群聊</el-button>
                    </template>
                </el-popconfirm>
                <el-popconfirm v-else
                    width="220"
                    confirm-button-text="确认"
                    confirm-button-type="danger"
                    @confirm="quitGroup"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="#f65757"
                    title="确认退出群聊"
                >
                    <template #reference>
                    <el-button color="#f65757"  plain >退出群聊</el-button>
                    </template>
                </el-popconfirm>

                <!-- <el-button color="#f65757"  plain @click="quitGroup">退出群聊</el-button> -->
            </div>
    </div>
</template>
<script>
import { defineComponent ,ref,emit, onMounted} from 'vue'
import {NModal,NAvatar,NAvatarGroup,NTooltip,NDropdown,NBadge} from 'naive-ui'
import { InfoFilled} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'
import axios from 'axios'
export default defineComponent({
    components:{
        NModal,NAvatar,NAvatarGroup,NTooltip,NDropdown,NBadge,
    },
    props:{
        curChat:Object,
        friend_list:Array,
        Perm:Boolean,
        // getChatList:Function
    },
   
    setup(props,{emit}) {
        // onMounted(()=>{
        //     getAllMember();
        // });
        onMounted(()=>{
            getUnAddedFriend()
            userId.value=window.sessionStorage.getItem('userId')
            console.log("ChilePerm:"+Perm.value)
            console.log(curChat.value)
        })
        const userId=ref()
        const addedFriend=ref()
        const curChat=ref(props.curChat)
        const friend_list=ref(props.friend_list)
        const Perm=ref(props.Perm)
        const unAddedFriend=ref([])
        const member_list=ref([]);
        const showAddModal=ref(false)

        const updateList = () => {
            let param = {
                content: 1
            };
            console.log("sendToParent"+param.content)
            emit('updateList',param)
        }
        function getUnAddedFriend(){
            console.log(curChat.value)
            axios.post('chat/group/members',{"group_id": parseInt(curChat.value.id)})
            .then((response)=>{
                if(response.data.code!=200){
                    console.log(response.data.error)
                }
                else{
                    member_list.value=response.data.res;
                    // const userId=window.sessionStorage.getItem('userId');
                    // const foundMe = member_list.value.find(friend => friend.user_id === parseInt(userId.value));
                    // console.log(foundMe)
                    // if(foundMe){
                    //     if(foundMe.perm!=0){
                    //         isPerm.value=true;
                    //     }
                    // }
                    console.log(member_list.value)
                    const groupMembers = response.data.res;
                    // 遍历 friend_list 检查是否在 groupMembers 中
                    friend_list.value.forEach((friend) => {
                    const isMemberInGroup = groupMembers.some((member) => member.user_id === friend.user_id);
                    if (!isMemberInGroup) {
                        unAddedFriend.value.push(friend); // 将不在群组中的成员添加到 UnAddedFriend 中
                    }
                    });
                    console.log(unAddedFriend.value)
                    
                }
            })
        }
        function handleSelectAddMem()
        {
            showAddModal.value=true;
        }
        function quitGroup(){
            console.log(curChat.value)
            axios.post('chat/group/quit',{"group_id":parseInt(curChat.value.id) })
           
            .then((res)=>{
                if(res.data.code!=200){
                    // console.log(res.data.error)
                    ElMessage({
                        message: res.data.error,
                        type: 'warning',
                    })
                }
                else{
                    let curTeamId=window.sessionStorage.getItem('curTeamId')
                    console.log("Child:"+curTeamId)
                    // ElMessage({
                    //     message: '邀请成功',
                    //     type: 'success',
                    // })
                    updateList();
                    // console.log("quitGroup")
                }
            })
           
        }
        function addMember(){
            console.log(addedFriend.value)
            axios.post('/chat/group/add',{"user_id": addedFriend.value,"group_id": curChat.value.id})
            .then((res)=>{
                if(res.data.code!=200){
                    ElMessage({
                        message: res.data.error,
                        type: 'warning',
                    })
                    showAddModal.value=false;
                    console.log(res.data.error)
                }
                else{
                    // ElMessage({
                    //     message: '邀请成功',
                    //     type: 'success',
                    // })
                    showAddModal.value=false;
                    updateList();
                }
            })
            .catch(err=>{
                console.log(err)
            })
            console.log("addMember");
        }
        function removeMember(member){
            console.log(member)
            axios.post('chat/group/remove',{"user_id":member.user_id,"group_id":curChat.value.id})
            .then((response)=>{
                if(response.data.code!=200){
                    ElMessage({
                        message: response.data.error,
                        type: 'warning',
                    })
                }
                else{
                    console.log(response.data.message)
                    ElMessage({
                        message: "移除成员成功",
                        type: 'success',
                    })
                    getUnAddedFriend()
                }
            })
        }
    
        function deleteGroup(){
            axios.post('/chat/group/delete',{"group_id": curChat.value.id})
            .then((response)=>{
                if(response.data.code!=200){
                    ElMessage({
                        message: response.data.error,
                        type: 'warning',
                    })
                    // console.log(response.data.error)
                }
                else{
                    // console.log(response.data.message)
                    // ElMessage({
                    //     message: "解散群聊成功",
                    //     type: 'success',
                    // })
                    updateList();
                }
            })
        }
     
        return{
            quitGroup,addMember,handleSelectAddMem,addedFriend,updateList,deleteGroup,member_list,
            // getAllMember,
            removeMember,userId,
            // Perm,
            unAddedFriend,
            InfoFilled,
            showAddModal,
      createDropdownOptions: (options) => options.map((option) => ({
        key: option.name,
        label: option.name
      }))
        } 
    },
})
</script>
<style scoped>
.groupDetail{
    padding:20px;
}
.drawer-header{
    font:30px;
    text-align:start;
    display:flex
}
.drawer-name{
    margin-left: 20px;
    color:#48464C;
    font-size:20px;
}
.group-member{
    padding:20px;
    text-align:center;
     display: grid;
  grid-template-columns: repeat(5, 1fr); /* 五列，每列平均分布 */
  gap: 5px; /* 列之间的间隙 */
  align-items: center; /* 垂直居中对齐 */
}
.group-member-avatar{

    display:grid;
     grid-template-columns: repeat(5, 1fr); /* 五列，每列平均分布 */
  gap: 5px; /* 列之间的间隙 */
  align-items: center; /* 垂直居中对齐 */
}

.addMemIcon{
    color:rgb(119, 117, 117);
    border:2px solid rgb(119, 117, 117);
    font-weight: bold;
}
.addMemIcon:hover{
     color:  #9E9CF4;
    border:2px solid   #9E9CF4;
    font-weight: bold;
    cursor:pointer;
}
.drawer-title{
    flex: 1;
    color:#48464C;
    font-size:20px;
    font-weight:500;
    margin:30px;
}
/* .tool-button{
    color:#f65757
} */
.confirmButton{
    text-align:right
}
.tool-button{
    margin:30px;
    text-align:center
}
</style>