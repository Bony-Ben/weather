<template>
    <div v-if="done">
        <ul>
            <li v-for="(fav,idx) in favorites" :key="idx">
                <WeatherCard :weather="fav"/>
            </li>
        </ul>
    </div>
</template>

<script>
import WeatherCard from "../components/WeatherCard";

export default {
    name: 'Home',
    components:{
        WeatherCard
    },
    data(){
        return{
            done: false
        }
    },
    created(){
        this.$store.commit("updateWeather",{});
        this.$store.dispatch("updateFavorites").then(() => this.done=true);
        //this.done=true;
    },
    computed: {
        favorites(){
            return this.$store.state.favorites;
        }
    }
}
</script>
<style scoped>
</style>
