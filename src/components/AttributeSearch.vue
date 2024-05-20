<template>
  <div class="attribute-search">
    <el-input
      v-model="searchValue"
      clearable
      style="width:300px"
      placeholder="输入关键词查询"
      @clear="handleSearchInputClear"
      >
      <template #append
        ><el-button type="primary" :icon="Search" @click="handleSearchBtnClick"
      /></template>
    </el-input>
  </div>
</template>
<script setup>
import { ref,toRaw } from 'vue';
import { Search } from '@element-plus/icons-vue';
// 假设 openLoading 和 openMessage 是之前定义好的函数
import { openLoading, openMessage } from '../libs/utils';

// 引入 ArcGIS API for JavaScript 的相关模块
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Query from '@arcgis/core/rest/support/Query';

const searchValue = ref('');

const featureLayerUrl = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/SampleWorldCities/MapServer/0';
const featureLayer = new FeatureLayer({
  url: featureLayerUrl
});

function handleSearchInputClear() {
  searchValue.value = '';
}

function handleSearchBtnClick() {
  if (!searchValue.value) {
    openMessage('请输入关键词后再查询', 'warning');
    return;
  }

  const loading = openLoading('正在查询，请稍后...');
  const query = new Query({
    where: `POP > ${searchValue.value}`,
    returnGeometry: true,
    outFields: ['*']
  });

  featureLayer.queryFeatures(query).then(function (response) {
    loading.close();
    console.log(response.features)
    openMessage(`成功查询到 ${response.features.length} 条数据`, 'success');

  }, function (error) {
    console.error('属性查询失败', error);
    loading.close();
    openMessage('查询失败，请稍后重试', 'error');
  });
}
</script>

<style scoped>
.attribute-search {
  position: absolute;
  top: 16px;
  left: 16px;
  height: 36px;
  box-sizing: border-box;
}
</style>