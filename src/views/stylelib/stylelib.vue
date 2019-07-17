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
        <Radio v-for="(i, j) in cateList" :key="j" :label="i.name"></Radio>
      </RadioGroup>
    </div>
    <div class="cate-con">
      <div class="cate-head clearfix">
        <div class="cate-title">{{ selCate }} ({{ tplList.length }})</div>
        <div class="cate-desc">
          <Dropdown @on-click="descCate">
            <a href="javascript:void(0)">
              {{ selSort }}
              <Icon size="24" custom="i-td i-td-arrow_drop_down_px"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(d, i) in sorts" :name="d.name" :key="i">
                {{
                d.name
                }}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <!-- 模版内容 -->
      <div class="tpl-box clearfix">
        <ul>
          <li v-for="(i, j) in tplList" :key="j">
            <img :src="'http://design.talkingdata.com/' + i.cover" alt />
            <!-- <a :to="'stylelib-detail/stylelib/'+i.id" class="info clearfix"> -->
            <a @click="goDetail(i.id)" class="info clearfix">
              <span class="title fl">{{ i.title }}</span>
              <span class="data fr">
                <Icon size="16" custom="i-td i-td-visibility_px"></Icon>
                <em>{{ i.hot }}</em>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { ajax } from "@/util/ajax";
export default {
  data() {
    return {
      selCate: "全部",
      selSort: "最受欢迎",
      sorts: [
        { name: "最受欢迎", id: 0, key: "hot" },
        { name: "创建时间", id: 1, key: "created_at" }
      ],
      cateList: [{ name: "全部", id: 0 }],
      tplList: []
    };
  },
  created() {
    this.getCate();
    this.getTpl();
  },
  methods: {
    // 获取分类
    async getCate() {
      let res = await ajax({
        urlKey: "/api/template/tag/list",
        methods: "POST",
        data: {}
      });
      if (res && res.status == 1) {
        this.cateList = this.cateList.concat(res.data);
      } else {
        this.$Message.error(res.data);
      }
    },
    // 获取模版
    async getTpl() {
      let fd = {};
      fd.tag_id = this.cateList.filter(
        item => item.name === this.selCate
      )[0].id;
      fd.order = this.sorts.filter(item => item.name === this.selSort)[0].key;
      let res = await ajax({
        urlKey: "/api/template/item/list",
        methods: "POST",
        data: fd
      });
      if (res && res.status == 1) {
        this.tplList = res.data;
      }
    },
    filterCate() {
      this.getTpl();
    },
    descCate(name) {
      if (name === this.selSort) return;
      this.selSort = name;
      this.getTpl();
    },
    goDetail(id) {
      //  let tag_id = this.cateList.filter(
      //     item => item.name === this.selCate
      //   )[0].id;
      let rou = `/stylelib-detail/stylelib/${id}`;
      this.$router.push(rou);
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
          overflow: hidden;
          background: #dcdee2;
          // background-size: 100% auto;
          // background: url(https://cdn.nlark.com/yuque/0/2019/jpeg/85443/1561519927798-2b96e404-60df-4845-86b1-9a30471980e3.jpeg)
          //   center no-repeat;
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
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
