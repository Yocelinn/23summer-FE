import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
  plugins: [
    createPersistedState(),
  ],
})
