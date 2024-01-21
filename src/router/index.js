import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DishList from '@/components/DishList.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/dishes',
    component: DishList,
    meta: { requiresAuth: true }, // Add meta field for authentication
  },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated) {

      next({ path: '/' });
    } else {
      // Proceed to the route if authenticated
      next();
    }
  } else {
    // Proceed to the route if it doesn't require authentication
    next();
  }
});

export default router;
