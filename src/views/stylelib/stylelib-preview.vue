<template>
  <main>
    <Modal v-model="preview" fullscreen footer-hide :closable="false">
      <breadnav :bread="bread" :preview="preview"></breadnav>
      <div class="previewBox">
        <!-- <iframe :src="url" frameborder="0" ref="ifa"></iframe> -->
        <div class="imgView">
          <img :src="url" alt ref="imgRef" />
        </div>
        <img :src="url" alt v-show="width" :style="{'width':width}" />
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
  data() {
    return {
      width: ''
    };
  },
  mounted() {
    this.handlerIframe();
    this.initImgWidth();
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
      // const ifa = this.$refs.ifa;
      // ifa.onload = () => {
      //   // 不支持跨域获取
      //   const win = ifa.contentWindow;
      //   ifa.height = win.document.documentElement.scrollHeight;
      // };
    },
    initImgWidth(){
      const imgRef = this.$refs.imgRef;
      imgRef.onload = () => {
        if (imgRef.width) {
          this.$emit('onImgWidth',imgRef.width/2)
          let maxWidth = document.documentElement.offsetWidth;
          console.log(maxWidth+"--"+imgRef.width)
          if (imgRef.width / 2 >= maxWidth) {
            this.width = '100%';
          } else {
            this.width = imgRef.width / 2+'px';
          }
        }
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
  margin-top: 56px;
  text-align: center;
  width: 100%;
  // height: 100%;
  iframe {
    width: 100%;
    min-height: calc(100% - 56px);
  }
}
.imgView {
  width: 100%;
  height: 0;
  overflow: hidden;
}
</style>
