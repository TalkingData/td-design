<template>
  <div style="width:100%;height:100%">
    <i-editor
      v-model="content"
      v-if="editor"
      :autosize="autosize"
      :highlight="highlight"
    ></i-editor>
    <div v-html="html" v-show="!editor" class="i-editor-md"></div>
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlightjs/highlight.pack.js";
import md5 from "js-md5";

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
      autosize: { minRows: 15 }
    };
  },
  watch: {
    data: {
      handler(nV) {
        if (nV) {
          this.renderMd();
        }
      },
      immediate: true,
      deep: true
    },
    editor: function(nV) {
      if (!nV) {
        this.renderMd();
      }
    }
  },
  methods: {
    renderMd() {
      const renderer = new marked.Renderer();
      // console.log(this.data);
      renderer.heading = (text, level) => {
        let id = this.getFirstLetter(text);
        // id = id.replace(/\s/g, "_").replace(/\?|？|,/g, "");
        return `<h${level} id="${id}" class='tdDessign-example-header'>${text}</h${level}>`;
      };

      this.html = marked(this.data, {
        breaks: true,
        headerIds: false,
        highlight(code) {
          // return _this.highlight(code);
          return hljs.highlightAuto(code).value;
        },
        renderer: renderer
      });
      this.$nextTick(() => {
        this.$emit("dom-loaded", true);
      });
    },
    getFirstLetter(str) {
      return md5(str);
    },
    highlight(code) {
      return hljs.highlightAuto(code).value;
    }
  },
  mounted() {}
};
</script>
