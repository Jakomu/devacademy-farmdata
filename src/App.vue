<template>
  <the-header> </the-header>
  <button @click="check">CHECK</button>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  computed: {
    // ...mapActions(["checkServerStatus"]),
  },
  methods: {
    check() {
      this.$store.dispatch("checkServerStatus");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  margin: 0;
  box-sizing: border-box;
}
</style>
