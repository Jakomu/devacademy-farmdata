<template>
  <div class="card">
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
  flex-basis: 40%;
}
</style>
