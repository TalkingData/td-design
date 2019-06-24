<template>
  <div class="searchComponents">
    <header>
      <label>{{ firstNav.name }}</label>
      {{
        firstNav.path.substring(0, 1).toUpperCase() + firstNav.path.substring(1)
      }}
    </header>
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
        >
          <span>
            {{ option.label }}
          </span>
          {{ option.en }}
        </Option>
      </Select>
      <Icon type="md-search" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // data: {
    //   type: Array,
    //   default: function() {
    //     return [];
    //   }
    // },
    firstNav: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    $route() {
      this.options.length && (this.options = []);
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
          this.searchList(this.firstNav.child, query, options);
          this.$set(this, "options", options);
        }, 200);
      } else {
        this.options = [];
      }
    },
    searchList(data, query, box) {
      data.forEach(item => {
        if (item.child.length > 0) {
          return this.searchList(item.child, query, box);
        }
        if (
          item.name.indexOf(query) > -1 ||
          item.englishName.toLowerCase().indexOf(query.toLowerCase()) > -1
        ) {
          box.push({
            id: item.id,
            label: item.name,
            value: item.href,
            en: item.englishName
          });
        }
      });
    },

    onSearchRouterChange(data) {
      if (data) {
        let selected = this.options.find(item => {
          if (item.value === data) {
            return item;
          }
        });
        const curNav = this.$router.history.current.name;
        this.$refs.iSelect.clearSingleSelect();
        this.$emit("on-search-change", selected.id);
        this.$router.push(`/${curNav}/${data}`);
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
