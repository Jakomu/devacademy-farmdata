import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      serverStatus: true,
      listOfFarms: [],
      selectedFarm: "",
      allFarmStatistics: {},
    };
  },
  mutations: {
    checkServerStatus(state) {
      axios("http://localhost:8080/health").then((res) => {
        if (res.serverStatus == "OK") {
          state.serverStatus = true;
        } else state.serverStatus == false;
      });
    },
    syncListOfFarms(state) {
      axios("http://localhost:8080/v1/farms").then((res) => {
        if (res.statusText != "OK") {
          console.log("Ei yhteyttä");
          //luo errortapahtuma
        } else {
          state.listOfFarms = [];
          res.data.forEach((farm) => {
            state.listOfFarms.push(farm);
          });
        }
      });
    },
    syncFarmStatistics(state, id) {
      const url = "http://localhost:8080/v1/farms/" + id + "/stats";
      axios(url).then((res) => {
        if (res.statusText != "OK") {
          console.log("Ei yhteyttä");
          //luo errortapahtuma
        } else {
          //pitää luoda objektiksi allFarmStatisticsiin
          state.allFarmStatistics = res.data;
        }
      });
      console.log(state.allFarmStatistics);
    },
  },
  getters: {
    getListOfFarms(state) {
      return state.listOfFarms;
    },
    // getFarmStatistics(state, id) {
    //   return state.allFarmStatistics.id;
    // },
  },
  actions: {
    checkServerStatus(context) {
      context.commit("checkServerStatus");
    },
    syncListOfFarms(context) {
      context.commit("syncListOfFarms");
    },
    syncFarmStatistics(context, id) {
      context.commit("syncFarmStatistics", id);
    },
  },
  modules: {},
});
