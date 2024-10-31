import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  const isAuthenticated = ref(false);

  function setIsAutenticated(value) {
    isAuthenticated.value = value;
  }

  return { isAuthenticated, setIsAutenticated };
})
