<template>
    <div class="flex-container-pl">
        <span>
            <h2>所有队员</h2>
        </span>
        <div class="align-right-pl">
            <!--            <span>-->
            <!--                -->
            <!--            </span>-->
            <!--            <el-divider class="custom-divider" direction="vertical" />-->
            <span>
                <d-button class="newProject-pl" @click="plNewPjVisable=true">
                    邀请队员
                </d-button>
            </span>
        </div>

        <d-modal v-model="plNewPjVisable">
            <template #header>
                <d-modal-header>
                    <!--                <d-icon name="like"></d-icon>-->
                    <span>新建项目</span>
                </d-modal-header>
            </template>

            <!--                <div class="text">昵称：</div>-->
            <div class="pl-div-input-d">
                <el-input
                        v-model="newPjName"
                        placeholder=新项目名称
                        clearable
                        class="pl-input-d"
                />
                <!--                @input="cNewPjName"-->
                <el-input
                        v-model="newPjDes"
                        placeholder=项目描述
                        clearable
                        class="pl-input-d"
                />
                <!--                @input="cNewPjDes"-->
            </div>

            <template #footer>
                <d-modal-footer class="pl-button-container-d" style="text-align: right; padding-right: 20px;">
                    <d-button class="pl-button-d-i" @click="createNewProject">确认</d-button>
                    <d-button class="pl-button-d-c" @click="plNewPjVisable=false">取消</d-button>
                </d-modal-footer>
            </template>
        </d-modal>

    </div>
    <div class="table-container-pl">
        <el-table class="table-pl" :data="projectData" style="width: 100%" stripe="true" fit="true">
            <el-table-column label="姓名">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="昵称">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.nickname }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="邮箱">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.email }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="身份">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.updated_time }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <d-button
                            class="delete"
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                    >
                        删除队员
                    </d-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import axios from "axios";
import router from "@/router";
import {mapState, useStore, mapActions } from 'vuex';
// import message from "@element-plus/icons/lib/Message";

export default {
    name: 'ManageTeam',
    computed: {
        ...mapState(['projectData']),
        ...mapState(['personData']),
        // 其他 computed properties
    },

    setup() {
        const store = useStore();
        const user = store.state.user;
        // const curTeamId = store.state.curTeamId;
        // const curTeamId = toRef(store.state, 'curTeamId');
        const curTeamId = window.sessionStorage.getItem('curTeamId');
        const curProjectId = ref('');
        const plNewPjVisable = ref(false);
        // const projectData = store.state.projectData;
        const projectData = computed(() => {
            return store.state.projectData;
        });
        // const projectData = ref([]);
        // const projectData = [
        //     {
        //         project_id: 1,
        //         projectName: "体通却者",
        //         projectDescription: "",
        //         creator_name: "难极理",
        //         creator_id: 1,
        //         created_time: "2023-08-25T07:10:22.887Z",
        //         updated_time: "2023-08-25T07:10:22.897Z"
        //     },
        //     {
        //         project_id: 1,
        //         projectName: "体通却者",
        //         projectDescription: "",
        //         creator_name: "难极理",
        //         creator_id: 1,
        //         created_time: "2023-08-25T07:10:22.887Z",
        //         updated_time: "2023-08-25T07:10:22.897Z"
        //     },
        //     {
        //         project_id: 1,
        //         projectName: "体通却者",
        //         projectDescription: "",
        //         creator_name: "难极理",
        //         creator_id: 1,
        //         created_time: "2023-08-25T07:10:22.887Z",
        //         updated_time: "2023-08-25T07:10:22.897Z"
        //     },
        //     {
        //         project_id: 1,
        //         projectName: "体通却者",
        //         projectDescription: "",
        //         creator_name: "难极理",
        //         creator_id: 1,
        //         created_time: "2023-08-25T07:10:22.887Z",
        //         updated_time: "2023-08-25T07:10:22.897Z"
        //     },
        //     {
        //         project_id: 1,
        //         projectName: "体通却者",
        //         projectDescription: "",
        //         creator_name: "难极理",
        //         creator_id: 1,
        //         created_time: "2023-08-25T07:10:22.887Z",
        //         updated_time: "2023-08-25T07:10:22.897Z"
        //     },
        //     {
        //         project_id: 1,
        //         projectName: "体通却者",
        //         projectDescription: "",
        //         creator_name: "难极理",
        //         creator_id: 1,
        //         created_time: "2023-08-25T07:10:22.887Z",
        //         updated_time: "2023-08-25T07:10:22.897Z"
        //     },
        // ];
        const newPjName = ref('');
        const newPjDes = ref('');
        const { fetchProjectList } = mapActions(['fetchProjectList']);
        // const { createNewProject } = mapActions(['createNewProject']);
        const callFetchInProjectList = () => {
            console.log('PL', window.sessionStorage.getItem('curTeamId'));
            store.dispatch('fetchProjectList', window.sessionStorage.getItem('curTeamId'));
            console.log('PL检查', projectData);
        };


        const { fetchTeammateList } = mapActions(['fetchProjectList']);
        const callFetchTeammateList = () => {
            console.log('TL', window.sessionStorage.getItem('curTeamId'));
            store.dispatch('fetchProjectList', window.sessionStorage.getItem('curTeamId'));
        };

        // const callCreatNewProject = async () => {
        //     const NewPjName = newPjName.value;
        //     const NewPjDes = newPjDes.value;
        //     await store.dispatch('createNewProject', { curTeamId, NewPjName, NewPjDes });
        //     plNewPjVisable.value = false;
        // }
        const createNewProject = () => {
            if (window.sessionStorage.getItem('curTeamId').value === -1) {
                ElMessage({
                    message: '当前未选择团队',
                    type:'error'
                });
                plNewPjVisable.value = false;
            }
            else {
                console.log(' 团队', window.sessionStorage.getItem('curTeamId'), store.state.isLoggedIn);
                axios.post('/project/create', {
                    team_id: window.sessionStorage.getItem('curTeamId'),
                    projectName: newPjName.value,
                    projectDescription: newPjDes.value
                })
                    .then((response) => {
                        console.log(response.config.data);
                        if (response.data.code === 200) {
                            ElMessage({
                                message: '新建成功',
                                type:'success'
                            })
                            console.log(response.data);
                            plNewPjVisable.value = false;
// 未完成                            curProjectId.value = response.data.id;
                            window.sessionStorage.setItem('curProjectId', response.data.project_id);
                            window.sessionStorage.setItem('curProjectName', newPjName.value);
                            window.sessionStorage.setItem('curProjectDes', newPjDes.value);
                            router.push('/prototype');
                        }
                        else {
                            ElMessage({
                                message: response.data.error,
                                type:'error'
                            });
                            console.log('一次新建', response.data);
                            plNewPjVisable.value = false;
                        }
                    })
                    .catch((error) => {
                        ElMessage ({
                            message: '新建项目失败，请重试',
                            type:'error'
                        })
                        console.log('POST request error:', error);
                        plNewPjVisable.value = false;
                    });
            }
        };

        const handleEdit = (index, data) => {
            curProjectId.value = data.project_id;
            // store.commit('setCurProjectId', data.project_id);
            window.sessionStorage.setItem('curProjectId', data.project_id);
            window.sessionStorage.setItem('curProjectName', data.projectName);
            window.sessionStorage.setItem('curProjectDes', data.projectDescription);

            router.push('/person/protectCenter');
        }

        const handleDelete = (index, data) => {
            axios.post('/project/delete', {
                project_id: data.project_id
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage ({
                            message: '删除成功',
                            type: 'success'
                        });
                        console.log(response.data);
                        callFetchInProjectList();
                    }
                    else {
                        ElMessage ({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage ({
                        message: '删除项目失败，请重试',
                        type: 'error'
                    });
                    console.log('POST request error:', error);
                });
        }

        // const fetchProjectList = () => {
        //     console.log('获取数据fetchProjectList' + curTeamId);
        //     // console.log(curTeamId.value);
        //     // console.log(curTeamId.value.value);
        //     axios.post('/project/info', {
        //         // team_id: curTeamId.value
        //         team_id: curTeamId
        //     })
        //         .then((response) => {
        //             console.log('Request Data:', response.config.data);
        //             if (response.data.code === 200) {
        //                 ElMessage( {
        //                     message: '已获取团队项目',
        //                     type: 'success'
        //                 });
        //                 console.log(response);
        //                 projectData.value = response.data.projects;
        //             }
        //             else {
        //                 ElMessage( {
        //                     message: response.data.error + '请重试',
        //                     type: 'error'
        //                 });
        //                 console.log(response);
        //                 // console.log(curTeamId.value);
        //             }
        //         })
        //         .catch((error) => {
        //             ElMessage( {
        //                 message: '获取团队项目失败，请重试',
        //                 type: 'error'
        //             });
        //             console.log('POST request error:', error);
        //             // console.log('未知错误', curTeamId.value);
        //         });
        // };

        // provide('fetchProjectList', fetchProjectList);
        // provide('test', 0);

        onMounted(() => {
            // callFetchInProjectList();
        });

        return {
            user,
            curTeamId,
            curProjectId,
            plNewPjVisable,
            projectData,
            newPjName,
            newPjDes,

            createNewProject,
            fetchProjectList,
            callFetchInProjectList,
            // callCreatNewProject,
            handleEdit,
            handleDelete,
            fetchTeammateList,
            callFetchTeammateList
        };
    },
};
</script>

<style scoped>
.pl-button-d-c:hover,
.pl-button-d-c:focus {
    border-style: solid;
    background-color: white;
    border-color: #7E7CCB;
    color: #7E7CCB;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.pl-button-d-c {
    border-style: solid;
    background-color: white;
    border-color: #9E9CF4;
    color: #9E9CF4;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.pl-button-d-c:active {
    border-style: solid;
    background-color: #7E7CCB;
    border-color: #7E7CCB;
    color: white;
}

.pl-button-d-i:hover,
.pl-button-d-i:focus {
    border-style: solid;
    background-color: #7E7CCB;
    border-color: #7E7CCB;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.pl-button-d-i {
    border-style: solid;
    background-color: #9E9CF4;
    border-color: white;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
}

.pl-button-d-i:active {
    border-style: solid;
    background-color: white;
    color: #7E7CCB;
}

.pl-input-d {
    max-width: 85%;
    flex: 0 0 85%;
    margin: 5px;
}

.table-pl {
    padding: 15px;
    overflow: auto;
    height: 570px;
}

.table-container-pl {
    margin-top: -10px;
    margin-bottom: 30px;
}

.flex-container-pl {
    display: flex;
    align-items: center;
    padding: 15px;
}

.align-right-pl {
    margin-left: auto;
}

.newProject-pl:hover,
.newProject-pl:focus {
    border-style: solid;
    background-color: #9E9CF4;
    border-color: white;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Add border-color transition */}

.newProject-pl {
    font-size: 17px;
    height: 35px;
    width: 85px;
    border-style: solid;
    background-color: #9E9CF4;
    border-color: white;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Add border-color transition */}

.newProject-pl:active {
    border-style: solid;
    background-color: white;
    border-color: #7E7CCB;
    color: #7E7CCB;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Add border-color transition */
}

</style>