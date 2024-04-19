<template>
  <h1>student</h1>
  <div>
    <el-table :data="tableData.data" style="width: 100%">
      <el-table-column prop="studentId" label="Id" style="width: 15%" />
      <el-table-column prop="name" label="Name" style="width: 15%" />
      <el-table-column prop="gender" label="Gender" style="width: 15%" />
      <el-table-column prop="age" label="Age" style="width: 15%" />
      <el-table-column prop="phoneNumber" label="Phone" style="width: 15%" />
      <el-table-column prop="classId" label="classid" />
    </el-table>
  </div>
</template>

<script>
// 使用 reactive 创建响应式对象
// 使用 onMounted 生命周期函数
import { reactive,onMounted } from 'vue'; 
import {fetchData} from '../../api/api';
import axios from 'axios';
export default {
  name: 'Student',
  setup() {
    // 使用 reactive 创建响应式对象
    const tableData = reactive({
      data: []
    });

    onMounted(async() => {
      try {
        tableData.data=await fetchData('http://localhost:8087/user/findAll');
        console.log(await fetchData('http://localhost:8087/user/findAll'));
        const response = await axios.get('http://localhost:8087/user/findAll');
        console.log(response)
        const response2 = await axios.get('/api/user');
        console.log(response2)
      } catch(error){
        alert(error.message);
      }
    });



    //测试代码
    const showAlert = () => {
      console.log(tableData);
      alert(JSON.stringify(tableData, null, 2));
    };

    // 返回需要在模板中使用的响应式对象和方法
    return {
      tableData,
      showAlert
    };
  }
};


</script>