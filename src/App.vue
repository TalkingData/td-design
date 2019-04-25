<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { ajax } from "@/util/ajax";
export default {
  provide() {
    return {
      app: this
    };
  },
  data() {
    return {
      componentMenu: []
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
    }
  },
  mounted() {
    this.getComponentMenu();
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
