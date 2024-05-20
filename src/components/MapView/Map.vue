<template>

  <el-row>
    <el-col :span="20">
      <h1>Map</h1>
    </el-col>
    <el-col :span="4">
      <el-button @click="moveRef">Move</el-button>
      <el-button @click="moveview">Move2</el-button>
    </el-col>

  </el-row>
  
  <div id="map"><LayerList /><AttributeSearch /></div>
  <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css">
</template>


<script setup>
import { onMounted,ref,toRaw } from 'vue'

import Map from '@arcgis/core/Map.js'
import MapView from '@arcgis/core/views/MapView.js'
//导入自定义底图组件
import Basemap from '@arcgis/core/Basemap.js'
import WebTileLayer from '@arcgis/core/layers/WebTileLayer.js'
import { useStore } from 'vuex';
import LayerList from '../LayerList.vue'
import AttributeSearch from '../AttributeSearch.vue'
const apiKey="AAPKa8e2d506cec146d3a6b60637e13c2073m2lceDibabKg5Js9MSf43_-jxN0hymP9WLJzm3KLrDVStqwgnzr7coB5VCityoZE"

//创建一个ref引用将initMap暴露给外部
const moveRef = ref(null);
const viewRef = ref(null);
const store = useStore();

const moveview=()=>{

    toRaw(viewRef.value).goTo({
      center: [104.061982, 30.577203],
      zoom: 15
    })
}

//初始化默认地图函数
const initMap = () => {
  //创建一个地图
  const map = new Map({
    basemap: 'osm'
  });
  
  //创建一个底图容器
  var view = new MapView({
    map: map,
    container: 'map',
    center: [120.205, 30.248],
    zoom: 13
  });

  //跳转地图中心
  /*setTimeout(() => {
    view.goTo({
      center: [104.061982, 30.577203],
      zoom: 15
    })
  }, 3000);*/

  //移动方法
  const move=()=>{
    console.log('12')
    view.goTo({
      center: [104.061982, 30.577203],
      zoom: 15
    })
  }
  //删除地图默认组件
  view.ui.components=[];

  store.commit('setMapView', view);
  moveRef.value=move;
  viewRef.value=view;

};

//自定义底图
const initOwnMap=()=>{
  const tdLayer =new WebTileLayer({
    urlTemplate:
      'http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_w&x={col}&y={row}&l={level}&tk=9aa49772a6d157afe863294b50b104a3',
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })

  const tdLayer_POI = new WebTileLayer({
    urlTemplate:
      'http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_w&x={col}&y={row}&l={level}&tk=9aa49772a6d157afe863294b50b104a3',
    subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  })

  const basemap = new Basemap({
    baseLayers: [tdLayer, tdLayer_POI]
  })
  const map = new Map({
    basemap
  })
  const view = new MapView({
    map,
    container: 'map'
  })
  view.zoom = 10 // 将地图缩放级别设置为 10
  view.center = [104.061982, 30.577203] // 将地图中心点设置为成都的经纬度
  //view.ui.components = [] // 移除默认的 UI 组件
}


onMounted(initMap);


</script>

<style>
#map {
  position: relative;
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