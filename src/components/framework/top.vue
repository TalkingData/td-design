<template>
  <div :class="['layout-head clearfix', { 'layout-head-index': isHome }]">
    <div class="top-left">
      <div class="layout-logo">
        <router-link to="/home">
          <img src="../../assets/img/logo.png" alt style="height:32px" />
        </router-link>
      </div>
    </div>
    <div class="top-right">
      <div class="layout-nav">
        <!-- 导航 -->
        <nav class="fr">
          <Menu mode="horizontal" :active-name="activeName" ref="topmenu">
            <template v-for="(val, index) in data">
              <MenuItem :name="val.id" :key="index" :to="isChild(val.id - 1)">
                <!-- <Icon
                :class="val.iviewIcon === false ? 'icon-' + val.icon : ''"
                :type="val.icon"
                ></Icon>-->
                {{ val.name }}
              </MenuItem>
            </template>
          </Menu>
        </nav>
        <!-- 搜索组件 -->
        <div class="layout-nav-search fr">123</div>
      </div>
      <!-- 内部操作 -->
      <div class="layout-dropdown">
        <Dropdown class="drp" trigger="click" placement="bottom-end" @on-click="operation">
          <Icon custom="i-td i-td-account_circle_px" />
          <DropdownMenu slot="list">
            <DropdownItem name="updatePassword">
              <Icon type="ios-lock-outline" />修改密码
            </DropdownItem>
            <DropdownItem name="logOff">
              <Icon type="ios-power" />退出登录
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          placement="bottom-end"
          class="drp"
          trigger="click"
          @on-click="handleOpenAdmin"
          v-if="app.userInfo && app.userInfo.status === 2"
        >
          <span style="margin-left: 16px">
            <Icon type="md-apps" />
          </span>
          <DropdownMenu slot="list">
            <Dropdown placement="right-start">
              <DropdownItem>
                样式库管理
                <Icon type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem
                  name="/admin/upload/assets"
                  to="/admin/upload/assets"
                  target="_blank"
                >上传资源</DropdownItem>
                <DropdownItem
                  name="/admin/stylelib"
                  to="/admin/stylelib"
                  target="_blank"
                  divided
                >模版管理</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown placement="right-start">
              <DropdownItem>
                组件管理
                <Icon type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem
                  name="/admin/component/menu"
                  to="/admin/component/menu"
                  target="_blank"
                >创建/删除组件</DropdownItem>
                <DropdownItem
                  name="/admin/document/add"
                  to="/admin/document/add"
                  target="_blank"
                  divided
                >添加文档</DropdownItem>
                <DropdownItem name="/admin/usage/add" to="/admin/usage/add" target="_blank">添加用法</DropdownItem>
                <DropdownItem name="/admin/code/add" to="/admin/code/add" target="_blank">添加示例</DropdownItem>
                <DropdownItem
                  name="/admin/document/update"
                  to="/admin/document/update"
                  target="_blank"
                  divided
                >修改文档</DropdownItem>
                <DropdownItem
                  name="/admin/usage/update"
                  to="/admin/usage/update"
                  target="_blank"
                >修改用法</DropdownItem>
                <DropdownItem name="/admin/code/update" to="/admin/code/update" target="_blank">修改示例</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="right-start">
              <DropdownItem>
                文章管理
                <Icon type="ios-arrow-forward"></Icon>
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem name="/admin/article/add" to="/admin/article/add" target="_blank">添加文章</DropdownItem>
                <DropdownItem
                  name="/admin/article/update"
                  to="/admin/article/update"
                  target="_blank"
                >修改文章</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import menu from "@/assets/config/menu.js";
import filterPath from "./setpath";
import { ajax } from "@/util/ajax";
import { mapActions } from "vuex";

export default {
  inject: ["app"],
  props: {
    isHome: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: JSON.parse(JSON.stringify(menu.child)),
      activeName: 1,
      acitveCityName: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === from.name) return;
      //set top menu actived
      let topName;
      if (!to.params.dtype) {
        topName = to.name;
      } else {
        topName = to.params.dtype;
      }
      const sta = filterPath.setPath(to.params.id, this.data, topName);
      this.activeName = sta.firstCurrent;
      // 其它布局不需要分发菜单数据
      if (to.meta.uncommon) return;
      // this.$nextTick(() => {
      this.$bus.$emit("top-getData-end", this.data);
      const key = this.data.filter(item => item.path === to.name)[0].id;
      this.$bus.$emit("menu-change", key);
      // });
    }
  },
  created() {
    this.setMenuData(this.data);
  },
  mounted() {
    // // let list = ["components"];
    // let name = this.$router.currentRoute.name;
    this.getTabularData().then(() => {
      this.$bus.$emit("top-getData-end", this.data);
      // this.setMenuData(this.data);
      this.init();
    });
  },
  methods: {
    ...mapActions(["setMenuData"]),
    getTabularData() {
      return new Promise(resolve => {
        ajax({
          urlKey: "/api/component",
          methods: "POST"
        }).then(res => {
          if (res.status === 1) {
            this.setData(res.data);
            resolve();
          } else {
            resolve([]);
          }
        });
      });
    },
    setData(data) {
      let name = "components";
      let idx = -1;
      this.data.some((item, index) => {
        if (item.path === name) {
          idx = index;
        }
      });

      if (idx < 0) return;

      let list = data.map(item => {
        return {
          id: item.id,
          name: item.label,
          englishName: item.text,
          href: item.text,
          child: []
        };
      });
      // 设置组件菜单
      this.data[idx].child[1].child = list;
    },
    init() {
      const pathName = this.$router.currentRoute.params.id;
      let fname;
      if (!this.$route.params.dtype) {
        fname = this.$route.name;
      } else {
        fname = this.$route.params.dtype;
      }
      let index,
        meta = this.$route.meta;
      if (meta.index) {
        index = 0;
      } else {
        const temppath = filterPath.setPath(pathName, this.data, fname);
        index = temppath.firstCurrent;
      }

      this.activeName = index;
      this.$nextTick(() => {
        this.$refs.topmenu.updateActiveName();
      });
    },

    isChild(index) {
      let path = "";
      const data = this.data[index].child;
      // if (data.length && this.data[index].path !== "chart") {
      if (data.length) {
        if (data[0].child.length) {
          path = data[0].child[0].href;
        } else {
          path = data[0].href;
        }
      } else {
        path = "";
      }

      if (!path) return "/" + this.data[index].path;
      return "/" + this.data[index].path + "/" + path;
    },
    // menuChange(key) {
    //   // if (key == 5) return;
    //   const path = this.isChild(key - 1);
    //   this.$router.push(path);
    //   // this.$bus.$emit("menu-change", key);
    // },

    logOff() {
      this.$router.push("/login");
    },
    operation(data) {
      if (data === "logOff") {
        this.$router.push("/login");
      }
    },
    handleOpenAdmin(name) {
      this.$router.push(name);
    }
  }
};
</script>
