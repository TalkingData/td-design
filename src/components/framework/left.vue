<template>
  <div>
    <search-components
      v-if="searchOpen"
      :data="searchList"
      @on-search-change="setActiveName"
    ></search-components>
    <template v-for="val in data">
      <Menu
        width="auto"
        :key="val.id"
        v-if="val.id === activeMenu"
        :active-name="activeName"
        :open-names="subActiveName"
        @on-select="setActiveName"
      >
        <Submenu v-for="obj in val.child" :name="obj.id" :key="obj.id">
          <template slot="title">
            <Icon :type="obj.icon"></Icon>
            {{ obj.name }}
          </template>
          <template v-for="item in obj.child">
            <template v-if="!item.child.length">
              <Menu-item :name="item.id" :key="item.id" :to="item.href">
                {{ item.href }}
                <span class="layout-left-span"> {{ item.name }}</span>
              </Menu-item>
            </template>
            <!-- <template v-else>
              <MenuGroup :title="item.name" style="marginLeft:25px">
                <template v-for="(subItem, subItemKey) in item.child">
                  <Menu-item
                    :name="subItem.id"
                    :key="subItem.id"
                    :style="!subItemKey ? 'margin:40px 0 0 0 ' : ''"
                  >
                    <router-link :to="subItem.href || ''">
                      {{ subItem.name }}
                    </router-link>
                  </Menu-item>
                </template>
              </MenuGroup>
            </template> -->
          </template>
        </Submenu>
      </Menu>
    </template>
  </div>
</template>
<script>
import filterPath from "./setpath";
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
      searchList: [],
      searchOpen: false
    };
  },
  watch: {},
  mounted() {
    this.$bus.$on("top-getData-end", data => {
      this.data = data;
      this.init();
    });
    this.$bus.$on("menu-change", key => {
      const data = this.isChild(key - 1);
      this.setActiveName(data.id);
      const path = this.$router.currentRoute.params.id;
      const current = filterPath.setPath(path, this.data);
      this.activeMenu = key;
      this.subActiveName = [current.leftCurrent];
      this.searchList = current.searchList;
      this.searchOpen = current.searchOpen;
    });
  },
  methods: {
    init() {
      let path = this.$router.currentRoute.params.id;
      const current = filterPath.setPath(path, this.data);
      this.activeMenu = current.firstCurrent;
      this.searchList = current.searchList;
      this.searchOpen = current.searchOpen;
      this.subActiveName = [current.leftCurrent];
      this.setActiveName(current.childCurrent);
    },
    isChild(index) {
      let id = "";
      const data = this.data[index].child;
      const firstId = data[0].id;
      if (data[0].child) {
        id = data[0].child[0].id;
      }
      return {
        id: id,
        firstId: firstId
      };
    },
    setActiveName(activeName) {
      document.documentElement.scrollTop = 0;
      this.$bus.$emit("init-Anchor-scrollTop-notice", false);
      if (activeName) {
        this.activeName = activeName;
      }
    }
  }
};
</script>
