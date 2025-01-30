import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, RegisterView, LoginView ,UserData} from '@/views'
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
      meta: {title: "User Data Page"},
    }
    
  ],
})

export default router
