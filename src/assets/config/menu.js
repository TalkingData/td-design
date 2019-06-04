export default {
  name: "一级菜单",
  child: [
    {
      id: "1",
      name: "设计",
      path: "design",
      search: false,
      child: [
        {
          id: "1-1",
          name: "品牌规范",
          child: [
            {
              id: "1-1-1",
              name: "文档",
              englishName: "File",
              href: "guide-logo",
              child: []
            }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "组件",
      path: "components",
      search: true,
      child: [
        {
          id: "2-1",
          name: "组件",
          child: []
        }
      ]
    },
    {
      id: "3",
      name: "图表",
      path: "chart",
      search: false,
      child: [
        {
          id: "3-1",
          name: "图表",
          child: [
            {
              id: "3-1-1",
              name: "图表",
              englishName: "chart",
              href: "chart-logo",
              child: []
            }
          ]
        }
      ]
    }
  ]
};
