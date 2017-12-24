<template>
  <div class="login">
    <el-form  label-width="100px">
      <el-form-item label="用户名">
        <el-input
          v-model="param.username"
          clearable
          placeholder="UM账号">
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="param.password"
          auto-complete="off"
          clearable
          placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" :disabled="submitting">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import NProgress from 'nprogress' // Progress 进度条
  import {login, getAuth, getPermission} from '@/api/auth'
  import * as types from '@/store/mutation-types'

  export default {
    name: 'login',
    data () {
      return {
        submitting: false,
        param: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      submitForm () {
        NProgress.start()
        this.submitting = true
        login(this.param).then(res => { // 登录
          if (res.success) {
            return Promise.resolve()
          }
          return Promise.reject(new Error())
        }).then(() => { // 获取身份实体
          return getAuth(this.param.username).then(res => {
            if (res.success) {
              this.$store.commit(types.SET_AUTH, res.data)
              return Promise.resolve()
            }
            return Promise.reject(new Error(0))
          })
        }).then(() => { // 获取permissionMap
          let platform = getPlatform()
          return getPermission(platform, this.param.username).then(res => {
            if (res.success) {
              // TODO 请将下面三个 commit 合成一个，这里这么些是为了测试这些方法
              this.$store.commit(types.SET_PERMISSION, res.data)
//              this.$store.commit(types.SET_PLATFORM, platform)
              this.$store.commit(types.SET_AUTHENTICATED, true)
              this.$router.push(`/${platform}`)
              this.submitting = false
              NProgress.done()
            }
            return Promise.reject(new Error(0))
          })
        }).catch(() => {
          this.submitting = false
          NProgress.done()
        })

        function getPlatform () {
          // TODO  请补充完整的逻辑 记忆跳转
          return 'admin'
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(from)
      console.log(to)
      next()
    }
  }
</script>

<style scoped>
  .login{
    height: 400px;
    width: 400px;
    margin: calc(50vh - 200px) auto;
  }
</style>
