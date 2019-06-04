<template>
  <div class="searchComponents">
    <header><label>组件</label>Components</header>
    <div class="searchComponents-select">
      <Select
        ref="iSelect"
        placeholder="搜索"
        v-model="selectedValue"
        clearable
        filterable
        remote
        :remote-method="remoteMethod"
        :loading="loading"
        @on-change="onSearchRouterChange"
      >
        <Option
          v-for="(option, index) in options"
          :value="option.value"
          :label="option.label"
          :key="index"
          >{{ option.value }}

          <span style="padding-left:2px;color: #808695;">{{
            option.label
          }}</span>
        </Option>
      </Select>
      <Icon type="md-search" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      selectedValue: "",
      loading: false,
      options: []
    };
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          let options = [];
          this.data.forEach(item => {
            if (
              item.name.indexOf(query) > -1 ||
              item.englishName.toLowerCase().indexOf(query.toLowerCase()) > -1
            ) {
              options.push({
                label: item.name,
                value: item.href
              });
            }
          });
          this.$set(this, "options", options);
        }, 200);
      } else {
        this.options = [];
      }
    },

    onSearchRouterChange(data) {
      if (data) {
        let selected = this.data.find(item => {
          if (item.href === data) {
            return item;
          }
        });
        this.$refs.iSelect.clearSingleSelect();
        this.$emit("on-search-change", selected.id);
        this.$router.push(`/components/${selected.href}`);
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

  .ivu-select-single .ivu-select-input {
    padding-left: 35px;
    font-size: 14px;
    line-height: 33px;
  }
  .ivu-select-selection {
    background: rgba(45, 140, 240, 0.06);
    border-radius: 4px;
    border: none;
    box-shadow: none !important;
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
