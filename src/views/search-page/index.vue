<style lang="less" scoped>
.main {
  width: 800px;
  margin: 0 auto;
  height: 100%;
  h2 {
    font-family: PingFangSC-Medium;
    color: #17233d;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: 0;
    padding: 33px 0 23px 0;
  }
  &-tabs {
    border-bottom: 1px solid rgba(23, 35, 61, 0.15);
    padding-bottom: 16px;
    .ivu-radio-group-button .ivu-radio-wrapper:after,
    .ivu-radio-group-button .ivu-radio-wrapper:before {
      display: none;
    }
    .ivu-radio-group-button .ivu-radio-wrapper-checked {
      background: #2185f0;
      color: #fff;
      box-shadow: none;
      font-weight: 400;
    }
    .ivu-radio-group-button .ivu-radio-wrapper:first-child {
      border-radius: 100px;
      border-left: none;
    }
    .ivu-radio-group-button .ivu-radio-wrapper:last-child {
      border-radius: 100px;
    }
    .ivu-radio-wrapper {
      margin-right: 10px;
      border-radius: 100px;
      border: 0;
      height: 32px;
      line-height: 32px;
    }
  }
  &-conent {
    cursor: pointer;
  }
  &-empty {
    padding: 30px 16px;
    color: #8c8c8c;
    text-align: center;
    // border: 1px solid rgba(23, 35, 61, 0.15);
    // border-top: none;
  }
}
</style>
<template>
  <main class="main">
    <h2>“{{ searchValue }}”的搜索结果（{{ sorts[0]&&sorts[0].value }}）</h2>
    <div class="main-tabs">
      <RadioGroup v-model="selSort" type="button">
        <Radio v-for="(i, j) in sorts" :key="j" :label="i.name">{{ i.name }} {{ i.value }}</Radio>
      </RadioGroup>
    </div>
    <div class="main-conent" v-if="details.length">
      <card-details
        :data="option"
        :name="searchValue"
        v-for="(option,index) of details"
        :key="index"
      ></card-details>
    </div>
    <div v-else class="main-empty">未能找到相关内容</div>
  </main>
</template>
<script>
import { ajax } from "@/util/ajax";

import cardDetails from "./card-details";
import Util from "@/util/util.js";

export default {
  components: { cardDetails },
  inject: ["app"],
  data() {
    return {
      // 单选
      selSort: "全部",
      all: [{ name: "全部", value: 0 }],
      sorts: [],
      resData: []
    };
  },
  computed: {
    searchValue() {
      return Util.getInterceptValue(
        this.$route.fullPath,
        "/searchPage/search?q="
      );
    },
    menuData() {
      return this.$store.state.menuData;
    },
    // 显示模糊查询到的内容
    details() {
      let list = [];
      // 列表数据或者请求数据没有返回空数组
      if (!this.sorts.length || !this.resData.length) return list;
      let index = this.sorts.findIndex(item => {
        return item.name === this.selSort;
      });
      if (!index) {
        // 全部
        list = [];
        this.resData.forEach((option, i) => {
          if (option.length) {
            list = list.concat(this.filterData(i, option));
          }
        });
      } else {
        list = this.filterData(index - 1, this.resData[index - 1]);
      }
      return list;
    }
  },
  watch: {
    // 监听搜索的内容
    "$route.params.search": {
      handler() {
        this.getAjax();
      },
      deep: true
    },
    menuData: function() {
      this.init();
    }
  },
  mounted() {
    this.init();
    this.getAjax();
  },
  methods: {
    init() {
      if (!this.menuData || !Object.keys(this.menuData).length) return false;
      let list = this.menuData.map(option => {
        return {
          name: option.name,
          value: 0
        };
      });
      this.sorts = this.all.concat(list);
    },
    // 过滤数据
    filterData(index, arr) {
      let list = [];
      // 2 组件
      let clildren = this.menuData[index];
      if (clildren) {
        this.getArrangementData(arr).forEach(item => {
          list.push({
            parent: clildren.name, ///"大标题"
            children: clildren.name === "样式库" ? item.name : item.label, //mac[0], // 左侧菜单标题
            describe: clildren.name === "样式库" ? item.title : item.content // 模糊查询到的内容
          });
        });
      }
      return list;
    },
    /**
     *  递归查询
     *  params : href 对应字段， data menuJSON对应的节点，list存储查询到的name
     *  // let mac = [];
        // this.getChildName(item.name, clildren.child, mac);
     */
    // getChildName(href, data, list) {
    //   let idx = false;
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].href === href) {
    //       list.push(data[i].name);
    //       idx = true;
    //     } else if (data[i].child.length && !idx) {
    //       this.getChildName(href, data[i].child, list);
    //     }
    //   }
    // },
    /**
     * 整理数据 对数据进行拍平[[],[],[]]=>[{}]
     */
    getArrangementData(data) {
      let list = [];
      data.forEach(item => {
        if (item instanceof Array) {
          item.forEach(option => {
            list.push(option);
          });
        } else {
          list.push(item);
        }
      });
      return list;
    },
    /**
     * 获取数据
     */
    getAjax() {
      this.selSort = "全部";
      ajax({
        urlKey: "/api/resource/query",
        methods: "POST",
        data: {
          key: this.searchValue
        }
      }).then(res => {
        if (res.status === 1) {
          this.resData = res.data;
          this.setData(res.data);
        } else {
          // 清空数据
          this.onClearData();
        }
      });
    },
    /**
     * 清空数据
     */
    onClearData() {
      this.sorts.forEach(item => {
        item.value = 0;
      });
      this.resData = [];
    },
    /**
     *  请求到数据后对 tabs 灌入数据
     *  这里注意数据更新与视图层更新
     */
    setData(data) {
      let arr = [];
      let len = 0;
      data.forEach((item, index) => {
        let i = 0;
        if (!item.length) {
          i = 0;
        } else {
          i = this.getLength(item, index);
        }
        arr.push(i);
        len = len + i;
      });
      // 添加全部
      arr.unshift(len);
      this.sorts.forEach((item, i) => {
        item.value = arr[i];
      });
    },
    /**
     *  返回查询的数量
     *  后端在这里直接返回的[[],[],[[],[],[]],[],[]]  [品牌,设计,[文档,代码,用法],图表,样式库]；
     *  组件较为特殊，数组套数组
     *  parsms:  data搜索到的数据，index索引（这里只能根据索引，因为后端返回的[]）
     */
    getLength(data, index) {
      if (index === 2) {
        let i = 0;
        data.forEach(k => {
          i = i + k.length;
        });
        return i;
      } else {
        return data.length;
      }
    }
  }
};
</script>
