<template>
  <el-container class="root-container">
    <el-aside width="200px">
      <sidebar></sidebar>
    </el-aside>
    <el-container class="view-container">
      <el-header>Header</el-header>
      <el-main><theme-loader></theme-loader><router-view/></el-main>
      <el-footer height="0"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from '@/views/Sidebar.vue'
  import ThemeLoader from '@/components/ThemeLoder.vue'

  export default {
    name: 'admin-root',
    components: {Sidebar, ThemeLoader}
  }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100vh;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  .root-container {
    height: 100vh;
  }

  .view-container{
    height: 100vh;
  }


</style>

