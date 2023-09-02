import { createStore } from 'vuex'
import axios from "axios";
import message from "@element-plus/icons/lib/Message";
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
    }
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
    }
    
  },
})
