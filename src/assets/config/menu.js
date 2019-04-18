export default {
  name: "一级菜单",
  child: [
    {
      id: "1",
      name: "首页",
      href: "/home",
      icon: "earth",
      child: []
    },
    {
      id: "2",
      name: "组件",
      icon: "earth",
      submenu: false,
      href: "/components",
      child: [
        {
          id: "2-1",
          name: "按钮",
          nameEnglish: "buttom",
          href: "button",
          icon: "images",
          child: []
        },
        {
          id: "2-2",
          name: "文本框",
          nameEnglish: "Test fields",
          href: "input",
          icon: "images",
          child: []
        },
        {
          id: "2-3",
          name: "下拉菜单",
          nameEnglish: "Dropdown",
          href: "dropdown",
          icon: "images",
          child: []
        }
      ]
    },
    {
      id: "3",
      name: "图表",
      icon: "cube",
      submenu: false,
      href: "/chart",
      child: [
        {
          id: "3-1",
          name: "图表1",
          icon: "stats-bars",
          href: "one",
          child: []
        },
        {
          id: "3-2",
          name: "图表2",
          icon: "stats-bars",
          href: "two",
          child: []
        }
      ]
    },
    {
      id: "4",
      name: "模块",
      icon: "stats-bars",
      submenu: false,
      href: "/modular",
      child: [
        {
          id: "4-1",
          name: "模块1",
          icon: "stats-bars",
          href: "one",
          child: []
        },
        {
          id: "4-2",
          name: "模块2",
          icon: "stats-bars",
          href: "two",
          child: []
        }
      ]
    },
    {
      id: "5",
      name: "板块",
      icon: "ios-people",
      submenu: false,
      href: "/plate",
      child: [
        {
          id: "5-1",
          name: "板块1",
          icon: "stats-bars",
          href: "one",
          child: []
        },
        {
          id: "5-2",
          name: "板块2",
          icon: "stats-bars",
          href: "two",
          child: []
        }
      ]
    }
  ]
};
