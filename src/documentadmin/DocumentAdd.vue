<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="180px">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <div class="header" style="margin: 0; padding: 0;">
          <el-header>
            <div class="headerleft" style="display: flex; margin-top: 10px;">
              <router-link to="/documentadmin">
                <el-button size="mini" color="#66ccff"><el-icon><Grid /></el-icon></el-button>
              </router-link>
                <h3>返回文档管理主页</h3>
            </div>
          </el-header>
        </div>
        <el-header>
        </el-header>
        <div>
          <div style="position: absolute;width:200px;top:160px">
            <el-card class="box-card"
              style="position: absolute;height:800px;width:200px;background-color: rgba(255, 255, 255, 0.85);left:20px">
              <div slot="header" class="clearfix">
                <h3>文件操作区</h3>
              </div>
              <div>
                <el-input v-model="input1" placeholder="请输入文档名称" style="position: absolute;left: 20px;top:125px;width:158px"></el-input>
                <el-button type="info" style="position: absolute;left: 20px;top:165px;"
                  @click="createtext">创建新文档</el-button>
                <el-input v-model="input2" placeholder="请输入文档id" style="position: absolute;left: 20px;top:225px;width:158px">
                </el-input>
                <el-button type="info" style="position: absolute;left: 20px;top:265px;"
                  @click="find1">查找文档</el-button>
                <el-input v-model="input3" placeholder="请输入文档id" style="position: absolute;left: 20px;top:325px;width:158px">
                </el-input>
                <el-button type="info" style="position: absolute;left: 20px;top:365px;"
                  @click="delete1">删除文档</el-button>
              </div>
            </el-card>
        </div>
        <div class="edit_container" style="width: 800px;left:420px; height: 800px; top:160px">
          <QuillEditor id="editorId" ref="myQuillEditor" v-model:content="editorContent" contentType="html"
            @update:content="onContentChange" :options="options" style="width: 800px;left:420px; height: 800px; top:160px"/>
        </div>
        <div class="documentlist">
          <el-table :data="this.textdata" height="450" border stripe
            style="position:absolute;width: 320px;left:1250px;top:240px" @cell-click="find">
            <el-table-column prop="file_name" label="文档名" width="140">
            </el-table-column>
            <el-table-column prop="last_modify_time" label="最后编辑时间" width="140">
            </el-table-column>
            <el-table-column prop="fileID" label="文档id" width="140">
            </el-table-column>
          </el-table>
        </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>//调用编辑器\
import CommonAside from '@/components/CommonAside.vue';
import QuillEditor from '../components/Editor/index.vue';
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
export default {
  components:{
    CommonAside,
    QuillEditor,
},
data(){
  return{
    editorContent:'123456'
  };
},
  methods: {
  },
}
</script>

<style>
.bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s;
  backface-visibility: hidden;
}

.edit_container {
  height: 600px;
  margin-top: 0px;
  margin-right: 40px;
  position: absolute;
}

.header {
  height: 50px;
  background-color: #717f8d;
  text-align: left;
}

.headerleft h3 {
  margin-left: 10px;
  color: #fff;
  margin-top: 5px;
}
</style>