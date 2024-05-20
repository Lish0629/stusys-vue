<template>
  <div class="layer-list">
    <div class="layer-list-icon" @click="handleLayerListPanelVisible()">
      <img :src="LayerList"/>
    </div>
    <div class="layer-list-view" v-show="layerListPanelVisible">
      <div class="layer-list-header">
        <span>业务图层</span>
      </div>
      <div class="layer-list-content">
        <div class="layer-list-item" v-for="layer in layerList" :key="layer.id" :style="{ height: alreadyAddedLayerIds.includes(layer.id) ? '80px' : '40px' }">
          <div class="layer-list-default">
            <span>{{ layer.name }}</span>
            <img :src="alreadyAddedLayerIds.includes(layer.id) ? LayerCloseIcon : LayerOpenIcon"
            @click="handleLayerItemClick(layer)"/>
          </div>
          <!--<el-button @click="changeOpacityRef(layer.id)" v-show="alreadyAddedLayerIds.includes(layer.id)"/>-->
          <div v-if="alreadyAddedLayerIds.includes(layer.id)">
            <el-slider v-model="layer.opacity" :min="0" :max="1" :step="0.01" @change="changeOpacityRef(layer.id, layer.opacity)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,toRaw } from 'vue'
import MapImageLayer from '@arcgis/core/layers/MapImageLayer.js'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js'
import ImageryLayer from '@arcgis/core/layers/ImageryLayer.js'
import TileLayer from '@arcgis/core/layers/TileLayer.js'
import LayerList from './icons/layerlist.svg'
import LayerOpenIcon from './icons/enter.svg'
import LayerCloseIcon from './icons/close.svg'
import { useStore } from 'vuex'


const mapViewStore =useStore()
const layerListPanelVisible = ref(false)
const layerList= ref([
  {
    id: 'layer-1',
    name: 'map-image-layer',
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer',
    type: 'MapImage',
    opacity: 0.5
  },
  {
    id: 'layer-2',
    name: 'feature-layer',
    url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
    type: 'Feature',
    opacity: 0.5
  },
  {
    id: 'layer-3',
    name: 'imagery-layer',
    url: 'https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer',
    type: 'Imagery',
    opacity: 0.5
  },
  {
    id: 'layer-4',
    name: 'tile-layer',
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer',
    type: 'Tile',
    opacity: 0.5
  }
])
const alreadyAddedLayerIds = ref([])

function handleLayerListPanelVisible() {
  layerListPanelVisible.value = !layerListPanelVisible.value
}

const opacityRefList=ref();

function changeOpacityRef(layerIds,val){
  console.log(layerIds)
  const mapView =toRaw(mapViewStore.state.mapView)
  const layer= mapView.map.findLayerById(layerIds);
  layer.opacity=val;
}

function handleLayerItemClick(layer) {
  let ArcGISLayerAPI
  switch (layer.type) {
    case 'MapImage':
      ArcGISLayerAPI = MapImageLayer
      break
    case 'Feature':
      ArcGISLayerAPI = FeatureLayer
      break
    case 'Imagery':
      ArcGISLayerAPI = ImageryLayer
      break
    case 'Tile':
      ArcGISLayerAPI = TileLayer
      break
    default:
      break
  }
  const mapView =toRaw(mapViewStore.state.mapView)
  const layers = mapView.map.layers.items
  const layerIds = layers.map((layer) => layer.id)

  if (layerIds.includes(layer.id)) {
    // 卸载图层
    const resultLayer = mapView.map.findLayerById(layer.id)
    if (resultLayer) {
      mapView.map.remove(resultLayer)
      // 卸载完图层之后更新 alreadyAddedLayerIds state
      const layers = mapView.map.layers.items
      const layerIds = layers.map((layer) => layer.id)
      alreadyAddedLayerIds.value = layerIds
    }
  } else {
    // 添加图层
    if (ArcGISLayerAPI) {
      const layerRes = new ArcGISLayerAPI({
        url: layer.url,
        id: layer.id,
        opacity:layer.opacity
      })
      mapView.map.add(layerRes)
      // 添加完图层之后更新 alreadyAddedLayerIds state
      const layers = mapView.map.layers.items
      const layerIds = layers.map((layer) => layer.id)
      alreadyAddedLayerIds.value = layerIds
    }
  }

}
  </script>

<style >


.layer-list-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  padding: 2px;
  background-color: #ffffff;
  border: 2px solid #bfbfbf;
  box-sizing: border-box;
  cursor: pointer;
}
.layer-list-icon:hover {
  border-color: #4096ff;
}
.layer-list-icon img {
  width: 100%;
  height: 100%;
}
.layer-list-view {
  position: absolute;
  top: 12px;
  right: 60px;
  width: 260px;
  height: 400px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.85);
  border: 1px solid #bfbfbf;
  box-sizing: border-box;
}
.layer-list-header {
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #bfbfbf;
  box-sizing: border-box;
}
.layer-list-header span {
  font-size: 16px;
  font-weight: 600;
}
.layer-list-content {
  height: calc(100% - 48px);
  padding-top: 8px;
}
.layer-list-item {
  display: flex;
  flex-direction: column;
}
.layer-list-default {
  justify-content: space-between;
  padding-right: 8px;
  box-sizing: border-box;
  height: 40px;
  display: flex;
  align-items: center;

}
.layer-list-default > img {

  width: 16px;
  height: 16px;
  cursor: pointer;
}
.layer-list-default:hover {
  background-color: #bfbfbf;
  padding-left: 8px;
  font-weight: 600;
}
.layer-list-default:hover > img {
  width: 24px;
  height: 24px;
}
</style>