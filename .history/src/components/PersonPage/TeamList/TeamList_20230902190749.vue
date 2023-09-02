<template>
    <div class="flex-container">
        <div class="flex-descriptions">
            <d-modal v-model="updateVisable">
                <template #header>
                    <d-modal-header>
                        <!--                <d-icon name="like"></d-icon>-->
                        <span>修改个人信息</span>
                    </d-modal-header>
                </template>

                <!--                <div class="text">昵称：</div>-->
                <div class="tl-div-input">
                    <el-input
                            v-model="curNitName"
                            placeholder=我的昵称
                            clearable
                            class="tl-input1"
                            @input="updateCurNitName"
                    />
                </div>

                <!--                <div class="text">描述：</div>-->
                <div class="tl-div-input">
                    <el-input
                            v-model="curDescription"
                            placeholder="描述"
                            clearable
                            class="tl-input4"
                            @input="updateCurDescription"
                    />
                </div>

                <!--                <div class="text">旧密码：</div>-->
                <div class="tl-div-input">
                    <el-input
                            v-model="passwordO"
                            type="password"
                            placeholder="Please input password"
                            show-password
                            clearable
                            class="tl-input2"
                            @input="updatePasswordO"
                    />
                </div>

                <!--                <div class="text">新密码：</div>-->
                <div class="tl-div-input">
                    <el-input
                            v-model="passwordN"
                            type="password"
                            placeholder="Please input password"
                            show-password
                            clearable
                            class="tl-input3"
                            @input="updatePasswordN"
                    />
                </div>

                <template #footer>
                    <d-modal-footer class="tl-button-container" style="text-align: right; padding-right: 20px;">
                        <d-button class="custom-button-i" @click="updateSelfInform">修改信息</d-button>
                        <d-button class="custom-button-i" @click="updatePassword">修改密码</d-button>
                        <d-button class="custom-button" @click="cutInput">取消</d-button>
                    </d-modal-footer>
                </template>
            </d-modal>

            <el-descriptions class="main-descriptions" title="个人信息">
                <el-descriptions-item label="昵称：">{{nitName}}</el-descriptions-item>
                <el-descriptions-item label="邮箱：">{{email}}</el-descriptions-item>
                <el-descriptions-item label="id：">{{uid}}</el-descriptions-item>
                <el-descriptions-item label="姓名：">{{name}}</el-descriptions-item>
                <el-descriptions-item label="描述：">{{description}}</el-descriptions-item>
                <el-descriptions-item>
                    <el-button class="custom-save-button-tl" type="primary" plain style="margin-top: 23px" @click="updateVisable=true">更改</el-button>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="card-container">
            <el-card class="box-card">
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
                <el-table class="tl-card-table" :data="tableData" style="width: 100%" flex="1" :show-header="false">
                    <el-table-column label="Name" fit="true" align="center">
                        <template #default="scope">
                            <d-button class="custom-button-w"  v-ripple="{ duration: 300 }" @click="chooseCurTeam(scope.row.team_id, scope.row.team_name)">
                                {{scope.row.team_name}}
                            </d-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div class="in-button-container">
            <el-button class="in-custom-button" @click="inClick">进入团队</el-button>
        </div>
    </div>
</template>

<style scoped>

.in-button-container {
    flex: 1; /* This will make in-button-container occupy the remaining height */
    display: flex;
    justify-content: center; /* Align the button to the bottom of the container */
    align-items: center; /* Align the button to the right of the container */
    /*padding: 20px; !* Add some padding for spacing *!*/
    width: 95%;
    flex-direction: column;
}

.in-custom-button:hover,
.in-custom-button:focus {
    display: flex;
    width: 85%;
    background-color: white;
    border-color: #7E7CCB;
    color: #7E7CCB;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    align-items: center;
    justify-content: center;
}

.in-custom-button {
    display: flex;
    width: 85%;
    background-color: white;
    border-color: #9E9CF4;
    color: #9E9CF4;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    align-items: center;
    justify-content: center;
}

.in-custom-button:active {
    display: flex;
    width: 85%;
    background-color: #7E7CCB;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    align-items: center;
    justify-content: center;
}

.tl-button-container {
    display: flex;
    justify-content: flex-end;
    /*padding-right: 20px; !* 调整按钮与容器边缘的间距 *!*/
    max-width: 100%;
}

.tl-input1 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}
.tl-input2 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}
.tl-input3 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}
.tl-input4 {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}

.tl-card-table {
    height: 330px;
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
    align-items: center; /* 垂直居中 */
    justify-content: flex-start; /* 水平居中 */
    /*height: calc(80% - 50px);*/
    /*height: 45%;*/
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
    width: 75%;
    height: 95%;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    padding: 20px;
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

.custom-save-button-tl {
    background-color: white;
    border-color: #9E9CF4;
    color: #9E9CF4;
}

.custom-save-button-tl:hover,
.custom-save-button-tl:focus {
    background-color: white;
    border-color: #7E7CCB;
    color: #7E7CCB;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.custom-save-button-tl:active {
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
import { useStore, mapActions, mapState } from 'vuex';
// const API_URL = '/'; // 新增这一行，定义API_URL

export default defineComponent( {
    name: 'TeamList',
    computed: {
        ...mapState(['projectData']),
        // 其他 computed properties
    },
    setup() {
        const store = useStore();
        const user = store.state.user;
        // const curTeamId = toRef(store.state, 'curTeamId')
        // const curTeamId = store.state.curTeamId;
        const curTeamId = ref('');
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
        // const fetchProjectList = inject('FetchProjectList');
        const { fetchProjectList } = mapActions(['fetchProjectList']);
        const test = inject('test');
        console.log(fetchProjectList);
        const callFetchInProjectList = () => {
            console.log('TL', window.sessionStorage.getItem('curTeamId'));
            store.dispatch('fetchProjectList', window.sessionStorage.getItem('curTeamId'));
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

        const cutInput = () => {
            updateVisable.value = false;
            curNitName.value = '';
            curDescription.value = '';
            passwordN.value = '';
            passwordO.value = '';
        };

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
            const hold = ref('');
            hold.value = valueBasic1.value;
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
            axios.post('/team/create',{
                teamName: valueBasic1.value // 使用输入框的值作为参数
            })
                .then((response) => {
                    // 处理响应
                    if (response.data.code === 200) {
                        message({
                            message: response.data.message,
                            type:'success'
                        })
                        window.sessionStorage.setItem('curTeamId', response.data.team_id);
                        window.sessionStorage.setItem('curTeamName', valueBasic1.value);
                        console.log('视察', window.sessionStorage.getItem('curTeamId'));
                        fetchTeamList();
                        router.push('/teamCenter'); // 原型是设计的url是prototype
                    }
                    else {
                        message({
                            message: '新建团队失败，请重试',
                            type:'error'
                        })
                        console.log('一次新建', response);
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
            axios.get('/team/all') // 从后端获取团队列表数据
                .then(async (response) => {
                    console.log(response.data.res);
                    if (response.data.code === 200) {
                        tableData.value = response.data.res; // 将获取的数据赋值给tableData
                        console.log('success');
                        console.log(tableData.value);
                        console.log('检查点1', Number(window.sessionStorage.getItem('curTeamId')));
                        if (tableData.value !== null) {
                            if (tableData.value.length > 0 && Number(window.sessionStorage.getItem('curTeamId')) === -1) {
                                // store.commit('setCurTeamId', tableData.value[0].team_id);
                                window.sessionStorage.setItem('curTeamId', tableData.value[0].team_id);
                                window.sessionStorage.setItem('curTeamName', tableData.value[0].team_name);
                                console.log('检查点2', Number(window.sessionStorage.getItem('curTeamId')));
                                // callFetchInProjectList();
                            }
                        } else {
                            // store.commit('setCurTeamId', -1);
                            window.sessionStorage.setItem('curTeamId', -1);
                        }
                        console.log('查看', window.sessionStorage.getItem('curTeamId'));
                        callFetchInProjectList();
                        fetchSelfInform();
                    }
                })
                .catch((error) => {
                    message({
                        message:"获取团队信息失败，请刷新重试",
                        type:'error'
                    })
                    console.error('GET request error:', error);
                });
            console.log(tableData.value);
            console.log('检查点3', Number(window.sessionStorage.getItem('curTeamId')));
        };

        // const initCurTeam = () => {
        //     console.log('长度', tableData.value.length);
        // };
        const fetchSelfInform = () => {
            console.log("进入SI", Number(window.sessionStorage.getItem('curTeamId')));
            axios.post('/team/myself/', {
                team_id: Number(window.sessionStorage.getItem('curTeamId'))
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        message({
                            message: response.data.message,
                            type:'success'
                        })
                        store.commit('setUser', response.data);
                        window.sessionStorage.setItem('userId', response.data.user_id);
                        window.sessionStorage.setItem('userName', response.data.name);
                        window.sessionStorage.setItem('userNickName', response.data.nickname);
                        window.sessionStorage.setItem('curRoleNum', response.data.perm);
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
                    console.error('POST request error:', error.config.data);
                })
        };

        const updateSelfInform = () => {
            axios.put('/user/myself/', {
                nickname: curNitName.value,
                description: curDescription.value
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
                    updateVisable.value = false;
                    curNitName.value = '';
                    curDescription.value = '';
                    fetchSelfInform();
                })
                .catch((error2) => {
                    message({
                        message:"修改普通信息错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error2);
                })
        };

        const updatePassword = () => {
            axios.post('/user/changepassword/', {
                old_password: passwordO.value,
                new_password: passwordN.value
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
                    updateVisable.value = false;
                    fetchSelfInform();
                    passwordO.value = '';
                    passwordN.value = '';
                })
                .catch((error) => {
                    message({
                        message:"修改密码错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error);
                })
        };

        const chooseCurTeam = (team_id, team_name) => {
            curTeamId.value = team_id;
            // store.commit('setCurTeamId', team_id);
            window.sessionStorage.setItem('curTeamId', team_id);
            window.sessionStorage.setItem('curTeamName', team_name);
            callFetchInProjectList();
            fetchSelfInform();
            console.log(window.sessionStorage.getItem('curTeamId'));
        };

        const inClick = () => {
            if (Number(window.sessionStorage.getItem('curTeamId')) === -1) {
                message({
                    message: '未选择团队',
                    type: 'error'
                });
            }
            else {
                router.push('/teamCenter');
            }
        }

        onMounted(async () => {
            console.log('m', fetchProjectList);

            await fetchTeamList(); // 组件挂载后获取团队列表数据
            // await fetchSelfInform();
            // initCurTeam();
        });

        return {
            test,
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
            fetchProjectList,
            callFetchInProjectList,
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
            inClick,
            cutInput
        };
    },
});
</script>