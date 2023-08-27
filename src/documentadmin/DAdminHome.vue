<template>
  <div class="layout">
    <el-container>
      <el-container>
        <el-aside width="180px">
          <CommonAside></CommonAside>
        </el-aside>
        <el-main>
          <el-row>
            <el-col :span="8"><div class="left" />
              <el-card class="project">
                <div class="projectshow">
                  <img src="../assets/project.png" alt="">
                  <div class="projectinfo">
                    <p class="projectname">项目名称</p>
                    <p class="projectteam">项目所属团体名称</p>
                  </div>
                </div>
                <div class="projectmessage">
                  <p>项目创建时间：<span>1145-14</span></p>
                  <p>项目简介:<span>鸭蛋莫鸭蛋</span></p>
                </div>
              </el-card>
              <el-card class="members">
                <el-table :data="tableData" stripe style="width: 100%" height='250'>
                  <el-table-column prop="membername" label="成员名" width="180" />
                  <el-table-column prop="jointime" label="加入时间" width="180" />
                  <el-table-column prop="power" label="文档权限" />
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="16">
              <el-card class="docslist" >
              <el-table :data="docs" stripe style="left:40px width: 80%" height='670'>
                <el-table-column fixed prop="doc_id" label="文档id" width="180" >
                </el-table-column>
                <el-table-column prop="doc_name" label="文档名" width="180">
                </el-table-column>
                <el-table-column prop="created_time" label="创建时间" width="180">
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间" width="180">
                </el-table-column>
                <el-table-column prop="option" label="选择" width="180">
                  <template #default="scope">
                    <router-link to="/documentadd">
                      <el-button link type="primary" size="small" @click="handleClick"
                      >Edit</el-button
                    >
                    </router-link>
                    <el-button link type="primary" size="small" @click="docsdelete(scope.row)">Delete</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import axios from 'axios';
import { getChildState } from 'element-plus/es/components/tree/src/model/node';
import { setup } from 'naive-ui/es/radio/src/use-radio';
import { reactive, onMounted,ref} from "vue";
export default {
  data() {
    return {
    project_id:'1',
    tableData: [
  {
    membername: '测试',
    jointime: '114-5-14',
    power: '成员',
  },
  {
    membername: '测试',
    jointime: '114-5-14',
    power: '成员',
  },
  {
    membername: '测试',
    jointime: '114-5-14',
    power: '成员',
  },
  {
    membername: '测试',
    jointime: '114-5-14',
    power: '成员',
  },
],
    }
  },
  methods:{
    docsdelete(row ){
      axios.post('/doc/delete',
    {
      "doc_id": row.doc_id,
    })
    .then((response)=>{
      console.log(row.doc_id);
      console.log(response.data.message);
      this.refresh();
    }
    )
    },
  },
  components: {
    CommonAside
  },
    setup() {
    const docs = ref([]);
    // const docs = [
    // {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    //   {
    //     "doc_id":1,
    //     "doc_name":"testDoc",
    //     "created_time":"2023-08-26T12:26:16.833Z",
    //     "update_time":"2023-08-26T13:24:20.760Z",
    //     "doc_team":1,
    //     "doc_user":5
    //   },
    // ]
    const project_id ='1';
    const refresh =()=>{
    location.reload();
    }
    const getdocslist = () =>{
    axios.post('/doc/project_doc_list', {
      "project_id": project_id,
      "is_delete": 0
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
  }
    onMounted(()=>{
    getdocslist()
  })


  return {
    docs,
    refresh,
  }
  }
}
</script>

<style>
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
  margin-right: 40px;
  width: 150px;
  height: 150px;
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
  margin-top: 100px;
}
.docslist {
  margin-left: 40px;
}
</style>