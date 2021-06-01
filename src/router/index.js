import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import WeatherInfo from "../views/WeatherInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/weather/:city",
    name: "Weather",
    component: WeatherInfo,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
