<template>
  <Row class="layout-head">
    <Col span="2">
      <div class="layout-logo">
        <img src="../../assets/logo.svg" alt="" />
      </div>
    </Col>
    <Col span="22">
      <div class="layout-nav">
        <!-- 导航 -->
        <nav class="fr">
          <Menu mode="horizontal" :active-name="activeName" ref="topmenu">
            <!--            <Menu-->
            <!--                    mode="horizontal"-->
            <!--                    :active-name="activeName"-->
            <!--                    ref="topmenu"-->
            <!--                    @on-select="menuChange"-->
            <!--            >-->
            <!--            <MenuItem v-for="(val, index) in data" :name="val.id" :key="index">-->
            <!--              &lt;!&ndash; <Icon :class="val.iviewIcon===false?'icon-'+val.icon:''" :type="val.icon" ></Icon> &ndash;&gt;-->
            <!--              {{ val.name }}-->
            <!--            </MenuItem>-->
            <MenuItem name="1" to="index">
              首页
            </MenuItem>
            <MenuItem
              name="2"
              :to="'/components/' + app.componentMenu[0].text"
              v-if="app.componentMenu[0]"
            >
              组件
            </MenuItem>
          </Menu>
        </nav>
        <!-- 搜索组件 -->
        <div class="layout-nav-search fr">
          <Select
            :placeholder="placeholder"
            v-model="selectedValue"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="loading"
            @on-open-change="onSearch"
          >
            <Option
              v-for="(option, index) in options"
              :value="option.value"
              :key="index"
              >{{ option.label }}</Option
            >
          </Select>
          <Icon type="md-search" />
        </div>
      </div>
      <!-- 内部操作 -->
      <div class="layout-dropdown">
        <Dropdown trigger="click" placement="bottom-end" @on-click="operation">
          <Icon type="ios-contact" />
          <DropdownMenu slot="list">
            <DropdownItem name="updatePassword">
              <Icon type="ios-lock-outline" />修改密码
            </DropdownItem>
            <DropdownItem name="logOff">
              <Icon type="ios-power" />
              退出登录
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
          </DropdownMenu>
        </Dropdown>
      </div>
    </Col>
  </Row>
</template>
<script>
import menu from "@/assets/config/menu.js";
import filterPath from "./setpath";
import bus from "../../bus.js";
export default {
  inject: ["app"],
  data() {
    return {
      data: [],
      activeName: 1,
      acitveCityName: "",
      cityList: [],
      selectedValue: "",
      loading: false,
      options: [],
      list: [],
      placeholder: ""
    };
  },
  watch: {
    "app.componentMenu": {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.data = menu.child;
      const pathName = this.$router.currentRoute.name;
      const temppath = filterPath.setPath(pathName, "top");
      const index = temppath.firstCurrent;
      this.activeName = index;
      this.$nextTick(() => {
        this.$refs.topmenu.updateActiveName();
      });
    },
    isChild(index) {
      let path = this.data[index].href;
      const data = this.data[index].child;

      if (data.length) {
        path = path + "/" + data[0].href;
      }
      return path;
    },
    menuChange(key) {
      const path = this.isChild(key - 1);
      this.$router.push(path);
      if (key === "1") return;
      bus.$emit("menu-change", key);
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
      if (data) {
        this.placeholder = "搜索组件...";
      } else {
        this.placeholder = "";
      }
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
