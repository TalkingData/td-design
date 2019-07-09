<template>
  <div>
    <div ref="display" style="width:100%" v-if="!openExhibition"></div>

    <!-- <router-link :to="'/examples/' + componentId" v-else>
      <Button type="text">查看事例</Button>
    </router-link> -->
    <iframe
      :src="'/#/examples/' + componentId"
      v-else
      style="width:100%;height:360px;border: none"
    ></iframe>
  </div>
</template>
<script>
import Vue from "vue";
import randomStr from "../../../public/lib/random_str.js";
import mixin from "./mixin.js";
export default {
  mixins: [mixin],
  props: {
    code: {
      type: String,
      default: ""
    },
    componentId: {
      type: [String, Number],
      default: ""
    },
    openDisplay: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.code) {
      this.renderCode();
    }
  },
  data() {
    return {
      html: "",
      js: "",
      css: "",
      component: null,
      id: randomStr(),
      openExhibition: false
    };
  },
  methods: {
    init() {
      this.destroyCode();
      this.renderCode();
    },
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);

      if (!openingTag) return "";
      else openingTag = openingTag[0];

      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },
    splitCode() {
      if (this.code.indexOf(this.classNames) !== -1 && !this.openDisplay) {
        this.openExhibition = true;
      }
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      const template =
        '<div id="appCode">' + this.getSource(this.code, "template") + "</div>";

      this.js = script;
      this.css = style;
      this.html = template;
    },
    renderCode() {
      this.destroyCode();
      this.splitCode();
      if (this.html !== "" && this.js !== "" && !this.openExhibition) {
        const parseStrToFunc = new Function(this.js)();
        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();
        this.$refs.display.appendChild(this.component.$el);
        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      }
    },
    destroyCode() {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component && this.$refs.display) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    }
  },
  beforeDestroy() {
    this.destroyCode();
  },
  watch: {
    code() {
      this.renderCode();
    }
  }
};
</script>
