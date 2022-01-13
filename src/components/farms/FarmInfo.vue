<template>
  <div>
    <h2>Farm Info</h2>
  </div>
  <div class="colums2">
    <farm-card
      v-for="farm in getListOfFarms"
      :key="farm.farmId"
      :farmInfo="farm"
    ></farm-card>
  </div>
</template>

<script>
import FarmCard from "./FarmCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  mounted() {
    this.syncListOfFarms;
  },
  components: {
    FarmCard,
  },
  computed: {
    ...mapGetters(["getListOfFarms"]),
    ...mapActions(["syncListOfFarms"]),
  },
};
</script>
