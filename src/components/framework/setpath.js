/**
 * 菜单配置处理
 */
// import menu from "@/assets/config/menu.js";
export default {
  findPath(data, path, first, box) {
    for (let index = 0; index < data.length; index++) {
      const el = data[index];
      if (el.child.length) {
        box.openNames.push(el.id);
        this.findPath(el.child, path, first, box);
      } else {
        if (path === el.href) {
          box.firstNav = first;
          box.firstCurrent = first.id;
          box.leftCurrent = el.id;
          box.firstChild = first;
          box.searchList = first;
          box.childCurrent = el.id;
          box.childObj = el;
          // return box;
        }
      }
    }
  },
  setPath(path, menu, fname) {
    const data = menu;
    const _menu = {
      firstNav: null,
      firstCurrent: "",
      leftCurrent: "",
      childCurrent: "",
      firstChild: [],
      childObj: {},
      searchList: [],
      searchOpen: false,
      openNames: []
    };
    // for (let i = 0; i < data.length; i++) {
    if (!fname || !Array.isArray(data)) return _menu;
    const _data = data.filter(item => item.path == fname)[0];
    if (!_data) return _menu;
    _menu.firstCurrent = _data.id;
    if (!path) {
      return _menu;
    }
    const child = _data.child;
    _menu.searchOpen = _data.search;

    this.findPath(child, path, _data, _menu);
    // _menu.searchList = child[0].child;
    // for (let j = 0; j < child.length; j++) {
    //   var _jdata = [];
    //   _jdata = child[j];

    //   if (path === _jdata.href) {
    //     _menu.firstNav = _data;
    //     _menu.firstCurrent = _data.id;
    //     _menu.leftCurrent = _jdata.id;
    //     _menu.firstChild = child;
    //     _menu.searchList = child;
    //     return _menu;
    //   }
    //   for (let s = 0; s < _jdata.child.length; s++) {
    //     const _sdata = _jdata.child[s];
    //     if (path === _sdata.href) {
    //       _menu.firstChild = child;
    //       _menu.firstCurrent = _data.id;
    //       _menu.leftCurrent = _jdata.id;
    //       _menu.childCurrent = _sdata.id;
    //       _menu.childObj = _sdata;
    //       return _menu;
    //     }
    //     if (_sdata.child) {
    //       for (let k = 0; k < _sdata.child.length; k++) {
    //         const _kdata = _sdata.child[k];
    //         if (path === _kdata.href) {
    //           _menu.firstChild = child;
    //           _menu.firstCurrent = _data.id;
    //           _menu.leftCurrent = _sdata.id;
    //           _menu.childCurrent = _kdata.id;
    //           _menu.childObj = _kdata;
    //           return _menu;
    //         }
    //       }
    //     }
    //   }
    // }
    // }
    return _menu;
  }
};