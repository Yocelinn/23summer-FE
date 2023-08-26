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
          <div style="position: absolute;width:200px;top:125px">
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
        <div class="edit_container" style="width: 800px;left:420px; height: 755px; top:125px">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
            >
          </quill-editor>
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
const editorOption =([
    ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
    ["blockquote", "code-block"], // 引用
    [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
    [{ script: "sub" }, { script: "super" }], // 上标/下标
    [{ indent: '-1' }, { indent: '+1' }], // 缩进
    [{ direction: 'rtl' }], // 文本方向
    [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
    [{ font: [] }], // 字体种类
    [{ align: [] }], // 对齐方式
    ['clean'], // 清除文本格式
    ['link', 'image', 'video'] // 链接、图片、视频
])
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
  },
  data() {
    return {
      username: '',
      userhead: '',
      real_name: '',
      email: '',
      phone: '',
      profile: '',
      username1: '',
      imageUrl1: '',
      password: '',
      content: '请于此处开始编辑……',
      str: '',
      editorOption: {},
      inside: '<h2> \t<strong><em>请于此开始编辑文档</em></strong></h2>',
      textname: '',
      input: '',
      textdata: [
      ],
      input1: '',
      input2: '',
      input3: '',
      //把这个页面加入项目中时，注意，跳转到这个页面的时候，now_id为当前文章id,projectid为当前项目id,teamid为当前队伍id,fatherid为其父文件夹id（可以用session之类的传入,这里需要稍微改一下（由于我这边看不到团队的那个组件，于是就没改__by zbh）
      now_id: 0,
      projectid: sessionStorage.getItem('ProjectID'),
      teamid: sessionStorage.getItem('TeamID'),
      fatherid: sessionStorage.getItem('project_root_fileID'),
    }
  },
  methods: {
    onEditorReady(editor) { // 准备编辑器

    },
    onEditorBlur() { }, // 失去焦点事件
    onEditorFocus() { }, // 获得焦点事件
    onEditorChange() {
      console.log(this.content);
    }, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      return str;
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
</style>