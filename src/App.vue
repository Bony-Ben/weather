<template>
  <div id="myapp" :style="{ backgroundImage: 'url(' + background + ')' }">
    <main :class="{ dim: nightTime, home: isHome }">
      <SearchBar></SearchBar>
      <router-view />
    </main>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar";

export default {
  components: {
    SearchBar,
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
    isHome() {
      return this.weather.main == undefined;
    },
    background() {
      if (this.weather.main == undefined) {
        return "https://i.pinimg.com/originals/50/50/34/505034934eb44b4721e732a1bd3bfe65.png";
      } else if (this.weather.main.temp - 273.15 <= 0) {
        return "https://cdna.artstation.com/p/assets/images/images/019/251/130/large/steven-lu-sketch-xueshan.jpg?1562680503";
      } else if (this.weather.weather[0].main == "Clear") {
        return "https://i.pinimg.com/originals/bb/2b/54/bb2b542f4ed4cd7ef5c42760f9c6c097.png";
      } else if (
        this.weather.weather[0].main == "Thunderstorm" ||
        this.weather.weather[0].main == "Drizzle" ||
        this.weather.weather[0].main == "Rain"
      ) {
        return "https://th.bing.com/th/id/Rc2445dd759cf52be7e37d294c62d730e?rik=E%2bbeVvSqV1hfGw&riu=http%3a%2f%2f33.media.tumblr.com%2f7a73856ab9301e8e4f27137dcb349219%2ftumblr_n63plyhz5t1qk9powo1_500.gif&ehk=EIKWuA%2blDVESEGyoVJ6WtV7KfyCOTnaoA732jrZ5rfU%3d&risl=&pid=ImgRaw";
      } else {
        return "https://krot.info/uploads/posts/2020-01/1579217305_10-32.jpg";
      }
    },
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>

<style scoped>
#myapp {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  transition: 0.5s;
}

main {
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.25)
  );
}

.dim {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0.75)
  );
}

.home {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  );
}
</style>
