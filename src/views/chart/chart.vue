<template>
  <div class="layout">
    <div class="layout-left">
      <search-components
        :firstNav="chartMenu"
        @on-search-change="goAnchor"
      ></search-components>
      <!-- 菜单 -->
      <Menu
        width="auto"
        :active-name="activeName"
        :open-names="openNames"
        ref="lmu"
        @on-select="goAnchor"
      >
        <Submenu v-for="(i, j) in menu" :key="j" :name="i.id">
          <template slot="title">{{ i.name }}</template>
          <MenuItem
            v-for="(s, k) in i.child"
            :key="k"
            :to="s.to"
            :name="s.id"
            >{{ s.name }}</MenuItem
          >
        </Submenu>
      </Menu>
    </div>
    <div class="layout-content">
      <div :id="'a4-1-' + index" class="item" v-for="(index, j) in 9" :key="j">
        {{ index }}
      </div>
    </div>
  </div>
</template>
<script>
import searchComponents from "../../components/framework/searchComponents";
import { mapState } from "vuex";
export default {
  components: {
    searchComponents
  },
  computed: {
    ...mapState({
      chartMenu: state => state.menuData.filter(i => i.path === "chart")[0]
    }),
    menu() {
      return this.chartMenu.child;
    }
  },
  data() {
    return {
      activeName: "",
      openNames: [],
      anchors: []
    };
  },
  methods: {
    // 锚点跳转
    goAnchor(selector) {
      const el = this.$el.querySelector("#a" + selector);
      if (!el) return;
      let total = el.offsetTop - 72;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      let step = total / 50;
      if (total > distance) {
        (function smoothDown() {
          if (distance < total) {
            distance += step;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothDown, 5);
          } else {
            document.documentElement.scrollTop = total;
          }
        })();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        (function smoothUp() {
          if (distance > total) {
            distance -= step;
            document.documentElement.scrollTop = distance;
            setTimeout(smoothUp, 5);
          } else {
            document.documentElement.scrollTop = total;
          }
        })();
      }
    },
    init() {
      this.activeName = this.menu[0].child[0].id;
      this.menu.forEach(el => {
        if (el.child && el.child.length) {
          this.openNames.push(el.id);
        }
      });
      this.$nextTick(() => {
        this.$refs.lmu.updateOpened();
        this.$refs.lmu.updateActiveName();
      });
      // cache 锚点元素
      this.$el.querySelectorAll("[id^=a4-]").forEach(item => {
        this.anchors.push({
          id: item.id,
          top: item.offsetTop - 72
        });
      });
    },
    // 处理菜单选中状态
    onScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        e.target.scrollTop;
      this.anchors.forEach((item, j) => {
        if (this.anchors[j + 1]) {
          if (scrollTop >= item.top && scrollTop < this.anchors[j + 1].top) {
            this.activeName = item.id.substring(1);
            // console.log("cur:", this.activeName);
          }
        }
      });
    }
  },
  mounted() {
    this.init();
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>
<style lang="less" scoped>
.item {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border-top: 1px solid red;
  transition: all 0.3s ease;
}
</style>
