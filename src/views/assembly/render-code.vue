<template>
  <pre style="margin-top:0">
      <code class="html" ref="code"><slot></slot></code>
  </pre>
</template>

<script>
import hljs from "highlightjs/highlight.pack.js";

export default {
  data() {
    return {};
  },
  methods: {
    init() {
      hljs.highlightBlock(this.$refs.code);

      this.$nextTick(() => {
        this.$emit("height", this.$refs.code.clientHeight);
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
