<template>
  <main class="assembly">
    <h2 class="assembly-title">Button</h2>
    <div class="assembly-bg"></div>
    <div class="assembly-operation">
      <Button type="primary" @click="editorChange()">{{
        editor ? "保存" : "编辑"
      }}</Button>
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
      <TabPane label="代码" name="1">代码</TabPane>
    </Tabs>
  </main>
</template>
<script>
import editorMarkdown from "./editor-markdown.vue";
export default {
  components: { editorMarkdown },
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
    }
  }
};
</script>
