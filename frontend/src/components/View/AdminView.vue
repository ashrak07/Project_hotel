<template>
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
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToRoom = () => {
  router.push({ name: "admin-room" });
};
const goToUser = () => {
  router.push({ name: "admin-user" });
};
const goToReservation = () => {
  router.push({ name: "admin-booking" });
};
</script>

<style scoped>
.content {
  min-height: 80vh;
  border-left: 1px solid rgb(224, 224, 224);
}
</style>
