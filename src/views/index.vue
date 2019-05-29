<style scoped>
.layout-assistant {
  width: 300px;
  margin: 0 auto;
  height: inherit;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
  position: absolute;
  background: royalblue;
  bottom: 8px;
  left: 0;
  width: 100%;
}
</style>
<template>
  <div class="layout">
    <top></top>
    <div class="layout-left">
      <left></left>
    </div>
    <div class="layout-content">
      <router-view ref="routerview"></router-view>
    </div>
  </div>
</template>
<script>
import top from "@/components/framework/top";
import left from "@/components/framework/left";

export default {
  components: {
    top,
    left
  },
  data() {
    return {
      acitveCityName: "",
      cityList: []
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
