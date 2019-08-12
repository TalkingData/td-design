<template>
  <div class="slib-box">
    <div class="slib-head">
      <h1>{{ detail.title }}</h1>
      <p class="sub">{{ detail.desc }}</p>
      <p class="time">
        <span class="ct">创建时间：{{ detail.created_at | moment }}</span>
        <span>更新时间：{{ detail.updated_at | moment }}</span>
      </p>
      <div class="slib-opr">
        <Button custom-icon="i-td i-td-visibility_px" @click="preview(detail.preview)" style='margin-right:0'>预览</Button>
        <!-- <Button
          custom-icon="i-td i-td-visibility_px"
          type="primary"
          @click="goCode(detail.url)"
        >查看代码</Button> -->
      </div>
    </div>
    <div class="previewBox" ref='imgViewRef'>
      <img :src="detail.src" alt :style="{'width':width}" v-if='width'/>
    </div>
    <!-- preview -->
    <stylelib-preview :preview="previews" :url="url" :bread="bread" @onImgWidth='onimgWidthChange'></stylelib-preview>
  </div>
</template>

<script>
import { ajax } from "@/util/ajax";
import stylelibPreview from "./stylelib-preview";
export default {
  data() {
    return {
      previews: false,
      url: "",
      bread: [],
      detail: {},
      width:'',
    };
  },
  components: {
    stylelibPreview
  },
  watch: {
    $route() {
      this.getDetail();
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    // 获取详情
    async getDetail() {
      let res = await ajax({
        urlKey: "/api/template/item/info",
        methods: "POST",
        data: {
          template_id: this.$route.params.id
        }
      });
      if (res && res.status == 1) {
        res.data.src = "http://design.talkingdata.com/" + res.data.cover;
        this.detail = res.data;
        this.url = this.detail.preview;
        this.getTplMenu(this.detail);
      }
    },
    onimgWidthChange(data){
        if(data>=this.$refs.imgViewRef.offsetWidth){
          this.width='100%'
        }else{
          this.width=data+'px'
        }
    },
    // 获取分类菜单模版
    async getTplMenu(detail) {
      let fd = {};
      fd.tag_id = detail.tag_id;
      fd.order = "created_at";
      let res = await ajax({
        urlKey: "/api/template/item/list",
        methods: "POST",
        data: fd
      });
      if (res && res.status == 1) {
        this.tplList = res.data;
        this.bread = [
          { name: "样式库", to: "/stylelib" },
          { name: detail.title, to: `/stylelib-detail/stylelib/${detail.id}` }
        ];
        // 分发详情数据
        let tdata = {
          bread: this.bread,
          menu: this.handlerMenu(res.data, detail.tag),
          activeName: detail.id,
          openNames: [detail.tag.id]
        };
        this.$bus.$emit("detail-data", tdata);
      }
    },
    // 处理菜单
    handlerMenu(d, cate) {
      let mu = [
        {
          id: cate.id,
          name: cate.name,
          child: []
        }
      ];
      mu[0].child = d.map(i => {
        const it = {
          id: i.id,
          name: i.title,
          to: `/stylelib-detail/stylelib/${i.id}`
        };
        return it;
      });
      return mu;
    },
    preview(url) {
      this.previews = true;
      this.url = url;
    },
    closePreview() {
      this.previews = false;
    },
    goCode(url) {
      window.open(url);
    }
  },
  destroyed() {}
};
</script>

<style lang="less" scoped>
.slib-box {
  padding: 55px 120px;
  .slib-head {
    position: relative;
    h1 {
      font-size: 24px;
    }
    p.sub {
      margin: 20px 0 10px;
      color: rgba(23, 35, 61, 0.75);
    }
    p.time {
      .ct {
        margin-right: 30px;
      }
      color: rgba(23, 35, 61, 0.5);
    }
    .slib-opr {
      .ivu-btn-default {
        margin-right: 20px;
      }
      position: absolute;
      right: 0;
      bottom: 20px;
    }
  }
  .previewBox {
    margin-top: 35px;
    img {
      // width: 50%;
    }
  }
}
</style>
