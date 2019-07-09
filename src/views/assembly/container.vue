<template>
  <Row class="doc-box">
    <Col v-magnifier span="21">
      <slot></slot>
    </Col>
    <Col span="3">
      <my-anchor-link
        :data="data"
        :loffset="loffset"
        v-if="showAnchor && data.length"
      ></my-anchor-link>
    </Col>
  </Row>
</template>

<script>
import myAnchorLink from "./my-anchor-link";
export default {
  props: {
    anchorLink: {
      type: Boolean,
      default: false
    },
    tabName: {
      type: String
    },
    className: {
      type: String
    },
    attributeName: {
      type: Boolean,
      default: false
    },

    loffset: {
      type: Number,
      default: -136
    }
  },
  data() {
    return {
      data: [],
      showAnchor: false
    };
  },
  watch: {
    anchorLink: function() {
      this.getDocumentList();
    },
    $route() {
      // fix common container
      // console.log(1);
    }
  },
  mounted() {
    // 接收左侧导航触发scrollTop=0后，为重新渲染锚点anchor做准备
    this.$bus.$on("init-Anchor-scrollTop-notice", data => {
      this.showAnchor = data;
    });
    this.getDocumentList();
  },
  components: {
    myAnchorLink
  },
  methods: {
    /**
     * 获取指定class名的节点
     * 节点属性id以及内容
     */
    getDocumentList() {
      if (!this.anchorLink) return false;
      let allEles = document.querySelectorAll(this.className);
      let accumulator = [];
      allEles.forEach(item => {
        accumulator.push({
          title: this.attributeName
            ? item.getAttribute("name")
            : item.innerText,
          href: "#" + item.id
        });
      });
      this.data = accumulator;
      // 渲染锚点anchor
      this.showAnchor = true;
    }
  }
};
</script>
<style lang="less">
.doc-box {
  .i-editor-md {
    margin: 6px auto 0;
    width: 752px;
    padding: 0;
  }
}
</style>
