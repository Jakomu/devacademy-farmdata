import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      error: false,
      errorMessage: "",
      activeTab: "home",
      serverStatus: true,
      listOfFarms: [],
      selectedFarm: "",
      allFarmStatistics: {},
      validatedStatistics: [],
      filteredStatistics: [],
      orderAscending: true,
      activatedOrder: "datetime",
      statisticType: "table",
      allMonthlyData: {},
      phChartData: {},
      temperatureChartData: {},
      rainfallChartData: {},
      selectedYear: "2019",
      chartLabelsMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  mutations: {
    syncListOfFarms(state) {
      state.error = false;
      state.errorMessage = "";
      state.loading = true;
      axios("http://localhost:8080/v1/farms")
        .catch((error) => {
          state.error = true;
          state.errorMessage = error.message;
          console.log(error.message);
        })
        .then((res) => {
          state.listOfFarms = [];
          res.data.forEach((farm) => {
            state.listOfFarms.push(farm);
          });
        });
      state.loading = false;
    },
    syncFarmStatistics(state) {
      state.error = false;
      state.errorMessage = "";
      state.loading = true;
      const farmId = state.selectedFarm;
      const url = "http://localhost:8080/v1/farms/" + farmId + "/stats";
      axios(url)
        .catch((error) => {
          state.error = true;
          state.errorMessage = error.message;
          console.log(error.message);
        })
        .then((res) => {
          state.allFarmStatistics[farmId] = res.data;
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
      if (startIndex < 0) {
        state.filteredStatistics.splice(0);
      } else state.filteredStatistics.splice(0, startIndex);
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
    syncMonthlyStatistics(state) {
      state.error = false;
      state.errorMessage = "";
      state.loading = true;
      const farmId = state.selectedFarm;
      const urlph =
        "http://localhost:8080/v1/farms/" + farmId + "/stats/ph/monthly";
      axios(urlph)
        .catch((error) => {
          state.error = true;
          state.errorMessage = error.message;
          console.log(error.message);
        })
        .then((res) => {
          state.allMonthlyData.ph = res.data;
        })
        .then(() => {
          const urltemp =
            "http://localhost:8080/v1/farms/" +
            farmId +
            "/stats/temperature/monthly";
          axios(urltemp)
            .catch((error) => {
              state.error = true;
              state.errorMessage = error.message;
              console.log(error.message);
            })
            .then((res) => {
              state.allMonthlyData.temperature = res.data;
            })
            .then(() => {
              const urlrain =
                "http://localhost:8080/v1/farms/" +
                farmId +
                "/stats/rainfall/monthly";
              axios(urlrain)
                .catch((error) => {
                  state.error = true;
                  state.errorMessage = error.message;
                  console.log(error.message);
                })
                .then((res) => {
                  state.allMonthlyData.rainfall = res.data;
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
                  state.phChartData = {
                    labels: state.chartLabelsMonths,
                    datasets: [
                      {
                        data: [],
                        backgroundColor: "green",
                        borderColor: "green",
                        tension: 0.3,
                        options: {
                          plugins: {
                            title: {
                              display: true,
                              text: "PH",
                              position: "top",
                              align: "center",
                            },
                            legend: {
                              display: true,
                            },
                          },
                        },
                      },
                    ],
                  };
                  state.allMonthlyData.ph.stats.forEach((stat) => {
                    if (stat.year == state.selectedYear) {
                      state.phChartData.datasets[0].data[stat.month - 1] =
                        stat.average.toFixed(2);
                    }
                  });
                  state.temperatureChartData = {
                    labels: state.chartLabelsMonths,
                    datasets: [
                      {
                        data: [],
                        backgroundColor: "green",
                        borderColor: "green",
                        tension: 0.3,
                      },
                    ],
                  };
                  state.allMonthlyData.temperature.stats.forEach((stat) => {
                    if (stat.year == state.selectedYear) {
                      state.temperatureChartData.datasets[0].data[
                        stat.month - 1
                      ] = stat.average.toFixed(2);
                    }
                  });
                  state.rainfallChartData = {
                    labels: state.chartLabelsMonths,
                    datasets: [
                      {
                        data: [],
                        backgroundColor: "green",
                        borderColor: "green",
                        tension: 0.3,
                      },
                    ],
                  };
                  state.allMonthlyData.rainfall.stats.forEach((stat) => {
                    if (stat.year == state.selectedYear) {
                      state.rainfallChartData.datasets[0].data[stat.month - 1] =
                        stat.average.toFixed(2);
                    }
                  });
                });
            });
        });
    },
    changeSelectedYear(state, year) {
      state.selectedYear = year;
    },
    activateTab(state, tab) {
      state.activeTab = tab;
    },
  },
  getters: {
    listOfFarms(state) {
      return state.listOfFarms;
    },
    selectedFarm(state) {
      return state.selectedFarm;
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
    phChartData(state) {
      return state.phChartData;
    },
    temperatureChartData(state) {
      return state.temperatureChartData;
    },
    rainfallChartData(state) {
      return state.rainfallChartData;
    },
    activeTab(state) {
      return state.activeTab;
    },
    error(state) {
      return state.error;
    },
    errorMessage(state) {
      return state.errorMessage;
    },
  },
  actions: {
    checkServerStatus(context) {
      context.commit("checkServerStatus");
    },
    syncListOfFarms(context) {
      context.commit("syncListOfFarms");
    },
    syncFarmStatistics(context) {
      context.commit("syncFarmStatistics");
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
    syncMonthlyStatistics(context) {
      context.commit("syncMonthlyStatistics");
    },
    changeSelectedYear(context, year) {
      context.commit("changeSelectedYear", year);
    },
    activateTab(context, tab) {
      context.commit("activateTab", tab);
    },
  },
});
