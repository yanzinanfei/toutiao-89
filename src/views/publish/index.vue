<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishrules"
      style="margin-left:15px"
      label-width="120px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:33%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor style="height:300px" v-model="formData.content" type="textarea" :rows="4"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:130px">
        <!-- 单选组  v-model="封面类型" -->
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="  -1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 放置一个封面组件 父传子 props   1.定义属性2.接收属性 -->
      <cover-image @clickOneImg="receiveImg" :list="formData.cover.images"></cover-image>
      <el-form-item style="margin-top:30px" prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <!-- 循环生成多个el-option
              label 指的是 el-option显示值
              value指的是 el-option的存储值
          -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- @事件名="方法" -》有默认参数 -》方法()括号默认参数false -->
        <el-button @click="publishArticle()" type="primary">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个channels 接收频道
      formData: {
        title: '', // 标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型
          images: [] // 存储图片地址
        },
        channel_id: null // 频道id
      },
      publishrules: {
        // 校验规则对象  min max
        title: [
          { required: true, message: '标题内容不能为空' },
          {
            min: 5,
            max: 30,
            message: '标题长度需要5到30个字符之间'
          }
        ],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 有参数 --》修改
        this.getArticleById(to.params.articleId) // 重新拉取数据
      } else {
        // 没有参数 == 发布
        this.formData = this.formData = {
          title: '', // 标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型
            images: [] // 存储图片地址
          }
        }
      }
    }
    // 'formData.cover.type': function () {
    //   // this指向组件实例
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     // 无图或者自动模式
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = [''] // 单图模式
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', ''] // 单图模式
    //   }
    // }
  },
  methods: {
    receiveImg (img, index) {
      // 接收到数据之后 修改 images数组 =》 但是images是个数组
      // 有地址 有索引 能不能改 images
      // this.formData.cover.images[index] = img // 直接修改数据 是不可以的
      // vue响应式原理 响应式数据 =》数据发生变化（要能被vue监控到） -》视图变化
      // 数组 => 新数组 =》 就会触发响应式视图更新=》 push/pop/shift/unshift/slice
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     return img
      //   }
      //   return item
      // })
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? img : item)
    },
    //  切换类型时触发
    changeType () {
      // this指向组件实例
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图或者自动模式
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图模式
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 单图模式
      }
    },
    //   获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取频道数据
      })
    },
    // 发布文章
    publishArticle (draft) {
      this.$refs.publishForm.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : `/articles`,
            params: { draft }, // query参数
            data: this.formData
          }).then(result => {
            this.$router.push('/home/articles') // 回到内容列表
          })
          // if (articleId) {
          //   this.$axios({
          //     method: 'put',
          //     url: `/articles/${articleId}`,
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //     // 新增成功 ->应该去内容列表
          //     this.$router.push('/home/articles') // 回到内容列表
          //   })
          // } else {
          //   // 可以去进行 发布接口调用
          //   this.$axios({
          //     url: '/articles',
          //     method: 'post',
          //     params: { draft }, // query参数
          //     data: this.formData
          //   }).then(() => {
          //     // 新增成功 ->应该去内容列表
          //     this.$router.push('/home/articles') // 回到内容列表
          //   })
          // }
        }
      })
    },
    // 获取文章详情通过Id
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data // 将指定文章数据给data数据
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
    // 获取id 判断有无Id 有id就是修改没Id就是发布
    let { articleId } = this.$route.params // 获取动态路由参数 articleId已经是字符串
    articleId && this.getArticleById(articleId) // 获取文章数据
  }
}
</script>

<style>
</style>
