<template>
  <div class="layout">
    <el-container class="el-body" style="height: 100%">
      <el-container style="height: 100%">
        <el-aside width="13vw" height="93vh" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
          <CommonAside></CommonAside>
        </el-aside>
        <el-main style="height: 100%">
          <el-row style="height: 100%">
            <el-col :span="8" style="width: 40%; display: flex; flex-direction: column; height: 100%"><div class="left" />
              <el-card class="project"  style="flex: 1; width: 90%; padding: 20px">
                <div class="projectshow">
                  <img src="../assets/project.png" alt="">
                  <div class="projectinfo">
                    <div class="projectname">{{project_name}}</div>
                    <div class="projectteam">{{team_name}}</div>
                  </div>
                </div>
                <div class="projectmessage">
                  <p>项目创建时间：<span>{{created_time}}</span></p>
                  <p>项目简介:<span>{{project_description}}</span></p>
                </div>
              </el-card>

              <el-card class="members" style="width: 90%; flex: 1; padding: 20px">
                <el-table :data="staff" stripe style="align: center; display: flex; flex: 1" height='280'>
                  <el-table-column prop="nickname" label="成员昵称" width="180" align="center"/>
                  <el-table-column prop="name" label="成员名" width="180" align="center"/>
<!--                  <el-table-column prop="email" label="邮箱" />-->
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="16" style="height: 100%">
              <div class="line">
                <el-breadcrumb separator="/" style="max-width: 95%; margin-left: 43px; margin-bottom: 10px; display: flex; align-content: center; font-size: 18px">
                  <el-breadcrumb-item @click="getdocslist">{{ rooter }}</el-breadcrumb-item>
                  <el-breadcrumb-item v-if="lengthEnough" @click="gotoFile" style="pointer-events: none">
                    <a href="/">
                      {{ fileName }}
                    </a>
                  </el-breadcrumb-item>
                </el-breadcrumb>

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


              </div>

              <d-modal v-model="plNewPjVisable">
                <template #header>
                  <d-modal-header>
                    <!--                <d-icon name="like"></d-icon>-->
                    <span>新建{{titleNew}}</span>
                  </d-modal-header>
                </template>

                <!--                <div class="text">昵称：</div>-->
                <div class="pl-div-input-d">
                  <el-input
                          v-model="newPjName"
                          placeholder=文件名
                          clearable
                          class="pl-input-d"
                  />
                  <!--                @input="cNewPjDes"-->
                </div>

                <template #footer>
                  <d-modal-footer class="pl-button-container-d" style="text-align: right; padding-right: 20px;">
                    <d-button class="pl-button-d-i" @click="createNewDoc">确认</d-button>
                    <d-button class="pl-button-d-c" @click="plNewPjVisable=false; newPjName=''">取消</d-button>
                  </d-modal-footer>
                </template>
              </d-modal>



              <el-card class="docslist" >
                <el-table :data="docs" stripe style="left:10px; width: 95%;" height='600' center>
                  <el-table-column fixed prop="id" label="文档id" width="100" >
                  </el-table-column>
                  <el-table-column prop="name" label="文档名" width="160">
                  </el-table-column>
                  <el-table-column label="是否为文件夹" width="160" >
                    <template #default="scope">
                      {{ isFolder(scope.row) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_time" label="创建时间" width="220">
                  </el-table-column>
                  <el-table-column prop="update_time" label="更新时间" width="220">
                  </el-table-column>
                  <el-table-column prop="option" label="选择" width="180">
                    <template #default="scope">
                      <el-button link type="primary" size="small" @click="docsedit(scope.row)">Edit</el-button>
                      <el-button link type="primary" size="small" @click="docsdelete(scope.row)">Delete</el-button>
                      <el-icon v-if="!scope.row.is_folder" size="18" style="margin-left: 7px; margin-top: 7px" @click="openHistory(scope.row)"><Clock /></el-icon>
                    </template>
                  </el-table-column>
                </el-table>


                <d-modal v-model="showHistory" style="display: inline-block; max-width: 100%; width: 650px; height: 450px">
                  <template #header>
                    <d-modal-header>
                      <span>历史版本</span>
                    </d-modal-header>
                  </template>

                  <el-table class="table-pl" :data="historyData" style="width: 100%; height: 370px" stripe="true" fit="true">
                    <el-table-column>
                      <template #header>
                          版本编号
                      </template>
                      <template #default="scope">
                        <div style="display: flex; align-items: center">
                          <span>{{ scope.row.history_id }}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column>
                      <template #header>
                          编辑时间
                      </template>
                      <template #default="scope">
                        <div style="display: flex; align-items: center">
                          <span>{{ scope.row.update_time }}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" style="color:#9E9CF4;">
                      <template #default="scope">
                        <div style="color:#9E9CF4;">
                          <d-button
                                  class="copy"
                                  size="small"
                                  @click="pullBack(scope.$index, scope.row)"
                          >
                            版本回溯
                          </d-button>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </d-modal>


              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue";
import {onMounted, ref, computed} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
export default {

  components: {
    CommonAside
  },


  setup () {
    // const project_id = ref('');
    const fileName = ref('');
    const lengthEnough = ref(false);
    const staff = ref([]);
    const created_time =ref('');
    const project_description = ref('');
    const project_name = ref('');
    const team_id = ref('');
    const team_name = ref('');
    const docs = ref([]);
    const file = ref([]);
    const rooter = ref('');
    const titleNew = ref('');

    const showHistory = ref(false);
    const historyData = ref([]);
    // const historyData = [
    //   {
    //     "history_id": 2,
    //     "update_time": "2023-09-02T12:47:13.219Z",
    //     "content": "11111111111111111111\n11111111111"
    //   },
    //   {
    //     "history_id": 2,
    //     "update_time": "2023-09-02T12:47:13.219Z",
    //     "content": "11111111111111111111\n11111111111"
    //   },
    //   {
    //     "history_id": 2,
    //     "update_time": "2023-09-02T12:47:13.219Z",
    //     "content": "11111111111111111111\n11111111111"
    //   },
    // ]
    const currFileId = ref('');
    const openHistory = (data) => {
      showHistory.value = true;
      axios.post('/doc/history', {
        doc_id: data.id
      })
              .then((response) => {
                if(response.data.code === 200) {
                  // ElMessage({
                  //   message: response.data.message,
                  //   type: 'success'
                  // });
                  historyData.value = response.data.history;
                  console.log(historyData.value)
                  historyData.value.forEach(item => {
                    item.checked = false;
                  });
                  currFileId.value = data.id;
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
                  message: "获取版本数据错误，请重试",
                  type: 'error'
                });
                console.log(error.config.data);
                console.log(error.data);
              })
    }

    const pullBack = (index, data) => {
      axios.post('/doc/back', {
        history_id: data.history_id
      })
              .then((response) => {
                if(response.data.code === 200) {
                  // ElMessage({
                  //   message: response.data.message,
                  //   type: 'success'
                  // });
                  router.push(`/documentadd/${currFileId.value}`);
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
                  message: "获取版本数据错误，请重试",
                  type: 'error'
                });
                console.log(error.config.data);
                console.log(error.data);
              })
    }
    const refresh = () => {
      location.reload();
    }

    const isFolder = (row) => {
      return (row.is_folder === 1) ? '是' : '否';
    }

    const getdocslist = () => {
      lengthEnough.value = false;
      window.sessionStorage.setItem('curFolderId', 0);
      window.sessionStorage.setItem('curFolderName', window.sessionStorage.getItem('curProjectName'));
      axios.post('/doc/root', {
        "project_id": Number(window.sessionStorage.getItem('curProjectId')),
      })
              .then((response)=>{
                console.log(response.data.docs);
                if(response.data.code === 200)
                {
                  console.log(response.data);
                  docs.value = response.data.docs;
                  console.log(docs.value);
                  console.log(docs);
                }
              })
              .catch((error)=>{
                ElMessage({
                  message: "获取文档错误，请重试",
                  type: 'error'
                });
                console.log(error.config.data);
                console.log(error.data);
              })
    }
    const getprojectmessage = () => {
      rooter.value = window.sessionStorage.getItem('curProjectName');
      axios.post('/project/search',{
                "project_id": Number(window.sessionStorage.getItem('curProjectId')),
              }
      )
              .then((response)=>{
                        console.log(response.data.project_name);
                        console.log(response.data.project_description);
                        console.log(response.data.created_time);
                        created_time.value=response.data.created_time;
                        project_description.value=response.data.project_description;
                        project_name.value=response.data.project_name;
                        team_id.value=response.data.team_id;
                        console.log("tid", team_id.value);

                        console.log("tid",team_id.value)
                        axios.post('/team/seemember',
                                {
                                  "team_id":team_id.value,
                                }
                        )
                                .then((response2)=>{
                                          console.log(response2.data);
                                          console.log(team_id);
                                          staff.value=response2.data.res;
                                          console.log(staff.value);
                                        }
                                )
                                .catch((error2)=>{
                                  ElMessage({
                                    message: "获取队员信息错误，请重试",
                                    type: 'error'
                                  });
                                  console.log(error2.config.data);
                                  console.log(error2.data);
                                })

                      }
              )
              .catch((error)=>{
                ElMessage({
                  message: "获取项目信息错误，请重试",
                  type: 'error'
                });
                console.log(error.config.data);
                console.log(error.data);
              })

    }

    const deleteFile = (row) => {
      axios.post('/doc/delete',
    {
      "doc_id": row.id,
      "folder_id": Number(window.sessionStorage.getItem('curFolderId'))
    })
    .then((response) => {
      if (response.data.code === 200) {
        ElMessage({
          message: response.data.message,
          type: 'sucess'
        });
        console.log(response.config.data);
        console.log(response.data);
        if (lengthEnough.value) {
          axios.post('/doc/folder/docs', {
            folder_id: Number(window.sessionStorage.getItem('curFolderId'))
          })
        .then((response2) => {
          if (response2.data.code === 200) {
            // ElMessage ({
            //   message: response2.data.message,
            //   type: 'success'
            // });
            docs.value = response2.data.docs;
          }
          else {
            ElMessage ({
              message: response2.data.error,
              type: 'error'
            });
            console.log(response2.config.data);
            console.log(response2.data);
          }
        })
        .catch((error2) => {
          ElMessage ({
            message: "打开文件夹失败，请重试",
            type: 'error'
          });
          console.log(error2.config.data);
          console.log(error2.data);
        })
        }
        else
          getdocslist();
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
        message: "删除文件失败，请重试",
        type: 'error'
      });
      console.log(error.config.data);
      console.log(error.data);
    })
    }

    const deleteFolder = (row) => {
      axios.post('/doc/folder/delete', {
        folder_id: row.id
      })
    .then((response) => {
      if (response.data.code === 200) {
        // ElMessage({
        //   message: response.data.message,
        //   type: 'success'
        // });
        console.log(response.config.data);
        console.log(response.data);
        getdocslist();
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
        message: "删除文件夹失败，请重试",
        type: 'error'
      });
      console.log(error.config.data);
      console.log(error.data);
    })
    }

    const docsdelete = (row) => {
      if (row.is_folder === 1) {
        console.log('删除文件夹')
        deleteFolder(row);
      }
      else {
        deleteFile(row);
      }
    }

    const docsedit = (row) => {
      console.log("是否是文件夹", row.is_folder);
      if (row.is_folder === 1) {
        console.log("进入if")
        // 记录文件夹名称和id，打开文件夹
        lengthEnough.value = true;
        window.sessionStorage.setItem('curFolderId', row.id);
        window.sessionStorage.setItem('curFolderName', row.name);
        fileName.value = row.name;
        axios.post('/doc/folder/docs', {
          folder_id: row.id
        })
                .then((response) => {
                  if (response.data.code === 200) {
                    // ElMessage({
                    //   message: response.data.message,
                    //   type: 'success'
                    // });
                    console.log("进入文件夹")
                    docs.value = response.data.docs;
                    fileName.value = row.name;
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
                    message: "打开失败，请重试",
                    type: 'error'
                  });
                  console.log(error.config.data);
                  console.log(error.data);
                })
      }
      else {
        window.sessionStorage.setItem('curDocId', row.id);
        // window.sessionStorage.setItem('curDocName', row.name);
        router.push(`/documentadd/${row.id}`);
      }
    }

    const gotoFile = () => {
      let a = 1;
      // nothing infect
    }


    const plNewPjVisable = ref(false);

    const isDropdownVisible = ref(false);
    const selectedOption = ref(null);
    const options = computed(() => {
      if (lengthEnough.value === true) {
        return ["文件"];
      }
      else {
        return [
          "文件",
          "文件夹"
        ];
      }
    })
    const placeholder = ref('新建');

    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    const creatType = ref('');

    const createNewDoc = () => {
      const Type = ref('');
      if (creatType.value) {
        Type.value = '';
      }
      else {
        Type.value = Number(window.sessionStorage.getItem('curFolderId'));
      }
      if (creatType.value) {
        axios.post('/doc/folder/create',{
          folder_name: newPjName.value,
          project_id: Number(window.sessionStorage.getItem('curProjectId')),
        })
                .then((response) => {
                  if (response.data.code === 200) {
                    // ElMessage({
                    //   message: response.data.message,
                    //   type: 'success'
                    // });
                    docsedit(response.data);
                    console.log(response.data);
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
                    message: "创建文件夹失败，请重试",
                    type: 'error'
                  });
                  console.log(error.config.data);
                  console.log(error.data);
                })
      }
      else {
        axios.post('/doc/create', {
          doc_name: newPjName.value,
          project_id: Number(window.sessionStorage.getItem('curProjectId')),
          folder: Type.value
        })
                .then((response) => {
                  console.log('进入then')
                  if (response.data.code === 200) {
                    console.log("进入if")
                    // ElMessage({
                    //   message: response.data.message,
                    //   type: 'success'
                    // });
                    console.log("通过message")
                    docsedit(response.data);
                    console.log("通过docsedit")
                    console.log(response.data);
                    console.log(response.config.data);
                    console.log(response.data);
                    console.log("离开if")
                  }
                  else {
                    console.log("进入else")
                    ElMessage({
                      message: response.data.error,
                      type: 'error'
                    });
                    console.log(response.config.data);
                    console.log(response.data);
                    console.log("离开else")

                  }
                })
                .catch((error) => {
                  console.log('进入catch')
                  ElMessage({
                    message: "创建文件失败，请重试",
                    type: 'error'
                  });
                  console.log(error.config);
                  console.log(error.data);
                })
      }
      plNewPjVisable.value = false;
    }

    const newPjName = ref('');
    const selectOption = (option) => {
      if (isDropdownVisible.value === true) {
        selectedOption.value = option;
        // 打开弹窗
        titleNew.value = option;
        console.log("看名字", titleNew.value);
        creatType.value = (option === "文件夹");
        plNewPjVisable.value = true;
        isDropdownVisible.value = false;
      }
    };

    onMounted(()=>{
      getdocslist()
      getprojectmessage()
    })

    return {
      showHistory,
      historyData,
      currFileId,
      openHistory,
      pullBack,

      selectedOption,
      options,
      placeholder,
      toggleDropdown,
      selectOption,
      isDropdownVisible,
      createNewDoc,

      docs,
      staff,
      team_id,
      created_time,
      project_description,
      project_name,
      team_name,
      fileName,
      lengthEnough,
      file,
      rooter,
      plNewPjVisable,
      titleNew,
      newPjName,

      isFolder,
      refresh,
      getdocslist,
      docsdelete,
      docsedit,
      gotoFile
    }
  }
}
</script>

<style scoped>
.projectinfo {
  width: 70%;
}

.line {
  display: flex;
}

.p {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.left{
  padding-right: 40px;
}

.projectshow {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

.projectshow img {
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
}
.projectshow .projectname {
  font-size: 32px;
  margin-bottom: 10px;
}

.projectshow .projectteam {
  color: #999999;
}

.projectmessage p{
  line-height: 28px;
  font-size: 14px;
  color: #999999;
}

.members {
  margin-top: 30px;
}
.docslist {
  margin-left: 40px;
  padding: 20px;
  width: 90%;
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
  width: 80px;
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

.button-select {
  display: flex;
  margin-left: auto;
  align-items: center;
  white-space: nowrap;
  flex-wrap: nowrap;
  margin-bottom: 10px;
}

.layout {
  height: 93vh;
}
.el-body {
  height: 93vh;
}

</style>