export default {
  name: "一级菜单",
  child: [
    {
      id: "1",
      name: "设计",
      path: "article",
      search: false,
      child: [
        {
          id: "1-1",
          name: "品牌规范",
          child: [
            {
              id: "1-1-1",
              name: "文档",
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
          child: [
            // {
            //   id: "2-1-1",
            //   name: "按钮",
            //   href: "Button"
            // }
          ]
        }
      ]
    }
  ]
};
