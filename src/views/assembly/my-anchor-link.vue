<template>
  <Affix :offset-top="105">
    <Anchor show-ink :affix="false" :scroll-offset="loffset">
      <AnchorLink
        v-for="(item, index) in data"
        :href="item.href"
        :title="item.title"
        :key="index"
      />
    </Anchor>
  </Affix>
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
      //default: -156
    }
  }
};
</script>
