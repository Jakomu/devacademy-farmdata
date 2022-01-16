<template>
  <div>
    <h2>Farm Info</h2>
  </div>
  <div class="flex">
    <farm-card
      v-for="farm in listOfFarms"
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
    this.activateTab("farms");
  },
  components: {
    FarmCard,
  },
  computed: {
    ...mapGetters(["listOfFarms"]),
    ...mapActions(["syncListOfFarms"]),
  },
  methods: {
    ...mapActions(["activateTab"]),
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
