<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- el-row 行 -->
    <el-row class="searchTool">
      <el-col :span="2">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <!--
              0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        -->
        <!-- 单选框组 -->
        <!-- 第一种方式用  @change="changeCondition" 第二种方式 用watch-->
        <el-radio-group v-model="formData.status">
          <!-- 全部这个5是默认的,在传参的时候判断一下 是不是5 如果是5 就传个null -->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>频道列表</span>
      </el-col>
      <el-col :span="18">
        <el-select v-model="formData.channel_id">
          <!-- 循环生成多个el-option -->
          <!-- label 指的是el-option的显示值
          value 指的是el-option 的存储值-->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchTool">
      <el-col :span="2">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="formData.dataRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-row class="total">
      <!-- 主体 -->
      <span>共找到1000条符合条件的内容</span>
    </el-row>
    <!-- 循环模板 -->
    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="article-item"
      type="flex"
      justify="space-between"
    >
      <!-- 左 -->
      <el-col :span="10">
        <el-row type="flex">
          <img :src="item.cover.images.length ? item.cover.images[0]: defaultImg" alt />
          <div class="tianwang">
            <span>{{ item.title }}</span>
            <!-- 过滤器不但可以在插值表达式中使用 还可以在v-bind表达式中使用 -->
            <el-tag :type="item.status | filterType" class="tag">{{ item.status | filterStatus}}</el-tag>
            <span class="data">{{ item.pubdate }}</span>
          </div>
        </el-row>
      </el-col>
      <!-- 右 -->
      <el-col :span="6">
        <el-row class="right" type="flex" justify="end">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i>删除
          </span>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 状态
        channel_id: null, // 默认是空
        dataRange: []
      },
      channels: [], // 定义一个channels 接受频道
      list: [], // 接收文章列表数据
      defaultImg: require('../../assets/img/2.jpg')
    }
  },
  filters: {
    // 处理显示状态
    filterStatus (value) {
      // value 是过滤器前面表达式计算得到的值
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      // value 是过滤器前面表达式计算得到的值
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    // 获取文章列表数据
    getArticles () {
      this.$axios({
        url: '/articles' // 请求地址
      }).then(result => {
        this.list = result.data.results // 接收文章列表数据
      })
    }
  },
  created () {
    this.getChannels() // 调用获取频道数据
    this.getArticles() // 调用读取文章列表
  }
}
</script>

<style lang="less" scoped>
.articles {
  .searchTool {
    height: 60px;
    padding-left: 50px;
    margin: 0 auto;
  }
  .total {
    margin: 60px 0px;
    height: 35px;
    border-bottom: 1px dashed #ccc;
  }
  .article-item {
    margin: 20px 0px;
    padding: 1ex;
    border-bottom: 1px solid #f2f3f5;
    img {
      width: 180px;
      height: 100px;
      margin-right: 10px;
      border-radius: 5px;
    }
    .tianwang {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tag {
        max-width: 58px;
      }
      .data {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
      span {
        margin-left: 8px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
