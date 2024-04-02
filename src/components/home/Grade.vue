<template>
  <h1>grade</h1>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <el-button @click="showAlert">test</el-button>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Grace',
  methods:{
    showAlert() {  
      axios.get('/api/user')
      .then(function (response) {
      console.log(response);
      // 如果 responseData 是一个对象或数组，使用 JSON.stringify 打印其内容
      alert(JSON.stringify(response.data, null, 2)); 
      })
      .catch(function (error) {
      console.log(error);
      });
    }
  }
}
</script>