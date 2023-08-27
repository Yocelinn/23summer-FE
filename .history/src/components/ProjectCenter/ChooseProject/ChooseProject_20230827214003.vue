<template>
    <div class="flex-container">
        <div class="flex-descriptions">
            <d-modal v-model="updateVisable">
                <template #header>
                    <d-modal-header>
                        <!--                <d-icon name="like"></d-icon>-->
                        <span>修改团队信息</span>
                    </d-modal-header>
                </template>

                <!--                <div class="text">昵称：</div>-->
                <div class="tl-div-input">
                    <el-input
                            v-model="curTName"
                            placeholder=团队名称
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

            <el-descriptions class="main-descriptions" title="团队信息" column="2">
                <el-descriptions-item label="团队名称：">
                    {{tName}}
                </el-descriptions-item>
                <el-descriptions-item label="权限：">
                    <div :key="roleNum">
                        <el-tag class="ml" :type="getTagClass(roleNum)">
                            {{role}}
                        </el-tag>
                    </div>
                </el-descriptions-item>
                <el-descriptions-item label="团队描述：">
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
                        <span class="text"><b>协作者</b></span>
                        <el-button class="custom-button" @click="handleClick">进入团队</el-button>
                    </div>
                </template>
                <el-table class="tl-card-table" :data="CPData" style="width: 100%" flex="1" :show-header="true">
                    <el-table-column label="姓名" fit="true" align="center">
                        <template #default="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>
                    <el-table-column label="邮箱" fit="true" align="center">
                        <template #default="scope">
                            {{scope.row.email}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<style scoped>

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
    height: 230px;
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
import { ref, defineComponent, onMounted } from 'vue';
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
import { useStore, mapState } from 'vuex';
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
        // const curTeamId = store.state.curTeamId;
        const roleNum = ref(0);
        const message = ElMessage;
        const valueBasic1 = ref('');
        const role = ref('');
        const tName = ref(''); // Initialize with an empty value
        const curTName = ref('')
        const description = ref(""); // Initialize with
        const curDescription = ref(""); // Initialize with
        const updateVisable = ref(false);

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

        const CPData = ref([]);
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
        const updateCurTName = (newValue) => {
            curTName.value = newValue;
        };

        const handleClick = () => {
            router.push('/teamCenter');
        };

        const fetchCPList = () => {
            console.log(window.sessionStorage.getItem('curTeamId'));
            axios.post('/team/seemember', {
                team_id: Number(window.sessionStorage.getItem('curTeamId'))
            }) // 从后端获取团队列表数据
                .then((response) => {
                    console.log(response.data.res);
                    console.log(response.config.data);
                    if (response.data.code === 200) {
                        CPData.value = response.data.res; // 将获取的数据赋值给tableData
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
                        message({
                            message: response.data.message,
                            type:'success'
                        })
                        console.log(response.data);
                        tName.value = window.sessionStorage.getItem('curProjectName');
                        roleNum.value = response.data.perm;
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

        const clearInput1 = () => {
            // curTName.value = ''; // 清空输入框内容
        };

        const clearInput2 = () => {
            curDescription.value = ''; // 清空输入框内容
        };

        const updateName = () => {
            axios.post('/project/rename', {
                project_id: Number(window.sessionStorage.getItem('curProjectId')),
                new_name: curTName.value
            })
                .then((response2) => {
                    if (response2.data.code === 200) {
                        message({
                            message: response2.data.message,
                            type:'success'
                        })
                        console.log(response2.data.message)
                        window.sessionStorage.setItem('curProjectName', curTName.value);
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
            clearInput1();
        };

        const updateDes = () => {
            axios.post('/project/change_description', {
                new_description: curDescription.value,
                prj_id: Number(window.sessionStorage.getItem('curProjectId'))
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        message({
                            message: response.data.message,
                            type:'success'
                        })
                        console.log(response.data.message);
                        window.sessionStorage.setItem('curProjectDes', curDescription.value)
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
            clearInput2();
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
            getTagClass,
            updateName,
            updateDes,
            updateCurTName,
            updateCurDescription,
            handleClick,
            fetchCPList,
            fetchSelfInform,
        };
    },
});
</script>
