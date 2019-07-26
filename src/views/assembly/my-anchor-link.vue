<style lang="less">
.anchor-link {
    .ivu-anchor-link-title {
        color: rgba(23, 35, 61, 0.55);
    }
    .ivu-anchor-link {
        font-size: 13px;
    }
    .ivu-anchor-ink-ball{
        transform: translate(-50%,-6px);
        width: 1px;
        height: 24px;
        border-radius: 0;
        border: 1px solid #1d7aee;
    }
}
</style>
<template>
    <Affix
        :offset-top="105"
        class='anchor-link'
    >
        <Anchor
            show-ink
            :affix="false"
            :scroll-offset="loffset"
        >
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
