import { ref,  } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '@/plugins/firebase';
import { onAuthStateChanged } from 'firebase/auth';


export const useAuthStore = defineStore('auth', () => {

    const user = ref(null);
    const loading = ref(true);

    async function setUser(userValue) {
        user.value = userValue;
    }

    onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      loading.value = false;
    });
    
    return {
        user,
        loading,
        setUser,
    }

})
