<template>
  <div class="layout">
    <top></top>
    <div v-if="common">
      <div class="layout-left">
        <left></left>
      </div>
      <div class="layout-content">
        <router-view ref="routerview"></router-view>
      </div>
    </div>
    <div class="main-top" v-else>
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
      isCommon: true
    };
  },
  watch: {
    $route(to) {
      this.handlerCommon(to.meta);
    }
  },
  computed: {
    common() {
      return this.isCommon;
    }
  },
  created() {
    this.handlerCommon(this.$route.meta);
  },
  mounted() {},
  methods: {
    handlerCommon(meta) {
      if (!meta.uncommon) {
        this.isCommon = false;
      } else {
        this.isCommon = true;
      }
    }
  }
};
</script>
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
