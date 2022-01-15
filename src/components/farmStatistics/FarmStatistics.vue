<template>
  <div>
    <div>
      <button @click="changeType('table')">Tables</button>
      <button @click="changeType('chart')">Charts</button>
      <select @input="selectFarm">
        <option value="" disabled selected>Select a farm</option>
        <option
          v-for="farm in listOfFarms"
          :key="farm.farm_id"
          :value="farm.farm_id"
        >
          {{ farm.name }}
        </option>
      </select>
    </div>
    <div v-if="loading"><p>Loading...</p></div>
    <statistic-table
      v-if="this.selectedFarm && this.statisticType == 'table'"
      :id="selectedFarm"
    ></statistic-table>
    <statistic-chart
      v-else-if="this.selectedFarm && this.statisticType == 'chart'"
      :id="selectedFarm"
    >
    </statistic-chart>
  </div>
</template>

<script>
import StatisticTable from "./StatisticTable.vue";
import StatisticChart from "./StatisticChart.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.syncListOfFarms;
    this.resetSelectedFarm;
  },
  components: { StatisticTable, StatisticChart },
  computed: {
    ...mapGetters(["listOfFarms", "selectedFarm", "loading", "statisticType"]),
    ...mapActions(["syncListOfFarms", "resetSelectedFarm"]),
  },
  methods: {
    ...mapActions([
      "changeSelectedFarm",
      "syncFarmStatistics",
      "changeStatisticType",
    ]),
    selectFarm(event) {
      const farmId = event.target.value;
      this.changeSelectedFarm(farmId);
      this.syncFarmStatistics(farmId);
    },
    changeType(type) {
      this.changeStatisticType(type);
    },
  },
};
</script>
