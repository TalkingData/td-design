<template>
  <my-display :code="content" openDisplay></my-display>
</template>
<script>
import { ajax } from "@/util/ajax";
import myDisplay from "./display";
import { addClass } from "iview/src/utils/assist";
export default {
  components: { myDisplay },
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    addClass(
      document.querySelectorAll("#feedback-box")[0],
      "hide-feedback-box"
    );
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
  },
  methods: {
    init() {
      ajax({
        urlKey: "/api/code/find",
        methods: "POST",
        data: {
          id: this.$route.params.id
        }
      }).then(res => {
        if (res.status === 1) {
          this.content = res.data.content;
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>
<style>
#feedback-box.hide-feedback-box {
  display: none;
}
</style>
