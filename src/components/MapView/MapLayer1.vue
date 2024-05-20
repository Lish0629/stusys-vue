<template>
  <h1>MapLayer</h1>
  <!-- 直接绑定到一个响应式的变量上 -->
  <el-slider v-model="opacityValue" :min="0" :max="1" :step="0.01" @change="setOpacity" />
  <el-button @click="logFfValue">Log FF Value</el-button>
  <div id="map"></div>
</template>

<script>
import { onMounted, ref ,toRaw} from 'vue';
import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import Basemap from '@arcgis/core/Basemap.js';

export default {
  name: 'MapLayer1',
  setup() {
    const opacityValue = ref(0.5); // 滑块的当前值
    const ff = ref(null); // 用于存储FeatureLayer的引用

    const initMap = () => {
      const map = new Map({
        basemap: 'streets'
      });

      const featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Congressional_Districts/FeatureServer/0",
        id: 'feature-1'
      });
      map.add(featureLayer);
      ff.value = featureLayer; // 保存FeatureLayer的引用

      const view = new MapView({
        map: map,
        container: 'map',
        center: [-105.205, 35.248],
        zoom: 13
      });
      featureLayer.opacity=0.5
      view.ui.components = [];
    };

    const setOpacity = (value) => {
      if (toRaw(ff.value)) {
        toRaw(ff.value).opacity = value;
      }
    };

    const logFfValue = () => {
      console.log(ff.value);
    };

    onMounted(initMap);

    return {
      opacityValue,
      setOpacity,
      logFfValue
    };
  }
};
</script>

<style scoped>
#map {
  height: 80vh;
  width: 100%;
  border-radius: 0px;
  border: 2px solid #000;
}
</style>