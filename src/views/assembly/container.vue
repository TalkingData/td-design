<template>
  <Row>
    <Col span="21">
      <slot></slot>
    </Col>
    <Col span="3">
      <my-anchor-link :data="data" ref="myAnchorLink"></my-anchor-link>
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
    }
  },
  data() {
    return {
      data: []
    };
  },
  watch: {
    anchorLink: function() {
      this.getDocumentList();
    }
  },
  mounted() {
    this.getDocumentList();
  },
  components: {
    myAnchorLink
  },
  methods: {
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
      this.$refs.myAnchorLink.setShow();
    }
  }
};
</script>
