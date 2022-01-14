import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      serverStatus: true,
      listOfFarms: [],
      selectedFarm: "",
      allFarmStatistics: {},
      validatedStatistics: [],
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
      axios(url)
        .then((res) => {
          if (res.statusText != "OK") {
            console.log("Ei yhteyttä");
            //luo errortapahtuma
          } else {
            //onko turha?
            if (farmId in state.allFarmStatistics) {
              state.allFarmStatistics[farmId] = res.data;
            } else {
              state.allFarmStatistics[farmId] = res.data;
            }
          }
        })
        .then(() => {
          state.validatedStatistics = state.allFarmStatistics[
            farmId
          ].measurements.filter(
            (obj) =>
              (obj.sensor_type == "ph" && obj.value >= 0 && obj.value <= 14) ||
              (obj.sensor_type == "rainfall" &&
                obj.value >= 0 &&
                obj.value <= 500) ||
              (obj.sensor_type == "temperature" &&
                obj.value >= -50 &&
                obj.value <= 100)
          );
        });
    },
    changeSelectedFarm(state, farm) {
      state.selectedFarm = farm;
    },
    // filterStatistics(state, filterOption) {
    //   const data = state.allFarmStatistics[state.selectedFarm].measurements;
    //   for (obj in data) {
    //     if ()
    //   }
    // },
    // validateData(state, payload) {
    //   console.log("validointi alkoi");
    //   const farmId = payload;
    //   state.validatedStatistics = state.allFarmStatistics[
    //     farmId
    //   ].measurements.filter((obj) => {
    //     if (obj.sensor_type == "ph") {
    //       obj.value >= 0 && obj.value <= 14;
    //     } else if (obj.sensor_type == "rainfall") {
    //       obj.value >= 0 && obj.value <= 500;
    //     } else if (obj.sensor_type == "temperature") {
    //       obj.value >= -50 && obj.value <= 100;
    //     }
    //   });
    //   console.log(state.validatedStatistics);
    //   console.log("validointi päättyi");
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
    //async/await ei toimi!!!!
    syncFarmStatistics(context, payload) {
      context.commit("syncFarmStatistics", payload);
      // context.commit("validateData", payload);
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
