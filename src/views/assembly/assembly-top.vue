<template>
  <main class="assembly-top">
    <section>
      <h2 class="assembly-title" @click="handleCopyComponentID()">
        {{ componentInfo ? componentInfo.name : "" }}
      </h2>
      <Tabs
        :animated="false"
        :value="value"
        @on-click="onTagsChange"
        class="assembly-tabs"
      >
        <TabPane :index="0" label="文档" name="file"></TabPane>

        <TabPane :index="1" v-if="usage" label="用法" name="usage"></TabPane>

        <TabPane :index="2" label="代码" name="code"></TabPane>
      </Tabs>
    </section>
  </main>
</template>
<script>
export default {
  props: {
    value: {
      type: String
    },
    componentInfo: {
      type: Object
    },
    usage: {
      type: String
    }
  },
  methods: {
    handleCopyComponentID() {
      this.$emit("handleCopyComponentID", true);
    },
    onTagsChange(data) {
      this.$emit("onTagsChange", data);
    }
  }
};
</script>
