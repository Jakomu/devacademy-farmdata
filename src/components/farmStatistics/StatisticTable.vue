<template>
  <div>
    <h1>{{ listOfFarms[selectedFarm - 1].name }}</h1>
    <div>
      <button @click="filterStatistics('all')">All measurements</button>
      <button @click="filterStatistics('rainfall')">Rainfall</button>
      <button @click="filterStatistics('temperature')">Temperature</button>
      <button @click="filterStatistics('ph')">Ph-value</button>
    </div>
    <div>
      <input @change="startDateInput" type="date" />
      <input @change="endDateInput" type="date" />
    </div>
    <table>
      <tr>
        <th
          :class="{ active: activatedOrder == 'datetime' }"
          @click="sortOrder('datetime')"
        >
          Date/time
        </th>
        <th
          :class="{ active: activatedOrder == 'sensor_type' }"
          @click="sortOrder('sensor_type')"
        >
          Sensor
        </th>
        <th
          :class="{ active: activatedOrder == 'value' }"
          @click="sortOrder('value')"
        >
          Value
        </th>
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
    ...mapGetters([
      "filteredStatistics",
      "loading",
      "activatedOrder",
      "listOfFarms",
      "selectedFarm",
    ]),
  },
  methods: {
    ...mapActions([
      "filterStatistics",
      "sortOrder",
      "changeStartDate",
      "changeEndDate",
    ]),
    startDateInput(event) {
      const startDate = event.target.value;
      this.changeStartDate(startDate);
    },
    endDateInput(event) {
      const endDate = event.target.value;
      this.changeEndDate(endDate);
    },
  },
};
</script>

<style scoped>
table {
  border-style: ridge;
  box-shadow: 0px 0px 15px black;
  border-radius: 5px;
  padding: 1rem;
  margin: 2rem auto;
}
th {
  border-style: solid;
  border-radius: 5px;
  padding: 1rem 1rem;
}
td {
  border-style: solid;
  border-width: 1px;
  border-radius: 2px;
  padding: 0.5rem 1rem;
}
.active {
  border-width: 4px;
}
</style>
