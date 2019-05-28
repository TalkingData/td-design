<template>
  <Anchor v-if="show" show-ink affix :offset-top="86" :scroll-offset="-152">
    <AnchorLink
      v-for="(item, index) in data"
      :href="item.href"
      :title="item.title"
      :key="index"
    />
  </Anchor>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {},
  mounted() {},
  methods: {
    setShow() {
      this.show = true;
    }
  }
};
</script>
