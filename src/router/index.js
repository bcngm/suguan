import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/index2',
    name: 'index2',
    component: () => import('../views/index2.vue')
  },
  {
    path: '/index2-1',
    name: 'index2-1',
    component: () => import('../views/index2-1.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('token');
  if (isLogin) {
    next();
  } else {
    if (to.path === '/') {
      next();
    } else {
      next('/');
    }
  }
})


export default router