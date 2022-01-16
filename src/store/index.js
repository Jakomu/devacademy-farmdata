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
      activatedOrder: "datetime",
      statisticType: "table",
      allMonthlyData: {},
      monthlyDatasets: {},
      selectedYear: "2019",
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
            obj.datetime = obj.datetime.slice(0, -4);
          });
        });
      state.loading = false;
    },
    changeSelectedFarm(state, farm) {
      state.selectedFarm = farm;
      state.filteredStatistics = [];
      state.activatedOrder = "datetime";
      state.orderAscending = true;
      //voisi miettiä jos laittaisi automaattisesti "all"-näkymän
    },
    filterStatistics(state, filterOption) {
      state.filteredStatistics = [];
      const data = state.validatedStatistics;
      if (filterOption != "all") {
        state.filteredStatistics = data.filter(
          (obj) => obj.sensor_type == filterOption
        );
      } else state.filteredStatistics = data;
    },
    sortOrder(state, order) {
      if (order == "value") {
        if (state.activatedOrder != "value") {
          state.filteredStatistics = state.filteredStatistics.sort((a, b) => {
            state.activatedOrder = "value";
            return a.value - b.value;
          });
        } else {
          state.orderAscending = !state.orderAscending;
          state.filteredStatistics = state.filteredStatistics.reverse();
        }
      } else if (order == "sensor_type") {
        if (state.activatedOrder != "sensor_type") {
          state.filteredStatistics = state.filteredStatistics.sort((a, b) => {
            state.activatedOrder = "sensor_type";
            return a.sensor_type
              .toLowerCase()
              .localeCompare(b.sensor_type.toLowerCase());
          });
        } else {
          state.orderAscending = !state.orderAscending;
          state.filteredStatistics = state.filteredStatistics.reverse();
        }
      } else if (order == "datetime") {
        if (state.activatedOrder != "datetime") {
          state.filteredStatistics = state.filteredStatistics.sort((a, b) => {
            state.activatedOrder = "datetime";
            return a.datetime
              .toLowerCase()
              .localeCompare(b.datetime.toLowerCase());
          });
        } else {
          state.orderAscending = !state.orderAscending;
          state.filteredStatistics = state.filteredStatistics.reverse();
        }
      }
    },
    changeStatisticType(state, type) {
      state.statisticType = type;
    },
    changeStartDate(state, startDate) {
      state.filteredStatistics = state.filteredStatistics.sort((a, b) => {
        state.activatedOrder = "datetime";
        return a.datetime.toLowerCase().localeCompare(b.datetime.toLowerCase());
      });
      const startIndex = state.filteredStatistics.findIndex(
        (obj) => obj.datetime.localeCompare(startDate) >= 0
      );
      state.filteredStatistics.splice(0, startIndex);
    },
    changeEndDate(state, endDate) {
      state.filteredStatistics = state.filteredStatistics.sort((a, b) => {
        state.activatedOrder = "datetime";
        return a.datetime.toLowerCase().localeCompare(b.datetime.toLowerCase());
      });
      const endIndex = state.filteredStatistics.findIndex(
        (obj) => obj.datetime.localeCompare(endDate) >= 0
      );
      state.filteredStatistics.splice(endIndex);
    },
    syncMonthlyStatistics(state, farmId) {
      state.loading = true;
      const urlph =
        "http://localhost:8080/v1/farms/" + farmId + "/stats/ph/monthly";
      axios(urlph)
        .then((res) => {
          if (res.statusText != "OK") {
            console.log("Ei yhteyttä");
            //luo errortapahtuma
          } else {
            state.allMonthlyData.ph = res.data;
          }
        })
        .then(() => {
          const urltemp =
            "http://localhost:8080/v1/farms/" +
            farmId +
            "/stats/temperature/monthly";
          axios(urltemp)
            .then((res) => {
              if (res.statusText != "OK") {
                console.log("Ei yhteyttä");
                //luo errortapahtuma
              } else {
                state.allMonthlyData.temperature = res.data;
              }
            })
            .then(() => {
              const urlrain =
                "http://localhost:8080/v1/farms/" +
                farmId +
                "/stats/rainfall/monthly";
              axios(urlrain)
                .then((res) => {
                  if (res.statusText != "OK") {
                    console.log("Ei yhteyttä");
                    //luo errortapahtuma
                  } else {
                    state.allMonthlyData.rainfall = res.data;
                  }
                  state.loading = false;
                })
                //validate monthlyData
                .then(() => {
                  state.allMonthlyData.ph.stats =
                    state.allMonthlyData.ph.stats.filter(
                      (obj) =>
                        obj.year &&
                        obj.month >= 1 &&
                        obj.month <= 12 &&
                        obj.average >= 0 &&
                        obj.average <= 14
                    );
                  state.allMonthlyData.temperature.stats =
                    state.allMonthlyData.temperature.stats.filter(
                      (obj) =>
                        obj.year &&
                        obj.month >= 1 &&
                        obj.month <= 12 &&
                        obj.average >= -50 &&
                        obj.average <= 100
                    );
                  state.allMonthlyData.rainfall.stats =
                    state.allMonthlyData.rainfall.stats.filter(
                      (obj) =>
                        obj.year &&
                        obj.month >= 1 &&
                        obj.month <= 12 &&
                        obj.average >= 0 &&
                        obj.average <= 500
                    );
                  //sort monthlyData to datasets
                  const monthlyData = {
                    ph: [{ data: [] }],
                    temperature: [{ data: [] }],
                    rainfall: [{ data: [] }],
                  };
                  state.allMonthlyData.ph.stats.forEach((stat) => {
                    if (stat.year == state.selectedYear) {
                      monthlyData.ph[0].data[stat.month - 1] =
                        stat.average.toFixed(2);
                    }
                  });
                  state.allMonthlyData.temperature.stats.forEach((stat) => {
                    if (stat.year == state.selectedYear) {
                      monthlyData.temperature[0].data[stat.month - 1] =
                        stat.average.toFixed(2);
                    }
                  });
                  state.allMonthlyData.rainfall.stats.forEach((stat) => {
                    if (stat.year == state.selectedYear) {
                      monthlyData.rainfall[0].data[stat.month - 1] =
                        stat.average.toFixed(2);
                    }
                  });
                  state.monthlyDatasets = monthlyData;
                });
            });
        });
    },

    selectChartYear(state, year) {
      state.selectedYear = year;
      console.log(state.selectedYear);
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
    activatedOrder(state) {
      return state.activatedOrder;
    },
    statisticType(state) {
      return state.statisticType;
    },
    selectedYear(state) {
      return state.selectedYear;
    },
    monthlyDatasets(state) {
      return state.monthlyDatasets;
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
    changeStatisticType(context, type) {
      context.commit("changeStatisticType", type);
    },
    createChartData(context) {
      context.commit("createChartData");
    },
    changeStartDate(context, startDate) {
      context.commit("changeStartDate", startDate);
    },
    changeEndDate(context, endDate) {
      context.commit("changeEndDate", endDate);
    },
    syncMonthlyStatistics(context, farmId) {
      context.commit("syncMonthlyStatistics", farmId);
    },
    selectChartYear(context, year) {
      context.commit("selectChartYear", year);
    },
  },
});
