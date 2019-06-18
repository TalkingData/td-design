<template>
  <div id="app">
    <div class="layout">
      <top :isHome="isHome"></top>
      <router-view />
    </div>
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
import cookie from "js-cookie";
import top from "@/components/framework/top";
export default {
  provide() {
    return {
      app: this
    };
  },
  components: {
    top
  },
  watch: {
    $route() {
      console.log("app:", this.$route.path);
      if (this.$route.path !== "/home") this.isHome = false;
      else this.isHome = true;
    }
  },
  data() {
    return {
      componentMenu: [],
      userInfo: {},
      token: "",
      isHome: true
    };
  },
  methods: {
    getUserInfo() {
      const token = cookie.get("token");
      ajax({
        urlKey: "/api/user/get",
        methods: "POST",
        data: {
          token: token
        }
      }).then(res => {
        this.userInfo = res.data;
      });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>
<style lang="less">
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
