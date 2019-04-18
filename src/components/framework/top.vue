<template>
  <Row class="layout-head">
    <Col span="3">
      <div class="layout-logo">TD Design</div>
    </Col>
    <Col span="21">
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
              <!-- <Icon :class="val.iviewIcon===false?'icon-'+val.icon:''" :type="val.icon" ></Icon> -->
              {{ val.name }}
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
      </div>
    </Col>
  </Row>
</template>
<script>
import menu from "@/assets/config/menu.js";
import filterPath from "./setpath";
import bus from "../../bus.js";
export default {
  data() {
    return {
      data: [],
      activeName: 1,
      acitveCityName: "",
      cityList: [],
      selectedValue: "",
      loading: false,
      options: [],
      list: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New hampshire",
        "New jersey",
        "New mexico",
        "New york",
        "North carolina",
        "North dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode island",
        "South carolina",
        "South dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West virginia",
        "Wisconsin",
        "Wyoming"
      ],
      placeholder: ""
    };
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
    }
  }
};
</script>
