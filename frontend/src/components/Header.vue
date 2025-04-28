<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../Store/UserStore";

// router + store
const router = useRouter();
const userStore = useUserStore();

// état du menu
const menu = ref(false);

// nom de l'utilisateur (string vide si non connecté)
const userName = computed(() => userStore.userName);

// navigation
const goToHome = () => {
  router.push({ name: "home" });
};
const goToLogin = () => {
  router.push({ name: "login" });
};
const goToAccount = () => {
  menu.value = false;
  router.push({ name: "account" }); // adapte le nom de ta route "Mon compte"
};

// déconnexion
const logout = () => {
  menu.value = false;
  userStore.clearToken(); // ta méthode pour vider le token
  router.push({ name: "login" });
};
</script>

<template>
  <v-app-bar color="var(--color-2)" style="color: white" app>
    <v-toolbar-title>Hotel-ko</v-toolbar-title>

    <v-spacer />

    <v-btn @click="goToHome">Accueil</v-btn>
    <v-btn>Chambres</v-btn>
    <v-btn>À propos</v-btn>

    <v-spacer />

    <!-- Si l'utilisateur est connecté : Menu déroulant -->
    <template v-if="userName">
      <v-menu
        v-model="menu"
        density="comfortable"
        offset-y
        content-class="full-width-menu"
        close-on-content-click
        transition="scale-transition"
      >
        <template #activator="{ props }">
          <v-btn v-bind="props" class="mx-3" elevation="0" text>
            <span
              class="mx-1 mdi mdi-account-circle"
              style="font-size: x-large"
            />
            <span>{{ userName }}</span>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="goToAccount">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Mon compte</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Se déconnecter</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Si pas connecté : Bouton Login -->
    <template v-else>
      <v-btn class="mx-3" @click="goToLogin">Login</v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>
.full-width-menu {
  width: 100% !important;
  max-width: none !important;
  left: 0 !important;
  right: 0 !important;
}
</style>
