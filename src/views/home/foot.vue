<template>
  <div id="footerBox">
    <div class="header">TD Design 标准化小组</div>
    <div class="content clearfix">
      <ul>
        <li class="clearfix" v-for="(tm, i) in team" :key="i">
          <div class="teamer" v-for="(tr, j) in tm" :key="j">
            <i
              :style="{
                background: 'url(' + tr.photo + ') no-repeat',
                backgroundSize: 'cover'
              }"
            ></i>
            <span class="name">{{ tr.name }}</span>
            <span class="email">{{ tr.info }}</span>
          </div>
        </li>
      </ul>
      <div class="join">
        <img src="../../assets/img/td-qrcode.png" />
        <p>
          使用企业微信
          <br />扫码加入 TD 标准化讨论群
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        [
          {
            name: "于家女",
            info: "jan.yu ( UI设计师 )",
            photo: require("../../assets/img/yjn.png")
          },
          {
            name: "梁灏",
            info: "hao.liang ( 前端工程师 )",
            photo: require("../../assets/img/lh.png")
          }
        ],
        [
          {
            name: "刘艳平",
            info: "yanping.liu ( UI设计师 )",
            photo: require("../../assets/img/lyp.png")
          },
          {
            name: "王猛",
            info: "meng.wang ( 前端工程师  )",
            photo: require("../../assets/img/wm.png")
          }
        ],
        [
          {
            name: "王扬波",
            info: "yangbo.wang( UI设计师 )",
            photo: require("../../assets/img/wyb.png")
          },
          {
            name: "刘鹏飞",
            info: "pengfei.liu ( 前端工程师  )",
            photo: require("../../assets/img/lpf.png")
          }
        ]
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#footerBox {
  width: 1155px;
  margin: 50px auto 60px;
  text-align: left;
  .header {
    font-family: PingFangSC-Medium;
    color: #17233d 100%;
    font-size: 20px;
    padding-bottom: 25px;
    margin-bottom: 20px;
    border-bottom: 1px solid #dcdee2;
  }
  ul,
  li {
    list-style: none;
  }
  ul {
    float: left;
    li {
      // margin-bottom: 5px;
      .teamer {
        float: left;
        min-width: 360px;
        margin-right: 50px;
        height: 34px;
        line-height: 34px;
        font-family: PingFangSC-Regular;
        color: #17233d;
        font-size: 14px;
        i {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: 24px;
          // background: url("../../assets/img/wm.png") no-repeat;
          // background-size: cover;
          position: relative;
          top: 8px;
        }
        .name {
          display: inline-block;
          min-width: 78px;
          padding: 0 18px;
        }
        .email {
          color: #17233dbd;
        }
      }
    }
  }

  .join {
    float: right;
    font-size: 14px;
    color: #17233dbd;
    text-align: right;
    img {
      width: 112px;
      height: 112px;
    }
    p {
      margin-top: 10px;
    }
  }
}
</style>
