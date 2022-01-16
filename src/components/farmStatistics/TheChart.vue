<template>
  <LineChart :chartData="chartData" />
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
  data() {
    return {
      chartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{ data: [] }],
      },
    };
  },
  props: ["sensor"],
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters(["selectedYear", "monthlyDatasets"]),
  },
  mounted() {
    if (this.sensor == "ph") {
      for (let i = 0; i < 12; i++) {
        this.chartData.datasets[0].data[i] = this.monthlyDatasets.ph[0].data[i];
      }
    } else if (this.sensor == "temperature") {
      for (let i = 0; i < 12; i++) {
        this.chartData.datasets[0].data[i] =
          this.monthlyDatasets.temperature[0].data[i];
      }
    } else if (this.sensor == "rainfall") {
      for (let i = 0; i < 12; i++) {
        this.chartData.datasets[0].data[i] =
          this.monthlyDatasets.rainfall[0].data[i];
      }
    }
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
