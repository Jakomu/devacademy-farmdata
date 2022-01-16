<template>
  <the-header> </the-header>
  <tab-selection></tab-selection>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TabSelection from "./components/TabSelection.vue";

export default {
  components: {
    TheHeader,
    TabSelection,
  },
};
</script>

<style>
#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  background-color: rgb(182, 182, 152);
  margin: 0;
  box-sizing: border-box;
}
</style>
