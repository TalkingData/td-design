<template>
  <main class="assembly">
    <h2 class="assembly-title" @click="handleCopyComponentID">
      {{ componentInfo ? componentInfo.text : "" }}
    </h2>
    <div class="assembly-bg"></div>
    <div class="assembly-operation">
      <!--      <Button type="primary" @click="add()" v-if="tabName === 'code'"-->
      <!--        >新建</Button-->
      <!--      >-->
      <!--      <Button-->
      <!--        type="primary"-->
      <!--        @click="editorChange()"-->
      <!--        v-if="tabName !== 'code'"-->
      <!--        >{{ editor ? "保存" : "编辑" }}</Button-->
      <!--      >-->
    </div>

    <Tabs
      :animated="false"
      :value="tabName"
      @on-click="onTagsChange"
      class="assembly-tabs"
    >
      <TabPane label="文档" name="file"> </TabPane>

      <TabPane label="用法" name="usage"> </TabPane>

      <TabPane label="代码" name="code"> </TabPane>
    </Tabs>

    <container
      v-if="tabName === 'file'"
      :anchorLink="anchorLink"
      className=".tdDessign-example-header"
    >
      <editor-markdown
        :data="document"
        :editor="editor"
        @on-emit-data="document = $event"
        @dom-loaded="anchorLink = $event"
      ></editor-markdown>
    </container>

    <editor-markdown
      :data="usage"
      :editor="editor"
      v-if="tabName === 'usage'"
      @on-emit-data="usage = $event"
    ></editor-markdown>

    <container
      v-if="tabName === 'code'"
      :anchorLink="anchorLink"
      attributeName
      className=".myCode-content"
    >
      <my-code :code="code" @dom-loaded="anchorLink = $event"></my-code>
    </container>
  </main>
</template>
<script>
import editorMarkdown from "./editor-markdown.vue";
import container from "./container";
import myCode from "./my-code.vue";
import { ajax } from "@/util/ajax";
import Clipboard from "clipboard";

export default {
  inject: ["app"],
  components: { editorMarkdown, myCode, container },
  data() {
    return {
      editor: false,
      tabName: "file",
      document: "",
      usage: "",
      code: [],
      anchorLink: false
    };
  },
  computed: {
    componentInfo() {
      return this.app.componentMenu.find(
        item => item.text === this.$route.params.id
      );
    }
  },
  methods: {
    handleCopyComponentID() {
      const id = this.componentInfo.id;
      const clipboard = new Clipboard(".assembly-title", {
        text() {
          return id;
        }
      });

      clipboard.on("success", e => {
        e.clearSelection();
        clipboard.destroy();
        this.$Message.success("component_id 已复制");
      });
    },
    editorChange() {
      this.editor = !this.editor;
    },
    onTagsChange(data) {
      this.anchorLink = false;
      this.tabName = data;
    },
    add() {
      this.$router.push(
        `/components/${this.$router.currentRoute.params.id}/addAssembly`
      );
    },
    getDocument() {
      if (!this.app.componentMenu.length) return;
      ajax({
        urlKey: "/api/document/get",
        methods: "POST",
        data: {
          id: this.componentInfo.id
        }
      }).then(res => {
        if (res.status === 1) {
          this.document = res.data[0].content;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    getUsage() {
      if (!this.app.componentMenu.length) return;
      ajax({
        urlKey: "/api/usage/get",
        methods: "POST",
        data: {
          id: this.componentInfo.id
        }
      }).then(res => {
        if (res.status === 1) {
          this.usage = res.data.length ? res.data[0].content : "";
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    getCode() {
      if (!this.app.componentMenu.length) return;
      ajax({
        urlKey: "/api/code/get",
        methods: "POST",
        data: {
          id: this.componentInfo.id
        }
      }).then(res => {
        if (res.status === 1) {
          this.code = res.data;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    updateData() {
      this.anchorLink = false;
      this.getDocument();
      this.getUsage();
      this.getCode();
    }
  },
  mounted() {
    this.updateData();
  },
  watch: {
    componentInfo: {
      handler() {
        this.updateData();
      },
      immediate: true,
      deep: true
    },
    $route() {
      this.updateData();
    }
  }
};
</script>
