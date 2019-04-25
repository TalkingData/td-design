<template>
  <main class="assembly">
    <h2 class="assembly-title">Button</h2>
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
          :data="fileContent"
          :editor="editor"
          v-if="tabName === 'file'"
          @on-emit-data="fileContent = $event"
        ></editor-markdown>
      </TabPane>

      <TabPane label="用法" name="usage">
        <editor-markdown
          :data="usageContent"
          :editor="editor"
          v-if="tabName === 'usage'"
          @on-emit-data="usageContent = $event"
        ></editor-markdown>
      </TabPane>

      <TabPane label="代码" name="code"
        ><my-code v-if="tabName === 'code'"></my-code
      ></TabPane>
    </Tabs>
  </main>
</template>
<script>
import editorMarkdown from "./editor-markdown.vue";
import myCode from "./my-code.vue";

export default {
  components: { editorMarkdown, myCode },
  data() {
    return {
      fileContent: "# 按钮 Button",
      usageContent: "# 输入框 input",
      editor: false,
      tabName: "file"
    };
  },
  mounted() {},
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
    }
  }
};
</script>
