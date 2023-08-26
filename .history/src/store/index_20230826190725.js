import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    user: {},
    curTeamId: {},
    curProjectId: {},
  },
<<<<<<< HEAD
=======
  actions: {
    updateUser({ commit }, data) {
      commit('updateUser', data);
    }
  },
>>>>>>> Terry_x
  mutations: {
    login(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    logout(state) {
<<<<<<< HEAD
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
})
=======
      state.user = {};
      state.isLoggedIn = false
    },
    updateUser(state, data) {
      state.user.email = data.email;
      state.user.name = data.name;
      state.user.nickname = data.nickname;
      state.user.token = data.token;
    },
  },
})
>>>>>>> Terry_x
