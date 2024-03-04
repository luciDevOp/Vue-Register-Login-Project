import { createRouter, createWebHistory } from "vue-router";
import Register from "./components/RegisterItem.vue";
import Login from "./components/LoginItem.vue";
import Products from "./components/ProductsItem.vue";
import { store } from './store/store';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/products",
      name: "Products",
      component: Products,
      meta: { requiresAuth: true } 
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.loginState) {
    next('/');
  } else {
    next();
  }
});

export default router;

