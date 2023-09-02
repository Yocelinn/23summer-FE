<template>
  <div class="common-layout">
    <el-container class="container-all" style="height: 100%">
      <el-aside width="13vw">
        <CommonAside></CommonAside>
      </el-aside>
      <el-container class="big-container">
        <div class="header" style="margin: 0; padding: 0; flex: 0 0 auto;">
          <el-header>
            <div class="headerleft" style="margin-top: 0;">
              <router-link to="/documentadmin">
                <el-button size="mini" color="#545c64">返回管理页</el-button>
              </router-link>
              <el-button type="info" style="margin-top: 0;margin-left: 795px;" color="#545c64"
                         @click="this.dialogFormVisible = true">分享文档</el-button>
              <el-dialog v-model="this.dialogFormVisible" title="分享文档">
                <el-form :model="form">
                  <el-form-item label="分享文档链接：" :label-width="this.formLabelWidth">
                    {{this.link}}
                  </el-form-item>
                  <el-form-item label="Zones" :label-width="this.formLabelWidth">
                    <el-select v-model="this.tourist" placeholder="游客是否能编辑文档">
                      <el-option label="游客能编辑文档" value="can"/>
                      <el-option label="游客不能编辑文档" value="cant" />
                    </el-select>
                  </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                      <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
                      <el-button type="primary" @click="sharedocs">
                        分享
                      </el-button>
                    </span>
                </template>
              </el-dialog>
              <el-dropdown>
                <el-button color="#545c64" style="margin-left: 5px">
                  导出文档<el-icon class="el-icon--right"><ArrowDown /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>导出为Word</el-dropdown-item>
                    <el-dropdown-item>导出为Pdf</el-dropdown-item>
                    <el-dropdown-item>导出为Markdown</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-header>
        </div>
        <!--        <el-header>-->
        <!--        </el-header>-->
        <div class="small-container">
          <div class="card1" style="width: 20%; flex: 1; height: 100%">
            <el-card class="box-card" style="background-color: rgba(255, 255, 255, 0.85); height: 100%">
              <div slot="header" class="clearfix">
                <h3>文档操作区</h3>
                <h4>文档名:<span>{{ this.doc_name }}</span></h4>
              </div>
              <div>
                <el-button type="info"  @click="docsedit">保存文档</el-button>
                <el-input v-model="doc_name1" placeholder="请输入文档名称"></el-input>
                <el-button type="info" @click="docscreate">创建新文档</el-button>
                <el-input v-model="doc_id1" placeholder="请输入文档id"></el-input>
                <el-button type="info" @click="docsserach">编辑指定文档</el-button>
              </div>
            </el-card>
          </div>
          <div class="edit_container" style="width: 60%; flex: 3; max-height: 100%" @keyup="handkeKeyUp" @keydown="handleKeyDown">
            <QuillEditor id="editorId" ref="myQuillEditor" :content="editorContent" contentType="html"
              @updateContent="update" @textChange="textChange" :options="options" style="width: 800px;left:420px; top:160px" height: 800 />
			<MemerDialog ref="MemerDialog" @rowClick="rowClick"></MemerDialog>
          </div>
          <div class="card2" style="width: 20%; flex: 1; height: 100%">
            <el-card class="box-card2" style="background-color: rgba(255, 255, 255, 0.85); height: 100%" >
              <div>
                <div slot="header" class="clearfix">
                  <h3>文档模板</h3>
                </div>
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="项目计划" name="1">
                    <div>
                      通用的项目开发计划书，用于根据计划开展和检查项目的开发工作。
                    </div>
                    <div>
                      <el-button
                              :key='primary'
                              :type='primary'
                              @click="model1"
                              link
                      >点我使用该模板</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="会议纪要" name="2">
                    <div>
                      通用的会议纪要模板，用于记录会议内容和决策，便于回顾。
                    </div>
                    <div>
                      <el-button
                              :key='primary'
                              :type='primary'
                              @click="model2"
                              link
                      >点我使用该模板</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="项目管理" name="3">
                    <div>
                      通用的项目管理模板，用于根据文件管理项目的分工，合作与开发过程。
                    </div>
                    <div>
                      <el-button
                              :key='primary'
                              :type='primary'
                              @click="model3"
                              link
                      >点我使用该模板</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="工作周报" name="4">
                    <div>
                      通用的工作总结模板，用于对一周的工作进行总结与回顾，并为下周做好计划。
                    </div>
                    <div>
                      <el-button
                              :key='primary'
                              :type='primary'
                              @click="model4"
                              link
                      >点我使用该模板</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="需求调研报告" name="5">
                    <div>
                      通用的需求调研报告模板，用于总结业务的目标和用户的需求。
                    </div>
                    <div>
                      <el-button
                              :key='primary'
                              :type='primary'
                              @click="model5"
                              link
                      >点我使用该模板</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="需求规格说明书" name="6">
                    <div>
                      通用的需求规格说明书模板，用于说明业务最终需要满足的条件及限制，为进一步的设计和实现提供依据。
                    </div>
                    <div>
                      <el-button
                              :key='primary'
                              :type='primary'
                              @click="model6"
                              link
                      >点我使用该模板</el-button>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="架构设计说明书" name="7">
                    <div>
                      通用的架构设计说明书模板，用于说明系统的结构设计。
                    </div>
                    <div>
                      <el-button
                              :key='primary'
                              :type='primary'
                              @click="model7"
                              link
                      >点我使用该模板</el-button>
                    </div>
                  </el-collapse-item>
                </el-collapse>
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
import MemerDialog from './member-dialog.vue'
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
import { ref, onMounted, getCurrentInstance, toRaw } from 'vue';
import { ElNotification,ArrowDown } from 'element-plus'
export default {
  components: {
    CommonAside,
    QuillEditor,
	MemerDialog
  },
  data() {
    return {
      link: '/documandadmin/token',
      dialogFormVisible:false,
      formLabelWidth :'140px',
      isClickMention: false,
      isChineseInputMethod: false,
      show: false,
      code: '',
      editorContent: '',
      message: '',
      docs: [],
      count: '',
      doc_id: this.$route.params.id,
      doc_name: '',
      doc_id1: '',
      doc_id2: '',
      team_id: window.sessionStorage.getItem('curTeamId'),
      project_id: window.sessionStorage.getItem('curProjectId'),
      doc_name1: '',
      staff: [],
      power:false,
      tourist: '游客不能编辑文档',
      perm: '1',
      username: window.sessionStorage.getItem('userName')
    };
  },
  created(){
    this.getdoccontent();
  },
  methods: {
    model1(){
      this.editorContent='<h1 class="ql-align-center">开发计划书</h1><h2>1.引言</h2><h3>	1.1背景</h3><h3>	1.2目的</h3><h3>	1.3术语定义</h3><h3>	1.4参考资料</h3><h3>	1.5相关文档</h3><h2>2.项目概述</h2><h3>	2.1项目的目的</h3><h3>	2.2项目的使用对象</h3><h2>3.项目组织及人力资源管理情况</h2><h2>4.软件生命周期</h2><h2>5.规范，方法和标准</h2><h3>	5.1前端代码规范</h3><h3>	5.2后端代码规范</h3><h3>	5.3开发方法</h3><h3>	5.4维护相关</h3><h2>6.任务与工作产品</h2><h2>7.工作产品，任务规模，工作量估计</h2><h2>8.成本估计</h2><h2>9.软件项目进度计划</h2><h2>10.配置管理计划</h2><h2>11.质量保证计划</h2><h2>12.风险分析</h2><h2>13.设备工具</h2><h3>	13.1运行环境</h3><h3>	13.2开发环境</h3><h2>14.项目评审</h2><h2>15.度量</h2>'
      this.$refs.myQuillEditor.changeContent( this.editorContent );
    },
    model2(){
      this.editorContent='<h1 class="ql-align-center">会议纪要</h1><h2>	会议名称：</h2><h2>	时间：</h2><h2>	地点：</h2><h2>	主持人：</h2><h2>	参会人员：</h2><h2>	会议主要内容：</h2>'
      this.$refs.myQuillEditor.changeContent( this.editorContent );
    },
    model3(){
      this.editorContent='<p class="ql-align-center"><span class="ql-size-huge">项目管理</span></p><p class="ql-align-center"><br></p><h2>1.简介</h2><h3>	1.1项目概述</h3><h3>	1.2项目交付产品</h3><h3>	1.3项目计划书的演化</h3><h3>	1.3参考资料</h3><h2>2.项目组织</h2><h3>	2.1过程模型</h3><h3>	2.2团队的分工与合作</h3><h2>3.管理过程</h2><h3>	3.1管理目标及优先级</h3><h3>	3.2风险管理</h3><h3>	3.3监督及控制机制</h3><h3>	3.4人员计划</h3><h3>	3.5培训计划</h3><h2>4.技术过程</h2><h3>	4.1开发工具，方法和技术</h3><h3>	4.2软件需缴付的文档</h3><h2>5.开发进度安排及预算</h2><h3>	5.1进度表格描述</h3><h3>	5.2开发过程中的资源需求</h3><h3>	5.3软件管理过程中预算及资源分配</h3><h3>	5.4项目进度及关键工期设置</h3>'
      this.$refs.myQuillEditor.changeContent( this.editorContent );
    },
    model4(){
      this.editorContent='<p class="ql-align-center"><span class="ql-size-huge">工作周报</span></p><p class="ql-align-center"><br></p><p class="ql-align-center"><br></p><h2>一.本周工作内容</h2><h2>二.项目总体计划</h2><h2>三.现阶段项目计划</h2><h2>四.未完成工作内容</h2><h2>五.下周主要工作内容</h2><h2>六.当前阶段需要协调工作</h2>'
      this.$refs.myQuillEditor.changeContent( this.editorContent );
    },
    model5(){
      this.editorContent='<h1 class="ql-align-center">需求调研报告</h1><h2>1.任务概述</h2><h3>	1.1 任务目标</h3><h3>	1.2 调研对象</h3><h3>	1.3 调研方法</h3><h3>	1.4 调研内容</h3><h2>2.业务流程</h2><h3>	2.1概述</h3><h3>	2.2总业务流程</h3><h3>	2.3核心业务流程</h3><h3>	2.4核心业务对象和数据</h3><h2>3.应用系统</h2><h3>	3.1系统概述</h3><h3>	3.2系统功能结构</h3><h3>	3.3系统技术架构</h3><h3>	3.4系统部署环境</h3><h2>4.尚需解决的问题</h2><h2>5.附录</h2>'
      this.$refs.myQuillEditor.changeContent( this.editorContent );
    },
    model6(){
      this.editorContent='<h1 class="ql-align-center">需求规格说明书</h1><h2>1.引言</h2><h3>	1.1编写目的</h3><h3>	1.2项目背景</h3><h2>2.任务概述</h2><h3>	2.1目标</h3><h3>	2.2用户概述</h3><h3>	2.3术语定义</h3><h3>	2.4参考资料</h3><h2>3.目标系统描述</h2><h3>	3.1角色定义</h3><h3>	3.2业务流程</h3><h2>4.功能需求</h2><h3>	4.1子系统划分</h3><h3>	4.2类图设计</h3><h3>	4.3用户子系统</h3><h3>	4.4航班信息子系统</h3><h3>	4.5订单子系统</h3><h3>	4.6信用评价子系统</h3><h2>5.非功能性需求</h2><h3>	5.1安全性需求</h3><h3>	5.2正确性需求</h3><h3>	5.3界面需求</h3><h3>	5.4数据需求</h3><h3>	5.5稳定性需求</h3><h3>	5.6灵活性需求</h3><h3>	5.7扩展性需求</h3><h3>	5.8数据管理能力需求</h3><h3>	5.9故障处理能力需求</h3><h2>6.目标系统界面</h2><h3>	6.1界面需求</h3><h3>	6.2界面设计</h3>'
      this.$refs.myQuillEditor.changeContent( this.editorContent );
    },
    model7(){
      this.editorContent='<h1 class="ql-align-center">架构设计说明书</h1><h2>1.引言</h2><h3>	1.1编写目的</h3><h3>	1.2系统目标</h3><h3>	1.3术语和缩写词定义</h3><h3>	1.4参考资料</h3><h2>2.需求规定</h2><h3>	2.1系统功能</h3><h3>	2.2系统性能</h3><h3>	2.3故障处理要求</h3><h3>	2.4软硬件要求</h3><h3>	2.5其他需求限制条件</h3><h2>3.总体结构设计</h2><h3>	3.1系统体系结构</h3><h3>	3.2系统开发的基础平台和关键组件</h3><h3>	3.2.1外部基础平台和关键组件</h3><h3>	3.2.2内部基础平台和关键组件</h3><h3>	3.3总体结构</h3><h2>4.子系统设计</h2><h3>	4.1功能结构</h3><h3>	4.2功能定义</h3><h3>	4.3功能需求和系统模块的关系</h3><h2>5.接口设计</h2><h3>	5.1用户接口</h3><h3>	5.2外部接口</h3><h3>	5.3内部接口</h3><h2>6.系统数据结构设计</h2><h3>	6.1逻辑结构设计</h3><h3>	6.2物理结构设计</h3><h3>	6.3配置文件结构设计</h3><h3>	6.4数据结构和程序的关系</h3><h2>7.算法设计</h2><h2>8.运行设计</h2><h3>	8.1运行模块组合</h3><h3>	8.2运行控制</h3><h3>	8.3运行时间</h3><h2>9.系统安全</h2><h3>	9.1系统安全</h3><h3>	9.2数据安全</h3><h3>	9.3备份与恢复</h3><h3>	9.4出错处理</h3><h2>10.系统维护设计</h2><h2>11.系统部署</h2><h3>	11.1软硬件环境</h3><h3>	11.2系统部署</h3><h3>	11.3系统升级</h3><h2>12.遗留问题</h2>'
      this.$refs.myQuillEditor.changeContent( this.editorContent );
    },
    getdoccontent(){
      console.log(this.project_id);
      const documentid = this.$route.params.id;
      if(this.project_id != null)
      {
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
      }
      else{
        axios.get('/doc/decode/'+ documentid)
        .then((response)=>{
          this.perm = response.data.res.perm;
          this.doc_id = response.data.res.doc_id;
          console.log(response.data.res.perm);
          console.log(response.data.res.doc_id);
          console.log(this.perm)
          console.log(this.doc_id)
          axios.post(('/doc/view'),
          {
            "doc_id": this.doc_id,
          })
          .then((response1)=>{
            this.project_id = response1.data.doc_project;
            this.editorContent = response1.data.content;
            this.$refs.myQuillEditor.changeContent( this.editorContent );
          });
        });
      }
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
      if(this.$store.state.isLoggedIn==true || (this.$store.state.isLoggedIn ==false)&&this.perm == 1){

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
        })}
        else{
          ElNotification({
            title: 'fail',
            message: '您没有编辑的权限',
            type: 'editfail',
          });
        }
    },
    update(newValue) {
      console.log('test')
      console.log(newValue)
      this.editorContent = newValue;
    },
	
	textChange(content) {
		if (content && content.delta.ops.length === 2 ) {
			if (content.delta.ops[1].insert && content.delta.ops[1].insert === '@') {
				this.$refs.MemerDialog.showDialog([])
			} 
		} 
	},
	rowClick(row) {
		if (this.editorContent) {
			const lastIndex = this.editorContent.lastIndexOf('<')
			this.editorContent = `${this.editorContent.substring(0, lastIndex)}${row.nickname}(${row.name})${this.editorContent.substring(lastIndex)}`
		}
		this.$refs.myQuillEditor.changeContent( this.editorContent );
    axios.post('/message/create',{
      "rec_id": row.user_id,
      "content" : this.username + '在文档' + this.doc_name + '中@了你', 
      "team_id": this.team_id,
      "ref_type": "doc",
      "ref_id": this.doc_id,
    }).then((response)=>{
      console.log(response.data.message);
    }
    )
		this.$nextTick(() =>{
			toRaw(this.$refs.myQuillEditor.$refs.myQuillEditor.getQuill()).setSelection(this.editorContent.length)
		})
	},
    docscreate() {
      if(this.$store.state.isLoggedIn == true)
      {
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
          // ElNotification({
          //   title: 'success',
          //   message: '新建文档成功，现在可以开始编辑了',
          //   type: 'create',
          // });
        }
        )}
      else{
        ElNotification({
            title: 'fail',
            message: '您没有新建文档的权限',
            type: 'createfail',
          });
      }
    },
    docsdelete() {
      if(this.$store.state.isLoggedIn == true)
      {
      axios.post('/doc/delete',
        {
          "doc_id": this.doc_id2,
        })
        .then((response) => {
          console.log(this.doc_id2)
          console.log(response.data.message);
          this.doc_id2 = '';
          // ElNotification({
          //   title: 'success',
          //   message: '删除文档成功',
          //   type: 'delete',
          // });
        }
        )}
      else{
        ElNotification({
            title: 'fail',
            message: '您没有删除文档的权限',
            type: 'deletefail',
          });
      }
    },
    docsserach() {
      if(this.$store.state.isLoggedIn == true)
      {
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
        )}
        else{
          ElNotification({
            title: 'fail',
            message: '您没有查看其他文档的权限的权限',
            type: 'serachfail',
          });
        }
    },
    sharedocs(){
      console.log(this.$store.state.isLoggedIn);
      console.log(window.sessionStorage.getItem('curRoleNum'));
      if(this.$store.state.isLoggedIn = true)
      {
      this.dialogFormVisible=false;
      if(window.sessionStorage.getItem('curRoleNum')=='0'||window.sessionStorage.getItem('curRoleNum')=='1')
      {
        if(this.tourist=='游客不能编辑文档')
        {
         axios.post('/doc/link',
         {
            "doc_id": this.doc_id,
            "perm": Number('0'),
         })
         .then((response) => {
          this.link='http://localhost:8080/documentadmin/'+ response.data.doc_token;
          console.log(this.link);
          this.copyText();
          this.link='/documandadmin/token'
         })
        ElNotification({
          title: '已复制链接',
          message: '现在已经可以将链接分享给游客了(游客不能编辑)',
          type: 'cant',
        })
        }
        else(this.tourist=='游客能编辑文档')
        {
         axios.post('/doc/link',
         {
            "doc_id": this.doc_id,
            "perm": Number('1'),
         })
         .then((response) => {
          this.link='http://localhost:8080/documentadmin/'+ response.data.doc_token;
          console.log(this.link);
          this.copyText();
          this.link='/documandadmin/token';
         })
        ElNotification({
          title: '已复制链接',
          message: '现在已经可以将链接分享给游客了(游客可以编辑)',
          type: 'can',
        })
        }
      }
      else{
        ElNotification({
          title: 'fail',
          message: '您没有分享文档的权限',
          type: 'sharefail',
        })
      }
      }
      else{
        ElNotification({
          title: 'fail',
          message: '您没有分享文档的权限',
          type: 'sharefail',
        })
      }
    },
    copyText(){
      navigator.clipboard.writeText(this.link).then(() => {
      });
      },
  },
}
</script>

<style scoped>
.container-all {

  display: flex;
  /*flex-direction: column; !* 垂直布局 *!*/
  justify-content: space-between;
  /*align-items: center; !* 如果需要水平居中对齐，可以添加这行 *!*/
}

.big-container {
  display: flex;
  flex-direction: column; /* 垂直布局 */
  /*align-items: center;*/
  width: 10%;
  height: 100%;
}

.small-container {
  display: flex;
  /*flex: 1;*/
  justify-content: space-between;
  /*align-items: center;*/
  margin: 10px;
  height: 100%;
  /*flex-grow: 1;*/
}

.common-layout {
  height: calc(100vh - 50px);
  width: 100vw;
}


.bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  /*position: fixed;*/
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s;
  backface-visibility: hidden;
}

.edit_container {
  /*height: 100%;*/
  margin: 0 10px;
  /*position: absolute;*/
}

.headerleft h3 {
  margin-left: 10px;
  color: #818080;
  margin-top: 5px;
}
</style>