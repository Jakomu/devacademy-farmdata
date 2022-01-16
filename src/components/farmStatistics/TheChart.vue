<template>
  <LineChart :chartData="phChartData" />
  <LineChart :chartData="temperatureChartData" />
  <LineChart :chartData="rainfallChartData" />
</template>

<script>
import { mapGetters } from "vuex";
import { LineChart } from "vue-chart-3";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default {
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters(["phChartData", "temperatureChartData", "rainfallChartData"]),
  },
};
</script>

<style scoped>
* {
  width: 70%;
  height: 300px;
  margin: auto;
}
</style>
