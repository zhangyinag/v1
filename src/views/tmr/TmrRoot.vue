<template>
  <el-container class="root-container">
    <el-aside width="200px">
      <sidebar></sidebar>
    </el-aside>
    <el-container class="view-container">
      <el-header>Header</el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
  import Sidebar from '@/views/Sidebar.vue'

  export default {
    name: 'tmr-root',
    components: {Sidebar}
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
