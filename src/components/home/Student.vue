<template>
  <h1>student</h1>
  <div>
    <el-row>
      <el-col :span="22"></el-col>
      <el-col :span="2">
        <el-button @click="insRow">添加学生</el-button>
      </el-col>
    </el-row>
  </div>
  <el-row>
    <el-col :span="24"></el-col>
  </el-row>
  <div>
    <el-table :data="tableData.data" style="width: 100%">
      <!--
      <el-table-column prop="studentId" label="Id" style="width: 15%" />
      <el-table-column prop="name" label="Name" style="width: 15%" />
      <el-table-column prop="gender" label="Gender" style="width: 15%" />
      <el-table-column prop="age" label="Age" style="width: 15%" />
      <el-table-column prop="phoneNumber" label="Phone" style="width: 15%" />
      <el-table-column prop="classId" label="classid" style="width: 15%"/>
      -->
      <el-table-column v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        class ="column-style">
        <template v-slot="scope">
          <span v-if="!scope.row.isEditing">{{ scope.row[column.prop] }}</span>
          <el-select v-else-if="column.prop === 'gender'" v-model="scope.row.gender">
            <el-option label="Male" value="1"></el-option>
            <el-option label="Female" value="0"></el-option>
          </el-select>
          <el-input v-else v-model="scope.row[column.prop]" />
        </template>
      </el-table-column>
      <el-table-column label="Operations" style="width:10%">
        <template v-slot="scope">
          <div>
            <!-- 当行处于非编辑状态时显示修改按钮 -->
            <el-button v-if="!scope.row.isEditing" @click="changeRow(scope.row)">修改</el-button>
            <el-button v-if="!scope.row.isEditing" @click="delRow(scope.row)">删除</el-button>
            <!-- 当行处于编辑状态时显示保存和取消按钮 -->
            <el-button v-if="scope.row.isEditing" @click="saveChange(scope.row)">保存</el-button>
            <el-button v-if="scope.row.isEditing" @click="reChange(scope.row)">取消</el-button>
          </div>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 使用 reactive 创建响应式对象
// 使用 onMounted 生命周期函数
import { reactive,onMounted,ref } from 'vue'; 
import {fetchData,delData,altData,findData,insData} from '../../api/api';
export default {
  name: 'Student',
  setup() {
    // 使用 reactive 创建响应式对象
    const tableData = reactive({
      data: []
    });

    //行副本存储列表
    const rowCopies={};
    
    //新建数据表
    //const newStudentData = reactive({});

    // 复制行数据并存储副本的方法
    const copyRowData = (row) => {
      rowCopies[row.studentId] = { ...row };
    };

    const removeCopy = (row) => {
      delete rowCopies[row.studentId];
    };

    const restoreRowData = (row) => {
      if (rowCopies[row.studentId]) {
        Object.assign(row, rowCopies[row.studentId]);
        delete rowCopies[row.studentId];
      }
    };

    //行渲染数组对象
    const columns = reactive([
      { prop: "studentId", label: "id"},
      { prop: "name", label: "Name" },
      { prop: "gender", label: "Gender" },
      { prop: "age", label: "Age" },
      { prop: "phoneNumber", label: "Phone" },
      { prop: "classId", label: "classid" }
    ]);

    //使用钩子函数，在创建页面时获取数据
    onMounted(async() => {
      try {
        const response=await fetchData('/student/findAll');
        tableData.data =response.map(item=>({
          ...item,
          isEditing:false
        }));
        //console.log(tableData.data);
      } catch(error){
        alert(error.message);
      }
    });

    //测试代码
    const showAlert = () => {
      console.log(tableData);
      alert(JSON.stringify(tableData, null, 2));
    };
    //添加数据
    const insRow=async()=>{
      const newStudent = {
        studentId: '', // 使用生成的 studentId
        name: '',
        gender: '1', // 或者其他默认值
        age: 0,
        phoneNumber: '',
        classId: '',
        isEditing: true, // 新行默认可编辑
      };
      // 将新学生添加到表格数据中
      tableData.data.push(newStudent);
    }


    //删除数据
    const delRow=async(row)=>{
      //console.log('删除'+row.studentId);
      //向后端发送删除请求
      delData('/student/del',row.studentId);
      //在前端删除数据
      tableData.data = tableData.data.filter(item => item.studentId !== row.studentId);
    }

    const changeRow=(row)=>{
      copyRowData(row);
      row.isEditing = true;
    }
    
    //取消修改
    const reChange=async(row)=>{
      try{
        //如果是新行未输入直接删除
        if(row.studentId===null||row.studentId===''){
          tableData.data = tableData.data.filter(item => item.studentId !== row.studentId);
          console.log("1");
        }else{
          const isExist=await findData('/student/isExist',row.studentId);
          if(isExist){
            //恢复之前保存的
            restoreRowData(row);
            //删掉缓存
            removeCopy(row);
          }else{
            //如果新行不存在，直接删掉
            tableData.data = tableData.data.filter(item => item.studentId !== row.studentId);
          }
        }
      }
      catch{
        console.error('Error during save operation:', error);
      }
      finally{
        row.isEditing = false;
      }

      
    }
    //保存修改
    const saveChange=async(row)=>{
      console.log(row.studentId+" SAVE!");
      try{
        const isExist=await findData('/student/isExist',row.studentId);

        if(isExist){
          await altData('/student/update', row);
          console.log("yes");
        } else {
          // 如果学生不存在，调用插入接口
          await insData('/student/add', row);
          console.log("NO");
        }
      }catch (error) {
        console.error('Error during save operation:', error);
        // 处理错误，例如显示一个错误消息给用户
      } finally {
        // 无论成功还是失败，都停止编辑
        row.isEditing = false;
      }
    }

    // 返回需要在模板中使用的响应式对象和方法
    return {
      tableData,
      showAlert,
      insRow,
      saveChange,
      delRow,
      restoreRowData,
      copyRowData,
      removeCopy,
      changeRow,
      reChange,

      columns
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