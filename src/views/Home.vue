<script>
import { computed, onMounted, reactive ,ref} from 'vue'
import { useStore } from 'vuex'
import Weather from '@/components/Weather.vue'

export default {  
  components: {
    Weather 
  },  
  setup(){
    const store = useStore();
    const city = ref('taipei')
    const init = ()=>{
      store.dispatch('getWeather');
    }
    const getWeatherData = computed(()=>{
      return store.getters.weatherData;
    })
    const search = ()=>{
      store.dispatch('setLoading', 1)
      store.dispatch('getWoeid',city.value);
    }
    const getCity = ()=>{
      return store.getters.getCity;
    }
    const getLoading = ()=>{
       return store.getters.getloading;
    }
    const datafin = ()=>{
      return store.getters.datafinish;
    }
    onMounted(()=>{
      init();
    })
    
    return { city, getWeatherData, getCity, search, getLoading ,datafin};
  }
}
</script>

<template>
  <div class="home">    
    <div>City:<input v-model="city"/><button @click="search">Search</button></div>
    <div class="chart" v-show="getLoading() == 2">
      <h2>{{getCity()}}</h2>
      <Weather v-bind:obj="item" v-for="(item, idx) in getWeatherData" :key="item.id"/>      
    </div>
    <p v-show="getLoading() == 0">No results</p>
    <br>    
    <img class="loading" src="@/assets/load.gif" v-show="getLoading() == 1" />
  </div>
</template>

<style lang="scss" scoped>
  .home,.chart{text-align: center;}
  h2{
    text-transform:capitalize;
  }
  .loading{
    display: inline-block;
    width:100px;
  }
</style>
