import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    isLoggedIn: false,
    user: {},
    // curTeamId: {},
    // curProjectId: {},
    projectData: []
  },
  actions: {
    updateUser({ commit }, data) {
      commit('updateUser', data);
    },
    // async createNewProject({ state, commit }, { curTeamId, NewPjName, NewPjDes }) {
    //   try {
    //     const response = await axios.post('/project/create', {
    //       team_id: curTeamId,
    //       projectName: NewPjName,
    //       projectDescription: NewPjDes,
    //     });
    //
    //     if (response.data.code === 200) {
    //       // commit('setCurProjectId', response.data.id); // 设置当前项目的 ID
    //       ElMessage({
    //         message: '新建成功',
    //         type:'success'
    //       })
    //       window.sessionStorage.setItem('curProjectId', response.data.project_id);
    //       await router.push('/prototype');
    //       return response.data; // 返回成功的响应数据
    //     } else {
    //       ElMessage({
    //         message: response.data.error,
    //         type:'error'
    //       });
    //       throw new Error(response.data.error); // 抛出错误，进入 catch 块
    //     }
    //   } catch (error) {
    //
    //     console.error('新建项目失败:', error);
    //     throw error; // 抛出错误，可以在组件中捕获处理
    //   }
    // },

    async fetchProjectList({ commit, state }, curTeamId) {
      // 清空projectData
      commit('setProjectData', []); // 清空数组
      try {
        const response = await axios.post('/project/info', {
          team_id: Number(curTeamId),
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
    }
  },
})
