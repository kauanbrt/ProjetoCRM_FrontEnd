<script>
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';
import logo from '@/assets/logo_horizontal.jpg'
export default {
  name: 'LoginView',
  data() {
    return {
        logo,
        visible: false,
        params: {
            email: '',
            password: ''
        },
    }
  },
  computed:{
    authStore(){
        return useAuthStore();
    }
  },
  methods: {
    submit(){
        this.authStore.setIsAutenticated(true);
        router.push('/');
    }
  },
  created() {
  },
};
</script>

<template>
    <v-col style="height: 100vh; width: 100%; background-color: #FFF; overflow-y: auto;">

      <v-container style="height: 100% !important" class="d-flex align-center justify-center">

      <div style="width: 448px !important">
        <v-img
          class="my-6 mb-12"
          style="border-radius: 7px !important;"
          max-width="448"
          :src="logo"
        ></v-img>
      
          <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
          >
            <v-form validate-on="submit lazy" @submit.prevent="submit">

              <div class="text-subtitle-1 text-medium-emphasis">Usuário</div>
        
              <v-text-field
                v-model="params.email"
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
              ></v-text-field>
        
              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Senha
        
                <a
                  class="text-caption text-decoration-none"
                  style="color: var(--color-dark);"
                  href="#"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Esqueceu sua senha?</a>
              </div>
        
              <v-text-field
                v-model="params.password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
              ></v-text-field>
        
              <v-card
                class="mb-12"
                color="surface-variant"
                variant="tonal"
              >
                <v-card-text v-if="false" class="text-medium-emphasis text-caption">
                  Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
                </v-card-text>
              </v-card>
        
              <v-btn
                block
                class="mb-8"
                style="background-color:#3949AB"
                color="#fff"
                size="large"
                variant="tonal"
                type="submit"
              >
                Entrar
              </v-btn>
            </v-form>

            <!-- <v-btn
                block
                class="mb-8"
                style="background-color: #FFF; border: 1px solid grey "
                color="#fff"
                size="large"
                variant="tonal"
              >
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="32px" height="32px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            </v-btn> -->
      
            <v-card-text class="text-center">
              <a
                class="text-decoration-none"
                style="color: #3949AB;"
                href="/register"
                rel="noopener noreferrer"
              >
                Registrar Agora <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>
          </v-card>
        </div>
      </v-container>
    </v-col>
  </template>

<style>
</style>