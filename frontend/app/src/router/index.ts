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
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue')
  },
  {
    path: '/dashboard/users',
    name: 'Users',
    component: () => import('@/views/UsersView.vue')
  },
  {
    path: '/dashboard/posts',
    name: 'Posts',
    component: () => import('@/views/PostsView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
