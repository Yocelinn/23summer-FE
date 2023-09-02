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
                <div class="tl-div-input">
                    <el-input
                            v-model="curTName"
                            placeholder=项目名称
                            clearable
                            class="tl-input1"
                            @input="updateCurTName"
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

                <template #footer>
                    <d-modal-footer class="tl-button-container" style="text-align: right; padding-right: 20px;">
                        <d-button class="custom-button-i" @click="updateName">修改名称</d-button>
                        <d-button class="custom-button-i" @click="updateDes">修改描述</d-button>
                        <d-button class="custom-button" @click="updateVisable=false">取消</d-button>
                    </d-modal-footer>
                </template>
            </d-modal>

            <el-descriptions class="main-descriptions" title="项目信息" column="2">
                <el-descriptions-item label="项目名称：">
                    {{tName}}
                </el-descriptions-item>
                <el-descriptions-item label="所属团队：">
                    {{curTeamName}}
                </el-descriptions-item>
                <el-descriptions-item label="项目描述：">
                    {{description}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <el-button class="custom-save-button-tl" type="primary" plain style="margin-top: 23px" @click="updateVisable=true">更改</el-button>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="card-container">
            <el-card class="box-card" >
                <template #header>
                    <div class="card-header">
                        <span class="text"><b>项目列表</b></span>
<!--                        <el-button class="custom-button" @click="handleClick">进入团队</el-button>-->
                    </div>
                </template>
                <el-table class="tl-card-table" :data="CPData" style="width: 100%" flex="1" :show-header="false">
                    <el-table-column label="姓名" fit="true" align="center">
                        <template #default="scope">
                            <d-button class="custom-button-w"  v-ripple="{ duration: 300 }" @click="chooseCurProject(scope.row)">
                                {{scope.row.projectName}}
                            </d-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
        <div class="in-button-container">
            <el-button class="in-custom-button" @click="inClick">回到主页</el-button>
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
    height: 30%;
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
import {ref, defineComponent, onMounted, computed} from 'vue';
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useStore, mapState, mapActions} from 'vuex';
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
        const curTeamId = window.sessionStorage.getItem('curTeamId');
        const curTeamName = ref('');
        const roleNum = ref(0);
        const message = ElMessage;
        const valueBasic1 = ref('');
        const role = ref('');
        const tName = ref(''); // Initialize with an empty value
        const curTName = ref('')
        const description = ref(""); // Initialize with
        const curDescription = ref(""); // Initialize with
        const updateVisable = ref(false);
        const inClick = () => {
            router.push('/person');
        }

        function getTagClass(roleNum) {
            console.log("权限", roleNum);
            if (roleNum === 1/* some condition */) {
                role.value = '管理员';
                return 'success';
            } else if (roleNum === 2/* some other condition */) {
                role.value = '创建者';
                return 'warning';
            } else if (roleNum === 0) {
                console.log("进入")
                role.value = '参与者';
                return 'default';
            } else {
                role.value = '游客';
                return 'info';
            }
        }

        // const CPData = ref([]);
        const CPData = computed(() => {
            return store.state.projectData;
        });

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

        const { fetchProjectList } = mapActions(['fetchProjectList']);
        // const { createNewProject } = mapActions(['createNewProject']);
        const callFetchInProjectList = () => {
            console.log('PL', window.sessionStorage.getItem('curTeamId'));
            store.dispatch('fetchProjectList', window.sessionStorage.getItem('curTeamId'));
            console.log('PL检查', CPData);
        };


        const chooseCurProject = (data) => {
            window.sessionStorage.setItem('curProjectId', data.project_id);
            window.sessionStorage.setItem('curProjectName', data.projectName);
            window.sessionStorage.setItem('curProjectDes', data.projectDescription);
            callFetchInProjectList();
            fetchSelfInform();
        }

        const updateCurDescription = (newValue) => {
            curDescription.value = newValue;
        }
        const updateCurTName = (newValue) => {
            curTName.value = newValue;
        };

        const handleClick = () => {
            router.push('/teamCenter');
        };

        const fetchCPList = () => {
            console.log(window.sessionStorage.getItem('curTeamId'));
            axios.post('/project/info', {
                team_id: Number(window.sessionStorage.getItem('curTeamId'))
            }) // 从后端获取团队列表数据
                .then((response) => {
                    console.log(response.data.projects);
                    console.log(response.config.data);
                    if (response.data.code === 200) {
                        console.log(response.data.projects);
                        // CPData.value = response.data.projects; // 将获取的数据赋值给tableData
                        store.commit('setProjectData', response.data.projects);
                        console.log(response.data.res);
                        console.log('success');
                        console.log(CPData.value);
                    }
                })
                .catch((error) => {
                    message({
                        message:"获取协作者信息失败，请刷新重试",
                        type:'error'
                    })
                    console.error('GET request error:', error);
                });
            console.log(CPData.value);
        };

        const fetchSelfInform = () => {
            axios.post('/team/myself/', {
                team_id: Number(window.sessionStorage.getItem('curTeamId'))
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        // message({
                        //     message: response.data.message,
                        //     type:'success'
                        // })
                        console.log(response.data);
                        tName.value = window.sessionStorage.getItem('curProjectName');
                        roleNum.value = response.data.perm;
                        curTeamName.value = window.sessionStorage.getItem('curTeamName')
                        description.value = window.sessionStorage.getItem('curProjectDes');
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

        const clearInput = () => {
            curTName.value = ''; // 清空输入框内容
            curDescription.value = ''; // 清空输入框内容
        };

        const updateName = () => {
            const Cname = ref('');
            Cname.value = curTName.value;
            axios.post('/project/rename', {
                project_id: Number(window.sessionStorage.getItem('curProjectId')),
                new_name:  Cname.value
            })
                .then((response2) => {
                    if (response2.data.code === 200) {
                        // message({
                        //     message: response2.data.message,
                        //     type:'success'
                        // })
                        console.log(response2.data.message)
                        window.sessionStorage.setItem('curProjectName',  Cname.value);
                        fetchSelfInform();
                        fetchCPList();
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
                    console.error(error2.config.data);
                    message({
                        message:"修改名称错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error2);
                })
            updateVisable.value = false;
            fetchSelfInform();
            console.log(tName.value);
            clearInput();
        };

        const updateDes = () => {
            const holdDes = ref('');
             holdDes.value = curDescription.value
            axios.post('/project/change_description', {
                new_description: holdDes.value,
                project_id: Number(window.sessionStorage.getItem('curProjectId'))
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        // message({
                        //     message: response.data.message,
                        //     type:'success'
                        // })
                        console.log(response.data.message);
                        window.sessionStorage.setItem('curProjectDes', holdDes.value)
                        console.log('检查curProjectDes更新', curDescription.value);
                        fetchSelfInform();
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
                        message:"修改描述错误，请重试",
                        type:'error'
                    })
                    // 处理错误
                    console.error('POST request error:', error);
                })
            updateVisable.value = false;
            fetchSelfInform();
            clearInput();
        };

        onMounted(async () => {
            fetchSelfInform();
            await fetchCPList(); // 组件挂载后获取团队列表数据
        });

        return {
            user,
            curTeamId,
            roleNum,
            valueBasic1,
            CPData,
            role,
            tName,
            curTName,
            description,
            curDescription,
            updateVisable,
            fetchProjectList,
            curTeamName,
            chooseCurProject,
            getTagClass,
            updateName,
            updateDes,
            updateCurTName,
            updateCurDescription,
            handleClick,
            fetchCPList,
            fetchSelfInform,
            inClick
        };
    },
});
</script>
