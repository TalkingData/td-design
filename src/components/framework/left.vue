<template>
  <div>
    <search-components></search-components>
    <template v-for="val in data">
      <Menu
        width="auto"
        :key="val.id"
        v-if="val.id === activeMenu"
        :active-name="activeName"
        :open-names="subActiveName"
        @on-select="setActiveName"
      >
        <!-- 单独 -->
        <template>
          <MenuItem
            :name="item.id"
            v-for="(item, index) in val.child"
            :key="index"
          >
            <a @click="onRouterChange(item.href)">
              <!-- <Icon type="ios-paper" /> -->
              {{ item.name }}
              <b v-if="item.nameEnglish">{{ item.nameEnglish }}</b>
            </a>
            <!-- <router-link :to="item.href || ''"> -->

            <!-- </router-link> -->
          </MenuItem>
        </template>
        <!-- <template v-if="val.submenu">
          <Submenu
            v-for="(obj, objKey) in val.child"
            :name="obj.id"
            :key="objKey"
          >
            <template slot="title">
              <Icon :type="obj.icon"></Icon>
              {{ obj.name }}
            </template>

            <template v-for="item in obj.child">
              <template v-if="!item.child">
                <MenuItem :name="item.id" :key="item.id">
                  <router-link :to="item.href || ''">
                    {{ item.name }}
                  </router-link>
                </MenuItem>
              </template>

              <template v-else>
                <MenuGroup :title="item.name" style="marginLeft:25px">
                  <template v-for="(subItem, subItemKey) in item.child">
                    <MenuItem
                      :name="subItem.id"
                      :key="subItem.id"
                      :style="!subItemKey ? 'margin:40px 0 0 0 ' : ''"
                    >
                      <router-link :to="subItem.href || ''">
                        {{ subItem.name }}
                      </router-link>
                    </MenuItem>
                  </template>
                </MenuGroup>
              </template>
            </template>
          </Submenu>
        </template> -->
      </Menu>
    </template>
  </div>
</template>
<script>
import menu from "../../assets/config/menu.js";
import filterPath from "./setpath";
import searchComponents from "./searchComponents";
import bus from "../../bus";
export default {
  components: {
    searchComponents
  },
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
  mounted() {
    bus.$on("menu-change", key => {
      const id = this.isChild(key - 1);
      this.setActiveName(id);
      const path = this.$router.currentRoute.params.id;
      const current = filterPath.setPath(path);
      this.activeMenu = key;
      this.subActiveName = current.firstChild.map(item => {
        return item.id;
      });
    });
    this.init();
  },
  methods: {
    init() {
      let id = this.$router.currentRoute.params.id;
      const current = filterPath.setPath(id);
      this.data = menu.child;
      this.activeMenu = current.firstCurrent;
      this.setActiveName(current.leftCurrent);
    },
    isChild(index) {
      const data = this.data[index].child;
      return data[0].id;
    },
    setActiveName(activeName) {
      if (activeName) {
        this.activeName = activeName;
        console.log("请求数据");
      }
    },
    onRouterChange(id) {
      this.$router.push(`/components/${id}`);
    }
  }
};
</script>
<style>
.ivu-menu-vertical .ivu-menu-item-group-title {
  font-size: 12px !important;
}
.ivu-menu-vertical .ivu-menu-item-group {
  background-image: none !important;
}
</style>
