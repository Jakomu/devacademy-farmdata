<template>
  <div>
    <h1>{{ id }}</h1>
    <div>
      <button>All measurements</button>
      <button @click="filterStatistics('rainfall')">Rainfall</button>
      <button>Temperature</button>
      <button>Ph-value</button>
    </div>
    <table>
      <tr>
        <th>Date/time</th>
        <th>Sensor</th>
        <th>Value</th>
      </tr>
      <tr v-for="obj in filteredStatistics" :key="obj.datetime">
        <td>{{ obj.datetime }}</td>
        <td>{{ obj.sensor_type }}</td>
        <td>{{ obj.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  //lisää actions ja luo filtteröintimutatio jne..
  computed: {
    ...mapGetters(["filteredStatistics"]),
  },
};
</script>

<style scoped></style>
