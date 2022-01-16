<template>
  <div>
    <h1>{{ listOfFarms[selectedFarm - 1].name }}</h1>
    <label for="year">Select year:</label>
    <select @input="selectYear" name="year" id="year">
      <option selected value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
    </select>
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
    ...mapGetters(["listOfFarms", "selectedFarm"]),
  },
  methods: {
    ...mapActions(["changeSelectedYear", "syncMonthlyStatistics"]),
    selectYear(event) {
      const year = event.target.value;
      this.changeSelectedYear(year);
      this.syncMonthlyStatistics();
    },
  },
};
</script>

<style scoped>
select {
  margin-bottom: 1rem;
}
</style>
