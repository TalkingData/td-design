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
    let cacheBox;
    let handlerClose = target => {
      target.addEventListener("click", () => {
        document.body.style = "";
        requestAnimationFrame(() => {
          cacheBox.lastChild.firstChild.style.transform = "scale(0)";
          setTimeout(() => {
            cacheBox.firstChild.style.display = "none";
            cacheBox.lastChild.style.display = "none";
          }, 200);
        });
      });
    };
    box.addEventListener("click", t => {
      const tar = t.target;
      if (tar.tagName === "IMG") {
        let cimg;
        document.body.style.overflow = "hidden";
        if (!cacheBox) {
          let frg = document.createDocumentFragment();
          cacheBox = document.createElement("div");
          const mask = document.createElement("div");
          mask.className = "fimg-shadow";
          frg.appendChild(mask);
          const con = document.createElement("div");
          con.className = "fimg-wrap";
          const img = document.createElement("img");
          cimg = img;
          img.src = tar.src;
          img.width = tar.getAttribute("width");
          handlerClose(img);
          img.className = "fimg-show";
          con.appendChild(img);
          frg.appendChild(con);
          cacheBox.appendChild(frg);
          document.body.appendChild(cacheBox);
          el.cacheBox = cacheBox;
        } else {
          cimg = cacheBox.querySelector(".fimg-wrap>img");
          cimg.setAttribute("src", tar.src);
          cimg.setAttribute("width", tar.getAttribute("width"));
          cacheBox.firstChild.style.display = "block";
          cacheBox.lastChild.style.display = "block";
        }
        cimg.onload = () =>
          requestAnimationFrame(() => (cimg.style.transform = "scale(1)"));
      }
    });
  },
  unbind: function(el) {
    el.cacheBox && document.body.removeChild(el.cacheBox);
  }
});
