import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/home",
      components: require("@/views/index.vue"),
      children: [
        {
          path: "/components/:id",
          name: "components",
          components: require("@/views/assembly/assembly.vue")
        },
        {
          path: "/chart/:id",
          name: "chart",
          components: require("@/views/brand/brand.vue")
        },
        {
          path: "/stylelib/:id",
          name: "stylelib",
          components: require("@/views/brand/brand.vue")
        },
        {
          path: "/modular/:id",
          name: "modular",
          components: require("@/views/modular/modular.vue")
        },
        {
          path: "/plate/:id",
          name: "plate",
          components: require("@/views/plate/plate.vue")
        },
        {
          path: "/components/:id/addAssembly",
          name: "/components",
          components: require("@/views/assembly/add-assembly.vue")
        },
        {
          path: "/design/:id",
          name: "design",
          components: require("@/views/brand/brand.vue")
        },
        {
          path: "/brand/:id",
          name: "brand",
          components: require("@/views/brand/brand.vue")
        }
      ]
    },
    {
      path: "/home",
      name: "home",
      components: require("@/views/home/home.vue")
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
