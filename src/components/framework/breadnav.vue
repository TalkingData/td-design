<template>
  <div :class="['bread-nav', preview ? 'float' : '']">
    <div class="fl">
      <span class="nav-type chart">C</span>
      <Breadcrumb
        separator="<i class='ivu-icon i-td i-td-keyboard_arrow_right'></i>"
      >
        <BreadcrumbItem v-for="(i, j) in bread" :key="j" :to="i.to">{{
          i.name
        }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div v-if="preview" class="fr">
      <Button @click="exitPreview" type="primary">退出预览</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bread: {
      type: Array,
      default: () => []
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {
    exitPreview() {
      this.$parent.$parent && this.$parent.$parent.close();
    }
  }
};
</script>

<style lang="less">
.bread-nav {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 56px;
  padding: 0 25px;
  line-height: 56px;
  background: #ffffff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.14);
  &.float {
    top: 0;
    left: 0;
    right: 0;
  }
  .nav-type {
    display: inline-block;
    margin-right: 20px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 24px;
    color: #fff;
    font-size: 16px;
    font-family: Roboto-Regular;
    text-align: center;
  }
  .ivu-breadcrumb {
    display: inline-block;
    font-size: 16px;
    .ivu-breadcrumb-item-separator {
      margin: 0;
    }
    .i-td {
      font-size: 24px;
      color: rgba(23, 35, 61, 0.55);
    }
  }
}
</style>
