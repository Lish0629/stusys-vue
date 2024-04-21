<template>
  <h1>student</h1>
  <div>
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-button>添加学生</el-button>
      </el-col>
    </el-row>
    
  </div>
  <el-row>
    <el-col :span="24"></el-col>
  </el-row>
  <div>
    <el-table :data="tableData.data" style="width: 100%">
      <el-table-column prop="studentId" label="Id" style="width: 15%" />
      <el-table-column prop="name" label="Name" style="width: 15%" />
      <el-table-column prop="gender" label="Gender" style="width: 15%" />
      <el-table-column prop="age" label="Age" style="width: 15%" />
      <el-table-column prop="phoneNumber" label="Phone" style="width: 15%" />
      <el-table-column prop="classId" label="classid" style="width: 15%"/>
      <el-table-column label="Operations" style="width:10%">
        <template v-slot="scope">
          <el-button @click="delRow(scope.row)">修改</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
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
      } catch(error){
        alert(error.message);
      }
    });
    //测试代码
    const showAlert = () => {
      console.log(tableData);
      alert(JSON.stringify(tableData, null, 2));
    };
    const delRow=()=>{

    }
    // 返回需要在模板中使用的响应式对象和方法
    return {
      tableData,
      showAlert
    };
  }
};


</script>

<style lang="scss">
.el-row{
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>