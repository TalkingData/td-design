<template>
    <div>
        <main
            v-if="!isDoc"
            class="assembly"
        >
            <assembly-top
                :componentInfo="componentInfo"
                :value="tabName"
                :usage="usage"
                @handleCopyComponentID="handleCopyComponentID"
                @onTagsChange="onTagsChange"
            ></assembly-top>
            <!-- 文档 -->
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
            <!-- 用法 -->
            <container
                v-if="tabName === 'usage' && usage"
                :anchorLink="anchorLink"
                className=".tdDessign-example-header"
            >
                <editor-markdown
                    :data="usage"
                    :editor="editor"
                    @on-emit-data="usage = $event"
                    @dom-loaded="anchorLink = $event"
                ></editor-markdown>
            </container>
            <!-- 代码 -->
            <container
                v-if="tabName === 'code'"
                :anchorLink="anchorLink"
                attributeName
                :loffset="-186"
                className=".myCode-content"
            >
                <my-code
                    :code="code"
                    @dom-loaded="anchorLink = $event"
                ></my-code>
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
import editorMarkdown from './editor-markdown.vue';
import container from './container';
import myCode from './my-code.vue';
import { ajax } from '@/util/ajax';
import Clipboard from 'clipboard';
import filterPath from '../../components/framework/setpath.js';
import assemblyTop from './assembly-top.vue';
export default {
    inject: ['app'],
    components: { editorMarkdown, myCode, container, assemblyTop },
    data() {
        return {
            editor: false,
            tabName: 'file',
            document: '',
            usage: '暂无',
            code: [],
            anchorLink: false,
            isDoc: false,
            dataList: '',
            componentInfo: {}
        };
    },
    computed: {},
    methods: {
        getArticle() {
            this.isDoc = true;
            let id = this.$route.params.id;
            this.anchorLink = false;
            ajax({
                urlKey: '/api/article/get',
                methods: 'POST',
                data: {
                    name: id
                }
            }).then(res => {
                if (res.status === 1) {
                    this.dataList = res.data ? res.data.content : '';
                } else {
                    this.$Message.error(res.message);
                }
            });
        },
        handleCopyComponentID() {
            const id = this.componentInfo.id;
            const clipboard = new Clipboard('.assembly-title', {
                text() {
                    return id;
                }
            });

            clipboard.on('success', e => {
                e.clearSelection();
                clipboard.destroy();
                this.$Message.success('component_id 已复制');
            });
        },
        editorChange() {
            this.editor = !this.editor;
        },
        onTagsChange(data) {
            this.anchorLink = false;
            this.tabName = data;
            this.$router.push(
                `/components/${this.$router.currentRoute.params.id}`
            );
        },
        add() {
            this.$router.push(
                `/components/${this.$router.currentRoute.params.id}/addAssembly`
            );
        },
        /**
         * 请求文档
         */
        getDocument() {
            ajax({
                urlKey: '/api/document/get',
                methods: 'POST',
                data: {
                    id: this.componentInfo.id
                }
            }).then(res => {
                if (res.status === 1) {
                    if (res.data.length) {
                        this.document = res.data[0].content;
                    }
                } else {
                    this.$Message.error(res.message);
                }
            });
        },
        /**
         * 请求用法
         */
        getUsage() {
            ajax({
                urlKey: '/api/usage/get',
                methods: 'POST',
                data: {
                    id: this.componentInfo.id
                }
            }).then(res => {
                if (res.status === 1) {
                    this.usage = res.data.length ? res.data[0].content : '';
                    // 无用法 && 当前选中的是用法
                    if (!this.usage && this.tabName === 'usage') {
                        this.tabName = 'file';
                    }
                } else {
                    this.$Message.error(res.message);
                }
            });
        },
        /**
         * 请求代码
         */
        getCode() {
            ajax({
                urlKey: '/api/code/get',
                methods: 'POST',
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
        /**
         * 获取数据
         */
        updateData() {
            this.isDoc = false;
            this.setComponentInfo();
            if (!this.componentInfo.id) return false;
            this.anchorLink = false;

            this.getDocument();
            this.getUsage();
            this.getCode();
        },
        /**
         * 设置title 和 id
         */
        setComponentInfo() {
            let fname = this.$router.currentRoute.name;
            if (fname && fname.indexOf('/') > -1) {
                fname = fname.substring(1);
            }
            let data = filterPath.setPath(
                this.$route.params.id,
                this.$store.state.menuData,
                fname
            );
            if (data && data.childObj) {
                this.componentInfo = data.childObj;
            } else {
                this.componentInfo = {};
            }
        }
    },
    mounted() {
        if (this.$route.params.id === 'components-use') {
            this.getArticle();
        } else if (this.$store.state.menuData.length) {
            this.updateData();
        }
    },
    watch: {
        /**
         * 列表数据请求需要时间
         */
        '$store.state.menuData': {
            handler(data) {
                if (data.length && this.$route.params.id !== 'components-use') {
                    this.updateData();
                }
            },
            deep: true
        },
        /**
         * 监听params.id
         */
        '$route.params.id': {
            handler(id) {
                if (id === 'components-use') {
                    this.getArticle();
                } else {
                    this.updateData();
                }
            }
            // deep: true 这里不能设置deep为true
        }
    }
};
</script>
