import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, RegisterView, LoginView ,UserData,AdminView} from '@/views'
import store from '@/store'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {title: 'Home page'},
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {title: 'Register  page'},
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {title: 'Login page'},
    },
    {
      path: '/userdata',
      name: 'userdata',
      component: UserData,
      meta: {title: "User Account Page",requiresAuth: true, role: 'User'},
    },
    {
      path: '/admin',
      name: 'admin',
      component : AdminView,
      meta: {title: "Admin Page", requiresAuth: true, role: 'Admin' }
    }
    
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'My app'

  const isAuthenticated = store.state.auth?.token
  const userRole = store.state.auth?.role

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!isAuthenticated) {
      return next({name: 'login'})
    }

    if(to.meta.role && to.meta.role != userRole) {
      return next({name: userRole == 'admin' ? 'admin' : 'userdata'})
    }
  }

  next()
})

export default router
