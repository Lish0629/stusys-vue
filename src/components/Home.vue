<template>
  <div class="common-layout" >
    <el-container>
        <el-header>综合信息展示系统
        </el-header>
        <el-container>
          <el-aside width="200px">
          <!--侧边栏区域-->
            <el-menu router>
              <el-menu-item index="/student-manage">学生管理</el-menu-item>
              <el-menu-item index="/course-manage">课程管理</el-menu-item>
              <el-menu-item index="/grade-manage">成绩管理</el-menu-item>
              <el-menu-item index="/map-show">地图展示</el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <RouterView></RouterView>
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

<style lang="scss">
.common-layout {
  .el-header {
    background-color: rgb(40, 34, 47);
    color: rgb(255, 255, 255);
    
    font-size: 32px;
  }

  .el-aside {
    background-color: rgb(27, 134, 134);
  }

  .el-main {
    background-color: rgb(199, 181, 216);
  }

  // 选择第二个 .el-container 元素，因为 .el-container 是 .common-layout 的直接子元素
  .el-container:nth-child(2) {
    // 使用视口高度减去头部高度来设置容器高度
    height: calc(100vh - 60px);
    // 使用 Flexbox 布局让子元素（侧边栏和主要内容区域）可以伸缩填满空间
    display: flex;
  }
}
</style>