import { Module } from "vuex";

import RootStateTypes from "../../interface";
import userStateTypes from "../userinfo/interface";

const userInfoModule: Module<userStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    staffFlag: null,
    username: "",
  },
  mutations: {
    ADD_COUNT(state, data) {
      state.staffFlag = data.staffFlag;
      state.username = data.username;
    },
  },
  actions: {},
  modules: {},
};

export default userInfoModule;
