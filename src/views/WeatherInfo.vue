<template>
  <div>
    <div v-if="weather.name">
      <div class="location-box">
        <div class="location">
          <a
            target="_blank"
            class="location"
            :href="
              'https://www.google.ca/search?q=' +
                weather.name +
                ', ' +
                weather.sys.country
            "
          >
            {{ weather.name }}, {{ weather.sys.country }}
          </a>
        </div>
        <div class="date">
          {{ new Date().toDateString() }}
          <span v-if="nightTime">(Night)</span>
          <span v-else>(Day)</span>
        </div>
      </div>
      <div class="weather-box">
        <div class="temp">{{ (weather.main.temp - 273.15).toFixed(1) }}°C</div>
        <div class="weather">{{ weather.weather[0].main }}</div>
      </div>
      <img @click="addFavorite()" src="../assets/heart.png" />
      <img @click="home()" src="../assets/close.png" />
    </div>
    <div v-else>
      <div class="notFound">City Not Found</div>
      <img class="elseimg" @click="home()" src="../assets/close.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherInfo",
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timerId: null,
    };
  },
  created() {
    this.$store.dispatch("updateWeather", this.city);
    this.timerId = setInterval(
      () => this.$store.dispatch("updateWeather", this.city),
      60 * 1000
    );
  },
  destroyed() {
    clearInterval(this.timerId);
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    addFavorite() {
      this.$store.dispatch("addFavorite", this.weather);
      this.$router.push("/");
    },
  },
  computed: {
    weather() {
      return this.$store.state.weather;
    },
    nightTime() {
      if (this.weather.main == undefined) return false;

      const dt = this.weather.dt;
      if (dt >= this.weather.sys.sunrise && dt <= this.weather.sys.sunset) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
img {
  height: 60px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  transition: 0.5s;
}

img:hover {
  background-color: rgba(255, 255, 255, 0.8);
  height: 70px;
  border-radius: 40px;
  cursor: pointer;
}

.elseimg {
  margin-left: 20px;
  height: 50px;
}

.elseimg:hover {
  margin-left: 20px;
  height: 60px;
}

div {
  text-align: center;
}

.location {
  margin-top: 20px;
}

.date {
  color: white;
  font-size: 20px;
  font-style: italic;
}

.temp {
  display: inline-block;
  margin-top: 25px;
  padding: 10px 25px;
  color: white;
  font-size: 100px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50px;
}

.notFound {
  display: inline-block;
  margin-top: 25px;
  padding: 10px 25px;
  color: white;
  font-size: 50px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 25px;
}

.weather {
  color: white;
  font-size: 50px;
  font-style: italic;
}
a {
  text-decoration: none;
  color: white;
  font-size: 40px;
}
</style>
