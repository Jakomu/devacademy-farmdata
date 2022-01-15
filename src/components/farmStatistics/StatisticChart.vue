<template>
  <div>
    <h1>{{ listOfFarms[selectedFarm - 1].name }}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapGetters([
      "filteredStatistics",
      "loading",
      "listOfFarms",
      "selectedFarm",
    ]),
  },
};
</script>
