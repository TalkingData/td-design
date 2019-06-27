<template>
  <div>
    <Anchor show-ink affix :offset-top="86" :scroll-offset="loffset">
      <AnchorLink
        v-for="(item, index) in data"
        :href="item.href"
        :title="item.title"
        :key="index"
      />
    </Anchor>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    },
    loffset: {
      type: Number,
      default: -136
    }
  }
};
</script>
