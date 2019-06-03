<style lang="less" scoped>
.myTransition {
  &-content {
    transition: all 0.4s ease;
    overflow: hidden;
  }
  &-split {
    width: 100%;
    border: 1px dashed #eee;
    margin-top: 20px;
  }
  &-code {
    height: 35px;
    line-height: 35px;
    &-more {
      width: 80px;
      margin: 0 auto;
      cursor: pointer;
      font-size: 12px;
      color: #515a6e;
      & > i {
        padding-right: 2px;
      }
      &:hover {
        color: #2d8cf0;
      }
    }
  }
}
</style>

<template>
  <div class="myTransition">
    <div class="myTransition-split"></div>
    <div class="myTransition-content" :style="{ height: height + 'px' }">
      <render-code
        @height="oCodeHeight"
        ref="code"
        :value="value"
        v-if="toggleCode"
        >{{ value }}</render-code
      >
    </div>
    <div class="myTransition-code">
      <p
        class="myTransition-code-more"
        type="text"
        v-if="!open"
        @click="
          open = !open;
          iconChange();
        "
      >
        <Icon type="ios-arrow-up" />
      </p>
      <p
        class="myTransition-code-more"
        type="text"
        v-if="open"
        @click="
          open = !open;
          iconChange();
        "
      >
        <Icon type="ios-arrow-down" />
        Code
      </p>
    </div>
  </div>
</template>
<script>
import renderCode from "./render-code";
export default {
  props: {
    value: {
      type: String
    }
  },
  data: function() {
    return {
      height: 0,
      codeHeight: 0,
      open: true,
      toggleCode: true
    };
  },
  components: { renderCode },
  methods: {
    oCodeHeight(data) {
      this.codeHeight = data;
    },
    iconChange() {
      if (this.open) {
        this.height = 0;
        return false;
      }
      this.height = this.codeHeight;
    }
  },
  watch: {
    value() {
      this.toggleCode = false;
      this.$nextTick(() => {
        this.toggleCode = true;
      });
    }
  }
};
</script>
