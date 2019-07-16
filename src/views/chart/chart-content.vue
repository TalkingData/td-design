<template>
  <div class="chart-container">
    <!-- 分类 -->
    <div class="chart-box" v-for="(i, j) in 8" :key="j" :id="'a4-1-' + (j + 1)">
      <h1 class="chart-type">折线图</h1>
      <ul class="chart-wrapper clearfix">
        <li>
          <h2 class="chart-name">基础折线图</h2>
          <div class="chart-img">
            <img
              src="http://design.talkingdata.com/hESVBhwDF374ECnzj4ZYwqWeRkzZdGFd"
              alt
            />
          </div>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { ajax } from "@/util/ajax";
export default {};
</script>

<style lang="less" scoped>
.chart-container {
  width: 1162px;
  margin: 0 auto;
  color: #1c2438;
  padding: 20px 0;
  .chart-box {
    h1 {
      font-size: 20px;
      color: #17233d;
      margin-left: 12.5px;
    }
    .chart-wrapper {
      margin: 20px 0;
      li {
        float: left;
        width: 362px;
        height: 340px;
        margin: 12.5px;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.2);
        h2 {
          height: 48px;
          line-height: 48px;
          padding: 0 25px;
          font-size: 16px;
          border-bottom: 1px solid #dcdee2;
        }
        .chart-img {
          height: calc(100% - 48px);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
