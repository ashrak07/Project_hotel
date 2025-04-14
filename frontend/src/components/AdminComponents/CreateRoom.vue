<template>
  <div
    class="mb-6 font-weight-bold text-blue-grey-darken-2"
    style="font-size: large"
  >
    Ajout d'une chambre
  </div>
  <div class="mb-4 flex text-center">
    <img src="../../assets/29.jpg" />
  </div>
  <div>
    <v-row>
      <v-col cols="6" class="">
        <v-file-input
          label="Entrer les images"
          append-inner-icon="mdi-camera"
          variant="underlined"
          multiple
          clearable
        ></v-file-input>
        <v-text-field
          variant="underlined"
          label="Type de la chambre"
          clearable
        ></v-text-field>
        <v-number-input
          control-variant="stacked"
          variant="underlined"
          label="Nombre du lit"
          clearable
        ></v-number-input>
      </v-col>
      <v-col cols="6" class="">
        <v-text-field
          variant="underlined"
          label="Nom de la chambre"
          clearable
        ></v-text-field>
        <v-text-field
          variant="underlined"
          label="Prix"
          clearable
        ></v-text-field>

        <v-number-input
          control-variant="stacked"
          variant="underlined"
          label="Nombre de personne"
          clearable
        ></v-number-input>
      </v-col>
    </v-row>
  </div>
  <div class="flex text-center">
    <div style="width: 30%">
      <v-btn
        block
        color="var(--color-3)"
        style="color: white"
        text="Créer "
        rounded="xl"
      ></v-btn>
    </div>
  </div>
</template>

<script></script>

<style scoped>
img {
  width: 75%;
}
</style>
