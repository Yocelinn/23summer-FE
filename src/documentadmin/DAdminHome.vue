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
                    <p class="projectname">{{project_name}}</p>
                    <p class="projectteam">{{team_name}}</p>
                  </div>
                </div>
                <div class="projectmessage">
                  <p>项目创建时间：<span>{{created_time}}</span></p>
                  <p>项目简介:<span>{{project_description}}</span></p>
                </div>
              </el-card>
              <el-card class="members">
                <el-table :data="staff" stripe style="width: 100%" height='250'>
                  <el-table-column prop="nickname" label="成员昵称" width="180" />
                  <el-table-column prop="name" label="成员名" width="180" />
                  <el-table-column prop="email" label="邮箱" />
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="16">
              <el-card class="docslist" >
              <el-table :data="docs" stripe style="left:40px; width: 80%" height='670'>
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
                      <el-button link type="primary" size="small" @click="docsedit(scope.row)"
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
    docsedit(row){
      window.sessionStorage.setItem('curDocsId', row.doc_id);
      this.$router.push('/documentadd');
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
    const staff = ref([]);
    const project_id = window.sessionStorage.getItem('curProjectId');;
    const created_time =ref('');
    const project_description = ref('');
    const project_name = ref('');
    const team_id = ref('');
    const team_name = ref('');
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
    const getprojectmessage = () =>{
      axios.post('/project/search',{
        "project_id":project_id,
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
          .then((response)=>{
        console.log(response.data);
        console.log(team_id);
        staff.value=response.data.res;
        console.log(staff.value);
      }
      )
      }
      )
    }
    onMounted(()=>{
    getdocslist()
    getprojectmessage()
  })


  return {
    docs,
    staff,
    refresh,
    team_id,
    created_time,
    project_description,
    project_name,
    team_name,
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