<template>
  <div style="width:100%;height:100%">
    <i-editor v-model="content" v-if="editor" :autosize="autosize"></i-editor>
    <div v-html="html" v-show="!editor" class="i-editor-md"></div>
  </div>
</template>
<script>
import marked from "marked";
export default {
  props: {
    data: {
      type: String
    },
    editor: {
      type: Boolean
    }
  },
  data() {
    return {
      html: "",
      content: this.data,
      autosize: { minRows: 15 }
    };
  },
  watch: {
    data: function(nV) {
      this.content = nV;
      this.renderMd();
    },
    editor: function(nV) {
      if (!nV) {
        this.renderMd();
        this.$emit("on-emit-data", this.content);
      }
    }
  },
  methods: {
    renderMd() {
      const renderer = new marked.Renderer();
      // renderer.heading = function(text, level) {
      //   let id = pinyinUtil.getFirstLetter(text);
      //   id = id.replace(/\s/g, "_").replace(/\?|？|,/g, "");
      //   return `<h${level} id="${id}">${text}</h${level}>`;
      // };

      //const _this = this;

      this.html = marked(this.content, {
        breaks: true,
        headerIds: false,
        // highlight(code) {
        //   return _this.highlight(code);
        // },
        renderer: renderer
      });
    }
  },
  mounted() {
    this.renderMd();
  }
};
</script>
