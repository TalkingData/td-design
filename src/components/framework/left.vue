<template>
  <div>
    <search-components></search-components>
    <Menu>
      <MenuItem
        v-for="item in app.componentMenu"
        :key="item.text"
        :name="item.text"
        :to="'/components/' + item.text"
      >
        {{ item.label }}
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
// import menu from "../../assets/config/menu.js";
// import filterPath from "./setpath";
import searchComponents from "./searchComponents";
// import bus from "../../bus";
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
  }
};
</script>
