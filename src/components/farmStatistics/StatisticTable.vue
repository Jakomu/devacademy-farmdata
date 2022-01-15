<template>
  <div>
    <h1>{{ id }}</h1>
    <div>
      <button @click="filterStatistics('all')">All measurements</button>
      <button @click="filterStatistics('rainfall')">Rainfall</button>
      <button @click="filterStatistics('temperature')">Temperature</button>
      <button @click="filterStatistics('ph')">Ph-value</button>
    </div>
    <table>
      <tr>
        <th @click="sortOrder('datetime')">Date/time</th>
        <th @click="sortOrder('sensor_type')">Sensor</th>
        <th @click="sortOrder('value')">Value</th>
      </tr>
      <tr v-for="obj in filteredStatistics" :key="obj.datetime + obj.value">
        <td>{{ obj.datetime }}</td>
        <td>{{ obj.sensor_type }}</td>
        <td>{{ obj.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapGetters(["filteredStatistics", "loading"]),
  },
  methods: {
    ...mapActions(["filterStatistics", "sortOrder"]),
  },
};
</script>

<style scoped></style>
