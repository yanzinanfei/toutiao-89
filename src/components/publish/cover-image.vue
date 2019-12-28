<template>
  <div class="cover-image">
    <!-- 根据封面的images长度 进行渲染 一个或者3个或者不渲染 -->
    <div @click="openDialog" v-for="(item,index) in list" :key="index" class="cover-item">
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 生成的元素在body上 用visible 控制显示隐藏 -->
    <el-dialog :visible='dialogVisible' @close='closeDialog'>
      <!-- 选择素材的组件 -->
      <select-image></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接收属性
  data () {
    return {
      dialogVisible: false, // 控制碳层打开关闭的变量
      defaultImg: require('../../assets/img/pic_bg.png') // 将图片编程变量
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true // 打开弹层
    },
    closeDialog () {
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  margin: 20px 0;
  margin-left: 120px;
  .cover-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    border-radius: 5px;
    padding: 5px;
    img {
        width: 100%;
        height: 100%;
    }
  }
}
</style>
