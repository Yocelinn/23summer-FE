<template>
    <div class="flex-container-pl">
        <span>
            <h2>所有项目</h2>
        </span>
        <div class="align-right-pl">
            <!--            <span>-->
            <!--                -->
            <!--            </span>-->
            <!--            <el-divider class="custom-divider" direction="vertical" />-->
            <span>
                <d-button class="newProject-pl" @click="plNewPjVisable=true">
                    新建项目
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
            <el-table-column label="项目名称">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.projectName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="项目创建者">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.creator_name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.created_time }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="最后修改时间">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.updated_time }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <d-button
                            class="access-pl"
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)">
                        进入项目
                    </d-button>
                    <d-button
                            class="delete"
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                    >
                        删除项目
                    </d-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { ref, onMounted, provide } from 'vue';
import { ElMessage } from 'element-plus';
import axios from "axios";
import router from "@/router";
import { useStore } from 'vuex';
// import message from "@element-plus/icons/lib/Message";

export default {
    name: 'ProjectList',
    setup() {
        const store = useStore();
        const user = store.state.user;
        const curTeamId = store.state.curTeamId;
        const curProjectId = store.state.curProjectId;
        const plNewPjVisable = ref(false);
        const projectData = ref([]);
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

        const createNewProject = () => {
            if (curTeamId === -1) {
                ElMessage({
                    message: '当前未选择团队',
                    type:'error'
                });
                plNewPjVisable.value = false;
            }
            else {
                console.log(' 团队', curTeamId, store.state.isLoggedIn);
                axios.post('/project/create', {
                    team_id: curTeamId,
                    projectName: newPjName.value,
                    projectDescription: newPjDes.value
                })
                    .then((response) => {
                        if (response.data.code === 200) {
                            ElMessage({
                                message: '新建成功',
                                type:'success'
                            })
                            console.log(response.data);
                            plNewPjVisable.value = false;
// 未完成                            curProjectId.value = response.data.id;
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
                        fetchProjectList();
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

        const fetchProjectList = () => {
            console.log(curTeamId, curTeamId);
            axios.post('/project/info', {
                team_id: curTeamId
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage( {
                            message: '已获取团队项目',
                            type: 'success'
                        });
                        console.log(response);
                        projectData.value = response.data.projects;
                    }
                    else {
                        ElMessage( {
                            message: response.data.error + '请重试',
                            type: 'error'
                        });
                        console.log(response);
                        console.log(curTeamId);
                    }
                })
                .catch((error) => {
                    ElMessage( {
                        message: '获取团队项目失败，请重试',
                        type: 'error'
                    });
                    console.log('POST request error:', error);
                });
        };

        provide('fetchProjectList', fetchProjectList);

        onMounted(() => {
            fetchProjectList();
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
            handleEdit,
            handleDelete
        };
    },
};
</script>

<style>
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