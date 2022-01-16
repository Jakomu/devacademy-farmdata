<template>
  <div>
    <button
      @click="$router.push('home')"
      :class="{ activeBtn: activeTab == 'home' }"
    >
      Home
    </button>
    <button
      @click="$router.push('farms')"
      :class="{ activeBtn: activeTab == 'farms' }"
    >
      Farms
    </button>
    <button
      @click="$router.push('statistics')"
      :class="{ activeBtn: activeTab == 'statistics' }"
    >
      Statistics
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["activeTab"]),
  },
};
</script>

<style scoped>
button {
  background-color: rgb(45, 153, 45);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-style: none;
  box-shadow: 0px 1px 2px black;
  padding: 0.5rem 1rem;
  margin: 0 0 1rem 0;
}
</style>
