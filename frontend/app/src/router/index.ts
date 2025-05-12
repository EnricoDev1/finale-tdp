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
  },
  {
    path: '/dashboard/posts/edit/:id',
    name: 'Edits',
    component: () => import('@/views/PostEditView.vue')
  },
  {
    path: '/dashboard/users/edit/:id',
    name: 'UserEdit',
    component: () => import('@/views/UserEditView.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsView.vue')    
  }, 
  {
    path: '/newpost',
    name: 'newpost',
    component: () => import('@/views/NewPostView.vue')    
  },
  {
    path: '/inflazione',
    name: 'inflazione',
    component: () => import('@/views/InflationView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
