import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);
export default new Router({
  routes: [{
      path: "/",
      name: "index",
      redirect: "/home",
      components: require("@/views/index.vue"),
      children: [{
          path: "/components/:id",
          name: "components",
          components: require("@/views/assembly/assembly.vue"),
          meta: {
            uncommon: true
          }
        },
        {
          path: "/components/:id/:type",
          name: "components",
          components: require("@/views/assembly/assembly.vue"),
          meta: {
            uncommon: true
          }
        },
        {
          path: "/chart/:id",
          name: "chart",
          components: require("@/views/brand/brand.vue"),
          meta: {
            uncommon: true
          }
        },
        // {
        //   path: "/chart",
        //   name: "chart",
        //   components: require("@/views/chart/chart.vue"),
        //   meta: { uncommon: true }
        // },
        // {
        //   path: "/components/:id/addAssembly",
        //   name: "/components",
        //   components: require("@/views/assembly/add-assembly.vue")
        // },
        {
          path: "/design/:id",
          name: "design",
          components: require("@/views/brand/brand.vue"),
          meta: {
            uncommon: true
          }
        },
        // 品牌
        {
          path: "/brand/:id",
          name: "brand",
          components: require("@/views/brand/brand.vue"),
          meta: {
            uncommon: true
          }
        },
        {
          path: "/stylelib",
          name: "stylelib",
          components: require("@/views/stylelib/stylelib.vue"),

        },
        {
          path: "/stylelib/:radiuType",
          name: "stylelib",
          components: require("@/views/stylelib/stylelib.vue"),

        },
        {
          path: "/common",
          name: "common-detail",
          components: require("@/components/framework/common-detail.vue"),
          props: {
            default: true
          },

          children: [{
              path: "/stylelib-detail/:radiuType/:dtype/:id",
              name: "stylelib-detail",
              components: require("@/views/stylelib/stylelib-detail.vue"),

            },
            {
              path: "/chart-detail/:dtype/:id",
              name: "chart-detail",
              components: require("@/views/chart/chart-detail.vue"),
            }
          ]
        },
        {
          // path: "/searchPage/:search",
          path: "/search",
          name: "search",
          components: require("@/views/search-page/index.vue"),
          meta: {
            searchOpen: true
          }
        }
      ]
    },
    {
      path: "/home",
      name: "home",
      components: require("@/views/home/home.vue"),
      meta: {
        index: true
      }
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/login/login.vue")
    },
    {
      path: "/admin/component/menu",
      components: require("@/views/admin/add_component_menu.vue")
    },
    {
      path: "/admin/stylelib",
      components: require("@/views/admin/stylelib-admin.vue")
    },
    {
      path: "/admin/upload/assets",
      components: require("@/views/admin/upload-assets.vue")
    },
    {
      path: "/admin/document/add",
      components: require("@/views/admin/add_document.vue")
    },
    {
      path: "/admin/document/update",
      components: require("@/views/admin/update_document.vue")
    },
    {
      path: "/admin/usage/add",
      components: require("@/views/admin/add_usage.vue")
    },
    {
      path: "/admin/usage/update",
      components: require("@/views/admin/update_usage.vue")
    },
    {
      path: "/admin/code/add",
      components: require("@/views/admin/add_code.vue")
    },
    {
      path: "/admin/code/update",
      components: require("@/views/admin/code_update.vue")
    },
    {
      path: "/admin/article/add",
      components: require("@/views/admin/add_article.vue")
    },
    {
      path: "/admin/article/update",
      components: require("@/views/admin/update_article.vue")
    },
    {
      path: "/examples/:id",
      nane: "examples",
      components: require("@/views/assembly/examples.vue")
    }
  ]
});