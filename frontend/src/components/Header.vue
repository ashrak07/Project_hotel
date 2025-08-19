<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../Store/UserStore";
import { jwtDecode } from "jwt-decode";

// router + store
const router = useRouter();
const userStore = useUserStore();

// état du menu
const menu = ref(false);

const logout = () => {
  console.log("-----");
  userStore.clearToken();
  router.push({ name: "home" });
  localStorage.clear();
};

const goToAccount = () => {
  const token = userStore.accessToken;
  try {
    const decoded = jwtDecode(token);
    console.log("decode ==>", decoded);

    const role = decoded.user.role;
    console.log("io ary ny role anhh:", role);

    if (role === "admin") {
      router.push({ name: "admin" });
    } else {
      router.push({ name: "user" });
    }
  } catch (error) {
    console.error("Token invalide", error);
  }
};

const goToHome = () => {
  router.push({ name: "home" });
};

const goToLogin = () => {
  router.push({ name: "login" });
};

// nom de l'utilisateur (string vide si non connecté)
const userName = computed(() => userStore.userName);
</script>

<template>
  <v-app-bar color="var(--color-2)" style="color: white" app>
    <v-toolbar-title>Hotel-ko</v-toolbar-title>

    <v-spacer />

    <v-btn @click="goToHome">Accueil</v-btn>
    <v-btn class="text-3xl">Chambres</v-btn>
    <v-btn>À propos</v-btn>

    <v-spacer />

    <!-- Si l'utilisateur est connecté : Menu déroulant -->
    <template v-if="userName">
      <v-menu
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
            ></span>
            <span>{{ userName }}</span>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="goToAccount">
            <v-list-item-title>
              <v-icon class="mx-1">mdi-account</v-icon>
              Mon compte
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon class="mx-1">mdi-logout-variant</v-icon>
              Se déconnecter
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Si pas connecté : Bouton Login -->
    <template v-else>
      <v-btn class="mx-3" @click="goToLogin">Se connecter</v-btn>
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
