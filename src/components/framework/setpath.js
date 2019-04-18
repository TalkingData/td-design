import menu from "@/assets/config/menu.js";
export default {
  setPath(path, type) {
    const data = menu.child;
    const _menu = {
      firstCurrent: "",
      leftCurrent: "",
      childCurrent: "",
      firstChild: []
    };
    if (type === "top") {
      for (let i = 0; i < data.length; i++) {
        const _data = data[i];
        if (path === _data.href) {
          _menu.firstCurrent = _data.id;
          _menu.leftCurrent = _data.id;
          _menu.firstChild = _data.child;
          return _menu;
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const _data = data[i];
        const child = _data.child;
        for (let j = 0; j < child.length; j++) {
          var _jdata = [];
          _jdata = child[j];
          if (path === _jdata.href) {
            _menu.firstCurrent = _data.id;
            _menu.leftCurrent = _jdata.id;
            _menu.firstChild = child;
            return _menu;
          }
          for (let s = 0; s < _jdata.child.length; s++) {
            const _sdata = _jdata.child[s];
            if (path === _sdata.href) {
              _menu.firstChild = child;
              _menu.firstCurrent = _data.id;
              _menu.leftCurrent = _jdata.id;
              _menu.childCurrent = _sdata.id;
              return _menu;
            }
            if (_sdata.child.length) {
              for (let k = 0; k < _sdata.child.length; k++) {
                const _kdata = _sdata.child[k];
                if (path === _kdata.href) {
                  _menu.firstChild = child;
                  _menu.firstCurrent = _data.id;
                  _menu.leftCurrent = _sdata.id;
                  _menu.childCurrent = _kdata.id;
                  return _menu;
                }
              }
            }
          }
        }
      }
    }
  }
};
