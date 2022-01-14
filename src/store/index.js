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
      loading: false, //tee loadinghäkkyrä tai joku semmonen
      orderAscending: true,
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
      state.loading = true;
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
      state.loading = false;
    },
    syncFarmStatistics(state, payload) {
      state.loading = true;
      const farmId = payload;
      const url = "http://localhost:8080/v1/farms/" + farmId + "/stats";
      axios(url)
        .then((res) => {
          if (res.statusText != "OK") {
            console.log("Ei yhteyttä");
            //luo errortapahtuma
          } else {
            state.allFarmStatistics[farmId] = res.data;
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
        })
        .then(() => {
          state.validatedStatistics.forEach((obj) => {
            obj.datetime = obj.datetime.replace("T", " ");
            obj.datetime = obj.datetime.replace("Z", "");
          });
        });
      state.loading = false;
    },
    changeSelectedFarm(state, farm) {
      state.selectedFarm = farm;
      state.filteredStatistics = [];
      //voisi miettiä jos laittaisi automaattisesti "all"-näkymän
    },
    filterStatistics(state, filterOption) {
      state.filteredStatistics = [];
      const data = state.validatedStatistics;
      if (filterOption != "all") {
        console.log(filterOption);
        state.filteredStatistics = data.filter(
          (obj) => obj.sensor_type == filterOption
        );
      } else state.filteredStatistics = data;
      console.log(state.filteredStatistics);
    },
    sortOrder(state, order) {
      //toimii valuella, mutta ei kirjaimilla...
      //ascending order kans pitää tehdä
      if (order == "value") {
        state.filteredStatistics = state.filteredStatistics.sort((a, b) => {
          return a.value - b.value;
        });
      } else {
        state.filteredStatistics = state.filteredStatistics.sort((a, b) => {
          return a.datetime - b.datetime;
        });
      }
    },
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
    loading(state) {
      return state.loading;
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
    sortOrder(context, order) {
      context.commit("sortOrder", order);
    },
  },
});
