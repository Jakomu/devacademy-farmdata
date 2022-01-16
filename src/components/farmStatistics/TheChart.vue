<template>
  <h2>PH</h2>
  <LineChart class="linechart" :chartData="phChartData" />
  <h2>TEMPERATURE</h2>
  <LineChart class="linechart" :chartData="temperatureChartData" />
  <h2>RAINFALL</h2>
  <LineChart class="linechart" :chartData="rainfallChartData" />
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
.linechart {
  width: 70%;
  height: 300px;
  margin: auto;
}
</style>
