<template>
  <!-- 卡片布局 -->
  <el-card>
    <bread-crumb slot="header">
        <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- body内容 -->
    <el-table :data="list">
      <!-- 列组件 -->
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <!-- 格式化方法 -->
      <el-table-column :formatter="fromatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- 放组件  作用域插槽 row column $index-->
        <template slot-scope="obj">
         <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 请求评论列表数据
    getComment () {
      // axios 是默认是get类型
      // query 参数 / 路由参数 地址参数 get参数 axios params
      this.$axios({ url: '/articles', params: { response_type: 'comment' } }).then(result => { this.list = result.data.results }) // 获取列表评论数据给list
    },
    // 定义一个布尔值转化方法
    fromatterBool (row, column, cellValue, index) {
      // row是当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index 当前下标
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    //  调用请求数据方法
    this.getComment()
  }
}
</script>

<style>

</style>
