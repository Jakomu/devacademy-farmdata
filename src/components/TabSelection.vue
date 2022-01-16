<template>
  <div>
    <button @click="$router.push('farms')">Home</button>
    <button @click="$router.push('farms')">Farms</button>
    <button @click="$router.push('statistics')">Statistics</button>
  </div>
</template>

<style scoped>
button {
  background-color: rgb(45, 153, 45);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
}
</style>
