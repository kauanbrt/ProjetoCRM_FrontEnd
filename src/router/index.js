import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      component: EventView,
      meta: {
        auth: true
      }
    },
    {
      path: '/certificates',
      name: 'certificates',
      component: CertificateView,
      meta: {
        auth: true
      }
    },
    {
      path: '/forms',
      name: 'forms',
      component: FormsView,
      meta: {
        auth: true
      }
    },
    {
      path: '/participants',
      name: 'participants',
      component: ParticipantView,
      meta: {
        auth: true
      }
    },
    {
      path: '/events',
      name: 'events',
      component: EventView,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/results',
      name: 'results',
      component: ExternFormResultView,
      meta: {
        auth: true
      }
    },
    {
      path: '/form',
      name: 'form',
      component: ExternFormView,
    },
  ]
})


//Verifica se o user está logado antes de continuar
router.beforeEach(async (to, from, next) => {

  if(to.meta?.auth){

      const auth = getAuth();

      const checkAuth = () => {
        return new Promise((resolve) => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      };

      const isAuthenticated = await checkAuth();

      if (isAuthenticated) {
        return next();
      } else {
        return next({ name: 'login' });
      }
      
  } else {
    return next();
  }

})


export default router
