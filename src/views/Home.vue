<template>
  <div>
    <ul>
      <li v-for="(fav, idx) in favorites" :key="idx">
        <WeatherCard :weather="fav" />
      </li>
    </ul>
  </div>
</template>

<script>
import WeatherCard from "../components/WeatherCard";

export default {
  name: "Home",
  components: {
    WeatherCard,
  },
  created() {
    this.$store.commit("updateWeather", {});
  },
  computed: {
    favorites() {
      return this.$store.state.favorites;
    },
  },
};
</script>
<style scoped></style>
