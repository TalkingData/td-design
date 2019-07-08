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
        const shadow = document.getElementById("fimg-shadow");
        if (tar.className.indexOf("fimg-show") > -1) {
          tar.className = "fimg-cursor";
          document.body.className = "";
          shadow && (shadow.style.display = "none");
          // document.body.removeChild(shadow);
        } else {
          tar.className = "fimg-show";
          let curOffh = el.offsetHeight + 1000 + "px";
          if (!shadow) {
            const div = document.createElement("div");
            div.id = "fimg-shadow";
            div.style.height = curOffh;
            document.body.appendChild(div);
          } else {
            shadow.style.height = curOffh;
            shadow.style.display = "block";
          }
          document.body.className = "ohd";
        }
      }
    });
  }
  // unbind: function(el) {
  //   console.log(el);
  // }
});
