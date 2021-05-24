import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios';

export default new Vuex.Store({
  state: {
    favorites: [],
    weather: {}
  },
  mutations: {
    updateWeather(state, weather){
      state.weather=weather;
    },
    updateFavorites(state,favorites){
      state.favorites=favorites;
    },
    addFavorite(state, weather){
      state.favorites.push(weather);
    },
    updateNthFavorite(state, {n, weather}){
      state.favorites[n]=weather;
    }
  },
  actions: {
    updateWeather({commit}, loc){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=d9a18e97e763677d7a265e33a139bc2a`)
      .then((result) => commit('updateWeather',result.data))
      .catch(function (){
        commit('updateWeather',{});
        console.log("City not found.");
      })
    },
    addFavorite({state, commit},weather){
      for(let i=0;i<state.favorites.length;i++)
        if(state.favorites[i].name==weather.name)
          return;
      commit('addFavorite',weather);
    },
    removeFavorite({state, commit},weather){
      commit('updateFavorites',state.favorites.filter((fav) => fav.name !=weather.name));
    },
    updateNthFavorite({commit},{n,loc}){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=d9a18e97e763677d7a265e33a139bc2a`)
      .then((result) => commit('updateNthFavorite',{n: n,weather: result.data}))
    },
    updateFavorites({state, dispatch}){
      for(let i=0;i<state.favorites.length;i++){
        dispatch('updateNthFavorite',{n: i,loc: state.favorites[i].name});
      }
    }
  }
})
