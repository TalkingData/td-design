<style lang="less" scoped>
.main {
  padding-right: 30px;
  position: relative;
  &-search {
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    margin-right: 12px;
    position: absolute;
    right: 0;
    top: 6px;
  }
}
</style>
<style lang="less">
.overall-search {
  .ivu-input {
    border-radius: 15px;
    border: none;
  }
  .ivu-input-prefix i,
  .ivu-input-suffix i {
    font-size: 18px;
  }
  .ivu-input-icon-clear {
    font-size: 20px;
  }
}
</style>
<template>
  <div class="main">
    <Icon custom="i-td i-td-search_px" class="main-search fr" v-if="!open" @click="open=true"></Icon>
    <Input
      placeholder="搜索"
      style="width: 100%"
      clearable
      v-model="value"
      v-else
      class="overall-search"
      @on-enter="submit"
    >
      <Icon custom="i-td i-td-search_px" slot="prefix" />
    </Input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      open: false,
      value: ""
    };
  },
  watch: {},
  mounted() {
    // 搜索页开启搜索控件
    this.onOpenSearchControl();
  },
  methods: {
    onOpenSearchControl() {
      if (this.$route.meta.searchOpen) {
        this.open = true;
        this.value = this.$route.query.q;
      }
    },
    submit() {
      this.$router.push({
        path: "/search",
        query: {
          q: this.value
        }
      });
    }
  }
};
</script>

