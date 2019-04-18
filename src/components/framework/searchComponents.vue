<template>
  <div class="searchComponents">
    <header><label>组件</label>Components</header>
    <div class="searchComponents-select">
      <Select
        placeholder="搜索"
        v-model="selectedValue"
        filterable
        remote
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <Option
          v-for="(option, index) in options"
          :value="option.value"
          :key="index"
          >{{ option.label }}</Option
        >
      </Select>
      <Icon type="md-search" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedValue: "",
      loading: false,
      options: [],
      list: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New hampshire",
        "New jersey",
        "New mexico",
        "New york",
        "North carolina",
        "North dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode island",
        "South carolina",
        "South dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West virginia",
        "Wisconsin",
        "Wyoming"
      ]
    };
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            };
          });
          this.options = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.searchComponents {
  width: 100%;
  padding: 20px 20px;
  header {
    font-family: Roboto-Regular;
    font-size: 16px;
    color: rgba(23, 35, 61, 0.55);
    line-height: 24px;
    padding-bottom: 14px;
    label {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #17233d;
      line-height: 24px;
      padding-right: 8px;
    }
  }
}
</style>
<style lang="less">
.searchComponents-select {
  position: relative;
  height: 32px;

  .ivu-select {
    position: absolute;
    left: 0;
    z-index: 2;
    border: none;
  }
  .ivu-select-single .ivu-select-input {
    padding-left: 35px;
    font-size: 14px;
    line-height: 33px;
  }
  .ivu-select-selection {
    background: rgba(45, 140, 240, 0.06);
    border-radius: 4px;
    border: none;
  }
  & > i {
    position: absolute;
    left: 10px;
    top: 8px;
    font-size: 18px;
    color: rgba(23, 35, 61, 0.35);
    z-index: 3;
  }
}
</style>
