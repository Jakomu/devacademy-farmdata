import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      serverStatus: true,
      farmInfo: [],
    };
  },
  mutations: {
    checkServerStatus(state) {
      axios("http://localhost:8080/health").then((res) => {
        if (res.serverStatus == "OK") {
          state.serverStatus = true;
        } else state.serverStatus == false;
      });
      console.log(state.serverStatus);
    },
    syncFarmInfo(state) {
      axios("http://localhost:8080/v1/farms").then((res) => {
        if (res.statusText != "OK") {
          console.log("Ei yhteyttä");
          //luo errortapahtuma
        } else {
          res.data.forEach((farm) => {
            state.farmInfo.push(farm);
          });
        }
      });
    },
  },
  getters: {
    getFarmInfo(state) {
      return state.farmInfo;
    },
  },
  actions: {
    checkServerStatus(context) {
      context.commit("checkServerStatus");
    },
    syncFarmInfo(context) {
      context.commit("getFarmInfo");
    },
  },
  modules: {},
});
