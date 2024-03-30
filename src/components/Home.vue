<template>
  <div class="common-layout" style="height: 500px">
    <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">
          <!--侧边栏区域-->
            <el-menu router>
              <el-menu-item index="/home/student-manage">学生管理</el-menu-item>
              <el-menu-item index="/home/course-manage">课程管理</el-menu-item>
              <el-menu-item index="/home/grade">成绩管理</el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            Main
          </el-main>
        </el-container>
    </el-container>
  </div>
  <!--添加基础布局块，包含顶栏侧边栏和主要区域-->
  <!--el-container 作为容器将内容打包-->
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>
.common-layout .el-header{
  background-color: rgb(40, 34, 47);
  color: rgb(255, 0, 0);

}
.common-layout .el-aside{
  background-color: rgb(27, 134, 134);
  
  
}

.common-layout .el-main{
  background-color: rgb(199, 181, 216);

}
</style>