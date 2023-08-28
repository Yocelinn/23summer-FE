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
                    <p class="projectteam">项目所属团体名称</p>
                  </div>
                </div>
                <div class="projectmessage">
                  <p>项目创建时间：<span>{{created_time}}</span></p>
                  <p>项目简介:<span>{{project_description}}</span></p>
                </div>
              </el-card>
              <el-card class="members">
                <el-table :data="tableData" stripe style="width: 100%">
                  <el-table-column prop="membername" label="成员名" width="180" />
                  <el-table-column prop="jointime" label="加入时间" width="180" />
                  <el-table-column prop="power" label="文档权限" />
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="16"><div class="grid-content ep-bg-purple-light" />
              <el-table :data="this.textdata" height="600" style="left:40px" border stripe @cell-click="find">
                <el-table-column prop="file_name" label="文档名" width="140">
                </el-table-column>
                <el-table-column prop="last_modify_time" label="最后编辑时间" width="140">
                </el-table-column>
                <el-table-column prop="fileID" label="文档id" width="140">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
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
  components: {
    CommonAside
  },
    setup() {
    const docs = ref([]);
    const staff = ref([]);
    const project_id ='1';
    const created_time =ref('');
    const project_description = ref('');
    const project_name = ref('');
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
    const getstafflist = () =>{
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
        console.log(created_time);
        console.log(project_description);
        console.log(project_name);
      }
      )
    }
    onMounted(()=>{
    getdocslist()
    getstafflist()
  })


  return {
    docs,
    refresh,
    created_time,
    project_description,
    project_name,
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
</style>