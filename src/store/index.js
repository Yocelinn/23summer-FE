import { createStore } from 'vuex'
import axios from "axios";
// import message from "@element-plus/icons/lib/Message";
import {ElMessage} from "element-plus";

export default createStore({
  state: {
    isLoggedIn: false,
    user: {},
    // curTeamId: {},
    // curProjectId: {},
    curRoleNum: {},
    projectData: [],
    personData: [],
    preview: false,
    pageData: {},
    elements_W: [],
    elements_P: [],
    show_W: false,
    show_P: false
  },
  getters: {
    getPreview: (state) => {
      return state.preview
    },
  },
  actions: {
    updateUser({ commit }, data) {
      commit('updateUser', data);
    },

    async fetchProjectList({ commit, state }, curTeamId) {
      // 清空projectData
      commit('setProjectData', []); // 清空数组
      try {
        const response = await axios.post('/project/order', {
          team_id: Number(curTeamId),
          type: 0,
          option: 0

        });
        console.log(response.config.data);
        console.log(curTeamId)
        if (response.data.code === 200) {
          console.log('更新', response.data.projects);
          commit('setProjectData', response.data.projects);
          console.log('状态', state.projectData.length);
        } else {
          console.error('Error fetching project data:', response.data.error);
        }
      } catch (error) {
        console.error('POST request error:', error);
      }
    },

    async fetchTeammateList({ commit, state }, curTeamId) {
      commit('setPersonData', []); // 清空数组
        axios.post('/team/seemember', {
          team_id: Number(curTeamId),
        })
            .then((response) => {
              if (response.data.code === 200) {
                console.log('获取队员列表成功', response.data);
                commit('setPersonData', response.data.res);
                console.log('状态', state.personData.length);
              }
              else {
                ElMessage({
                  message: response.data.error,
                  type:'error'
                });
                console.log('获取队员信息失败', response.data.error);
              }
            })
            .catch((error) => {
              ElMessage({
                message: "获取队员信息失败，请重试",
                type: 'error'
              });
              console.log("错误", error.config);
            })
    },

    async fetchElementWList({commit, state}, curProjectId) {
      axios.post('/doc/root', {
        "project_id": curProjectId
      })
          .then((response)=>{
            if (response.data.code === 200) {
              // ElMessage({
              //     message: response.data.message,
              //     type: 'success'
              // });
              commit('setElementWList', response.data.docs);
              console.log(response.config.data);
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
            console.log(state.elements_W.length);
            commit('setShowW', state.elements_W.length === 0);
            // show_w.value = (this.elements_W.value.length === 0);
            console.log(state.show_W);
          })
          .catch((error) => {
            ElMessage({
              message: "获取文档错误，请重试",
              type: 'error'
            });
            console.log(error.config.data);
            console.log(error.data);
          })
    },

    async fetchElementPList({commit, state}, curProjectId) {
      axios.post('/prototype/info', {
        "project_id": curProjectId
      })
          .then((response)=>{
            if (response.data.code === 200) {
              // ElMessage({
              //     message: response.data.message,
              //     type: 'success'
              // });
              commit('setElementPList', response.data.prototypes);
              // elements_p.value = response.data.prototypes;
              console.log(response.config.data);
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
            console.log(state.elements_P.length);
            commit('setShowP', state.elements_P.length === 0);
            // show_p.value = ();
            console.log(state.show_P);
          })
          .catch((error) => {
            ElMessage({
              message: "获取文档错误，请重试",
              type: 'error'
            });
            console.log(error.config.data);
            console.log(error.data);
          })
    },
  },
  mutations: {
    login(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = {};
      state.isLoggedIn = false
      window.sessionStorage.clear()
    },
    setUser(state, user) {
      state.user = user;
    },
    updateUser(state, data) {
      state.user.email = data.email;
      state.user.name = data.name;
      state.user.nickname = data.nickname;
      state.user.token = data.token;
      state.user.id=data.id;
    },
    // setCurTeamId(state, newTeamId) {
    //   state.curTeamId = newTeamId;
    // },
    // setCurProjectId(state, newProjectId) {
    //   state.curProjectId = newProjectId;
    // },
    setProjectData(state, data) {
      state.projectData = data;
    },
    setPersonData(state, data) {
      state.personData = data;
    },
    setCurRoleNum(state, data) {
      state.curRoleNum = data;
    },
    // 用于设置预览和取消预览
    setPreview(state) {
      state.preview = !state.preview 
    },
    setPageData(state, data) {
      state.pageData = data
    },
    clearPageData(state) {
      state.pageData = {}
    },
    setElementWList(state, wList) {
      state.elements_W = wList;
    },
    setElementPList(state, pList) {
      state.elements_P = pList;
    },
    setShowW(state, w) {
      state.show_W = w;
    },
    setShowP(state, p) {
      state.show_P = p;
    }
  },
})
