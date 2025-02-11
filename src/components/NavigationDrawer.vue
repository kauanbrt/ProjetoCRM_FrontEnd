<script>
import { signOut } from "firebase/auth";
import { useAuthStore } from "@/stores/authStore";
import { auth } from "@/plugins/firebase";
import router from "@/router";

  export default {
    name: 'NavigationDrawer',
    data () {
      return {
        drawer: true,
        rail: false,
      }
    },
    watch:{
      'authStore.user': (newValue) => {
        if(newValue == null){
          router.push('/login');
        }
      }
    },
    computed:{
      authStore(){
        return useAuthStore();
      },
      user(){
        return auth?.currentUser;
      }
    },
    methods: {
      logout(){
        signOut(auth).then(() => {
          // Sign-out successful.
          this.$toast.success('Usuário desconectado com sucesso!');
          router.push('/login');
        }).catch((error) => {
          this.$toast.error('Erro ao desconectar usuário!');
          // An error happened.
        });
      },
      getUserInitials(){
        console.log(this.user)
        const userName = this.user?.email;

        let strings = userName.split(' ');

        let userInitials = strings[0].charAt(0);

        if(strings.length >= 2){
          userInitials += strings[1].charAt(0);
        }

        return userInitials.toUpperCase();
      }
    }
  }
</script>

<template>
    <v-navigation-drawer
        color="indigo-darken-1"
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
    >
        <v-list-item
          :title="user?.email"
          height="64px"
          nav
          style="color: #FFF"
        >
            <template v-slot:prepend>
              <v-avatar color="#FF5733">
                <span class="text-h6" style="color: #FFF">{{ getUserInitials() }}</span>
              </v-avatar>
            </template>
            <template v-slot:append>
                <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
                color="#FFF"
                ></v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list style="height: 92% !important;" density="compact" nav>
            <div style="height: 100% !important; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                  <!-- <router-link to="/">
                      <v-list-item class="list-item-menu" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
                  </router-link> -->

                  <router-link to="/events">
                      <v-list-item class="list-item-menu" prepend-icon="mdi-calendar" title="Eventos" value="events"></v-list-item>
                  </router-link>

                  <router-link to="/forms">
                      <v-list-item class="list-item-menu" prepend-icon="mdi-file-document" title="Formulários" value="forms"></v-list-item>
                  </router-link>

                  <router-link to="/certificates">
                      <v-list-item class="list-item-menu" prepend-icon="mdi-certificate" title="Certificados" value="certificates"></v-list-item>
                  </router-link>

                  <router-link to="/participants">
                      <v-list-item class="list-item-menu" prepend-icon="mdi-account-group" title="Participantes" value="participants"></v-list-item>
                  </router-link>
              </div>
              <div>
                <router-link to="/login">
                  <v-list-item @click="logout" class="list-item-menu" prepend-icon="mdi-logout" title="Sair" value="exit"></v-list-item>
                </router-link>
              </div>
          </div>
        </v-list>
    </v-navigation-drawer>
  </template>

<style>
a{
    text-decoration: none !important;
}
.list-item-menu{
  color: #FFF !important;
}
.list-item-menu:hover {
  background-color: transparent !important;
}
</style>