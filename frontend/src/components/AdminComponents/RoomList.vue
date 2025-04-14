<template>
  <div class="mb-8">
    <v-row cols="6" class="d-flex justify-space-between align-center">
      <v-col class="">
        <div
          class="font-weight-bold text-blue-grey-darken-2"
          style="font-size: large"
        >
          Liste des chambres
        </div>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          color="var(--color-3)"
          style="color: white"
          text="Créer une chambre"
        ></v-btn>
      </v-col>
    </v-row>
  </div>
  <v-card class="d-flex overflow-hidden" max-width="900" elevation="3">
    <div class="d-flex">
      <!-- Image à gauche -->
      <v-img src="../../../public/001.jpg" width="200" cover></v-img>
      <!-- Contenu à droite -->
    </div>
    <div
      class="d-flex flex-column justify-space-between py-3 px-4"
      style="flex: 1; overflow: hidden"
    >
      <div>
        <div class="text-h6">Chambre Deluxe</div>
        <div class="text-subtitle-2 mb-2">Vue sur mer</div>
        <div
          class="text-body-2 text-truncate"
          style="max-height: 60px; overflow: hidden"
        >
          Une chambre spacieuse avec un grand lit, balcon et salle de bain
          privée. Cette chambre est parfaite pour les séjours détente en couple
          ou en solo.
        </div>
      </div>
      <div class="mt-2 flex justify-end">
        <v-btn
          color="var(--color-3)"
          text="Modifier"
          class=""
          style="align-self: start"
          ><span
            class="mdi mdi-square-edit-outline"
            style="font-size: x-large; color: white"
          >
          </span>
        </v-btn>
        <v-btn
          color="pink-lighten-1"
          text="Supprimer"
          class="ml-2"
          style="align-self: start"
          ><span class="mdi mdi-delete-circle" style="font-size: x-large">
          </span
        ></v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup></script>
