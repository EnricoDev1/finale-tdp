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
  // Dashboard e rotte protette
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true, requiredRole: 'admin' } // Richiede almeno writer
  },
  {
    path: '/dashboard/users',
    name: 'Users',
    component: () => import('@/views/UsersView.vue'),
    meta: { requiresAuth: true, requiredRole: 'admin' } // Solo admin
  },
  {
    path: '/dashboard/posts',
    name: 'Posts',
    component: () => import('@/views/PostsView.vue'),
    meta: { requiresAuth: true, requiredRole: 'writer' } // Almeno writer
  },
  {
    path: '/dashboard/posts/edit/:id',
    name: 'Edits',
    component: () => import('@/views/PostEditView.vue'),
    meta: { requiresAuth: true, requiredRole: 'writer' }
  },
  {
    path: '/dashboard/users/edit/:id',
    name: 'UserEdit',
    component: () => import('@/views/UserEditView.vue'),
    meta: { requiresAuth: true, requiredRole: 'admin' } // Solo admin
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsView.vue')
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: () => import('@/views/NewPostView.vue'),
    meta: { requiresAuth: true, requiredRole: 'writer' } // Almeno writer
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

type UserRole = 'user' | 'writer' | 'admin';
type RoleHierarchy = {
  [key in UserRole]: number;
} & {
  '': number;
  undefined: number;
  null: number;
};

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      const token = document.cookie.split('=')[1];

      if (!token) {
        return next('/login');
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userRole = payload.role as string;

        if (to.meta.requiredRole) {
          const roleHierarchy: RoleHierarchy = {
            'user': 0,
            'writer': 1,
            'admin': 2,
            '': -1,
            'undefined': -1,
            'null': -1
          };

          const requiredRole = String(to.meta.requiredRole) as keyof RoleHierarchy;
          const requiredLevel = roleHierarchy[requiredRole] ?? 999;

          const safeUserRole = String(userRole) as keyof RoleHierarchy;
          const userLevel = roleHierarchy[safeUserRole] ?? -1;

          if (userLevel < requiredLevel) {
            return next({ path: '/', query: { error: 'Non hai i permessi necessari per accedere a questa pagina' } });
          }
        }

        next();
      } catch (error) {
        console.error('Error verifying token:', error);
        document.cookie = 'token=; Max-Age=0; path=/; SameSite=Lax';
        next('/login');
      }
    } else {
      next();
    }
  });

export default router;
