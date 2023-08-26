<template>
    <div class="flex-container">
        <div class="flex-descriptions">
            <d-modal v-model="updateVisable">
                <template #header>
                    <d-modal-header>
                        <!--                <d-icon name="like"></d-icon>-->
                        <span>修改项目信息</span>
                    </d-modal-header>
                </template>

                <!--                <div class="text">昵称：</div>-->
                <div class="cp-div-input">
                    <el-input
                            v-model="curNitName"
                            placeholder=我的昵称
                            clearable
                            class="cp-input1"
                            @input="updateCurNitName"
                    />
                </div>

                <!--                <div class="text">描述：</div>-->
                <div class="cp-div-input">
                    <el-input
                            v-model="curDescription"
                            placeholder="描述"
                            clearable
                            class="cp-input4"
                            @input="updateCurDescription"
                    />
                </div>

                <!--                <div class="text">旧密码：</div>-->
                <div class= "cp-div-input">
                    <el-input
                            v-model="passwordO"
                            type="password"
                            placeholder="Please input password"
                            show-password="false"
                            clearable
                            class="cp-input2"
                            @input="updatePasswordO"
                    />
                </div>

                <!--                <div class="text">新密码：</div>-->
                <div class="cp-div-input">
                    <el-input
                            v-model="passwordN"
                            type="password"
                            placeholder="Please input password"
                            show-password="false"
                            clearable
                            class="cp-input3"
                            @input="updatePasswordN"
                    />
                </div>

                <template #footer>
                    <d-modal-footer class="cp-button-container" style="text-align: right; padding-right: 20px;">
                        <d-button class="custom-button-i" @click="updateSelfInform">修改信息</d-button>
                        <d-button class="custom-button-i" @click="updatePassword">修改密码</d-button>
                        <d-button class="custom-button" @click="updateVisable=false">取消</d-button>
                    </d-modal-footer>
                </template>
            </d-modal>

            <el-descriptions class="main-descriptions" title="个人信息">
                <el-descriptions-item label="昵称：">{{nitName}}</el-descriptions-item>
                <el-descriptions-item>
                    <el-button class="custom-save-button-cp" type="primary" plain style="margin-top: 23px" @click="updateVisable=true">更改</el-button>
                </el-descriptions-item>
                <el-descriptions-item>
                    <el-button class="custom-save-button-cp" type="primary" plain style="margin-top: 23px" @click="updateVisable=true">更改</el-button>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="card-container">
            <el-card class="box-card" >
                <template #header>
                    <div class="card-header">
                        <span class="text"><b>选择团队</b></span>
                        <el-button class="custom-button" @click="handleClick">创建团队</el-button>
                        <d-modal v-model="visible">
                            <template #header>
                                <d-modal-header>
                                    <!--                <d-icon name="like"></d-icon>-->
                                    <span>创建团队</span>
                                </d-modal-header>
                            </template>
                            <div class="text"><b>团队名称：</b></div>
                            <d-input class="custom-input" v-model="valueBasic1" clearable @clear="handleClear" placeholder="你的新团队名称"></d-input>
                            <template #footer>
                                <d-modal-footer style="text-align: right; padding-right: 20px;">
                                    <d-button class="custom-button" @click="hidden">取消</d-button>
                                    <d-button class="custom-button-i" @click="newTeam">确认</d-button>
                                </d-modal-footer>
                            </template>
                        </d-modal>
                    </div>
                </template>
                <el-table class="cp-card-table" :data="tableData" style="width: 100%" flex="1" :show-header="false">
                    <el-table-column label="Name" fit="true" align="center">
                        <template #default="scope">
                            <d-button class="custom-button-w"  v-ripple="{ duration: 300 }" @click="chooseCurTeam(scope.row.team_id)">
                                {{scope.row.team_name}}
                            </d-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<style>
.cp-button-container {
    display: flex;
    justify-content: flex-end;
    /*padding-right: 20px; !* 调整按钮与容器边缘的间距 *!*/
    max-width: 100%;
}

.cp-input1 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}
.cp-input2 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}
.cp-input3 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}
.cp-input4 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}

.cp-card-table {
    height: 450px;
    overflow: auto;
}

.flex-container {
    display: flex;
    height: calc(100vh - 85px);
    flex-direction: column;
    align-items: center;
}

.flex-descriptions {
    flex: 1;
    width: 100%;
    max-height: 30%;
    padding: 15px;
}

.card-container {
    flex: 1;
    width: 95%;
    padding: 0 10px; /* Add some padding to prevent contents from sticking to the edges */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-height: calc(70% - 50px);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 18px;
}

.box-card {
    width: 85%;
    height: 75%;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
}

.custom-button-w {
    cursor: pointer;
    user-select: none; /* 禁止选中文字 */
}

.custom-button-w:focus {
    outline: none; /* 去掉按钮的焦点样式 */
    color: #9E9CF4;
}

.custom-button-w:active {
    background-color: rgba(158, 156, 244, 0.32); /* 点击时的背景色 */
    color: #9E9CF4;
}

.custom-button-w:hover {
    color: #9E9CF4; /* 修改悬停状态下的文字颜色 */
}

.custom-button-w {
    color: #9E9CF4;
    width: 100%; /* 设置按钮宽度 */
    padding: -5px;
    margin: -5px;
    height: 40px; /* 调整为您希望的行高度值 */
    line-height: 40px; /* 使文本垂直居中 */
}

.custom-save-button-cp {
    background-color: white;
    border-color: #9E9CF4;
    color: #9E9CF4;
}

.custom-save-button-cp:hover,
.custom-save-button-cp:focus {
    background-color: white;
    border-color: #7E7CCB;
    color: #7E7CCB;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-save-button-cp:active {
    background-color: #9E9CF4;
    border-color: white;
    color: white;
}

.text {
    margin-top: -10px;
    margin-bottom: 20px;
    font-size: 18px;
}

.custom-input {
    border: 1px solid #9E9CF4;
    border-radius: 8px; /* 添加圆角边框 */
    padding: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.custom-input:hover,
.custom-input:focus {
    border-color: #9E9CF4;
    box-shadow: 0 0 5px rgba(158, 156, 244, 0.7);
    outline: none;
}

.custom-button:hover,
.custom-button:focus {
    background-color: white;
    border-color: #7E7CCB;
    color: #7E7CCB;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button {
    background-color: white;
    border-color: #9E9CF4;
    color: #9E9CF4;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button:active {
    background-color: #7E7CCB;
    color: white;
}

.custom-button-i:hover,
.custom-button-i:focus {
    background-color: #7E7CCB;
    border-color: #7E7CCB;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button-i {
    background-color: #9E9CF4;
    border-color: white;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-button-i:active {
    background-color: white;
    color: #7E7CCB;
}
</style>

<script>
import { ref, defineComponent, reactive, onMounted, inject } from 'vue';
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
import { useStore } from 'vuex';

// const API_URL = 'http://81.70.184.77:8000/'; // 新增这一行，定义API_URL

export default defineComponent( {
    name: 'ChooseProject',
    setup() {
        const store = useStore();
        const user = store.state.user;
        const curTeamId = store.state.curTeamId;
        const input = ref('');
        const message = ElMessage;
        const visible = ref(false);
        const valueBasic1 = ref('');
        const name = ref('');
        const uid = ref('');
        const nitName = ref(''); // Initialize with an empty value
        const curNitName = ref('')
        const email = ref('');
        const password = ref(""); // Initialize with
        const description = ref(""); // Initialize with
        const curDescription = ref(""); // Initialize with
        const updateVisable = ref(false);
        const passwordO = ref(""); // Initialize with
        const passwordN = ref(""); // Initialize
        const fetchProjectList = inject('fetchProjectList');
        const callFetchProjectList = () => {
            if (fetchProjectList) {
                fetchProjectList();
            }
        };
        const data = reactive({
            name: 'Tom',
            age: 20,
            address: 'Chengdu',
        });
        const tableData = ref([]);
        // const tableData = [
        //     {
        //         "team_id": 1,
        //         "team_name": "testTeam1"
        //     },
        //     {
        //         "team_id": 2,
        //         "team_name": "testTeam1"
        //     },
        //     {
        //         "team_id": 3,
        //         "team_name": "testTeam1"
        //     },
        //     {
        //         "team_id": 4,
        //         "team_name": "testTeam1"
        //     },
        // ]


        const updateCurDescription = (newValue) => {
            curDescription.value = newValue;
        }
        const updatePasswordO = (newValue) => {
            passwordO.value = newValue;
        }
        const updatePasswordN = (newValue) => {
            passwordN.value = newValue;
        }
        const updateCurNitName = (newValue) => {
            curNitName.value = newValue;
        };


        const handleClear = () => {
            console.log('clear');
            valueBasic1.value = '';
        };

        const handleClick = () => {
            visible.value = true;
        };
        const hidden = () => {
            visible.value = false;
        };
        const newTeam = () => {
            if(valueBasic1.value.length > 20) {
                message({
                    message:"团队名称需少于20个字符",
                    type: 'error'
                })
                handleClear();
                return;
            }
            visible.value = false;
            // 发送POST请求
            axios.post('http://81.70.184.77:8000/team/create',{
                teamName: valueBasic1.value // 使用输入框的值作为参数
            }, {
                headers: { Authorization: user.token } // 使用输入框的值作为参数
            })
                .then((response) => {
                    // 处理响应
                    if (response.data.code === 200) {
                        message({
                            message: response.data.message,
                            type:'success'
                        })
                        fetchTeamList();
                        router.push('/teamCenter'); // 原型是设计的url是prototype
                    }
                    else {
                        message({
                            message: '新建团队失败，请重试',
                            type:'error'
                        })
                        console.log('一次新建', response.data);
                    }
                })
                .catch(error => {
                    message({
                        message:"新建团队其他错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error);
                });
        };

        const fetchTeamList = () => {
            axios.get('http://81.70.184.77:8000/team/all', {
                headers: { Authorization: user.token }
            }) // 从后端获取团队列表数据
                .then((response) => {
                    if (response.data.code === 200) {
                        tableData.value = response.data.res; // 将获取的数据赋值给tableData
                    }
                })
                .catch((error) => {
                    message({
                        message:"获取团队信息失败，请刷新重试",
                        type:'error'
                    })
                    console.error('GET request error:', error);
                });
        };

        const initCurTeam = () => {
            if (tableData.value !== null) {
                if (tableData.value.length > 0) {
                    curTeamId.value = tableData.value[0].id;
                }
                else {
                    curTeamId.value = -1;
                }
            }
        };
        const fetchSelfInform = () => {
            axios.get('http://81.70.184.77:8000/user/myself', {
                headers: { Authorization: user.token }
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        message({
                            message: response.data.message,
                            type:'success'
                        })
                        uid.value = response.data.user_id;
                        nitName.value = response.data.nickname;
                        name.value = response.data.name;
                        email.value = response.data.email;
                        description.value = response.data.description;
                    }
                    else {
                        message({
                            message: response.data.error,
                            type:'error'
                        })
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    message({
                        message:"获取个人信息错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error);
                })
        };

        const updateSelfInform = () => {
            axios.put('http://81.70.184.77:8000/user/myself/', {
                nickname: curNitName.value,
                description: curDescription.value
            }, {
                headers: { Authorization: user.token }
            })
                .then((response2) => {
                    if (response2.data.code === 200) {
                        message({
                            message: response2.data.message,
                            type:'success'
                        })
                        console.log(response2.data.message)
                    }
                    else {
                        message({
                            message: response2.data.error,
                            type:'error'
                        })
                        console.log(response2.data.error)
                    }
                })
                .catch((error2) => {
                    message({
                        message:"修改普通信息错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error2);
                })
            updateVisable.value = false;
            fetchSelfInform();
        };

        const updatePassword = () => {
            axios.post('http://81.70.184.77:8000/user/changepassword', {
                old_password: passwordO.value,
                new_password: passwordN.value
            }, {
                headers: { Authorization: user.token }
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        message({
                            message: response.data.message,
                            type:'success'
                        })
                        console.log(response.data.message);
                    }
                    else {
                        message({
                            message: response.data.error,
                            type:'error'
                        })
                        console.log(response.data.error);
                    }
                })
                .catch((error) => {
                    message({
                        message:"修改密码错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error);
                })
            updateVisable.value = false;
            fetchSelfInform();
        };

        const chooseCurTeam = (team_id) => {
            curTeamId.value = team_id;
            callFetchProjectList();
            console.log(curTeamId.value);
        }

        onMounted(() => {
            fetchTeamList(); // 组件挂载后获取团队列表数据
            if (tableData.value !== null) {
                if (tableData.value.length > 0)
                    curTeamId.value = tableData.value[0].id;
            }
            fetchSelfInform();
            initCurTeam();
            //
        });

        return {
            user,
            curTeamId,
            visible,
            valueBasic1,
            data,
            tableData,
            input,
            name,
            uid,
            nitName,
            curNitName,
            email,
            password,
            description,
            curDescription,
            updateVisable,
            passwordO,
            passwordN,
            callFetchProjectList,
            updateSelfInform,
            updatePassword,
            updateCurDescription,
            updatePasswordO,
            updatePasswordN,
            updateCurNitName,
            handleClear,
            handleClick,
            hidden,
            newTeam,
            chooseCurTeam,
            fetchTeamList,
            fetchSelfInform,
        };
    },
});
</script>
