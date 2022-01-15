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
        datasets: [{ data: [20, 15] }],
      },
    };
  },
  props: ["sensor"],
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters(["monthlyStatistics", "selectedYear"]),
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
