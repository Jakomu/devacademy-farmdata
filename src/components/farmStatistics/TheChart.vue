<template>
  <LineChart :chartData="chartData" />
</template>

<script>
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
  data() {
    return {
      chartData: {
        labels: ["Vihtori", "Pekka"],
        datasets: [{ data: [20, 15] }],
      },
    };
  },
  components: {
    LineChart,
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
