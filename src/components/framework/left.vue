<template>
  <div>
    <search-components v-if="searchOpen" :firstNav="firstNav" @on-search-change="setActiveName"></search-components>
    <template v-for="val in data">
      <Menu
        width="auto"
        :key="val.id"
        v-if="val.id === activeMenu"
        :active-name="activeName"
        :open-names="subActiveName"
        @on-select="setActiveName"
      >
        <template v-for="obj in val.child">
          <!-- single -->
          <template v-if="!obj.child.length">
            <Menu-item :name="obj.id" :key="obj.id" :to="'/'+val.path+'/'+obj.href+secondLevelType">
              <span>{{ obj.name }}</span>
              <span class="layout-left-span">{{ obj.englishName }}</span>
            </Menu-item>
          </template>
          <!-- multiple -->
          <template v-else>
            <Submenu :name="obj.id" :key="obj.id">
              <template slot="title">
                <Icon :type="obj.icon" v-if="obj.icon" />
                {{ obj.name }}
              </template>
              <template v-for="item in obj.child">
                <template v-if="!item.child.length">
                  <Menu-item
                    :name="item.id"
                    :key="item.id"
                    :to="'/'+val.path+'/'+item.href+ secondLevelType"
                  >
                    <span>{{ item.name }}</span>
                    <span class="layout-left-span">{{ item.englishName }}</span>
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
                </template>-->
              </template>
            </Submenu>
          </template>
        </template>
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
      activeMenu: "",
      activeName: "",
      //第三层菜单选中
      subActiveName: [],
      firstNav: null,
      // searchList: [],
      searchOpen: false
    };
  },
  computed: {
    data() {
      return this.$store.state.menuData;
    },
    // 二级导航参数 例如组件中的文档和代码和用法
    secondLevelType() {
      let i = "";
      if (
        this.$route.name === "components" &&
        this.$route.params.id !== "components-use"
      ) {
        i = this.$route.params.type ? `/${this.$route.params.type}` : "/file";
      }
      return i;
    }
  },
  watch: {
    // $route(to) {
    //   //$route(to, from) {
    //   //set sub menu actived
    //   //if (to.name === from.name) {
    //   const sta = filterPath.setPath(to.params.id, this.data, to.name);
    //   this.activeName = sta.leftCurrent;
    //   //}
    // }
    /**
     * 组件menu数据请求回来后重新执行
     */
    data: {
      handler(data) {
        if (data.length) {
          this.init();
        }
      },
      deep: true
    }
  },
  mounted() {
    // 获取菜单数据
    this.$bus.$on("on-top-menu-change", () => {
      //if (Array.isArray(this.data) && this.data.length) return;
      this.init();
    });
    // 处理菜单切换状态
    // this.$bus.$on("menu-change", key => {
    //   const data = this.isChild(key - 1);
    //   this.setActiveName(data.id);
    //   const path = this.$router.currentRoute.params.id;
    //   let fname = this.$router.currentRoute.name;
    //   if (fname && fname.indexOf("/") > -1) {
    //     fname = fname.substring(1);
    //   }
    //   const current = filterPath.setPath(path, this.data, fname);
    //   this.activeMenu = key;
    //   this.subActiveName = current.openNames;
    //   this.firstNav = current.firstNav;
    //   // this.searchList = current.searchList;
    //   this.searchOpen = current.searchOpen;
    // });
  },
  methods: {
    init() {
      let path = this.$router.currentRoute.params.id;
      let fname = this.$router.currentRoute.name;
      if (fname && fname.indexOf("/") > -1) {
        fname = fname.substring(1);
      }
      const current = filterPath.setPath(path, this.data, fname);
      this.activeMenu = current.firstCurrent;
      this.firstNav = current.firstNav;
      // this.searchList = current.searchList;
      this.searchOpen = current.searchOpen;
      this.subActiveName = current.openNames;
      if (!current.childCurrent) {
        this.setActiveName(current.leftCurrent);
      } else {
        this.setActiveName(current.childCurrent);
      }
    },
    // isChild(index) {
    //   let id = "";
    //   // if (!this.data[index]) {
    //   // }
    //   const data = this.data[index].child;
    //   const firstId = data[0].id;
    //   if (data[0].child.length) {
    //     id = data[0].child[0].id;
    //   } else {
    //     id = data[0].id;
    //   }
    //   return {
    //     id: id,
    //     firstId: firstId
    //   };
    // },
    setActiveName(activeName) {
      document.documentElement.scrollTop = 0;
      this.$bus.$emit("init-Anchor-scrollTop-notice", false);
      if (activeName) {
        this.activeName = activeName;
      }
    }
  },
  destroyed() {
    this.$bus.$off("on-top-menu-change");
    // this.$bus.$off("top-getData-end");
    // this.$bus.$off("menu-change");
  }
};
</script>
<style lang="less" scoped>
.layout-left-span {
  padding-left: 6px;
}
</style>
