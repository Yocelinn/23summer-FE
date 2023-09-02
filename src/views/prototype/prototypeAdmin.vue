<template>
    <div class="layout">
      <el-container class="el-body" style="height: 100%">
        <el-container style="height: 100%">
          <el-aside width="180px" height="93vh" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
            <adminMenu></adminMenu>
          </el-aside>
          <el-main style="height: 100%">
            <el-row style="height: 100%">
              <el-col :span="8" style="width: 40%; display: flex; flex-direction: column; height: 100%">
                <el-card class="project">
                  <div class="projectshow">
                    <img src="@/assets/project.png" >
                    <div class="projectinfo">
                      <div class="projectname">项目名：{{project_name}}</div>
                      <div class="projectteam">团队名：{{team_name}}</div>
                    </div>
                  </div>
                  <div class="projectmessage">
                    <p>项目创建时间：{{ formatTime(created_time) }} </p>
                    <p>项目简介:    {{ project_description }} </p>
                  </div>
                </el-card>
  
                <el-card class="members" >
                  <el-table :data="staff" stripe style="align: center; display: flex; flex: 1" height='280'>
                    <el-table-column prop="nickname" label="成员昵称" width="180" align="center"/>
                    <el-table-column prop="name" label="成员名" width="180" align="center"/>
                  </el-table>
                </el-card>
              </el-col>
              <el-col :span="16" style="height: 100%">
                <div class="line">  
                  <div class="button-select">
                    <button class="selected-button" @click="createVisible = true">新建原型</button>                    
                  </div>
                </div>

                <el-card class="datalist" >
                  <el-table :data="prototype_list" stripe style="left:10px; width: 95%;" height='600' center>
                    <el-table-column fixed prop="prototypeId" label="原型id" width="100" >
                    </el-table-column>
                    <el-table-column prop="prototypeName" label="原型名" width="160">
                    </el-table-column>
                    <el-table-column prop="creator_name" label="创建者" width="160">
                    </el-table-column>
                    <el-table-column prop="created_time" label="创建时间" width="220">
                      <template #default="scope">
                        <span> {{formatTime(scope.row.created_time)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="last_modify_time" label="更新时间" width="220">
                      <template #default="scope">
                        <span> {{formatTime(scope.row.last_modify_time)}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="option" label="选择" width="180">
                      <template #default="scope">
                        <el-button link type="primary" size="small" @click="openRename(scope.row)">Rename</el-button>
                        <el-button link type="primary" size="small" @click="openPages(scope.row)">Open</el-button>
                        <el-button link type="primary" size="small" @click="deletePrototype(scope.row)">Delete</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-col>
            </el-row>

            <el-dialog v-model="createVisible" title="新建原型" width="500px">
              <el-form-item label="原型名称">
                <el-input v-model="prototype_name"></el-input>
              </el-form-item>
              <template #footer>
                <el-button type="primary" @click="chooseModelVisible = true">使用模板创建原型</el-button>
                <el-button color="#ca96ff" @click="createPrototye">确认</el-button>
                <el-button @click="createVisible = false">取消</el-button>
              </template>
            </el-dialog>
            <el-dialog v-model="chooseModelVisible" title="选择原型模板" width="500px">
              <el-select v-model="model_type" placeholder="请选择原型模板">
                <el-option
                  v-for="item in models"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <template #footer>
                <el-button color="#ca96ff" @click="useModel">确认</el-button>
                <el-button @click="chooseModelVisible = false">取消</el-button>
              </template>
            </el-dialog>
            <el-dialog v-model="renameVisible" title="重命名原型" width="500px">
              <el-form-item label="原型名称">
                <el-input v-model="prototype_rename"></el-input>
              </el-form-item>
              <template #footer>
                <el-button color="#ca96ff" @click="renamePrototype()">确认</el-button>
                <el-button @click="renameVisible = false">取消</el-button>
              </template>
            </el-dialog>
            <el-dialog v-model="pagesVisible" title="原型内容" width="800px">
              <el-table :data="page_list" stripe height="400">
                <el-table-column prop="page_id" label="页面id" width="80" >
                </el-table-column>
                <el-table-column prop="pageName" label="页面名称" width="200">
                </el-table-column>
                <el-table-column prop="creator_name" label="创建者" width="160">
                </el-table-column>
                <el-table-column prop="created_time" label="创建时间" width="160">
                  <template #default="scope">
                    <span> {{formatTime(scope.row.created_time)}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="option" label="操作" width="180">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="openRenamePage(scope.row)">Rename</el-button>
                    <el-button link type="primary" size="small" @click="openOnePage(scope.row)">Open</el-button>
                    <el-button link type="primary" size="small" @click="deletePage(scope.row)">Delete</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <template #footer>
                <el-button color="#ca96ff" @click="createPageVisible = true">创建页面</el-button>
                <el-button @click="pagesVisible = false">关闭</el-button>
              </template>
            </el-dialog>
            <el-dialog v-model="createPageVisible" title="新建页面" width="500px">
              <el-form-item label="页面名称">
                <el-input v-model="newPageName"></el-input>
              </el-form-item>
              <el-form-item label="页面尺寸">
                <el-select v-model="page_size" placeholder="请选择页面尺寸">
                  <el-option
                    v-for="item in options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <template #footer>
                <el-button color="#ca96ff" @click="createPage">确认</el-button>
                <el-button @click="createPageVisible = false">取消</el-button>
              </template>
            </el-dialog>
            <el-dialog v-model="renamePageVisible" title="重命名页面" width="500px">
              <el-form-item label="页面名称">
                <el-input v-model="newPageName"></el-input>
              </el-form-item>
              <template #footer>
                <el-button color="#ca96ff" @click="renamePage()">确认</el-button>
                <el-button @click="renamePageVisible = false">取消</el-button>
              </template>
            </el-dialog>

          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from "vue";
  import axios from "axios";
  import {ElMessage} from "element-plus";
  import router from "@/router";
  import adminMenu from "./adminMenu.vue";
  import { useStore, mapState } from 'vuex'

  export default {
    components: { adminMenu },
    computed: {
        ...mapState(['pageData']),
        // 其他 computed properties
    },
    setup () {
      const store = useStore()
      // 项目内容
      const project_id = Number(window.sessionStorage.getItem('curProjectId'))
      const createVisible = ref(false)
      const lengthEnough = ref(false);
      const staff = ref([]);
      const created_time =ref('');
      const project_description = ref('');
      const project_name = ref('');
      // 团队内容
      const team_id = ref('');
      const team_name = window.sessionStorage.getItem('curTeamName');
      const rooter = ref('');
      // 原型内容    
      const prototype_name = ref('');
      const prototype_rename = ref('')
      // prototype_cur_row是选中的当前行，是原型对象
      const prototype_cur_row = ref({})
      // prototype_id 是创建原型成功的返回值
      const prototype_id = ref('')
      const prototype_list = ref([])
      const renameVisible = ref(false)
      // 原型中的页面内容
      const pagesVisible = ref(false)
      const page_list = ref([])
      const createPageVisible = ref(false)
      const page_cur_row = ref({})
      const renamePageVisible = ref(false)
      const newPageName = ref('')
      const newPageSize = ref({})
      const page_size = ref('')
      const options = [
      {
        value: 'iphone',
        label: 'iPhone 11 (414×896)',
      },
      {
        value: 'web',
        label: '网页 (1024×768)',
      },
      {
        value: 'ipad',
        label: 'iPad mini (768×1024)',
      },
      {
        value: 'Huawei',
        label: 'Huawei P40 (395×856)',
      },
      ]
      const model_type = ref('')
      const chooseModelVisible = ref(false)
      const models = [
        {
          value: 'aca',
          label: '学术原型模板',
        },
        {
          value: 'mart',
          label: '商城模板',
        },
      ]

      const getPrototypeList = () => {
        axios.post('/prototype/info', {
          "project_id": project_id
        }).then( (response) => {
          if(response.data.code === 200) {
            prototype_list.value = response.data.prototypes
            console.log(prototype_list.value)
            // console.log('***************************')
            // console.log(response)
          }
        })
      }
      const getprojectmessage = () => {
        rooter.value = window.sessionStorage.getItem('curProjectName');
        axios.post('/project/search',{
          "project_id": Number(window.sessionStorage.getItem('curProjectId')),
        })
        .then((response)=>{
            // console.log(response.data.project_name);
            // console.log(response.data.project_description);
            // console.log(response.data.created_time);
            created_time.value=response.data.created_time;
            project_description.value=response.data.project_description;
            project_name.value=response.data.project_name;
            team_id.value=response.data.team_id;
            axios.post('/team/seemember',{
                  "team_id":team_id.value,
                }
            ).then((response)=>{
                console.log(response.data);
                console.log(team_id);
                staff.value=response.data.res;
              }
            ).catch((error) => {
              console.log(error)
            })
          }
        ).catch((error) => {
          console.log(error)
        })
      }
      const deletePrototype = (row) => {
        axios.post('/prototype/delete', {
          "prototype_id": row.prototypeId
        }).then((response) => {
          console.log(response.data)
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            getPrototypeList()
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "删除原型失败，请重试",type: 'error' });
          console.log(error)
        })
      }
      const openRename = (row) => {
        renameVisible.value = true
        prototype_cur_row.value = row
      }
      const renamePrototype = () => {
        axios.post('/prototype/rename', {
          "prototype_id": prototype_cur_row.value.prototypeId,
          "prototypeName": prototype_rename.value
        }).then((response) => {
          console.log(response.data)
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            getPrototypeList()
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "重命名失败，请重试",type: 'error' });
          console.log(error)
        })
        renameVisible.value = false
      }
      const openPages = (row) => {   
        // 这个cur_row需要传给对于页面的操作，判断prototype_id
        prototype_cur_row.value = row
        axios.post('/prototype/page/info', {
          "prototype_id": row.prototypeId,
        }).then((response) => {
          console.log(response.data)
          if(response.data.code === 200) {
            page_list.value = response.data.pages
            page_list.value.created_time = formatTime(page_list.value.created_time)
            console.log(page_list.value)
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "打开原型失败，请重试",type: 'error' });
          console.log(error)
        })
        pagesVisible.value = true
      }
      const openOnePage = (row) => {
        if(row.component !== "{}" && row.component != "[]") {
          console.log('11111')
          localStorage.setItem('data', row.component)
        } else {  // else 说明该文件为空,不能从localStorage读值
          console.log('22222')
          localStorage.setItem('data', null)
        }
        console.log(typeof(row.component))
        console.log(JSON.stringify(row.component))
        console.log(localStorage.getItem('data'))
        localStorage.setItem('curDesignPage', row.page_id)
        console.log(row.page_id)
        router.push('/designPage')
      }
      const createPage = () => {
        if(page_size.value === 'iphone') {
          newPageSize.value = { width: 414, height: 896 }
        } else if( page_size.value === 'web' ) {
          newPageSize.value = { width: 1024, height: 768 }
        } else if( page_size.value === 'ipad' ) {
          newPageSize.value = { width: 768, height: 1024 }
        } else if( page_size.value === 'Huawei' ) {
          newPageSize.value = { width: 395, height: 856 }
        }
        // 对于editor的处理是，检查store.state.pageData的内容，若有，则不从localStorage读取，而是初始化
        store.commit('setPageData',newPageSize)
        // console.log(newPageSize)
        // console.log(store.state.pageData)

        axios.post('/prototype/page/create', { 
          "page_name": newPageName.value,
          "prototype_id": prototype_cur_row.value.prototypeId 
        }).then( (response) => {
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            router.push('/designPage')
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "新建页面失败，请重试",type: 'error' });
          console.log(error)
        })
        createPageVisible.value = false
      }
      const deletePage = (row) => {
        axios.post('/prototype/page/delete', { 
          "page_id": row.page_id
        }).then( (response) => {
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            openPages(prototype_cur_row.value)
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "删除页面失败，请重试",type: 'error' });
          console.log(error)
        })
      }
      const openRenamePage = (row) => {
        renamePageVisible.value = true
        page_cur_row.value = row
      }
      const renamePage = () => {
        axios.post('/prototype/page/rename', {
          "page_id": page_cur_row.value.page_id,
          "new_name": newPageName.value
        }).then((response) => {
          console.log(response.data)
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            openPages(prototype_cur_row.value)
          } else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "重命名失败，请重试",type: 'error' });
          console.log(error)
        })
        renamePageVisible.value = false
      }
      
      const createPrototye = () => {
        axios.post('/prototype/create', {
          "project_id": project_id,
          "team_id": team_id.value,
          "name": prototype_name.value
        }).then((response) =>{
          if(response.data.code === 200) {
            ElMessage({ message: response.data.message, type: 'success' });
            prototype_id.value = response.data.prototype_id
            createVisible.value = false
            getPrototypeList()
          }else {
            ElMessage({ message: response.data.error, type: 'error' });
          }
        }).catch((error) => {
          ElMessage({ message: "创建原型失败，请重试", type: 'error' });
          console.log(error);
        })
      }
      const useModel = () => {
        if(prototype_name.value == '') {
          ElMessage({ message: '请输入原型名称', type: 'error' });
          chooseModelVisible.value = false
          return
        }
        if(model_type.value == 'mart'){
          axios.post('/prototype/model/mart', {
            "project_id": project_id,
            "team_id": team_id.value,
            "name": prototype_name.value
          }).then((response) =>{
            if(response.data.code === 200) {
              ElMessage({ message: response.data.message, type: 'success' });
              prototype_id.value = response.data.prototype_id
              chooseModelVisible.value = false
              createVisible.value = false
              getPrototypeList()
            }else {
              ElMessage({ message: response.data.error, type: 'error' });
            }
          }).catch((error) => {
            ElMessage({ message: "创建原型失败，请重试", type: 'error' });
            console.log(error);
          })
        } else {
          axios.post('/prototype/model/aca', {
            "project_id": project_id,
            "team_id": team_id.value,
            "name": prototype_name.value
          }).then((response) =>{
            if(response.data.code === 200) {
              ElMessage({ message: response.data.message, type: 'success' });
              prototype_id.value = response.data.prototype_id
              chooseModelVisible.value = false
              createVisible.value = false
              getPrototypeList()
            }else {
              ElMessage({ message: response.data.error, type: 'error' });
            }
          }).catch((error) => {
            ElMessage({ message: "创建原型失败，请重试", type: 'error' });
            console.log(error);
          })
        }
      }
      const formatTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const year = dateTime.getFullYear(); // 获取年份
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      };
      
      onMounted(()=>{
        getPrototypeList()
        getprojectmessage()
      })
  
      return {
        createVisible,
        renameVisible,
        prototype_name,
        prototype_list,
        prototype_rename,
        prototype_cur_row,
        
        pagesVisible,
        page_list,
        options,
        page_size,
        newPageName,
        createPageVisible,
        page_cur_row,
        renamePageVisible,
        chooseModelVisible,
        model_type,
        models,

        getPrototypeList,
        createPrototye,
        deletePrototype,
        openRename,
        renamePrototype,
        openPages,
        openOnePage,
        createPage,
        deletePage,
        openRenamePage,
        renamePage,
        useModel,
        formatTime: formatTime,

        team_id,
        created_time,
        project_description,
        project_name,
        staff,
        team_name,
        lengthEnough,
   
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
  .datalist {
    margin-left: 40px;
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