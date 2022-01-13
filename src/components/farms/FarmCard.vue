<template>
  <div>
    <h3>{{ farmInfo.name }}</h3>
    <p>{{ farmInfo.farmId }}</p>
    <p>{{ farmInfo.location }}</p>
    <p>{{ farmInfo.established }}</p>
  </div>
</template>

<script>
export default {
  props: ["farmInfo"],
};
</script>

<style scoped>
div {
  border-style: solid;
  max-width: 70%;
  margin: 1rem auto;
}
</style>
