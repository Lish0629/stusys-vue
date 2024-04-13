<template>
  <div>
    <h1>Grade</h1>
    <el-table :data="tableData.data" style="width: 100%">
      <el-table-column prop="id" label="Id" style="width: 15%" />
      <el-table-column prop="name" label="Name" style="width: 15%" />
      <el-table-column prop="gender" label="Gender" style="width: 15%" />
      <el-table-column prop="age" label="Age" style="width: 15%" />
      <el-table-column prop="phone" label="Phone" style="width: 15%" />
      <el-table-column prop="classid" label="classid" />
    </el-table>
  </div>
</template>

<script>
// 使用 reactive 创建响应式对象
// 使用 onMounted 生命周期函数
import { reactive,onMounted } from 'vue'; 
import {fetchData} from '../../api/api';


export default {
  name: 'Grade',
  setup() {
    // 使用 reactive 创建响应式对象
    const tableData = reactive({
      data: []
    });

    onMounted(async() => {
      try {
        tableData.data=await fetchData('user');
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
