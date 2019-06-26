export default {
  name: "一级菜单",
  child: [
    {
      id: "1",
      name: "品牌",
      path: "brand",
      search: true,
      child: [
        {
          id: "1-1",
          name: "概述",
          englishName: "overview",
          href: "brand-overview",
          child: []
        },
        {
          id: "1-2",
          name: "品牌策略",
          englishName: "strategy",
          href: "brand-strategy",
          child: []
        },
        {
          id: "1-3",
          name: "基础系统",
          child: [
            {
              id: "1-3-1",
              name: "品牌标志",
              englishName: "logo",
              href: "brand-logo",
              child: []
            },
            {
              id: "1-3-2",
              name: "标准字体",
              englishName: "font",
              href: "brand-font",
              child: []
            },
            {
              id: "1-3-3",
              name: "标准颜色",
              englishName: "color",
              href: "brand-color",
              child: []
            },
            {
              id: "1-3-4",
              name: "图片和图形风格",
              englishName: "style",
              href: "brand-style",
              child: []
            },
            {
              id: "1-3-5",
              name: "排版版式",
              englishName: "typesetting",
              href: "brand-typesetting",
              child: []
            }
          ]
        },
        {
          id: "1-4",
          name: "应用系统",
          child: [
            {
              id: "1-4-1",
              name: "传播物料",
              englishName: "material",
              href: "brand-material",
              child: []
            },
            {
              id: "1-4-2",
              name: "办公系统",
              englishName: "office",
              href: "brand-office",
              child: []
            },
            {
              id: "1-4-3",
              name: "PPT模版",
              englishName: "ppt",
              href: "brand-ppt",
              child: []
            }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "设计",
      path: "design",
      search: true,
      child: [
        {
          id: "2-1",
          name: "概述",
          englishName: "overview",
          href: "design-overview",
          child: []
        },
        {
          id: "2-2",
          name: "设计原则",
          englishName: "sense",
          href: "design-sense",
          child: []
        },
        {
          id: "2-3",
          name: "设计基础",
          child: [
            {
              id: "2-3-1",
              name: "色彩",
              englishName: "color",
              href: "design-color",
              child: []
            },
            {
              id: "2-3-2",
              name: "字体",
              englishName: "font",
              href: "design-font",
              child: []
            },
            {
              id: "2-3-3",
              name: "图标",
              englishName: "icon",
              href: "design-icon",
              child: []
            },
            {
              id: "2-3-4",
              name: "布局",
              englishName: "layout",
              href: "design-layout",
              child: []
            },
            {
              id: "2-3-5",
              name: "间距",
              englishName: "spacing",
              href: "design-spacing",
              child: []
            },
            {
              id: "2-3-6",
              name: "状态",
              englishName: "state",
              href: "design-state",
              child: []
            },
            {
              id: "2-3-7",
              name: "容器",
              englishName: "box",
              href: "design-box",
              child: []
            },
            {
              id: "2-3-8",
              name: "阴影高度",
              englishName: "shadow",
              href: "design-shadow",
              child: []
            }
          ]
        }
      ]
    },
    {
      id: "3",
      name: "组件",
      path: "components",
      search: true,
      child: [
        {
          id: "3-1",
          name: "使用说明",
          englishName: "use",
          href: "components-use",
          child: []
        },
        {
          id: "3-2",
          name: "组件",
          child: []
        }
      ]
    },
    {
      id: "4",
      name: "图表",
      path: "chart",
      search: true,
      child: [
        {
          id: "4-1",
          name: "基础",
          child: [
            {
              id: "4-1-1",
              name: "色彩",
              englishName: "",
              href: "chart-color",
              child: []
            },
            {
              id: "4-1-2",
              name: "图表组成",
              englishName: "",
              href: "chart-composition",
              child: []
            }
          ]
        },
        {
          id: "4-2",
          name: "图表",
          child: [
            {
              id: "4-2-1",
              name: "图表示例",
              englishName: "Demo Chart",
              href: "chart-demo",
              child: []
            },
            {
              id: "4-2-2",
              name: "折线图",
              englishName: "Line Chart",
              href: "chart-line",
              child: []
            },
            {
              id: "4-2-3",
              name: "柱状图",
              englishName: "Histogram",
              href: "chart-histogram",
              child: []
            },
            {
              id: "4-2-4",
              name: "条形图",
              englishName: "Bar Chart",
              href: "chart-bar",
              child: []
            },
            {
              id: "4-2-5",
              name: "面积图",
              englishName: "Area Chart",
              href: "chart-area",
              child: []
            },
            {
              id: "4-2-6",
              name: "饼图",
              englishName: "Pie Chart",
              href: "chart-pie",
              child: []
            },
            {
              id: "4-2-7",
              name: "雷达图",
              englishName: "Radar Chart",
              href: "chart-radar",
              child: []
            },
            {
              id: "4-2-8",
              name: "热力图",
              englishName: "Heatmap",
              href: "chart-heatmap",
              child: []
            },
            {
              id: "4-2-9",
              name: "漏斗图",
              englishName: "Funnel Chart",
              href: "chart-funnel",
              child: []
            }
          ]
        }
      ]
    },
    {
      id: "5",
      name: "样式库",
      path: "",
      search: true,
      child: [
        {
          id: "5-1",
          name: "样式库",
          child: [
            {
              id: "5-1-1",
              name: "样式库",
              englishName: "",
              href: "",
              child: []
            }
          ]
        }
      ]
    }
  ]
};
