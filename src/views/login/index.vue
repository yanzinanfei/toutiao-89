<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 登录容器 -->
      <el-form style="margin-top:28px">
        <!-- 表单域  el-from-item => 行-->
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 表单域 -->
          <el-input style="width:65%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意<span style="color: #3296fa">用户协议</span>和<span style="color: #3296fa">隐私条款</span></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .login {
     background-image: url('../../assets/img/ClBXvAKPxR.jpg');
     background-size: cover;
     height: 100vh;
     display: flex;
      justify-content: center;
      align-items: center;
     .login-card {
       width: 440px;
       height: 350px;
       .title {
         text-align: center;
         img {
           height: 40px;
         }
       }
     }
     }

</style>
