import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import LoginView from '@/views/LoginView.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/login', component: LoginView },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
