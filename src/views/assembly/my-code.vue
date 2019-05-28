<template>
  <main class="myCode">
    <div
      v-for="(option, index) in code"
      :key="index"
      class="myCode-content"
      :id="option.id"
      :name="option.title"
    >
      <Card>
        <div class="myCode-case">
          <my-display :code="option.content"></my-display>
        </div>
        <header class="myCode-header" @click="handleCopyCodeId(option.id)">
          <span>{{ option.title }}</span>
        </header>

        <div class="myCode-desc">
          <p>{{ option.desc }}</p>
        </div>

        <my-transition :value="option.content"></my-transition>
      </Card>
    </div>
  </main>
</template>

<script>
import myDisplay from "./display";
// import defaultCode from "../../../public/lib/default-code.js";
import myTransition from "./my-transition";
import Clipboard from "clipboard";

export default {
  props: {
    code: Array
  },
  components: { myDisplay, myTransition },
  methods: {
    handleCopyCodeId(id) {
      const clipboard = new Clipboard(".myCode-header", {
        text() {
          return id;
        }
      });

      clipboard.on("success", e => {
        e.clearSelection();
        clipboard.destroy();
        this.$Message.success("code_id 已复制");
      });
    },
    setDomLoaded() {
      this.$nextTick(() => {
        this.$emit("dom-loaded", true);
      });
    }
  },
  watch: {
    code: function() {
      this.setDomLoaded();
    }
  },
  mounted() {
    this.setDomLoaded();
  }
};
</script>
