/**
 * 首页模块配置
 */
const HOMENAV = [
  {
    name: "c1",
    child: [
      {
        title: "品牌",
        type: "B",
        content:
          "品牌基础规范，包含LOGO、标准字体、印刷、PPT模板等指引品牌风格的文档。",
        pic: "",
        link: "/brand/brand-overview"
      },
      {
        title: "设计",
        type: "D",
        content:
          "产品设计基础规范引导，包含概述、设计基础（色彩、字体、图标、布局等）、设计模式。",
        pic: require("../assets/img/design.svg"),
        bg: "#F27036",
        link: "/design/design-overview"
      },
      {
        title: "图表",
        type: "C",
        content: "清晰统一的数据可视化设计方案。",
        pic: "",
        link: "/chart/chart-color"
      }
    ]
  },
  {
    name: "c2",
    child: [
      {
        title: "设计原则",
        type: "D",
        content:
          "设计原则体现我们的设计理念，并在设计决策和产生分歧的时候引导我们打破僵局，节省时间，帮助产品设计保持更高的一致性。",
        pic: "",
        link: "/design/design-sense"
      },
      {
        title: "LOGO",
        type: "B",
        extra: {
          padding: "60px 0 100px"
        },
        content: "",
        pic: require("../assets/img/brand.svg"),
        bg: "#fff",
        link: "/brand/brand-logo"
      },
      {
        title: "样式库",
        type: "S",
        content: "丰富的设计样式库，不但可以快速使用而且为设计提供更多灵感。",
        pic: require("../assets/img/style.svg"),
        bg: "#2185F0",
        link: "",
        extra: {
          disabled: true
        }
      }
    ]
  },
  {
    name: "c3",
    child: [
      {
        title: "组件",
        type: "C",
        extra: {
          isComponent: true
        },
        content: "使用标准样式和代码快速创建产品。",
        pic: require("../assets/img/components.svg"),
        bg: "#00D2B3",
        link: "/components/components-use"
      },
      {
        title: "插图",
        type: "D",
        content:
          "插图在市场营销和产品设计中发挥很重要的作用，用于描述一个用户场景/故事，统一的插图设计能带给用户一个连贯清晰的的场景/故事体验。",
        pic: require("../assets/img/picture.svg"),
        bg: "#fff",
        link: "/brand/brand-outline"
      }
    ]
  }
];

export { HOMENAV };
