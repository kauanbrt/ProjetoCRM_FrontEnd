import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CertificateView from '../views/CertificateView.vue'
import FormsView from '@/views/FormsView.vue'
import ParticipantView from '@/views/ParticipantView.vue'
import EventView from '@/views/EventView.vue'
import LoginView from '@/views/LoginView.vue'
import ExternFormView from '@/views/ExternFormView.vue'
import ExternFormResultView from '@/views/ExternFormResultView.vue'

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
    {
      path: '/form',
      name: 'form',
      component: ExternFormView,
    },
    {
      path: '/results',
      name: 'results',
      component: ExternFormResultView,
    },
  ]
})

export default router
