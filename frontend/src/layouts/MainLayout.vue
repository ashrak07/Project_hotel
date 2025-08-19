<template>
  <v-app class="">
    <!-- <Header class="header"/> -->
    <v-main class="content">
      <router-view />
    </v-main>
    <!-- <Footer class="footer"/> -->
  </v-app>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped lang="scss">
.v-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
}
.footer {
  height: 40px;
}
</style>
