<template>
  <div>
    <h1>{{ listOfFarms[selectedFarm - 1].name }}</h1>
    <select @input="selectYear" name="year" id="year">
      <option selected value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
    </select>
    <p v-if="loading">Loading...</p>
    <the-chart :sensor="'ph'"></the-chart>
    <the-chart :sensor="'temperature'"></the-chart>
    <the-chart :sensor="'rainfall'"></the-chart>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TheChart from "./TheChart.vue";
export default {
  components: { TheChart },
  props: ["id"],
  computed: {
    ...mapGetters(["loading", "listOfFarms", "selectedFarm"]),
  },
  methods: {
    ...mapActions(["selectChartYear"]),
    selectYear(event) {
      const year = event.target.value;
      this.selectChartYear(year);
    },
  },
};
</script>
