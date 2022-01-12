<template>
  <div>
    <h2>Farm Info</h2>
  </div>
  <div class="colums2">
    <farm-card
      v-for="farm in getFarmInfo"
      :key="farm.farmId"
      :farmInfo="farm"
    ></farm-card>
  </div>
</template>

<script>
import FarmCard from "./FarmCard.vue";
export default {
  mounted() {
    this.$store.dispatch("syncFarmInfo");
  },
  components: {
    FarmCard,
  },
  computed: {
    getFarmInfo() {
      return this.$store.getters.getFarmInfo;
    },
  },
};
//farmdatoja farmien määrän verran
//kortteja joihin farmien tiedot
</script>
