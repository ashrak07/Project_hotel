<script setup lang="ts">
  import {onMounted} from 'vue'
  import MainLayout from "./layouts/MainLayout.vue"

  onMounted(() => {
    console.log("Application Vue ")})

</script>

<template>
  <v-app>
    <MainLayout/> 
  </v-app>
</template>


<style >
</style>