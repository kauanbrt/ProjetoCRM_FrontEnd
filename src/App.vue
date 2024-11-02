<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavigationDrawer from './components/NavigationDrawer.vue';
import AppBar from './components/AppBar.vue';
import { useAuthStore } from './stores/authStore';
const authStore = useAuthStore();
</script>

<template>
  <v-responsive class="border rounded">
    <v-app v-if="authStore.isAuthenticated" style="height: 100% !important">
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

    <v-app v-else style="height: 100% !important">
          <v-col class="pa-0">
            <RouterView />
          </v-col>
    </v-app>
  </v-responsive>
</template>

<style scoped>

</style>
