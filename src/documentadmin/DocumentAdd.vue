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
              </div>
              <div>
                <el-button type="info" style="position: absolute;left: 20px;top:85px;" @click="docsedit">保存文档</el-button>
                <el-input v-model="doc_name1" placeholder="请输入文档名称"
                  style="position: absolute;left: 20px;top:165px;width:158px"></el-input>
                <el-button type="info" style="position: absolute;left: 20px;top:200px;"
                  @click="docscreate">创建新文档</el-button>
                <el-input v-model="doc_id1" placeholder="请输入文档id"
                  style="position: absolute;left: 20px;top:265px;width:158px">
                </el-input>
                <el-button type="info" style="position: absolute;left: 20px;top:300px;"
                  @click="docsserach">编辑指定文档</el-button>
              </div>
            </el-card>
          </div>
          <div class="edit_container" style="width: 1200px;left:420px; height: 800px; top:160px">
            <QuillEditor id="editorId" ref="myQuillEditor" :content="editorContent" contentType="html"
              @updateContent="update" :options="options" style="width: 800px;left:420px; top:160px" height: 800 />
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
      code: '',
      editorContent: '123',
      message: '',
      docs: [],
      count: '',
      doc_id: window.sessionStorage.getItem('curDocsId'),
      doc_id1: '',
      doc_id2: '',
      project_id: window.sessionStorage.getItem('curProjectId'),
      doc_name1: '',
    };
  },
  methods: {
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
      console.log(window.sessionStorage.getItem('curDocsId'));
      this.doc_id = window.sessionStorage.getItem('curDocsId');
      axios.post('/doc/edit', {
        "doc_id": this.doc_id,
        "content": this.editorContent,
      })
        .then((response) => {
          console.log(this.doc_id);
          console.log(response.data.doc_id);
          console.log(this.editorContent);
        })
    },
    update(newValue) {
      console.log('test')
      console.log(newValue)
      this.editorContent = newValue;
    },
    docscreate() {
      console.log(this.editorContent );
      axios.post('/doc/create', {
        "doc_name": this.doc_name1,
        "project_id": this.project_id,
      })
        .then((response) => {
          console.log(this.doc_name1);
          console.log(response.data.message);
          console.log(response.data.doc_id);
          console.log(response.data.doc_project);
          this.doc_id = response.data.doc_id;
          this.editorContent = '请于此处开始编辑';
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
          console.log(this.project_id);
          console.log(response.data.code);
          console.log(response.data.message);
          this.doc_id = this.doc_id1;
          console.log(this.doc_id);
          this.editorContent = response.data.content;
          console.log(this.editorContent);
        }
        )
    },
  },
  docsserach(){
    axios.post('/doc/doc_search',
    {
      "project_id":Number(this.project_id),
      "doc_id": this.doc_id1,
    })
    .then((response)=>{
      console.log(this.doc_id1);
      console.log(this.project_id);
      console.log(response.data.code);
      console.log(response.data.message);
    }
    )
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