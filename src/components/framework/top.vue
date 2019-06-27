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
          <Menu
            mode="horizontal"
            :active-name="activeName"
            ref="topmenu"
            @on-select="menuChange"
          >
            <MenuItem v-for="(val, index) in data" :name="val.id" :key="index">
              <!-- <Icon
                :class="val.iviewIcon === false ? 'icon-' + val.icon : ''"
                :type="val.icon"
              ></Icon>-->
              {{ val.name }}
            </MenuItem>
          </Menu>
        </nav>
        <!-- 搜索组件 -->
        <!-- <div class="layout-nav-search fr">
          <Select
            :placeholder="placeholder"
            v-model="selectedValue"
            clearable
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="loading"
            @on-open-change="onSearch"
            class="search-box"
          >
            <Option
              v-for="(option, index) in options"
              :value="option.value"
              :key="index"
            >{{ option.label }}</Option>
          </Select>
          <Icon type="md-search"/>
        </div>-->
      </div>
      <!-- 内部操作 -->
      <div class="layout-dropdown">
        <Dropdown trigger="click" placement="bottom-end" @on-click="operation">
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
          trigger="click"
          @on-click="handleOpenAdmin"
          v-if="app.userInfo && app.userInfo.status === 2"
        >
          <span style="margin-left: 16px">
            <Icon type="md-apps" />
          </span>
          <DropdownMenu slot="list">
            <DropdownItem
              name="/admin/component/menu"
              to="/admin/component/menu"
              target="_blank"
              >创建组件</DropdownItem
            >
            <DropdownItem
              name="/admin/document/add"
              to="/admin/document/add"
              target="_blank"
              divided
              >添加文档</DropdownItem
            >
            <DropdownItem
              name="/admin/usage/add"
              to="/admin/usage/add"
              target="_blank"
              >添加用法</DropdownItem
            >
            <DropdownItem
              name="/admin/code/add"
              to="/admin/code/add"
              target="_blank"
              >添加示例</DropdownItem
            >
            <DropdownItem
              name="/admin/document/update"
              to="/admin/document/update"
              target="_blank"
              divided
              >修改文档</DropdownItem
            >
            <DropdownItem
              name="/admin/usage/update"
              to="/admin/usage/update"
              target="_blank"
              >修改用法</DropdownItem
            >
            <DropdownItem
              name="/admin/code/update"
              to="/admin/code/update"
              target="_blank"
              >修改示例</DropdownItem
            >
            <DropdownItem
              name="/admin/article/add"
              to="/admin/article/add"
              target="_blank"
              divided
              >添加文章</DropdownItem
            >
            <DropdownItem
              name="/admin/article/update"
              to="/admin/article/update"
              target="_blank"
              >修改文章</DropdownItem
            >
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
      acitveCityName: "",
      cityList: [],
      selectedValue: "",
      loading: false,
      options: [],
      list: [],
      placeholder: "搜索"
    };
  },
  mounted() {
    // // let list = ["components"];
    // let name = this.$router.currentRoute.name;
    this.getTabularData().then(() => {
      this.$bus.$emit("top-getData-end", this.data);
      this.setMenuData(this.data);
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
      this.data.forEach((item, index) => {
        if (item.path === name) {
          idx = index;
        }
      });

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
      let fname = this.$router.currentRoute.name;
      if (fname && fname.indexOf("/") > -1) {
        fname = fname.substring(1);
      }
      let index;
      if (pathName) {
        const temppath = filterPath.setPath(pathName, this.data, fname);
        index = temppath.firstCurrent;
      } else {
        index = 0;
      }
      this.activeName = index;
      this.$nextTick(() => {
        this.$refs.topmenu.updateActiveName();
      });
    },

    isChild(index) {
      let path = "";
      const data = this.data[index].child;
      if (data[0].child.length) {
        path = data[0].child[0].href;
      } else {
        path = data[0].href;
      }

      return "/" + this.data[index].path + "/" + path;
    },
    menuChange(key) {
      // if (key == 5) return;
      const path = this.isChild(key - 1);
      this.$router.push(path);
      this.$bus.$emit("menu-change", key);
    },

    logOff() {
      this.$router.push("/login");
    },

    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            };
          });
          this.options = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.options = [];
      }
    },
    onSearch(data) {
      console.log(data);
      // if (data) {
      //   this.placeholder = "搜索组件...";
      // } else {
      //   this.placeholder = "";
      // }
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
