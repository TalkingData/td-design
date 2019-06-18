<template>
  <div class="layout">
    <!-- 公共头部 -->
    <top></top>
    <!-- 首页容器 -->
    <div class="index-box">
      <div class="index-banner">
        <h1>TD Design</h1>
        <h3>通用的设计原则和设计语言帮助团队快速构建一致性体验</h3>
      </div>
      <div class="index-content"></div>
    </div>
  </div>
</template>

<script>
import top from "@/components/framework/top";
export default {
  components: {
    top
  },
  data() {
    return {
      key: 1
    };
  },
  methods: {
    name() {}
  }
};
</script>

<style lang="less" scoped>
.index-box {
  width: 100%;
  margin-top: 72px;
  .index-banner {
    height: 230px;
    background: #2149ab;
    text-align: center;
    h1 {
      padding-top: 45px;
      font-family: HarmoniaSansPro-Bold;
      font-size: 32px;
      color: #ffffff;
    }
    h3 {
      margin-top: 25px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #ffffff;
    }
  }
  .index-content {
    margin: -45px auto 0;
    width: 80%;
  }
}
</style>
