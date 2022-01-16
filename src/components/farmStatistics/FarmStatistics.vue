<template>
  <div>
    <div>
      <button
        @click="changeType('table')"
        :class="{ activeBtn: statisticType == 'table' }"
      >
        Tables
      </button>
      <button
        @click="changeType('chart')"
        :class="{ activeBtn: statisticType == 'chart' }"
      >
        Charts
      </button>
      <select @input="selectFarm">
        <option value="" disabled selected>Select farm</option>
        <option
          v-for="farm in listOfFarms"
          :key="farm.farm_id"
          :value="farm.farm_id"
        >
          {{ farm.name }}
        </option>
      </select>
    </div>
    <div :class="{ card: selectedFarm }">
      <statistic-table
        v-if="this.selectedFarm && this.statisticType == 'table'"
        :id="selectedFarm"
      ></statistic-table>
      <statistic-chart
        v-else-if="this.selectedFarm && this.statisticType == 'chart'"
        :id="selectedFarm"
      >
      </statistic-chart>
      <p v-else>Please select a farm</p>
    </div>
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
    this.activateTab("statistics");
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
      "syncMonthlyStatistics",
      "activateTab",
    ]),
    selectFarm(event) {
      const farmId = event.target.value;
      this.changeSelectedFarm(farmId);
      this.syncFarmStatistics();
      this.syncMonthlyStatistics();
    },
    changeType(type) {
      this.changeStatisticType(type);
    },
  },
};
</script>

<style scoped>
select {
  margin: 1rem;
}
</style>
