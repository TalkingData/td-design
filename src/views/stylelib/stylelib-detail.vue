<template>
  <div class="slib-box">
    <div class="slib-head">
      <h1>基础分析页</h1>
      <p class="sub">
        该模板适用于大部分产品数据概览页，布局方式采用左侧固定，右侧自适应方式。
      </p>
      <p class="time">
        <span class="ct">创建时间：2019-08-01</span>
        <span>更新时间：2019-08-01</span>
      </p>
      <div class="slib-opr">
        <Button custom-icon="i-td i-td-visibility_px">预览</Button>
        <Button custom-icon="i-td i-td-visibility_px" type="primary"
          >查看代码</Button
        >
      </div>
    </div>
    <div class="previewBox">
      <img
        src="https://cdn.nlark.com/yuque/0/2019/jpeg/85443/1561519927798-2b96e404-60df-4845-86b1-9a30471980e3.jpeg"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.slib-box {
  padding: 55px 120px;
  .slib-head {
    position: relative;
    h1 {
      font-size: 24px;
    }
    p.sub {
      margin: 20px 0 10px;
      color: rgba(23, 35, 61, 0.75);
    }
    p.time {
      .ct {
        margin-right: 30px;
      }
      color: rgba(23, 35, 61, 0.5);
    }
    .slib-opr {
      .ivu-btn-default {
        margin-right: 20px;
      }
      position: absolute;
      right: 0;
      bottom: 20px;
    }
  }
  .previewBox {
    margin-top: 35px;
    img {
      width: 100%;
    }
  }
}
</style>
