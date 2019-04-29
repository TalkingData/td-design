<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
// import cookie from "js-cookie";
export default {
  provide() {
    return {
      app: this
    };
  },
  data() {
    return {
      componentMenu: [],
      userInfo: {},
      token: ""
    };
  },
  methods: {
    getComponentMenu(fromLogin) {
      ajax({
        urlKey: "/api/component",
        methods: "POST"
      }).then(res => {
        if (res.status === 1) {
          this.componentMenu = res.data;
          if (fromLogin) {
            this.$router.push(`/components/${this.componentMenu[0].text}`);
          }
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    getUserInfo() {
      // const userInfo = cookie.get("user_info");
      // const token = cookie.get("token");
      // this.userInfo = userInfo ? JSON.parse(userInfo) : {};
      // this.token = token;
      ajax({
        urlKey: "/api/component",
        methods: "POST"
      });
    }
  },
  mounted() {
    this.getComponentMenu();
    this.getUserInfo();
  }
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
