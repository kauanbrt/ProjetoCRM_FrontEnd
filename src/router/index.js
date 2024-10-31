import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CertificateView from '../views/CertificateView.vue'
import FormsView from '@/views/FormsView.vue'
import ParticipantView from '@/views/ParticipantView.vue'
import EventView from '@/views/EventView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/',
      name: 'home',
      component: EventView
    },
    {
      path: '/certificates',
      name: 'certificates',
      component: CertificateView,
    },
    {
      path: '/forms',
      name: 'forms',
      component: FormsView,
    },
    {
      path: '/participants',
      name: 'participants',
      component: ParticipantView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ]
})

export default router
