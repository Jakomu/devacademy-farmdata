<template>
  <div>
    <h1>{{ listOfFarms[selectedFarm - 1].name }}</h1>
    <the-chart></the-chart>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheChart from "./TheChart.vue";
export default {
  components: { TheChart },
  props: ["id"],
  computed: {
    ...mapGetters([
      "filteredStatistics",
      "loading",
      "listOfFarms",
      "selectedFarm",
    ]),
  },
  methods: {
    ...mapActions(["createChartData"]),
  },
  mounted() {
    this.createChartData;
  },
};
</script>
