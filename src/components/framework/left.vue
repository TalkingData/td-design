<template>
  <div>
    <search-components :data="app.componentMenu"></search-components>
    <Menu
      :active-name="activeName"
      ref="menu"
      width="auto"
      @on-select="onSelectedChange"
    >
      <MenuItem
        v-for="item in app.componentMenu"
        :key="item.text"
        :name="item.text"
        :to="'/components/' + item.text"
      >
        {{ item.text }}
        <span class="layout-left-span"> {{ item.label }}</span>
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
// import menu from "../../assets/config/menu.js";
// import filterPath from "./setpath";
import searchComponents from "./searchComponents";
export default {
  components: {
    searchComponents
  },
  inject: ["app"],
  data() {
    return {
      data: {},
      activeMenu: "",
      activeName: "",
      //第三层菜单选中
      subActiveName: [],
      subKey: "tempkey"
    };
  },
  watch: {
    $route: {
      handler() {
        this.activeName = this.$route.params.id;
        this.$nextTick(() => {
          this.$refs.menu.updateActiveName();
        });
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.menu.updateActiveName();
    }, 200);
  },
  methods: {
    onSelectedChange() {
      document.documentElement.scrollTop = 0;
      this.$bus.$emit("init-Anchor-scrollTop-notice", false);
    }
  }
};
</script>
