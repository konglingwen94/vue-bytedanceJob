import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path:'/',
  //   redirect:'/home'
  // },
  {
    path: "/",
    name: "Home",
    component: ( )=>import(/*webpackChunkName: "Home" */ "@/views/Home.vue")
  },
  {
    path: "/products",
    name: "products",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue")
  },
  {
    path: "/jobs",
    name: "jobs",
     
    component: () =>
      import(/* webpackChunkName: "jobs" */ "../views/Jobs.vue")
  },{
    path: "/jobs/:id",
    name: "jobDetail",
     
    component: () =>
      import(/* webpackChunkName: "jobDetail" */ "../views/JobDetail.vue")
  },{
    path: "/staff-stories/:id",
    name: "staff-story",
     
    component: () =>
      import(/* webpackChunkName: "staffStroy" */ "../views/StaffStory.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;
