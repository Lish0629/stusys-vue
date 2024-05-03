<template>
  <h1>Map</h1>
  <div id="map"></div>
  <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css">
</template>


<script setup>
import { onMounted } from 'vue'
import Map from '@arcgis/core/Map.js'
import MapView from '@arcgis/core/views/MapView.js'



const apiKey="AAPKa8e2d506cec146d3a6b60637e13c2073m2lceDibabKg5Js9MSf43_-jxN0hymP9WLJzm3KLrDVStqwgnzr7coB5VCityoZE"


//初始化地图函数
const initMap = () => {
  //创建一个地图
  const map = new Map({
    basemap: 'osm'
  });

  //创建一个底图容器
  const view = new MapView({
    map: map,
    container: 'map',
    center: [120.205, 30.248],
    zoom: 13
  });

  //跳转地图中心
  setTimeout(() => {
    view.goTo({
      center: [104.061982, 30.577203],
      zoom: 15
    })
  }, 3000);

  //删除地图默认组件
  view.ui.components=[]
};



onMounted(initMap);
</script>

<style scoped>
#map {
  height:80vh;
  width:100%;
  border-radius:0px;
  border: 2px solid #000;
}

html,body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>