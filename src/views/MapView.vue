<template>
  <div>
    <div v-if="fl">
    
      <Map></Map>

    </div>
    <div v-else>
      <MapLayer1/>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import { ref } from 'vue'; // 确保正确导入了ref函数
import Map from '@/components/MapView/Map';
import MapLayer1 from '@/components/MapView/MapLayer1';
export default {
  
  
  name: 'MapView',
  components: {
    Map,MapLayer1
  },
  setup(){
    const fl=ref(0);
    return {
      fl
    };
  }
}
</script>