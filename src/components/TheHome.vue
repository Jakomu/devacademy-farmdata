<template>
  <div class="card">
    <h1>Welcome to Farmdata over 9000!</h1>
    <p>Here you can find statistics from our partner farms.</p>
    <p>
      Under <span class="bold">Farms-tab</span> you can find all the basic info
      of our partners.
    </p>
    <p>
      Under <span class="bold">Statistics</span> you can find statistics about
      temperature, rainfall and ph-values.
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["activateTab"]),
  },
  mounted() {
    this.activateTab("home");
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
