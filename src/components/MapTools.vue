<template>
  <div class="map-tools">
    <span class="map-tool-item" @click="handleCityVisible">{{cityPanel.city.name}}</span>
    <span class="map-tool-item" @click="handleSpaceQueryBtnClick">空间查询</span>
    <span class="map-tool-item">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          空间分析<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Edit" @click="handlePointBufferClick"
              >点选缓冲区分析</el-dropdown-item
            >
            <el-dropdown-item :icon="Edit">折线缓冲区分析</el-dropdown-item>
            <el-dropdown-item :icon="Edit">区域缓冲区分析</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
    <span class="map-tool-item">菜单-3</span>
    <span class="map-tool-item">菜单-4</span>
    <span class="map-tool-item">菜单-5</span>
    <span class="map-tool-item" @click="handleClearScreen">清屏</span>
  </div>
</template>

<script setup>
import { toRaw,ref } from 'vue';
import { useStore } from 'vuex';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel.js'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer.js'

import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Graphic from '@arcgis/core/Graphic.js'
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol.js'
import { openMessage, openLoading } from '@/libs/utils'
  

const mapViewStore = useStore();
const cityPanel =mapViewStore.state.cityPanelStore;
function handleCityVisible(){
  //console.log(mapViewStore.state.cityPanelStore.isVisible)
  mapViewStore.state.cityPanelStore.isVisible=!mapViewStore.state.cityPanelStore.isVisible
}
function handleSpaceQueryBtnClick(){
  const mapView =toRaw(mapViewStore.state.mapView);
  
  const POLYGON_SYMBOL = {
    type: 'simple-fill',
    color: [64, 150, 255, 0.65],
    outline: {
      color: '#4096ff',
      width: 2
    }
  }

  const featureLayer = mapView.map.findLayerById('layer-2')
  if(!featureLayer){
    openMessage('请先添加要查询的业务图层','warning')
    return
  }

  const graphicsLayer = new GraphicsLayer({
    id:'spaceQueryLayer'
  })
  mapView.map.add(graphicsLayer)

  const sketchViewModel = new SketchViewModel({
    view: mapView,
    layer: graphicsLayer,
    polygonSymbol: POLYGON_SYMBOL
  })
    sketchViewModel.create('polygon')
    sketchViewModel.on('create', function (event) {
      if (event.state === 'complete') {
        handleSpaceQuery(event.graphic.geometry)
      }
  })
}

function handleSpaceQuery(geometry) {
  const loading = openLoading('正在查询，请稍后...')
  const mapView =toRaw(mapViewStore.state.mapView)
  const featureLayer = mapView.map.findLayerById('layer-2')
  featureLayer
    .queryFeatures({
      geometry,
      outFields: ['*']
    })
    .then(
      function (results) {
        loading.close()
        openMessage(`成功查询到 ${results.features.length} 条数据`, 'success')
      },
      function (error) {
        console.log('空间查询失败', error)
        loading.close()
        openMessage('查询失败，请稍后重试', 'error')
      }
    )
}

const POINT_SYMBOL = {
  type: 'simple-marker',
  color: [64, 150, 255, 0.65],
  outline: {
    color: '#4096ff',
    width: 2
  }
}

function handlePointBufferClick(){
  const mapView =toRaw(mapViewStore.state.mapView);
  const bufferLayer = mapView.map.findLayerById('bufferLayer')
  if (bufferLayer) {
    mapView.map.remove(bufferLayer)
  }
  const graphicsLayer = new GraphicsLayer({
    id: 'bufferLayer'
  })
  mapView.map.add(graphicsLayer)

  const sketchViewModel = new SketchViewModel({
    view: mapView,
    layer: graphicsLayer,
    pointSymbol: POINT_SYMBOL
  })
  sketchViewModel.create('point')
  sketchViewModel.on('create', function (event) {
    if (event.state === 'complete') {
      // 缓冲区分析逻辑
      const ptBuff = geometryEngine.buffer(event.graphic.geometry, 10000, 'feet')
      const bufferResGraphic = new Graphic({
        geometry: ptBuff,
        symbol: new SimpleFillSymbol({
          color: [0, 255, 255, 0.5],
          outline: {
            color: [0, 255, 255],
            width: 2
          }
        })
      })
      graphicsLayer.graphics.add(bufferResGraphic)
    }
  })
}
</script>

<style scoped>
.map-tools{
  position: absolute;
  top:16px;
  right:68px;
  height:36px;
  font-size:14px;
  padding:0 16px;
  display: flex;
  align-items:center;
  background-color: #ffffff;
  box-sizing:border-box;
  box-shadow:1px 2px 1px rgba(0,0,0,0.15);
}
.map-tool-item{
  margin-right: 16px;
  cursor: pointer;
}


.map-tool-item:last-child{
  margin-right:0;
}
span {
  user-select: none;
}
.map-tool-item:not(:last-child){
  border-right: 1px solid #bfbfbf;
  padding-right:16px;
}

.map-tool-item:hover{
  color:#4096ff;
}

.map-tool-item .el-dropdown {
  margin-top: 5px;
  color: unset;
}
.map-tool-item .el-dropdown .el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>