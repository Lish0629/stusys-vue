<template>
  <div class="city-panel" v-show="cityPanel.isVisible">
    <div class="city-panel-herder">
      <span>当前城市:{{currentCity}}</span>
    </div>
    <div class="city-panel-content">
      <div v-for="province in provinceData" :key="province.code" class="province-item">
        <span>{{ province.name }}</span>
        <div class="city">
          <div v-for="city in cityData" :key="city.code" class="city-item">
            <span v-if="city.province === province.province" @click="handleCityBtnClick(province,city)">{{ city.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,toRaw} from 'vue'
import provinceData from '@/data/provinces.json'
import cityData from '@/data/cities.json'
import lodash from 'lodash'
import axios from 'axios'
import { openMessage } from '@/libs/utils'
import { useStore } from 'vuex'
const mapViewStore = useStore();

const cityPanel =mapViewStore.state.cityPanelStore;
const currentCity =ref('浙江省杭州市')

//console.log(provinceData,cityData)

async function handleCityBtnClick(province,city){
  currentCity.value=`${province.name}${city.name}`
  console.log(`${province.name}${city.name}`)
  cityPanel.province=province
  cityPanel.city=city
  const mapView =toRaw(mapViewStore.state.mapView);
  try{
    const response = await axios.get('https://restapi.amap.com/v3/geocode/geo',{
      params:{
        key:'eb3bb6911f08c9201d4e78a46b123061',
        address:`${province.name}${city.name}`
      }
    });
    //console.log(response);
    const location = lodash.get(response, 'data.geocodes[0].location', '');
    console.log(location)
    const coordinates = location.split(',').map(Number); // 转换为数值数组
    mapView.goTo({
      
      center: coordinates, 
      zoom: 10
    });
  }
  catch(error){
    console.error(error);
    openMessage('网络错误,请联系管理员','error');
  }
}


</script>

<style>
.city-panel {
  position:absolute;
  top:60px;
  right: 65px;
  width:450px;
  height: 400px;
  padding:0 16px;
  background-color: rgba(255,255,255,0.85);
  box-shadow:1px 2px 1px rgba(0,0,0,0.15);
  box-sizing: border-box;
}

.city-panel-herder {
  height: 48px;
  display:flex;
  align-items:center;
  border-bottom: 1px solid #bfbfbf;
  box-sizing: border-box;
}
.city-panel-herder span{
  font-size:16px;
  font-weight:600;
}
.city-panel-content {
  
  height:calc(100% - 48px);
  padding:8px 0;
  box-sizing:border-box;
  overflow: auto;
}
.city-panel-content span {
  user-select: none;
}
.province-item {
  display: flex;
  color: #5f6477;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 16px;
}
.province-item:last-child {
  margin-bottom: 0;
}
.province-item > span {
  min-width: 100px;
}
.city-item {
  float: left;
  color: #999999;
}
.city-item:hover {
  color: #4096ff;
}
.city-item > span {
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;
}
</style>