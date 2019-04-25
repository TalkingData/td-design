import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      redirect: "/components/button",
      components: require("@/views/index.vue"),
      children: [
        {
          path: "/components/:id",
          name: "/components",
          components: require("@/views/assembly/assembly.vue")
        },
        {
          path: "/chart/:id",
          name: "/chart",
          components: require("@/views/chart/chart.vue")
        },
        {
          path: "/modular/:id",
          name: "/modular",
          components: require("@/views/modular/modular.vue")
        },
        {
          path: "/plate/:id",
          name: "/plate",
          components: require("@/views/plate/plate.vue")
        },
        {
          path: "/components/:id/addAssembly",
          name: "/components",
          components: require("@/views/assembly/add-assembly.vue")
        }
      ]
    },
    {
      path: "/home",
      name: "/home",
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
      path: "/admin/usage/add",
      components: require("@/views/admin/add_usage.vue")
    }
  ]
});
