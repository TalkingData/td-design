<template>
    <!-- <Row class="doc-box">
    <Col v-magnifier span="21">
      <slot></slot>
    </Col>
    <Col span="3">
      <my-anchor-link
        :data="data"
        :loffset="loffset"
        v-if="showAnchor && data.length"
      ></my-anchor-link>
    </Col>
  </Row>-->
    <div class="doc-box clearfix">
        <div
            class="magnBox doc-box-content"
            v-magnifier
        >
            <slot></slot>
        </div>
        <div class="doc-box-anchor">
            <my-anchor-link
                :data="data"
                :loffset="loffset"
                v-if="showAnchor && data.length"
            ></my-anchor-link>
        </div>
    </div>
</template>

<script>
import myAnchorLink from './my-anchor-link';
export default {
    props: {
        anchorLink: {
            type: Boolean,
            default: false
        },
        tabName: {
            type: String
        },
        className: {
            type: String
        },
        attributeName: {
            type: Boolean,
            default: false
        },
        loffset: {
            type: Number
        }
    },
    data() {
        return {
            data: [],
            showAnchor: false
        };
    },
    watch: {
        anchorLink: function() {
            this.getDocumentList();
        }
    },
    mounted() {
        // 接收左侧导航触发scrollTop=0后，为重新渲染锚点anchor做准备
        this.$bus.$on('init-Anchor-scrollTop-notice', data => {
            this.showAnchor = data;
        });
        this.getDocumentList();
    },
    components: {
        myAnchorLink
    },
    methods: {
        /**
         * 获取指定class名的节点
         * 节点属性id以及内容
         */
        getDocumentList() {
            if (!this.anchorLink) return false;
            let allEles = document.querySelectorAll(this.className);

            let accumulator = [];
            allEles.forEach(item => {
                accumulator.push({
                    title: this.attributeName
                        ? item.getAttribute('name')
                        : item.innerText,
                    href: '#' + item.id
                });
            });
            this.data = accumulator;
            // 渲染锚点anchor
            this.showAnchor = true;
        }
    }
};
</script>
<style lang="less">
.doc-box {
    width: 100%;
    display: flex;
    padding: 6px 24px;
    &-content {
        width: calc(100% - 200px);
    }
    &-anchor {
        padding: 24px 0 0 24px;
        width: 200px;
        .ivu-affix {
            left: inherit;
        }
    }
}
</style>
