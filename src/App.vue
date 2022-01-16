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
h1 {
  text-shadow: 0px 0px 3px rgb(255, 255, 255);
}
.card {
  border-style: solid;
  box-shadow: 0px 0px 5px black;
  padding: 1rem;
  max-width: 70%;
  margin: 1rem auto;
}
button {
  padding: 0.5rem 1rem;
  margin: 5px;
  background-color: rgb(43, 153, 49);
  border-radius: 5px;
}
input,
select {
  background-color: rgb(231, 231, 211);
}
.activeBtn {
  transition-duration: 500ms;
  transform: scale(1.1);
}
</style>
