import { createRouter, createWebHashHistory } from 'vue-router'
import { createApp } from 'vue';
import LoginView from '@/views/LoginView.vue';
import HelloWorld from '@/components/HelloWorld.vue'

const routes = [
    { path: '/', component: HelloWorld },
  { path: '/login', component: LoginView },
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const app = createApp({
    history: createWebHashHistory(),
});

app.use(router);

export default app;
