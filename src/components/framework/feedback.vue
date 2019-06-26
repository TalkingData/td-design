<template>
  <div id="feedback-box">
    <a :href="feed" target="_blank" class="feed">
      <Icon custom="i-td i-td-create_px" />
    </a>
    <a href="javascript:void(0)" class="back">
      <Icon custom="i-td i-td-Qrcode" />
      <div class="fb-commun">
        <img :src="qrcode" />
        <p>
          使用企业微信扫码加入
          <b>TD 标准化讨论</b>群
        </p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feed:
        "https://kms.talkingdata.com/km/forum/indexCriteria.jsp?&timestamp=1561086276731#cri.q=categoryId:16b1cc8c1fc01a5b63f0c5b49d9841cd",
      qrcode: require("../../assets/img/td-qrcode.png")
    };
  }
};
</script>

<style lang="less" scoped>
#feedback-box {
  position: fixed;
  z-index: 1000;
  bottom: 25px;
  right: 25px;
  width: 44px;
  height: 88px;
  background: #ffffff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  a {
    display: block;
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    i {
      font-size: 24px;
      color: rgba(23, 35, 61, 0.55);
    }
    &.back {
      position: relative;
      background: #2185f0;
      border-radius: 0 0 4px 4px;
      i {
        color: #fff;
      }
      &::before {
        transition: all 0.3s ease;
        display: none;
        position: absolute;
        content: "";
        right: 60px;
        bottom: 12px;
        width: 15px;
        height: 15px;
        transform: rotate(45deg);
        background: #ffffff;
        box-shadow: 0 2px 8px -1px rgba(23, 35, 61, 0.25);
        z-index: 100;
      }
      &::after {
        transition: all 0.3s ease;
        display: none;
        position: absolute;
        content: "";
        right: 68px;
        bottom: 5px;
        width: 20px;
        height: 30px;
        background: #fff;
        z-index: 110;
      }

      &:hover {
        .fb-commun,
        &::before,
        &::after {
          display: block;
        }
      }
    }

    .fb-commun {
      transition: all 0.3s ease;
      display: none;
      position: absolute;
      right: 68px;
      bottom: -2px;
      background-clip: padding-box;
      background: #fff;
      width: 180px;
      height: 200px;
      padding: 20px 10px 10px;
      box-shadow: 0 2px 8px -1px rgba(23, 35, 61, 0.25);
      border-radius: 4px;
      text-align: center;
      z-index: 99;
      p {
        font-size: 14px;
        color: rgba(23, 35, 61, 0.75);
        line-height: normal;
      }
      img {
        width: 102px;
        height: 102px;
      }
    }
  }
}
</style>
