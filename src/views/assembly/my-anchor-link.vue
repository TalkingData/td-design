<template>
  <div>
    <Anchor show-ink affix :offset-top="86" :scroll-offset="-136">
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
    }
  }
};
</script>
