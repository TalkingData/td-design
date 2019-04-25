<template>
  <main class="assembly">
    <h2 class="assembly-title">
      {{ componentInfo ? componentInfo.text : "" }}
    </h2>
    <div class="assembly-bg"></div>
    <div class="assembly-operation">
      <Button type="primary" @click="add()" v-if="tabName === 'code'"
        >新建</Button
      >
      <Button
        type="primary"
        @click="editorChange()"
        v-if="tabName !== 'code'"
        >{{ editor ? "保存" : "编辑" }}</Button
      >
    </div>

    <Tabs :animated="false" :value="tabName" @on-click="onTagsChange">
      <TabPane label="文档" name="file">
        <editor-markdown
          :data="document"
          :editor="editor"
          v-if="tabName === 'file'"
          @on-emit-data="document = $event"
        ></editor-markdown>
      </TabPane>

      <TabPane label="用法" name="usage">
        <editor-markdown
          :data="usage"
          :editor="editor"
          v-if="tabName === 'usage'"
          @on-emit-data="usage = $event"
        ></editor-markdown>
      </TabPane>

      <TabPane label="代码" name="code"
        ><my-code v-if="tabName === 'code'" :code="code"></my-code
      ></TabPane>
    </Tabs>
  </main>
</template>
<script>
import editorMarkdown from "./editor-markdown.vue";
import myCode from "./my-code.vue";
import { ajax } from "@/util/ajax";

export default {
  inject: ["app"],
  components: { editorMarkdown, myCode },
  data() {
    return {
      editor: false,
      tabName: "file",
      document: "",
      usage: "",
      code: []
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
    editorChange() {
      this.editor = !this.editor;
    },
    onTagsChange(data) {
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
          this.usage = res.data[0].content;
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
    }
  },
  mounted() {
    this.getDocument();
    this.getUsage();
    this.getCode();
  },
  watch: {
    componentInfo: {
      handler() {
        this.getDocument();
        this.getUsage();
        this.getCode();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
