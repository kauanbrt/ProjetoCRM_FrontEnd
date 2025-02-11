<script setup>
import { ref, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import NavigationDrawer from './components/NavigationDrawer.vue';
import AppBar from './components/AppBar.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from './stores/authStore';

const isAuthenticated = ref(false);
const authStore = useAuthStore();

const auth = getAuth();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setTimeout(() => {isAuthenticated.value = true;}, 500);
      authStore.setUser(user);
    } else {
      setTimeout(() => {isAuthenticated.value = false;}, 500);
    }
  });
});
</script>

<template>
  <v-responsive class="border rounded" v-if="isAuthenticated">
    <v-app style="height: 100% !important">
      <NavigationDrawer />

      <AppBar />

      <v-main>
        <v-container class="pa-0">
          <v-col class="pa-8" style="max-height:94vh ; overflow: auto !important;">
            <RouterView />
          </v-col>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
  <RouterView v-else />
</template>

<style scoped>

</style>
