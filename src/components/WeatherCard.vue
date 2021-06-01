<template>
  <div class="cardcontainer">
    <div @click="details()" class="card">
      <div class="cityname">{{ weather.name }}, {{ weather.sys.country }}</div>
      <div>
        <img v-if="icon == 'snow'" class="icon" src="../assets/snowIcon.png" />
        <img
          v-else-if="icon == 'clear'"
          class="icon"
          src="../assets/clearIcon.png"
        />
        <img
          v-else-if="icon == 'rain'"
          class="icon"
          src="../assets/rainIcon.png"
        />
        <img v-else class="icon" src="../assets/cloudsIcon.png" />
      </div>
      <div>{{ (weather.main.temp - 273.15).toFixed(1) }}°C</div>
    </div>
    <img class="remove" @click="remove()" src="../assets/close.png" />
  </div>
</template>

<script>
export default {
  name: "WeatherCard",
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  methods: {
    details() {
      this.$router.push(`/weather/${this.weather.name}`);
    },
    remove() {
      this.$store.dispatch("removeFavorite", this.weather);
    },
  },
  computed: {
    icon() {
      if (this.weather.main.temp - 273.15 <= 0) {
        return "snow";
      } else if (this.weather.weather[0].main == "Clear") {
        return "clear";
      } else if (
        this.weather.weather[0].main == "Thunderstorm" ||
        this.weather.weather[0].main == "Drizzle" ||
        this.weather.weather[0].main == "Rain"
      ) {
        return "rain";
      } else {
        return "clouds";
      }
    },
  },
};
</script>

<style scoped>
.icon {
  height: 40px;
  margin-right: 10px;
}

.remove {
  margin-left: 10px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  transition: 0.5s;
}

.remove:hover {
  background-color: rgba(255, 255, 255, 0.8);
  height: 60px;
  border-radius: 40px;
  cursor: pointer;
}

.cardcontainer {
  display: flex;
  justify-content: center;
  place-items: center;
  flex-wrap: wrap;
}

.cityname {
  flex-grow: 1;
}

.card {
  display: flex;
  place-items: center;
  flex-wrap: wrap;
  font-size: 28px;
  font-weight: bold;
  width: 350px;
  padding: 15px;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50px;
  transition: 0.5s;
}

.card:hover {
  background-color: rgba(255, 255, 255, 0.8);
  width: 400px;
  cursor: pointer;
}
</style>
