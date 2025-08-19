<!-- <template>
  <v-container class="">
    <v-row>
      <v-col cols="3" class="">
        <div class="mt-6 px-6 py-3">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                variant="flat"
                v-bind="props"
                :color="isHovering ? 'secondary' : undefined"
                class="mb-1 px-2 py-2 d-flex align-center"
                style="cursor: pointer"
                @click="goToDashboard"
              >
                <span
                  class="mdi mdi-view-dashboard"
                  style="font-size: large"
                ></span>
                <div class="ml-4">Dashboard</div></v-card
              >
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                variant="flat"
                v-bind="props"
                :color="isHovering ? 'secondary' : undefined"
                class="mb-1 px-2 py-2 d-flex align-center"
                style="cursor: pointer"
                @click="goToRoom"
              >
                <span class="mdi mdi-bed" style="font-size: large"></span>
                <div class="ml-4">Gestion des chambres</div></v-card
              >
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                variant="flat"
                v-bind="props"
                :color="isHovering ? 'secondary' : undefined"
                class="mb-1 px-2 py-2 d-flex align-center"
                style="cursor: pointer"
                @click="goToReservation"
              >
                <span
                  class="mdi mdi-calendar-account-outline"
                  style="font-size: large"
                ></span>
                <div class="ml-4">Gestion des réservations</div></v-card
              >
            </template>
          </v-hover>
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-card
                variant="flat"
                v-bind="props"
                :color="isHovering ? 'secondary' : undefined"
                class="px-2 py-2 d-flex align-center"
                style="cursor: pointer"
                @click="goToUser"
              >
                <span
                  class="mdi mdi-account-group"
                  style="font-size: large"
                ></span>
                <div class="ml-4">Gestion des clients</div></v-card
              >
            </template>
          </v-hover>
        </div>
      </v-col>
      <v-col cols="9" class="mt-2 content">
        <v-container class="">
          <router-view></router-view>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template> -->

<template>
  <div class="flex flex-row">
    <div class="basis-1/4 px-8 min-h-screen border-r-2 border-gray-100">
      <div class="pb-5 min-h-screen flex flex-col justify-space-between">
        <div class="">
          <div class="flex text-center mt-5 text-2xl font-weight-bold my-12">
            Hotel-ko
          </div>
          <div class="">
            <div
              class="hover:cursor-pointer pa-3 rounded-md"
              :class="
                activeMenu === 'dashboard'
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-blue-600 hover:text-white'
              "
              @click="goToDashboard"
            >
              <span class="mdi mdi-view-dashboard"></span>
              Dashboard
            </div>
            <div
              class="hover:cursor-pointer pa-3 rounded-md my-1"
              :class="
                activeMenu === 'room'
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-blue-600 hover:text-white'
              "
              @click="goToRoom"
            >
              <span class="mdi mdi-room-service"></span>

              Gestion des chambres
            </div>
            <div
              class="hover:cursor-pointer pa-3 rounded-md my-1"
              :class="
                activeMenu === 'reservation'
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-blue-600 hover:text-white'
              "
              @click="goToReservation"
            >
              <span class="mdi mdi-ticket"></span>

              Gestion des réservations
            </div>
            <div
              class="hover:cursor-pointer pa-3 rounded-md my-1"
              :class="
                activeMenu === 'user'
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-blue-600 hover:text-white'
              "
              @click="goToUser"
            >
              <span class="mdi mdi-account-supervisor"></span>

              Gestion des clients
            </div>
          </div>
        </div>
        <div class="px-4">
          <span class="mdi mdi-logout"></span>
          Logout
        </div>
      </div>
    </div>
    <div class="basis-3/4 min-h-screen bg-gray-100">
      <div class="flex justify-md-space-between bg-white">
        <div class="pa-4">
          <div class="text-sm">Bonjour !</div>
          <div class="text-lg">Bienvenue {{ name }} !</div>
        </div>
        <div>kaiza</div>
      </div>
      <div class="px-5 py-5">
        <div class="bg-white rounded-lg px-5 py-5">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const activeMenu = ref("dashboard");

const goToDashboard = () => {
  activeMenu.value = "dashboard";
  router.push({ name: "admin-dashboard" });
};
const goToRoom = () => {
  activeMenu.value = "room";
  router.push({ name: "admin-room" });
};
const goToUser = () => {
  activeMenu.value = "user";
  router.push({ name: "admin-user" });
};
const goToReservation = () => {
  activeMenu.value = "reservation";
  router.push({ name: "admin-booking" });
};
</script>

<style scoped>
.content {
  min-height: 80vh;
  border-left: 1px solid rgb(224, 224, 224);
}
</style>
