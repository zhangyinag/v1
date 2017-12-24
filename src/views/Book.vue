<template>
  <div>
    <el-table
      :data="books"
      style="width: 100%">
      <el-table-column
        prop="bookId"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="数名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="publishDate"
        label="出版日期">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <el-button type="primary" @click.native="load401">401(需要验证)</el-button>
      <el-button type="success" @click.native="load403">403(资源禁止访问)</el-button>
      <el-button type="info" @click.native="load404">404(无该资源)</el-button>
      <el-button type="warning" @click.native="load500">500(内部错误)</el-button>
    </div>
  </div>
</template>

<script>
  import {getBooks, _401, _403, _404, _500} from '@/api/book'

  export default {
    name: 'book',
    created: function () {
      this.loadBooks()
    },
    data () {
      return {
        books: []
      }
    },
    methods: {
      loadBooks: function () {
        getBooks().then(res => {
          this.books = (res.success && res.data) || []
        })
      },
      load401: function () {
        _401().then(res => {
          console.log(res)
        })
      },
      load403: function () {
        _403().then(res => {
          console.log(res)
        })
      },
      load404: function () {
        _404().then(res => {
          console.log(res)
        })
      },
      load500: function () {
        _500().then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
