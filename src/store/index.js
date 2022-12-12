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
      const cros = 'https://api.allorigins.win/get?url=';
      const url = encodeURIComponent(`https://www.metaweather.com/api/location/search/?query=${city}`);      
      axios
      .get(`${cros}${url}`)
      .then((res)=>{
        var ndata = JSON.parse(res.data.contents)
        if(ndata.length > 0){
          context.commit('setWoeidCity',{city:city,woeid:ndata[0].woeid});
          context.dispatch('getWeather');
        }else{
          context.dispatch('setLoading', 0);
        }
      })
      .catch(function (error) {        
        console.log(error);
      })
    },
    getWeather(context,city){
      const cros = 'https://api.allorigins.win/get?url=';
      const days = 5;
      //const url = encodeURIComponent(`https://www.metaweather.com/api/location/${context.state.woeid}/`);
      const url = encodeURIComponent(`http://api.weatherapi.com/v1/forecast.json?key=8489f71e06bd446496132942221212&q=${city}&days=${days}&aqi=no&alerts=no`);      
      axios
      .get(`${cros}${url}`)
      .then((res)=>{                
        var ndata = JSON.parse(res.data.contents);        
        context.commit('addWeatherData', ndata.forecast.forecastday);
      })
      .catch(function (error) {        
        console.log(error);
      });
    },
    setLoading(context,load){
      context.commit('setLoading',load);
    },
    setCity(context,val){
      context.commit('setCity',val);
    },
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
    },
    setCity(state, val){
      state.city = val;
    }
  },
  getters:{
    weatherData(state){ return state.weatherData; },
    getCity(state){return state.city;},
    getloading(state){return state.loading;}
  },
  modules: {}
})
