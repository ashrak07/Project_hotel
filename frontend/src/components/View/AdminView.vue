<template>
  <v-container class="">
    <v-row>
      <v-col cols="3" class="">
        <v-div class="px-6 py-3">
          <div class="flex my-2">
            <span
              class="mdi mdi-view-dashboard text-blue-grey-darken-1"
              style="font-size: large"
            ></span>
            <div class="ml-4 pt-1 text-blue-grey-darken-2">Dashboard</div>
          </div>
          <div class="flex my-2">
            <span
              style="font-size: large"
              class="mdi mdi-bed text-blue-grey-darken-1"
            ></span>
            <div class="ml-4 pt-1 text-blue-grey-darken-2">
              Gestion des chambres
            </div>
          </div>
          <div class="flex my-2">
            <span
              class="mdi mdi-calendar-account-outline text-blue-grey-darken-1"
              style="font-size: large"
            ></span>
            <div class="ml-4 pt-1 text-blue-grey-darken-2">
              Gestion des reservations
            </div>
          </div>
          <div class="flex my-2">
            <span
              class="mdi mdi-account-group text-blue-grey-darken-1"
              style="font-size: large"
            ></span>
            <div class="ml-4 pt-1 text-blue-grey-darken-2">
              Gestion des clients
            </div>
          </div>
        </v-div>
      </v-col>
      <v-col cols="9" class="mt-2 content">
        <v-container class="">
          <router-view></router-view>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script></script>

<style scoped>
.content {
  min-height: 80vh;
  border-left: 1px solid rgb(224, 224, 224);
}
</style>
