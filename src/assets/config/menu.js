export default {
  name: "一级菜单",
  child: [
    {
      id: "1",
      name: "品牌",
      path: "brand",
      search: false,
      child: [
        {
          id: "1-1",
          name: "品牌规范",
          child: [
            {
              id: "1-1-1",
              name: "标志",
              englishName: "Logo",
              href: "guide-logo",
              child: []
            },
            {
              id: "1-1-2",
              name: "颜色",
              englishName: "Color",
              href: "guide-color",
              child: []
            },
            {
              id: "1-1-3",
              name: "字体",
              englishName: "Font",
              href: "guide-font",
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
      search: false,
      child: [
        {
          id: "2-1",
          name: "设计",
          child: [
            {
              id: "2-1-1",
              name: "概述",
              englishName: "overview",
              href: "design-overview",
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
          name: "组件",
          child: []
        }
      ]
    },
    {
      id: "4",
      name: "图表",
      path: "chart",
      search: false,
      child: [
        {
          id: "4-1",
          name: "图表",
          child: [
            {
              id: "4-1-1",
              name: "图表",
              englishName: "chart",
              href: "chart-logo",
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
      search: false,
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
