<template>
  <div>
    <div>
      <button>Tables</button>
      <button>Graphs</button>
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
    <div><p>There is problem with statistic syncing...</p></div>
    <statistic-table
      v-if="this.selectedFarm"
      :id="selectedFarm"
    ></statistic-table>
  </div>
</template>

<script>
import StatisticTable from "./StatisticTable.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.syncListOfFarms;
    this.resetSelectedFarm;
  },
  components: { StatisticTable },
  computed: {
    ...mapGetters(["listOfFarms", "selectedFarm"]),
    ...mapActions(["syncListOfFarms", "resetSelectedFarm"]),
  },
  methods: {
    ...mapActions(["changeSelectedFarm", "syncFarmStatistics"]),
    selectFarm(event) {
      const farmId = event.target.value;
      this.changeSelectedFarm(farmId);
      this.syncFarmStatistics(farmId);
    },
  },
};
</script>
