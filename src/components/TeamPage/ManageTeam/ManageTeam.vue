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
            <span :key="roleCheckAdd">
                <d-button
                        class="newProject-pl"
                        @click="plNewPjVisable=true"
                        :disabled="roleCheckAdd"

                >
                    邀请队员
                </d-button>
            </span>
        </div>

        <d-modal v-model="plNewPjVisable">
            <template #header>
                <d-modal-header>
                    <!--                <d-icon name="like"></d-icon>-->
                    <span>邀请队员项目</span>
                </d-modal-header>
            </template>

            <!--                <div class="text">昵称：</div>-->
            <div class="pl-div-input-d">
                用户邮箱：
                <el-input
                        v-model="newPjName"
                        placeholder=用户邮箱
                        clearable
                        class="pl-input-d"
                />
                <!--                @input="cNewPjName"-->

<!--                <el-input-->
<!--                        v-model="newPjDes"-->
<!--                        placeholder=权限-->
<!--                        clearable-->
<!--                        class="pl-input-d"-->
<!--                />-->

                <div class="mb-0">权限</div>
                <d-select class="mb-2" v-model="newPjDes" :options="optionsRole"></d-select>

            </div>

            <template #footer>
                <d-modal-footer class="pl-button-container-d" style="text-align: right; padding-right: 20px;">
                    <d-button class="pl-button-d-i" @click="addNewTeammate">确认</d-button>
                    <d-button class="pl-button-d-c" @click="plNewPjVisable=false">取消</d-button>
                </d-modal-footer>
            </template>
        </d-modal>

    </div>
    <div class="table-container-pl">
        <el-table class="table-pl" :data="personData" style="width: 100%" stripe="true" fit="true">
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
                    <div style="display: flex; align-items: center" :key="roleCheckUpdate(scope)">
                        <span>
                            <d-button class="role-button"
                                      @click="handleUpdata(scope.$index, scope.row)"
                                      :disabled="roleCheckUpdate(scope)"
                                      variant="text"
                            >
                                <el-tag class="ml" :type="getTagClass(scope.row.perm)">
                                    {{ getScopeRole(scope.row) }}
                                </el-tag>
                           </d-button>
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <div :key="roleCheckDelete(scope)">
                        <span>
                            <d-button
                                    class="delete"
                                    size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)"
                                    :disabled="roleCheckDelete(scope)"
                            >
                                删除队员
                            </d-button>
                        </span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { ref, onMounted, computed, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from "axios";
// import router from "@/router";
import {mapState, useStore, mapActions } from 'vuex';
// import message from "@element-plus/icons/lib/Message";
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
        const curTeamId = window.sessionStorage.getItem('curTeamId');
        const curProjectId = ref('');
        const plNewPjVisable = ref(false);
        // const projectData = store.state.projectData;
        const projectData = computed(() => {
            return store.state.projectData;
        });
        const customOptions = ['管理员', '参与者'];
        const items = customOptions.map((option) => `${option}`);
        const optionsRole = reactive(items);
        const newPjName = ref('');
        const newPjDes = ref('');
        const roleNumber = computed(() => {
            return store.state.curRoleNum;
        });
        const { fetchProjectList } = mapActions(['fetchProjectList']);
        // const { createNewProject } = mapActions(['createNewProject']);
        const callFetchInProjectList = () => {
            console.log('PL', window.sessionStorage.getItem('curTeamId'));
            store.dispatch('fetchProjectList', window.sessionStorage.getItem('curTeamId'));
            console.log('PL检查', projectData);
        };

        const getScopeRole = (data) => {
            if (data.perm === 2) {
                return '创建者';
            }
            else if (data.perm === 1) {
                return '管理员';
            }
            else if (data.perm === 0) {
                return '参与者';
            }
            else {
                return '游客';
            }
        }

        const getRole = (roleNum) => {
            if (roleNum === '创建者') {
                return 2;
            }
            else if (roleNum === '管理员') {
                return 1;
            }
            else if (roleNum === '参与者') {
                return 0;
            }
            else {
                return -1;
            }
        }

        const getTagClass = (roleNum) => {
            console.log("权限", roleNum);
            if (roleNum === 1/* some condition */) {
                return 'success';
            } else if (roleNum === 2/* some other condition */) {
                return 'warning';
            } else if (roleNum === 0) {
                console.log("进入")
                return 'default';
            } else {
                return 'info';
            }
        }

        const roleCheckAdd = computed(() => {
            return !(roleNumber.value === 2 || roleNumber.value === 1);
        });

        const roleCheckDeleteHelper = (scope) => {
            return !(scope.row.perm === 0)
        }

        const roleCheckDelete = computed(() => {
            return (scope) => roleCheckDeleteHelper(scope);
        });

        const roleCheckUpdateHelper = (scope) => {
            if (roleNumber.value === 2) {
                return (scope.row.perm === 2);
            }
            else if (roleNumber.value === 1) {
                return (!(scope.row.perm === 0));
            }
            else {
                return true;
            }
        };

        const roleCheckUpdate = computed(() => {
            return (scope) => roleCheckUpdateHelper(scope);
        });


        const handleUpdata = (index, data) => {
            const hold = ref('');
            hold.value = data.perm;
            if (roleNumber.value === 2) {
                if (hold.value === 1) {
                    hold.value = 0;
                }
                else {
                    hold.value = 1;
                }
            }
            else {
                hold.value = 1;
            }
            axios.put('team/member', {
                team_id: Number(window.sessionStorage.getItem('curTeamId')),
                user_id: data.user_id,
                perm: hold.value
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        // ElMessage({
                        //     message: response.data.message,
                        //     type: 'success'
                        // });
                        updateTable(index, hold.value);
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: "修改权限失败，请重试",
                        type: 'error'
                    });
                    console.log(error.config);
                })
        }

        const { fetchTeammateList } = mapActions(['fetchProjectList']);
        const callFetchTeammateList = () => {
            console.log('MT', window.sessionStorage.getItem('curTeamId'));
            store.dispatch('fetchTeammateList', window.sessionStorage.getItem('curTeamId'));
            console.log('MT', window.sessionStorage.getItem('curRoleNum'));
        };

        const addNewTeammate = () => {
            console.log("检查email", newPjName.value);
            const hold = ref('');
            hold.value = getRole(newPjDes.value);
            if (hold.value !== 2 || hold.value !== 1 || hold.value !== 0 ) {
                hold.value = 0;
            }

            if (Number(window.sessionStorage.getItem('curTeamId')) === -1) {
                ElMessage({
                    message: '当前未选择团队',
                    type:'error'
                });
            }
            else {
                axios.post('user/search', {
                    email: newPjName.value
                })
                    .then((response) => {
                        if (response.data.code === 200) {
                            // ElMessage({
                            //     message: response.data.message,
                            //     type: 'success'
                            // });
                            axios.post('/team/member', {
                                team_id: window.sessionStorage.getItem('curTeamId'),
                                user_id: response.data.user_id,
                                perm: hold.value
                            })
                                .then((response2) => {
                                    if (response2.data.code === 200) {
                                        // ElMessage({
                                        //     message: response2.data.message,
                                        //     type: 'success'
                                        // });
                                        callFetchTeammateList();
                                    }
                                    else {
                                        ElMessage({
                                            message: response2.data.error,
                                            type: 'error'
                                        });
                                        console.log('邀请失败', response2.config.data);
                                    }
                                })
                                .catch((error2) => {
                                    ElMessage({
                                        message: '邀请失败，请重试',
                                        type: 'error'
                                    });
                                    console.log('POST request fail:', error2, error2.config.data);
                                })
                        }
                        else {
                            ElMessage({
                                message: response.data.error,
                                type: 'error'
                            });
                            console.log('查询失败', response.config.data);
                        }
                    })
                    .catch((error) => {
                        ElMessage({
                            message: '查询用户失败，请重试',
                            type: 'error'
                        });
                        console.log('POST request fail:', error.config.data);
                    });
            }
            plNewPjVisable.value = false;
        };

        const resetTeammateRoleNum = (index, roleNum) => {
            store.state.personData.value[index].perm = roleNum;
        }

        const updateTable = (index, roleNum) => {
            // 无排序时选用，免去刷新数组
            // resetTeammateRoleNum(index, roleNum);
            // 有排序时选用，维护排序
            callFetchTeammateList();
        };

        const handleDelete = (index, data) => {
            axios.post('/team/delete', {
                team_id: window.sessionStorage.getItem('curTeamId'),
                user_id: data.user_id
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        // ElMessage ({
                        //     message: '删除成功',
                        //     type: 'success'
                        // });
                        console.log(response.data);
                        callFetchTeammateList();
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
                        message: '删除队员失败，请重试',
                        type: 'error'
                    });
                    console.log('POST request error:', error);
                });
        }

        onMounted(() => {
            // callFetchInProjectList();
            callFetchTeammateList();
        });

        return {
            user,
            curTeamId,
            curProjectId,
            plNewPjVisable,
            projectData,
            newPjName,
            newPjDes,
            optionsRole,
            roleCheckAdd,
            roleCheckDelete,
            roleCheckUpdate,

            addNewTeammate,
            fetchProjectList,
            callFetchInProjectList,
            updateTable,
            handleDelete,
            fetchTeammateList,
            callFetchTeammateList,
            getScopeRole,
            getTagClass,
            roleCheckUpdateHelper,
            handleUpdata,
            roleCheckDeleteHelper
        };
    },
};
</script>

<style scoped>

.mb-2 {
    width: 85%;
    margin-left: 5px;
}

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