import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    weatherData:[],
    woeid:2306179,
    city:'taipei',
    loading:1, // 0 找不到 1 loading 2 完成
  },
  actions: {
    getWoeid(context,city){
      axios
      .get(`/weatherapi/api/location/search/?query=${city}`)
      .then((res)=>{        
        if(res.data.length > 0){
          context.commit('setWoeidCity',{city:city,woeid:res.data[0].woeid});
          context.dispatch('getWeather');
        }else{
          context.dispatch('setLoading', 0);
        }
      })
      .catch(function (error) {        
        console.log(error);
      })
    },
    getWeather(context){
      axios
      .get(`/weatherapi/api/location/${context.state.woeid}/`)
      .then((res)=>{        
        context.commit('addWeatherData',res.data.consolidated_weather);
      })
      .catch(function (error) {        
        console.log(error);
      });
    },
    setLoading(context,load){
      context.commit('setLoading',load);
    }
  },
  mutations: {
    addWeatherData(state,data){
      state.weatherData = data;
      state.loading = 2;
    },
    setWoeidCity(state,paramObj){      
      state.city = paramObj.city;
      state.woeid = paramObj.woeid;      
    },
    setLoading(state, load){
      state.loading = load;
    }
  },
  getters:{
    weatherData(state){ return state.weatherData; },
    getCity(state){return state.city;},
    getloading(state){return state.loading;}
  },
  modules: {}
})
