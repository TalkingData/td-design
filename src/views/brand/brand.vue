<template>
  <div class="article-box" ref="ab">
    <container
      :anchorLink="anchorLink"
      :loffset="20"
      :className="'.tdDessign-example-header'"
    >
      <editor-markdown
        :data="dataList"
        @dom-loaded="anchorLink = $event"
        class="i-editor-md-article"
      ></editor-markdown>
    </container>
  </div>
</template>
<script>
import editorMarkdown from "../assembly/editor-markdown.vue";

import container from "../assembly/container";
import { ajax } from "@/util/ajax";

export default {
  components: { editorMarkdown, container },

  data() {
    return {
      anchorLink: false,
      dataList: ""
    };
  },
  watch: {
    componentInfo: {
      handler() {
        this.getDocument();
      },
      immediate: true,
      deep: true
    },
    $route() {
      this.getDocument();
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //   // Code that will run only after the
    //   // entire view has been rendered
    //   this.magnifier();
    // });
  },

  methods: {
    getDocument() {
      let id = this.$route.params.id;
      this.anchorLink = false;
      ajax({
        urlKey: "/api/article/get",
        methods: "POST",
        data: {
          name: id
        }
      }).then(res => {
        if (res.status === 1) {
          this.dataList = res.data ? res.data.content : "";
          // this.$nextTick(function() {
          //   this.magnifier(this.$refs.ab);
          // });
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>
