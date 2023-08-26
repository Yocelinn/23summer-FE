import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    user: undefined,
  },
  mutations: {
    login(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
})
