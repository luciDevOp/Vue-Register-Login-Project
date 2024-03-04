import { createStore } from 'vuex';
import router from '../routes';

function isTokenExpired(token) {
  if (!token) return true; 
  const expiry = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
  return expiry < new Date(); 
}

const token = localStorage.getItem("accessToken");

export const store = createStore({
  state: {
    isLoggedIn: !!token, 
  },
  getters: {
    loginState: (state) => {
      return state.isLoggedIn;
    },
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
      router.push("/");
    },
  },
  actions: {
    login({ commit }, expires_in) {
      if (isTokenExpired(token)) {
        commit("logout");
        return;
      }
      setTimeout(() => {
        commit("logout");
      }, expires_in);
      commit("login");
    },
    logout({ commit }) {
      commit("logout");
    },
  },
});
