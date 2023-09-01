<template>
    <div class="flex-container-pl">
        <span>
            <div style="font-size: 22px">团队项目</div>
        </span>

        <div class="align-right-pl">
            <el-icon style="margin-right: 5px" @click="openDelete"><Delete /></el-icon>
            <d-modal v-model="deleteTable" style="display: inline-block; max-width: 100%; width: 650px; height: 450px">
                <template #header>
                    <d-modal-header>
                        <span>回收站</span>
                    </d-modal-header>
                </template>

                <el-table class="table-pl" :data="deletedData" style="width: 100%; height: 310px" stripe="true" fit="true">
                    <el-table-column>
                        <template #header>
                            项目名称
                        </template>
                        <template #default="scope">
                            <el-checkbox v-model="scope.row.checked" size="large" >
                                <div style="display: flex; align-items: center">
                                    <span>{{ scope.row.projectName }}</span>
                                </div>
                            </el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template #header>
                            创建时间
                        </template>
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <span>{{ scope.row.created_time }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template #header>
                            最后修改时间
                        </template>
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <span>{{ scope.row.updated_time }}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>


                <template #footer>
                    <d-modal-footer class="pl-button-container-d" style="padding-right: 20px; width: 100%">
                        <d-button class="pl-button-d-i" @click="pullAllBack" style="text-align: left;">一键恢复</d-button>
                        <d-button class="pl-button-d-c" @click="pullBack" style="text-align: right;">恢复</d-button>
                    </d-modal-footer>
                </template>
            </d-modal>
            <div class="button-select">
                <button class="selected-button" @click="toggleDropdown">{{ selectedOption || placeholder }}</button>
                <div v-if="isDropdownVisible" class="dropdown" @click.stop>
                    <button
                            v-for="(option, index) in options"
                            :key="index"
                            class="option-button"
                            @click="selectOption(option)"
                    >
                        {{ option }}
                    </button>
                </div>
            </div>
            <div class="selevt-input">
                <d-input v-model="selectInputValue" autofocus @input="selectFor"></d-input>
            </div>
            <d-button class="newProject-pl" @click="plNewPjVisable=true">
                新建项目
            </d-button>
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
            <el-table-column>
                <template #header>
                    <el-button class="sortB1" @click="clickSortB1">
                        项目名称
                        <el-icon v-if="arrow11"><ArrowUp/></el-icon>
                        <el-icon v-if="arrow1"><ArrowDown/></el-icon>
                    </el-button>
                </template>
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.projectName }}</span>
                    </div>
                </template>
            </el-table-column>
            <!--            <el-table-column>-->
            <!--                <template #header>-->
            <!--                    <el-button class="sortB2" @click="clickSortB2">-->
            <!--                        项目创建者-->
            <!--                        <el-icon :name="arrow2"></el-icon>-->
            <!--                    </el-button>-->
            <!--                </template>-->
            <!--                <template #default="scope">-->
            <!--                    <div style="display: flex; align-items: center">-->
            <!--                        <span>{{ scope.row.creator_name }}</span>-->
            <!--                    </div>-->
            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column>
                <template #header>
                    <el-button class="sortB2" @click="clickSortB2">
                        创建时间
                        <el-icon v-if="arrow21"><ArrowUp/></el-icon>
                        <el-icon v-if="arrow2"><ArrowDown/></el-icon>
                    </el-button>
                </template>
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.created_time }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column>
                <template #header>
                    <el-button class="sortB3" @click="clickSortB3">
                        最后修改时间
                        <el-icon v-if="arrow31"><ArrowUp/></el-icon>
                        <el-icon v-if="arrow3"><ArrowDown/></el-icon>
                    </el-button>
                </template>
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <span>{{ scope.row.updated_time }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" style="color:#9E9CF4;">
                <template #default="scope">
                    <div style="color:#9E9CF4;">
                        <d-button
                                class="copy"
                                size="small"
                                @click="copyProject(scope.$index, scope.row)"
                        >
                            复制项目
                        </d-button>
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
                    </div>
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
import {ArrowUp, ArrowDown} from "@element-plus/icons";
// import {color} from "vue-devui/types/color-picker/src/utils/color";
// import message from "@element-plus/icons/lib/Message";

export default {
    name: 'ProjectList',
    components: {ArrowUp, ArrowDown},
    computed: {
        ...mapState(['projectData']),
        // 其他 computed properties
    },

    setup() {
        const store = useStore();
        const user = store.state.user;
        const curTeamId = window.sessionStorage.getItem('curTeamId');
        const curProjectId = ref('');
        const plNewPjVisable = ref(false);
        const projectData = computed(() => {
            return store.state.projectData;
        });
        const newPjName = ref('');
        const newPjDes = ref('');

        const { fetchProjectList } = mapActions(['fetchProjectList']);
        const callFetchInProjectList = () => {
            console.log('PL', window.sessionStorage.getItem('curTeamId'));
            store.dispatch('fetchProjectList', window.sessionStorage.getItem('curTeamId'));
            console.log('PL检查', projectData);
        };
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
            callFetchInProjectList();
        };


        const isDropdownVisible = ref(false);

        // 操作

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

        const copyProject = (index, data) => {
            axios.post('/project/copy', {
                project_id: data.project_id
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        callFetchInProjectList();
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: '复制项目失败，请重试',
                        type: 'error'
                    });
                    console.log(error.config.data);
                })
        }

        // 排序

        const sortFlag = ref('0');
        const sortOption = ref('0');
        const arrow1 = ref(false);
        const arrow11 = ref(false);
        const arrow2 = ref(false);
        const arrow21 = ref(false);
        const arrow3 = ref(false);
        const arrow31 = ref(false);
        // const arrow4 = ref('');
        const clickSortB1 = () => {
            // 处理flag
            if (!(sortFlag.value === 2)) {
                sortFlag.value = 2;
                sortOption.value = 0;
                arrow1.value = true;
                arrow11.value = !arrow1.value;
                arrow2.value = false;
                arrow21.value = false;
                arrow3.value = false;
                arrow31.value = false;
            }
            else {
                sortOption.value = (sortOption.value + 1) % 2;
                arrow11.value = arrow1.value;
                arrow1.value = !arrow1.value;
            }
            axios.post('/project/order', {
                team_id: window.sessionStorage.getItem('curTeamId'),
                type: sortFlag.value,
                option: sortOption.value
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        store.commit('setProjectData', response.data.projects);
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: "排序错误，请重试",
                        type: 'error'
                    });
                    console.log(error.config.data);
                    console.log(error.data);
                })
        };
        const clickSortB2 = () => {
            // 处理flag
            if (!(sortFlag.value === 0)) {
                sortFlag.value = 0;
                sortOption.value = 0;
                arrow1.value = false;
                arrow11.value = false;
                arrow2.value = true;
                arrow21.value = !arrow2.value;
                arrow3.value = false;
                arrow31.value = false;
            }
            else {
                sortOption.value = (sortOption.value + 1) % 2;
                arrow2.value = !arrow2.value;
                arrow21.value = !arrow2.value;
            }
            axios.post('/project/order', {
                team_id: window.sessionStorage.getItem('curTeamId'),
                type: sortFlag.value,
                option: sortOption.value
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        store.commit('setProjectData', response.data.projects);
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: "排序错误，请重试",
                        type: 'error'
                    });
                    console.log(error.config.data);
                    console.log(error.data);
                })
        };
        const clickSortB3 = () => {
            // 处理flag
            if (!(sortFlag.value === 1)) {
                sortFlag.value = 1;
                sortOption.value = 0;
                arrow1.value = false;
                arrow11.value = false;
                arrow2.value = false;
                arrow21.value = false;
                arrow3.value = true;
                arrow31.value = !arrow3.value;
            }
            else {
                sortOption.value = (sortOption.value + 1) % 2;
                arrow3.value = !arrow3.value;
                arrow31.value = !arrow3.value;
            }
            axios.post('/project/order', {
                team_id: window.sessionStorage.getItem('curTeamId'),
                type: sortFlag.value,
                option: sortOption.value
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        store.commit('setProjectData', response.data.projects);
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: "排序错误，请重试",
                        type: 'error'
                    });
                    console.log(error.config.data);
                    console.log(error.data);
                })
        };
        // const clickSortB1 = (1) => {
        //
        // };

        //搜索
        const selectedOption = ref(null);
        const options = ref([
            "区分大小写",
            "不区分大小写"
        ]);
        const placeholder = ref('大小写');

        const checkType = ref(1);
        const toggleDropdown = () => {
            isDropdownVisible.value = !isDropdownVisible.value;
        };

        const selectOption = (option) => {
            if (isDropdownVisible.value === true) {
                selectedOption.value = option;
                if (option === "区分大小写") {
                    checkType.value = 0;
                }
                else {
                    checkType.value = 1;
                }
                isDropdownVisible.value = false;
            }
        };

        const selectInputValue = ref('');
        const selectFor = (newValue) => {
            selectInputValue.value = newValue;
            console.log('检查输入', selectInputValue.value, newValue);
            axios.post('/project/find', {
                team_id: Number(window.sessionStorage.getItem('curTeamId')),
                key_word: selectInputValue.value,
                options: checkType.value
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        store.commit('setProjectData', response.data.projects);
                    }
                    else {
                        ElMessage({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: "查询失败，请重试",
                        type: 'error'
                    });
                    console.log(error.config.data);
                    console.log(error.data);
                })
        }

        const openDelete = () => {
            deleteTable.value = true;
            axios.post('/project/recyclebin', {
                team_id: Number(window.sessionStorage.getItem('curTeamId'))
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage ({
                            message: response.data.message,
                            type: 'success'
                        });
                        deletedData.value = response.data.recycle_bin;
                    }
                    else {
                        ElMessage ({
                            message: response.data.error,
                            type: 'error'
                        });
                        console.log(response.config.data);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    ElMessage ({
                        message: '访问回收站失败，请重试',
                        type: 'error'
                    });
                    console.log(error.config.data);
                    console.log(error.data);
                })
        }

        const deleteTable = ref(false);

        const checkedDelete = ref([]);

        const deletedData = ref([]);


        const pullAllBack = async () => {
            console.log("选中的行数据：", deletedData.value);
            try {
                for (let i = 0; i < deletedData.value.length; i++) {
                    const response = await axios.post('/project/recycle', {
                        project_id: deletedData.value[i].project_id
                    });

                    if (response.data.code === 200) {
                        console.log("恢复", deletedData.value[i].projectName, "成功");
                    } else {
                        ElMessage({
                            message: "恢复至" + deletedData.value[i].projectName + "时失败",
                            type: 'error'
                        });
                        console.log("恢复至", deletedData.value[i].projectName, "时失败");
                        console.log(response.config.data);
                        console.log(response.data);
                        return; // Exit the function early if there's an error
                    }
                }

                ElMessage({
                    message: "恢复成功",
                    type: 'success'
                });

                callFetchInProjectList();
            } catch (error) {
                ElMessage({
                    message: "恢复时发生错误",
                    type: 'error'
                });
                console.log(error.config.data);
                console.log(error.data);
            } finally {
                checkedDelete.value = [];
                deleteTable.value = false;
            }
        }

        const pullBack = async () => {
            const selectedRows = deletedData.value.filter(row => row.checked);
            console.log("选中的行数据：", selectedRows[0]);

            try {
                for (let i = 0; i < selectedRows.length; i++) {
                    const response = await axios.post('/project/recycle', {
                        project_id: selectedRows[i].project_id
                    });

                    if (response.data.code === 200) {
                        console.log("恢复", selectedRows[i].projectName, "成功");
                    } else {
                        ElMessage({
                            message: "恢复至" + selectedRows[i].projectName + "时失败",
                            type: 'error'
                        });
                        console.log("恢复至", selectedRows[i].projectName, "时失败");
                        console.log(response.config.data);
                        console.log(response.data);
                        return; // Exit the function early if there's an error
                    }
                }

                ElMessage({
                    message: "恢复成功",
                    type: 'success'
                });

                callFetchInProjectList();
            } catch (error) {
                ElMessage({
                    message: "恢复时发生错误",
                    type: 'error'
                });
                console.log(error.config.data);
                console.log(error.data);
            } finally {
                checkedDelete.value = [];
                deleteTable.value = false;
            }
        }

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
            isDropdownVisible,
            selectedOption,
            options,
            placeholder,
            sortFlag,
            sortOption,
            arrow1,
            arrow11,
            arrow2,
            arrow21,
            arrow3,
            arrow31,
            clickSortB1,
            clickSortB2,
            clickSortB3,

            checkType,
            toggleDropdown,
            selectOption,

            createNewProject,
            fetchProjectList,
            callFetchInProjectList,
            // callCreatNewProject,
            handleEdit,
            handleDelete,
            copyProject,

            selectInputValue,
            selectFor,

            openDelete,
            deleteTable,
            checkedDelete,
            deletedData,
            pullAllBack,
            pullBack
        };
    },
};
</script>

<style scoped>
.sortB1,
.sortB2,
.sortB3,
.sortB4
{
    width: 100%;
    height: 100%;
    border: hidden;
    color: #9E9CF4;
    background-color: white;
}
.sortB1:active,
.sortB2:active,
.sortB3:active,
.sortB4:active
{
    width: 100%;
    height: 100%;
    border: hidden;
    background-color: rgba(126, 124, 203, 0.34);
    color: rgba(126, 124, 203, 0.34);
}
.sortB1:hover,
.sortB2:hover,
.sortB3:hover,
.sortB4:hover
{
    width: 100%;
    height: 100%;
    border: hidden;
    background-color: rgba(158, 156, 244, 0.26);
    color: #7E7CCB;
}
.sortB1:focus,
.sortB2:focus,
.sortB3:focus,
.sortB4:focus
{
    width: 100%;
    height: 100%;
    border: hidden;
    background-color: rgba(126, 124, 203, 0.3);
    color: #7E7CCB;
}

.selevt-input {
    height: 35px;
    width: 130px;
    border-radius: 4px; /* 添加圆角半径 */
    margin-right: 5px;
    align-items: center;
}

.button-select {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-end; /* Right-align the items */
    margin-right: 5px;
}

.selected-button {
    /*padding: 8px 12px;*/
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px; /* 添加圆角半径 */
    height: 35px;
    width: 85px;

}

.dropdown {
    position: absolute;
    margin-top: 3px;
    top: 100%;
    left: 0;
    width: 120px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 4px; /* 添加圆角半径 */
    max-height: 150px; /* 设置最大高度 */
    overflow-y: auto; /* 设置纵向滚动 */
    z-index: 2; /* 设置较高的 z-index 值 */
}

.dropdown::-webkit-scrollbar {
    width: 8px; /* 滚动条宽度 */
}

.dropdown::-webkit-scrollbar-thumb {
    background-color: rgba(204, 204, 204, 0.24); /* 滚动条 thumb 颜色 */
    border-radius: 4px; /* thumb 圆角 */
}

.option-button {
    display: flex;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-align: left;
    border-radius: 4px; /* 添加圆角半径 */
}

.option-button:hover {
    background-color: #f5f5f5;
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
    height: 650px;
    width: 100%;
}

.table-container-pl {
    margin-top: -10px;
    margin-bottom: 30px;
    z-index: 1; /* 设置较低的 z-index 值 */
}

.flex-container-pl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;}

.align-right-pl {
    display: flex;
    margin-left: auto;
    align-items: center;
    white-space: nowrap;
    flex-wrap: nowrap;
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
    display: inline-flex;
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

.selevt-input {
    height: 35px;
    width: 150px;
}

</style>