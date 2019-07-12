<template>
  <main>
    <Modal v-model="preview" fullscreen footer-hide>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </main>
</template>

<script>
export default {
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
