<template>
  <div
    class="font-weight-bold text-blue-grey-darken-2"
    style="font-size: large"
  >
    Liste des réservations
  </div>
  <v-list density="compact">
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :value="item"
      color="primary"
      class=""
      ><div class="flex align-item-center">
        <div>
          <div class="flex">
            <v-icon
              class="mt-2 text-blue-grey-darken-2"
              icon="mdi-account"
            ></v-icon>
            <v-list-item-title
              class="ml-3 pt-1 text-blue-grey-darken-2"
              v-text="item.text"
            ></v-list-item-title>
          </div>
          <div class="flex">
            <v-icon
              class="mt-2 text-blue-grey-darken-2"
              icon="mdi-clock"
            ></v-icon>
            <v-list-item-title
              class="ml-3 pt-1 text-blue-grey-darken-2"
              v-text="item.text"
            ></v-list-item-title>
          </div>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          color="pink-lighten-1"
          text="Supprimer"
          class="ml-2"
          variant="comfortable"
          style="align-self: start"
          ><span class="mdi mdi-delete" style="font-size: x-large"> </span
        ></v-btn>
      </div>
    </v-list-item>
  </v-list>
</template>

<script setup>
const items = [
  { text: "Real-Time" },
  { text: "Audience", icon: "mdi-account" },
  { text: "Conversions", icon: "mdi-flag" },
];
</script>
