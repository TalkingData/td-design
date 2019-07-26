<template>
  <div class="layout">
    <!-- 公共头部 -->
    <top :isHome="true"></top>
    <!-- 首页容器 -->
    <div class="index-box">
      <div class="index-banner">
        <h1>TD Design</h1>
        <h3>通用的设计原则和设计语言帮助团队快速构建一致性体验</h3>
      </div>
      <div class="index-content clearfix">
        <div class="index-nav-box" v-for="(col, j) in nav" :key="j">
          <div
            :class="[
              'index-nav',
              row.extra && row.extra.disabled ? 'disabled' : ''
            ]"
            v-for="(row, i) in col.child"
            :key="i"
          >
            <router-link :to="row.link" :class="row.extra && row.extra.disabled ? 'disabled' : ''">
              <div class="nav-title">
                <span :class="['nav', cpType(row.type, row.extra)]">{{ row.type }}</span>
                <span>{{ row.title }}</span>
              </div>
              <div class="nav-con" v-if="row.content">{{ row.content }}</div>
              <div
                class="nav-pic"
                v-if="row.pic"
                :style="{
                background: row.bg,
                padding:
                  row.extra && row.extra.padding ? row.extra.padding : '25px 0'
              }"
              >
                <img :src="row.pic" alt />
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <foot></foot>
  </div>
</template>

<script>
import top from "@/components/framework/top";
import { HOMENAV } from "@/config/home-nav";
import foot from "@/views/home/foot";
export default {
  components: {
    top,
    foot
  },
  data() {
    return {
      nav: HOMENAV
    };
  },
  methods: {
    cpType(type, extra) {
      if (type === "C" && extra && extra.isComponent) return "component";
      switch (type) {
        case "B":
          return "brand";
        case "D":
          return "design";
        case "C":
          return "chart";
        case "S":
          return "style";
      }
    }
  },
  mounted() {
    // console.log(this.nav);
  }
};
</script>

<style lang="less" scoped>
.index-box {
  width: 100%;
  margin-top: 72px;
  .index-banner {
    height: 304px;
    background: #2149ab;
    text-align: center;
    h1 {
      padding-top: 65px;
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
    margin: -65px auto 0;
    width: 1155px;
    .index-nav-box {
      float: left;
      width: 360px;
      margin: 0 12.5px 25px;
      .index-nav {
        margin-bottom: 25px;
        background: #ffffff;
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
          0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
        &:hover {
          transition: 0.3s box-shadow;
          box-shadow: 0 8px 10px 10px rgba(0, 0, 0, 0.14),
            0 3px 14px 2px rgba(0, 0, 0, 0.12),
            0 5px 5px -3px rgba(0, 0, 0, 0.2);
        }
        a {
          color: #17233d;
          &:hover {
            color: #2d8cf0;
          }
          &.disabled {
            cursor: default;
          }
        }
        .nav-title {
          height: 65px;
          line-height: 65px;
          padding-left: 25px;
          font-family: PingFangSC-Medium;
          font-size: 20px;
          text-align: left;
          .nav {
            display: inline-block;
            margin-right: 18px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 24px;
            color: #fff;
            font-size: 16px;
            text-align: center;
          }
        }
        .nav-con {
          padding: 0 25px 30px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: rgba(23, 35, 61, 0.75);
          text-align: justify;
        }
        .nav-pic {
          padding: 25px 0;
          text-align: center;
        }
        &.disabled {
          opacity: 0.35;
        }
      }
    }
  }
}
</style>
