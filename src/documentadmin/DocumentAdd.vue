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
                <el-button size="mini" color="#66ccff"><el-icon>
                    <Grid />
                  </el-icon></el-button>
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
                <h3>文档操作区</h3>
                <h4>文档名:<span>{{ this.doc_name }}</span></h4>
              </div>
              <div>
                <el-button type="info" style="position: absolute;left: 20px;top:125px;" @click="docsedit">保存文档</el-button>
                <el-input v-model="doc_name1" placeholder="请输入文档名称"
                  style="position: absolute;left: 20px;top:165px;width:158px"></el-input>
                <el-button type="info" style="position: absolute;left: 20px;top:200px;"
                  @click="docscreate">创建新文档</el-button>
                <el-input v-model="doc_id1" placeholder="请输入文档id"
                  style="position: absolute;left: 20px;top:265px;width:158px">
                </el-input>
                <el-button type="info" style="position: absolute;left: 20px;top:300px;"
                  @click="docsserach">编辑指定文档</el-button>
                <el-button type="info" style="position: absolute;left: 8px;top:350px;"
                  @click="docscreate">分享文档</el-button>
                <el-button type="info" style="position: absolute;left: 8px;top:400px;"
                  @click="docsserach">@团队成员</el-button>
              </div>
            </el-card>
          </div>
          <div class="edit_container" style="width: 900px;left:420px; height: 800px; top:160px"  @keyup="handkeKeyUp"
      @keydown="handleKeyDown">
            <QuillEditor id="editorId" ref="myQuillEditor" :content="editorContent" contentType="html"
              @updateContent="update" :options="options" style="width: 800px;left:420px; top:160px" height: 800 />
          </div>
          <div class="templateuse">
            <el-card class="templatecard" style="position: absolute;height:800px;width:200px;background-color: rgba(255, 255, 255, 0.85);left:1350px">
              <div>
                <div slot="header" class="clearfix">
                <h3>文档模板</h3>
                </div>
                <el-button type="info" style="position: absolute;left: 55px;top:80px;"
                  @click="docsserach">项目计划</el-button>
                  <el-button type="info" style="position: absolute;left: 45px;top:150px;"
                  @click="docsserach">会议纪要</el-button>
                  <el-button type="info" style="position: absolute;left: 45px;top:220px;"
                  @click="docsserach">项目管理</el-button>
                  <el-button type="info" style="position: absolute;left: 45px;top:290px;"
                  @click="docsserach">工作周报</el-button>
                  <el-button type="info" style="position: absolute;left: 30px;top:360px;"
                  @click="docsserach">需求调研报告</el-button>
                  <el-button type="info" style="position: absolute;left: 25px;top:430px;"
                  @click="docsserach">需求规格说明书</el-button>
                  <el-button type="info" style="position: absolute;left: 25px;top:500px;"
                  @click="docsserach">架构设计说明书</el-button>
              </div>
            </el-card>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//调用编辑器\
import CommonAside from '@/components/CommonAside.vue';
import QuillEditor from '../components/Editor/index.vue';
// import { Mentionable } from 'vue-mention'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import axios from 'axios';
import { ref, onMounted, getCurrentInstance } from 'vue';
import { ElNotification } from 'element-plus'
export default {
  components: {
    CommonAside,
    QuillEditor,
  },
  data() {
    return {
      isClickMention: false,
      isChineseInputMethod: false,
      show: false,
      code: '',
      editorContent: '请于此处开始编辑',
      message: '',
      docs: [],
      count: '',
      doc_id: this.$route.params.id,
      doc_name: '',
      doc_id1: '',
      doc_id2: '',
      team_id: '',
      project_id: window.sessionStorage.getItem('curProjectId'),
      doc_name1: '',
      staff: [],
    };
  },
  created(){
    this.getdoccontent();
  },
  methods: {
    getdoccontent(){
      const documentid = this.$route.params.id;
      axios.post('/doc/doc_search',{
        "project_id": Number(this.project_id),
        "doc_id": documentid,
      })
      .then((response) => {
        this.editorContent = response.data.content;
        this.$refs.myQuillEditor.changeContent( this.editorContent );
        this.doc_name = response.data.doc_name;
        console.log("did",this.doc_id);
        console.log("content",this.editorContent);
        console.log("dname",this.doc_name);
      })
    },
    docscontent() {
      axios.post('/doc/doc_search',
        {
          "project_id": Number(this.project_id),
          "doc_id": this.doc_id1,
        })
        .then((response) => {
          this.editorContent = response.data.content;
        }
        )
      return response.data.content;
    },
    docsedit() {
      axios.post('/doc/edit', {
        "doc_id": this.doc_id,
        "content": this.editorContent,
      })
        .then((response) => {
          console.log(this.doc_id);
          console.log(response.data.doc_id);
          console.log(this.editorContent);
          ElNotification({
            title: 'success',
            message: '保存文档成功',
            type: 'edit',
          });
        })
    },
    update(newValue) {
      console.log('test')
      console.log(newValue)
      this.editorContent = newValue;
    },
    docscreate() {
      console.log(this.editorContent);
      console.log(this.doc_id);
      axios.post('/doc/create', {
        "doc_name": this.doc_name1,
        "project_id": this.project_id,
      })
        .then((response) => {
          this.doc_id = response.data.doc_id;
          this.$router.push(`/documentadmin/${this.doc_id}`);
          this.editorContent = '请于此处开始编辑';
          this.$refs.myQuillEditor.changeContent( this.editorContent );
          console.log(this.editorContent);
          console.log(this.doc_id);
          ElNotification({
            title: 'success',
            message: '新建文档成功，现在可以开始编辑了',
            type: 'create',
          });
        }
        )
    },
    docsdelete() {
      axios.post('/doc/delete',
        {
          "doc_id": this.doc_id2,
        })
        .then((response) => {
          console.log(this.doc_id2)
          console.log(response.data.message);
          this.doc_id2 = '';
          ElNotification({
            title: 'success',
            message: '删除文档成功',
            type: 'delete',
          });
        }
        )
    },
    docsserach() {
      axios.post('/doc/doc_search',
        {
          "project_id": Number(this.project_id),
          "doc_id": this.doc_id1,
        })
        .then((response) => {
          console.log(this.doc_id1);
          console.log(response.data.content);
          this.editorContent = response.data.content;
          this.$refs.myQuillEditor.changeContent( this.editorContent );
          this.$router.push(`/documentadmin/${this.doc_id1}`);
          this.doc_id1='';
        }
        )
    },
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

.ql-editor {
  min-height: 760px;
}
</style>