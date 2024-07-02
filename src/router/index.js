import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Login from '@/components/Login.vue';
import verifyToken from '@/utils/verifyToken';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/Home', component: Home, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      const isValid = await verifyToken(token);
      if (!isValid) {
        localStorage.removeItem('token');
        next('/login');
      } else {
        next();
      }
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;