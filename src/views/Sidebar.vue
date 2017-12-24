<template>
  <div>
    <el-menu
             class="el-menu-vertical-demo"
             @open="expand"
             @close="collapse"
             :unique-opened="true"
             :collapse="collapsed">
      <template v-for="one in menus">
        <el-menu-item :index="one.permissionKey" v-if="one.link" :key="one.permissionKey+1" @click.native="linkTo(one.link)">
          <i :class="[one.menuClass]" :key="one.permissionKey+2"></i>
          <span slot="title" :key="one.permissionKey+3">{{one.menuName}}</span>
        </el-menu-item>
        <el-submenu v-else :index="one.permissionKey" :key="one.permissionKey+2">
          <template slot="title">
            <i :class="[one.menuClass]"></i>
            <span slot="title">{{one.menuName}}</span>
          </template>
          <el-menu-item-group v-for="two in one.children" :key="two.permissionKey+1">
            <el-menu-item :index="two.permissionKey"
                          v-if="two.link"
                          :key="two.permissionKey+2"
                          @click.native="linkTo(two.link)">{{two.menuName}}</el-menu-item>
            <el-submenu :index="two.permissionKey" v-else :key="two.permissionKey+3">
              <span slot="title">{{two.menuName}}</span>
              <el-menu-item :index="three.permissionKey"
                            v-for="three in two.children"
                            @click.native="linkTo(three.link)"
                            :key="three.permissionKey+1">{{three.menuName}}</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        collapsed: false
      }
    },
    methods: {
      expand (key, keyPath) {
        console.log(key, keyPath)
      },
      collapse (key, keyPath) {
        console.log(key, keyPath)
      },
      linkTo: function (path) {
        this.$router.push(`/${this.platform}${path}`)
      }
    },
    computed: {
      menus: function () {
        return this.$store.getters.menus(this.platform)
      },
      platform: function () {
        return this.$store.getters.auth.platform
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
