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
      <el-table-column label="Operations" style="width:10%">
        <template v-slot="scope">
          <div>

            <!-- 当行处于非编辑状态时显示修改按钮 -->
            <el-button v-if="!scope.row.isEditing" @click="scope.row.isEditing = true">修改</el-button>
            <el-button v-if="!scope.row.isEditing" @click="delRow(scope.row)">删除</el-button>
            <!-- 当行处于编辑状态时显示保存和取消按钮 -->
            <el-button v-if="scope.row.isEditing" @click="saveChange(scope.row)">保存</el-button>
            <el-button v-if="scope.row.isEditing" @click="scope.row.isEditing = false">取消</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from 'vue';
import { fetchData } from '../../api/api';

export default {
  name: 'Grade',
  setup() {
    const tableData = reactive({
      data: []
    });

    onMounted(async() => {
      try {
        const response = await fetchData('/api/user');
        tableData.data = response.map(item => ({
          ...item,
          isEditing: false // 默认设置为false，显示修改和删除按钮
        }));
      } catch (error) {
        alert(error.message);
      }
    });

    const delRow = (row) => {

      console.log('删除' + row.id);
    };

    const saveChange = (row) => {
      // 这里应该是保存更改的逻辑
      // 例如，您可以在这里更新row对象的数据，并将其发送到服务器
      row.isEditing = false; // 保存后退出编辑状态
    };

    // 返回需要在模板中使用的响应式对象和方法
    return {
      tableData,
      saveChange,
      delRow
    };
  }
};
</script>