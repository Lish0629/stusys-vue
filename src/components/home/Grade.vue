<template>
  <div>
    <h1>Grade</h1>
    <el-table :data="tableData.data" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script>
// 使用 reactive 创建响应式对象
// 使用 onMounted 生命周期函数
import { reactive,onMounted } from 'vue'; 
import axios from 'axios';

export default {
  name: 'Grade',
  setup() {
    // 使用 reactive 创建响应式对象
    const tableData = reactive({
      data: []
    });

    onMounted(() => {
      fetchData();
    });

    //获取数据的方法
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user');
        // 更新响应式对象中的数据
        // 如果只有一行代码的时候，不会被vue认为是array，所以需要特殊处理
        // 观察结构发现应该赋值data.data
        tableData.data = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        console.log(tableData);
      } catch (error) {
        console.error(error);
        alert('请求失败: ' + error.message);
      }
    };

    //测试代码
    const showAlert = () => {
      console.log(tableData);
      alert(JSON.stringify(tableData, null, 2));
    };

    // 返回需要在模板中使用的响应式对象和方法
    return {
      tableData,
      fetchData,
      showAlert
    };
  }
};
</script>
