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
}
</style>
<template>
  <main class="main">
    <h2>“{{ searchValue }}”的搜索结果（{{ searchLength }}）</h2>
    <div class="main-tabs">
      <!-- <RadioGroup v-model="selSort" @on-change="filterCate" type="button">
        <Radio v-for="(i, j) in sorts" :key="j" :label="i.name">{{ i.name }} {{ i.value }}</Radio>
      </RadioGroup>-->
      {{ sorts|json }}
    </div>
  </main>
</template>
<script>
import { ajax } from "@/util/ajax";

import menu from "@/assets/config/menu.js";
export default {
  data() {
    return {
      //   searchValue: "",
      searchLength: 0,
      // 单选
      selSort: "全部",
      all: [{ name: "全部", value: 0 }],
      sorts: []
    };
  },
  computed: {
    searchValue() {
      return this.$store.state.searchValue;
    }
  },
  watch: {
    searchValue: function() {
      this.getAjax();
    }
  },
  mounted() {
    this.init();
    this.getAjax();
  },
  methods: {
    init() {
      let list = menu.child.map(option => {
        return {
          name: option.name,
          value: 0
        };
      });
      this.sorts = this.all.concat(list);
    },
    filterCate() {
      //   let type = this.getDataType("name", this.selCate, "enname");
      //   let rou = `/stylelib`;
      //   if (type) {
      //     rou = rou + `/${type}`;
      //   }
      //   this.$router.push(rou);
      //   this.getTpl();
    },
    getAjax() {
      ajax({
        urlKey: "/api/resource/query",
        methods: "POST",
        data: {
          key: this.searchValue
        }
      }).then(res => {
        console.log(res);
        if (res.status === 1) {
          this.filterData(res.data);
        } else {
          console.log("");
        }
      });
    },
    filterData(data) {
      let list = JSON.parse(JSON.stringify(this.sorts.slice(1)));
      if (data.length !== list.length) {
        this.$Message.error("请重新请求数据");
        return;
      }
      list.forEach((item, index) => {
        let option = data[index];
        if (!option.length) {
          item.value = 0;
        } else {
          let i = this.getLength(option, index);
          item.value = i;
        }
      });
      let len = 0;
      list.forEach(item => {
        len = len + item.value;
      });
      this.all[0].value = len;
      //let arr = this.all.concat(list);
      // this.$set(this.sorts, arr);
      //this.$set(this.sorts, [123]);
      //this.$set(this.arr, 1, 'x');
      //console.log(this.sorts);
    },
    getLength(data, index) {
      if (index !== 2) {
        return data.length;
      } else {
        let i = 0;
        data.forEach(k => {
          i = i + k.length;
        });
        return i;
      }
    }
  }
};
</script>
