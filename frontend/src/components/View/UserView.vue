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
                activeMenu === 'reservation'
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-blue-600 hover:text-white'
              "
              @click="goToReservation"
            >
              <span class="mdi mdi-ticket"></span>

              Mes réservations
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
import { useUserStore } from "../../Store/UserStore";
import { ref } from "vue";

const activeMenu = ref("dashboard");
const router = useRouter();
const userStore = useUserStore();

const name = userStore.userName;

const goToDashboard = () => {
  activeMenu.value = "dashboard";
  router.push({ name: "user-dashboard" });
};

const goToReservation = () => {
  activeMenu.value = "reservation";
  router.push({ name: "user-reservation" });
};
</script>

<style scoped>
.content {
  min-height: 80vh;
  border-left: 1px solid rgb(224, 224, 224);
}
</style>
