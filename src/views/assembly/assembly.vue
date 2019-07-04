<template>
  <div>
    <main v-if="!isDoc" class="assembly">
      <h2 class="assembly-title" @click="handleCopyComponentID">
        {{ componentInfo ? componentInfo.name : "" }}
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
        <TabPane :index="0" label="文档" name="file"></TabPane>

        <TabPane :index="1" v-if="usage" label="用法" name="usage"></TabPane>

        <TabPane :index="2" label="代码" name="code"></TabPane>
      </Tabs>

      <container
        v-if="tabName === 'file'"
        :anchorLink="anchorLink"
        className=".tdDessign-example-header"
      >
        <editor-markdown
          :data="document"
          :editor="editor"
          @dom-loaded="anchorLink = $event"
        ></editor-markdown>
      </container>

      <editor-markdown
        :data="usage"
        :editor="editor"
        v-if="tabName === 'usage' && usage"
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
    <container
      v-else
      :anchorLink="anchorLink"
      :loffset="20"
      className=".tdDessign-example-header"
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
import editorMarkdown from "./editor-markdown.vue";
import container from "./container";
import myCode from "./my-code.vue";
import { ajax } from "@/util/ajax";
import Clipboard from "clipboard";
import filterPath from "../../components/framework/setpath.js";

export default {
  inject: ["app"],
  components: { editorMarkdown, myCode, container },
  data() {
    return {
      editor: false,
      tabName: "file",
      document: "",
      usage: "暂无",
      code: [],
      anchorLink: false,
      isDoc: false,
      dataList: ""
      // componentInfo: {}
    };
  },
  computed: {
    componentInfo() {
      let fname = this.$router.currentRoute.name;
      if (fname && fname.indexOf("/") > -1) {
        fname = fname.substring(1);
      }
      let data = filterPath.setPath(
        this.$route.params.id,
        this.$store.state.menuData,
        fname
      );
      if (data && data.childObj) {
        return data.childObj;
      } else {
        return {};
      }
    }
  },
  methods: {
    getArticle() {
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
        } else {
          this.$Message.error(res.message);
        }
      });
    },
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
      ajax({
        urlKey: "/api/document/get",
        methods: "POST",
        data: {
          id: this.componentInfo.id
        }
      }).then(res => {
        if (res.status === 1) {
          if (res.data.length) {
            this.document = res.data[0].content;
          }
          // console.log("请求到数据了");
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    getUsage() {
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
      if (!this.componentInfo.id) return false;
      this.anchorLink = false;
      this.tabName = "file";
      this.getDocument();
      this.getUsage();
      this.getCode();
    }
  },
  mounted() {
    if (this.$route.params.id == "components-use") {
      this.isDoc = true;
      this.getArticle();
    }
  },
  watch: {
    componentInfo: {
      handler() {
        this.updateData();
      },
      immediate: true,
      deep: true
    },
    $route(to) {
      if (to.params.id == "components-use") {
        this.isDoc = true;
        this.getArticle();
      } else {
        this.isDoc = false;
        this.updateData();
      }
    }
  }
};
</script>
