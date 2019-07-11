<template>
  <main class="common">
    <div class="clearfix">
      <breadnav></breadnav>
    </div>
    <!-- 左侧菜单 -->
    <div class="layout-left">
      <Menu width="auto">
        <Submenu name="1">
          <template slot="title"
            >内容管理</template
          >
          <MenuItem name="1-1">文章管理</MenuItem>
          <MenuItem name="1-2">评论管理</MenuItem>
          <MenuItem name="1-3">举报管理</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title"
            >用户管理</template
          >
          <MenuItem name="2-1">新增用户</MenuItem>
          <MenuItem name="2-2">活跃用户</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <!-- 右侧内容 -->
    <div class="layout-content">
      {{ dtype + "-" + id }}
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import breadnav from "@/components/framework/breadnav";
export default {
  components: {
    breadnav
  },
  props: {
    dtype: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.common {
  width: 100%;
  height: 100%;
  .layout-left {
    top: 128px;
  }
  .layout-content {
    margin: 56px 0 0 256px;
  }
}
</style>
