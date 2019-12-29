<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 放置上传组件 -->
    <el-upload class="head-upload" action :show-file-list="false">
      <img :src="formData.photo ? formData.photo : defaultImg" alt />
    </el-upload>
    <!-- 放置组件 -->
    <el-form
      ref="myForm"
      :model="formData"
      :rules="nameRules"
      style="margin-left:50px"
      label-width="80px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      nameRules: {
        name: [
          { required: true, message: '用户名不能为空' },
          {
            min: 1,
            max: 7,
            message: '用户名的长度限制为1到7个字符'
          }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            message: '邮箱格式不正确'
          }
        ]
      }, // 定义一个规则
      defaultImg: require('../../assets/img/2.jpg')
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUserInfo () {
      // 保存用户信息
      // 校验表单数据是否OK
      this.$refs.myForm.validate(isOK => {
        // 保存方法
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            // 认为保存成功
            this.$message({
              type: 'success',
              message: '保存用户信息成功'
            })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo() // 用户个人信息
  }
}
</script>

<style lang='less' scoped>
.head-upload {
  position: absolute;
  right: 300px;
  top: 150px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
