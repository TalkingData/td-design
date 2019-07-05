import Vue from "vue";

Vue.directive("magnifier", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    const box = el;
    box.addEventListener("mouseover", t => {
      const tar = t.target;
      if (tar.tagName === "IMG" && !tar.className) {
        tar.className = "fimg-cursor";
      }
    });
    box.addEventListener("click", t => {
      const tar = t.target;
      if (tar.tagName === "IMG") {
        if (tar.className.indexOf("fimg-show") > -1) {
          tar.className = "";
          document.body.removeChild(document.getElementById("fimg-shadow"));
        } else {
          tar.className = "fimg-show";
          const div = document.createElement("div");
          div.id = "fimg-shadow";
          div.style.height = el.offsetHeight + 1000 + "px";
          document.body.appendChild(div);
        }
      }
    });
  },
  unbind: function(el) {
    console.log(el);
  }
});
