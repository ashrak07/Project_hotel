<template>
  <v-card class="mt-8 mx-auto overflow-visible" max-width="400">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
      rounded="lg"
    >
      <v-sparkline
        :labels="labels"
        :model-value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">User Registrations</div>
      <div class="subheading font-weight-light text-grey">
        Last Campaign Performance
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="me-2" size="small"> mdi-clock </v-icon>
      <span class="text-caption text-grey font-weight-light"
        >last registration 26 minutes ago</span
      >
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from "vue";

const labels = ref(["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"]);
const value = ref([200, 675, 410, 390, 310, 460, 250, 240]);
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
