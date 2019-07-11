<template>
  <div class="bread-nav">
    <div class="fl">
      <span class="nav-type chart">C</span>
      <Breadcrumb
        separator="<i class='ivu-icon i-td i-td-keyboard_arrow_right'></i>"
      >
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="fr">
      <Button @click="exitPreview" type="primary">退出预览</Button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    exitPreview() {
      console.log("exit");
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
