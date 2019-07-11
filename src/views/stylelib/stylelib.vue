<template>
  <main class="stylelib">
    <div class="head">
      <h1>
        <span class="nav-type style">S</span>
        <span>样式库</span>
      </h1>
      <p>丰富的设计样式库，不但可以快速使用而且为设计提供更多灵感。</p>
    </div>
    <!-- 分类 -->
    <div class="cate">
      <RadioGroup v-model="selCate" @on-change="filterCate" type="button">
        <Radio label="北京"></Radio>
        <Radio label="上海"></Radio>
        <Radio label="深圳"></Radio>
        <Radio label="杭州"></Radio>
      </RadioGroup>
    </div>
    <div class="cate-con">
      <div class="cate-head clearfix">
        <div class="cate-title">{{ selCate }} (12)</div>
        <div class="cate-desc">
          <Dropdown @on-click="descCate">
            <a href="javascript:void(0)">
              {{ selSort }}
              <Icon size="24" custom="i-td i-td-arrow_drop_down_px"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(d, i) in sorts" :name="d.name" :key="i">
                {{ d.name }}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <!-- 模版内容 -->
      <div class="tpl-box clearfix">
        <ul>
          <li>
            <router-link
              to="stylelib-detail/stylelib/wong"
              class="info clearfix"
            >
              <span class="title fl">基础分析</span>
              <span class="data fr">
                <Icon size="16" custom="i-td i-td-visibility_px"></Icon>
                <em>100</em>
              </span>
            </router-link>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      selCate: "北京",
      selSort: "最受欢迎",
      sorts: [{ name: "最受欢迎", id: 0 }, { name: "更新时间", id: 1 }]
    };
  },
  methods: {
    filterCate(label) {
      console.log(label);
    },
    descCate(name) {
      this.selSort = name;
    }
  }
};
</script>

<style lang="less" scoped>
.stylelib {
  color: #17233d;
  .head {
    padding: 40px 60px;
    text-align: left;
    h1 {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      .nav-type {
        display: inline-block;
        margin-right: 28px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 32px;
        color: #fff;
        font-size: 16px;
        font-family: Roboto-Regular;
        text-align: center;
        position: relative;
        bottom: 3px;
      }
    }
    p {
      margin-top: 22px;
      font-family: PingFangSC-Regular;
    }
  }

  .cate {
    width: 100%;
    height: 56px;
    line-height: 56px;
    padding: 0 60px;
    border-top: 1px solid #dcdee2;
    background: #ffffff;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14);
    font-family: PingFangSC-Regular;
    .ivu-radio-wrapper {
      margin-right: 10px;
      border-radius: 0;
      border: 0;
      height: 32px;
      line-height: 32px;
    }
    .ivu-radio-group-button .ivu-radio-wrapper:after,
    .ivu-radio-group-button .ivu-radio-wrapper:before {
      display: none;
    }
    .ivu-radio-group-button .ivu-radio-wrapper-checked {
      background: #deebfa;
      color: #2185f0;
    }
  }

  .cate-con {
    padding: 0 50px 60px;
    .cate-head {
      padding: 20px 10px;
      .cate-title {
        float: left;
        font-size: 16px;
        font-weight: 500;
      }
      .cate-desc {
        float: right;
        line-height: 24px;
        .ivu-dropdown-rel {
          a {
            color: #17233dbb;
            font-weight: 500;
          }
        }
      }
    }
    .tpl-box {
      ul {
        li {
          float: left;
          margin: 10px;
          width: calc((100% - 60px) / 3);
          height: 320px;
          position: relative;
          border-radius: 4px;
          box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.2);
          background-size: 100% auto;
          background: url(https://cdn.nlark.com/yuque/0/2019/jpeg/85443/1561519927798-2b96e404-60df-4845-86b1-9a30471980e3.jpeg)
            center no-repeat;
          .info {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 16px;
            background: #fff;
            border-top: 1px solid #dcdee2;
            color: #17233d;
            .title {
              font-weight: 500;
            }
            .i-td {
              margin-right: 10px;
              color: rgba(23, 35, 61, 0.55);
            }
            em {
              font-style: normal;
            }
          }
        }
      }
    }
  }
}
</style>
