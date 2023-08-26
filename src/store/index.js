import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    user: undefined,
    curTeamId: undefined,
  },
})
