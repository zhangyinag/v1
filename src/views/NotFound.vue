<template>
  <div>
    <h1>你访问的页面未找到</h1>
    <a href="javascript:void(0)" @click="back()">返回上一级</a> &nbsp;
    <router-link to="/tmr">返回首页</router-link>
  </div>
</template>

<script>
  export default {
    name: 'tmr-not-authorized',
    data: function () {
      return {
        back: function () {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style scoped>

</style>
