<template>

</template>

<script>
import '@/assets/themes/theme-orange/index.css'

let themeClass = 'theme-orange'
export default {
  created: function () {
    document.body.className = themeClass
  },
  destroyed: function () {
    document.body.className = ''
  }
}
</script>

<style scoped>

</style>
