<template>
  <div class="charts">
    <p class="date">{{obj.applicable_date}}</p>
    <div class="barbox">
      <div class="square">
        <div class="max" :style="{'--temp_max':temp_max,'--temp_max_h':temp_max_h}">
          <span>{{temp_max}}°C</span>
        </div>
        <div class="min" :style="{'--temp_min':temp_min,'--temp_min_h':temp_min_h}">
          <span>{{temp_min}}°C</span>
        </div>
      </div>
      <span class="icon_max"><i></i> max temp</span>      
      <span class="icon_min"><i></i> min temp</span>
    </div>
    <div class="piebox"> 
      <div class="piebg">
        <div class="pie" v-show="num > 0" :style="{'--deg':deg,'--pieAfter':pieAfter,'--pieW':pieW,'--pieMl':pieMl}">              
        </div>            
      </div>
      <p>humidity <i class="icon_humidity"></i>{{obj.day.avghumidity || 'Not found'}}%</p>
    </div>
  </div>
</template>

<script>
export default {  
  props: ['obj'],
  setup(props){    
    const temp_max = props.obj.day.maxtemp_c.toFixed(1);
    const temp_min = props.obj.day.mintemp_c.toFixed(1);
    const temp_max_h = `${temp_max*2}px`;
    const temp_min_h = `${temp_min*2}px`;
    const num = (Math.round(parseInt(props.obj.day.avghumidity)*3.6)) || 0;        
    const deg = `rotate(${num-90}deg)`;
    const pieAfter = num < 180 ? 0 : 1;
    const pieW = num < 180 ? '50px' : '100px';
    const pieMl = num < 180 ? '50px' : 0;    
    return { num, deg, pieAfter ,pieW ,pieMl, temp_max, temp_min,temp_max_h,temp_min_h}
  }
}
</script>

<style scoped lang="scss">
  .charts{
    text-align: center;
    display: inline-block;
    margin: 10px;
    background: rgb(222, 247, 247);
    border-radius: 20px;
    padding:0 50px;
    padding: 0 10px 0 50px;
    width: 370px;
  }
  .date{
    display: block;
    color: #000;
    padding-bottom: 30px;
  }
  .barbox{
    width:200px;
    display: inline-block;
    margin-right: 50px;
    vertical-align: top;
    position: relative;
  }
  .square{
    border:solid 2px rgb(141, 140, 140);
    width:100px;
    height:100px;
    border-top:none;
    border-right:none;
    position:relative;    
  }
  .square::before{
    content: '0°C';
    position: absolute;
    bottom: -5px;
    left: -32px;
  }
  .square::after{
    content:'50°C';
    position: absolute;
    top:0;
    left: -40px;
  }
  .max{
    border:solid 1px rgb(236, 92, 92);
    background-color:rgb(236, 92, 92);
    width:15px;
    height:var(--temp_max_h);
    position:absolute;
    bottom: 0;
    left: 20px;
    max-width: 100px;
    min-width: 0px;
  }
  .max span{    
    position: absolute;
    top: -20px;
    left: 0;
  }
  .min{
    border:solid 1px #0edbff;
    background-color:#0edbff;
    width:15px;
    height:var(--temp_min_h);
    position:absolute;
    bottom: 0;
    left: 70px;
    max-width: 100px;
    min-width: 0px;
  }
  .min span{    
    position: absolute;
    top: -20px;
    left: 0;
  }
  .piebox{
    width:100px;
    display: inline-block;
  }
  .piebg{
    background: rgba(67, 221, 248,0.2);
    position: relative;
    width:100px;
    height: 100px;
    border-radius: 50px 50px 50px 50px;
    border-color: #000;
  }
  .pie{
    top:0px;
    left:0px;
    margin-left:var(--pieMl);
    position:absolute;
    width:var(--pieW);
    height:100px;
    overflow:hidden;
    border-radius:0 50px 50px 0;
  }
  // .pie{width:100px; margin-left:0;border-radius:0;}
  .pie:before, .pie:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 50px;
    background: rgb(35, 179, 204);
    border-style: solid;
    border-color: #000;
    border-width: 0px 0px 0px;
    border-radius: 50px 50px 0 0;
    transform-origin: 50px 50px;
  }
  .pie:before{
    z-index:1;		 
    transform: var(--deg);
  }
  .pie:after{
    opacity:var(--pieAfter);
    z-index:2;
    transform:rotate(90deg);    
  } 
  .icon_max{
    position: absolute;
    right: -3px;
    top: 30px;
  }
  .icon_max i{
    width:10px;
    height:10px;
    display: inline-block;
    background: #ec5c5c;
  }
  .icon_min{
    position: absolute;
    right: 0px;
    top: 60px;
  }
  .icon_min i{
    width:10px;
    height:10px;
    display: inline-block;
    background: #0edbff;
  }
  .icon_humidity{
    width:10px;
    height:10px;
    display: inline-block;
    background: rgb(35, 179, 204)
  }
</style>
