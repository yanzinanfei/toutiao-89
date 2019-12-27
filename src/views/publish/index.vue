<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form style="margin-left:15px" label-width="120px">
      <el-form-item label="标题">
        <el-input style="width:33%"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group>
          <el-radio>单图</el-radio>
          <el-radio>三图</el-radio>
          <el-radio>无图</el-radio>
          <el-radio>自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select>
          <!-- 循环生成多个el-option
              label 指的是 el-option显示值
              value指的是 el-option的存储值
          -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [] // 定义一个channels 接收频道
    }
  },
  methods: {
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
  }
}
</script>

<style>
</style>
