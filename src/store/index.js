import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      serverStatus: true,
      listOfFarms: [],
      selectedFarm: "",
      allFarmStatistics: {},
      filteredStatistics: [],
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
    syncFarmStatistics(state, payload) {
      const farmId = payload;
      const url = "http://localhost:8080/v1/farms/" + farmId + "/stats";
      axios(url).then((res) => {
        if (res.statusText != "OK") {
          console.log("Ei yhteyttä");
          //luo errortapahtuma
        } else {
          if (farmId in state.allFarmStatistics) {
            state.allFarmStatistics[farmId] = res.data;
          } else {
            state.allFarmStatistics[farmId] = res.data;
          }
        }
      });
    },
    changeSelectedFarm(state, farm) {
      state.selectedFarm = farm;
    },
    // filterStatistics(state, filterOption) {
    //filteröi statsit
    // },
  },
  getters: {
    listOfFarms(state) {
      return state.listOfFarms;
    },
    selectedFarm(state) {
      return state.selectedFarm;
    },
    farmStatistics: (state) => (farmId) => {
      return state.allFarmStatistics[farmId];
    },
    filteredStatistics(state) {
      return state.filteredStatistics;
    },
  },
  actions: {
    checkServerStatus(context) {
      context.commit("checkServerStatus");
    },
    syncListOfFarms(context) {
      context.commit("syncListOfFarms");
    },
    syncFarmStatistics(context, payload) {
      context.commit("syncFarmStatistics", payload);
    },
    changeSelectedFarm(context, payload) {
      context.commit("changeSelectedFarm", payload);
    },
    resetSelectedFarm(context) {
      context.commit("changeSelectedFarm", "");
    },
    filterStatistics(context, filterOption) {
      context.commit("filterStatistics", filterOption);
    },
  },
  modules: {},
});
