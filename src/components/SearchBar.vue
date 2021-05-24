<template>
    <div>
        <input v-model="text" placeholder="Search..."> 
    </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'SearchBar',
  data(){
      return{
          text: ""
      }
  },
  created(){
      this.debouncedUpdateWeather=_.debounce(this.updateWeather,500);
  },
  watch: {
      text(){
          this.debouncedUpdateWeather();
      }
  },
  methods: {
      updateWeather(){
          if(this.text==""){
              this.$router.push("/").catch(()=> console.log("Double Route."));
          }else{
            if(this.$route.name=="Weather"){
                this.$store.dispatch("updateWeather",this.text);
            }
            this.$router.push(`/weather/${this.text}`).catch(()=> console.log("Double Route."));
          }
      }
  }
}
</script>

<style scoped>
div{
    padding-top: 30px;
    text-align: center;
}

input{
    text-align: center;
    width: 60%;
    height:30px;
    font-size: 30px;
    appearance: none;
    border: none;
    outline: none;
    background: rgba(255,255,255,0.4);
    border-radius: 15px;
    transition:0.5s;
}

input:focus{
    background-color: rgba(255,255,255,.8);
    width:80%;
    height:40px;
}

</style>
