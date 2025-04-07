import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/PostListView.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('@/views/BlogPostView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
