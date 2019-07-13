<template>
  <main>
    <Modal v-model="preview" fullscreen footer-hide :closable="false">
      <breadnav :bread="bread" :preview="preview"></breadnav>
      <div class="previewBox">
        <iframe :src="url" frameborder="0" ref="ifa"></iframe>
      </div>
    </Modal>
  </main>
</template>

<script>
import breadnav from "../../components/framework/breadnav";
export default {
  props: {
    // 单向数据流-只读
    preview: {
      type: Boolean,
      default: false
    },
    bread: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.handlerIframe();
  },
  // data() {
  //   return {
  //     show: false
  //   };
  // },
  // watch: {
  //   preview(newValue, oldValue) {
  //     if (newValue === oldValue) return;
  //     this.show = newValue;
  //   }
  // },
  // computed: {
  //   show: {
  //     get() {
  //       return this.preview;
  //     },
  //     set(newVal) {
  //       this.preview = newVal;
  //     }
  //   }
  // },
  components: {
    breadnav
  },
  methods: {
    close() {
      this.$parent.closePreview();
    },
    handlerIframe() {
      const ifa = this.$refs.ifa;
      ifa.onload = () => {
        // 不支持跨域获取
        const win = ifa.contentWindow;
        ifa.height = win.document.documentElement.scrollHeight;
      };
    }
  },
  destroyed() {
    document.body.style = "";
  }
};
</script>

<style lang="less" scoped>
.previewBox {
  margin-top: 32px;
  iframe {
    width: 100%;
    min-height: 500px;
  }
}
</style>
