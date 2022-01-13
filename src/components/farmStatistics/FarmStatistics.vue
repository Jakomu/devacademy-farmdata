<template>
  <div>
    <button>Tables</button>
    <button>Graphs</button>
    <select @select="farmStatistics(value)">
      <option
        v-for="farm in getListOfFarms"
        :key="farm.farmId"
        value="farm.farmId"
      >
        {{ farm.name }}
      </option>
    </select>
  </div>
  <statistic-table></statistic-table>
</template>

<script>
import StatisticTable from "./StatisticTable.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.syncListOfFarms;
    // this.syncFarmStatistics;
  },
  components: { StatisticTable },
  computed: {
    ...mapGetters(["getListOfFarms", "getFarmStatistics"]),
    ...mapActions(["syncListOfFarms", "syncFarmStatistics"]),
  },
  methods: {
    farmStatistics(value) {
      this.syncFarmStatistics(value);
    },
  },
};
</script>
