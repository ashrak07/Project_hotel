<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
  router.push({ name: "home" });
};

const goToLogin = () => {
  router.push({ name: "login" });
};
</script>

<template>
  <v-app-bar color="var(--color-2)" style="color: white" app>
    <v-toolbar-title> Hotel-ko </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="goToHome">Accueil</v-btn>
    <v-btn>Chambres</v-btn>
    <v-btn>A propos</v-btn>
    <v-spacer></v-spacer>
    <v-btn @click="goToLogin">Login</v-btn>
  </v-app-bar>
</template>

<style lang=""></style>
